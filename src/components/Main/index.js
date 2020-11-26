import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styles from './index.module.css';
import { useEffect, useState } from 'react';
import CardActionArea from '@material-ui/core/CardActionArea';

export default function Main() {
  const [topItems, settopItems] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch("https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty");
      const data = await response.json();
      settopItems(data.slice(0, 100));
    })()
  }, []);

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
        < Card className={styles.cardInfo} key={el.id}>
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
          {/* <CardActions>
            <Button size="small">Learn More</Button>
          </CardActions> */}
        </Card>
      )
      )}
    </>
  );
}


