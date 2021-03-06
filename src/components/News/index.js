import React from 'react';
import { useEffect, useState } from 'react';
// import styles from './index.module.css';
import { useParams } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Comments from '../Comment';
// import CardActionArea from '@material-ui/core/CardActionArea';

export default function News() {
  const params = useParams();
  const [item, setItem] = useState([]);
  const [comment, setComment] = useState([]);

  // Запрашиваем статью
  useEffect(() => {
    (async () => {
      const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${params.item}.json?print=pretty`);
      const data = await response.json();
      setItem(data);
    })()
  }, [params.item]);

  // Запрашиваем корневые комментарии
  useEffect(() => {
    if (item.kids) {
      let requests = item.kids.map(comment => fetch(`https://hacker-news.firebaseio.com/v0/item/${comment}.json?print=pretty`));
      Promise.all(requests)
        .then(responses => Promise.all(responses.map(result => result.json())))
        .then(comment => setComment(comment));
    }
  }, [item.kids]);
  console.log(comment);

  // Запрашиваем вложенные комментарии по клику
  function kidsComment(obj) {
    if (obj.kids) {
      let requests = obj.kids.map(comment => fetch(`https://hacker-news.firebaseio.com/v0/item/${comment}.json?print=pretty`));
      Promise.all(requests)
        .then(responses => Promise.all(responses.map(result => result.json())))
        .then(comment => {
          obj.kids = comment;
        });
    }
  }

  return (
    <>
      <Card>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            {item.by}
          </Typography>
          <Typography variant="h5" component="h2">
            {item.title}
          </Typography>
          <Typography color="textSecondary">
            {new Date(item.time * 1000).toLocaleDateString()}
                &nbsp;
                {new Date(item.time * 1000).toLocaleTimeString()}
          </Typography>
          <Typography variant="body2" component="p">
            URL:{item.url}
          </Typography>
          <Typography variant="body2" component="p">
            Comments:{item.descendants}
          </Typography>
        </CardContent>
      </Card>
      {comment && comment.map((el) => (
        <Comments comment={el} key={el.id} />
      ))
      }
    </>
  );
}
