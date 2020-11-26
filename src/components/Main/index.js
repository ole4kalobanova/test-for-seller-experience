import React from 'react';
import { useEffect, useState } from 'react';
import styles from './index.module.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import { Link } from 'react-router-dom';

export default function Main() {
  const [topItems, settopItems] = useState([]);
  const [items, setItems] = useState([]);

  //Получаем item 100 последних новостей
  useEffect(() => {
    (async () => {
      const response = await fetch("https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty");
      const data = await response.json();
      settopItems(data.slice(0, 100));
    })()
  }, []);

  //Запрашиваем по item каждую новость
  useEffect(() => {
    let requests = topItems.map(item => fetch(`https://hacker-news.firebaseio.com/v0/item/${item}.json?print=pretty`));
    Promise.all(requests)
      .then(responses => Promise.all(responses.map(r => r.json())))
      .then(users => setItems(users));
  }, [topItems]);

  console.log(items);

  return (
    <>
      {items && items.map((el) => (
        <Link to={`/${el.id}`} key={el.id}>
          < Card className={styles.cardInfo} >
            <CardActionArea>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  {el.by}
                </Typography>
                <Typography variant="h5" component="h2">
                  {el.title}
                </Typography>
                <Typography color="textSecondary">
                  {new Date(el.time * 1000).toLocaleDateString()}
                &nbsp;
                {new Date(el.time * 1000).toLocaleTimeString()}
                </Typography>
                <Typography variant="body2" component="p">
                  Score:{el.score}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Link>
      )
      )}
    </>
  );
}


