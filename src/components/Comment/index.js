import React from 'react';
import { useEffect, useState } from 'react';
// import styles from './index.module.css';
// import { useParams } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
// import { Button } from '@material-ui/core';
// import CardActionArea from '@material-ui/core/CardActionArea';

export default function Comments({ comment }) {


  const [nestedComment, setnestedComment] = useState([]);
  // const [comment, setComment] = useState([]);

  // // Запрашиваем вложенные комментарии по клику
  function kidsComment(obj) {
    if (obj.kids) {
      let requests = obj.kids.map(element => fetch(`https://hacker-news.firebaseio.com/v0/item/${element}.json?print=pretty`));
      Promise.all(requests)
        .then(responses => Promise.all(responses.map(result => result.json())))
        .then(result => {
          obj.kids = result
          const nestedComment = obj.kids.map(comment => {
            return <Comments comment={comment} key={comment.id} />;
          });
          setnestedComment(nestedComment)
        });
      console.log(comment)
    }
  }

  return (
    < Card key={comment.id} onClick={() => kidsComment(comment)}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {comment.by}
        </Typography>
        <Typography color="textSecondary">
          {new Date(comment.time * 1000).toLocaleDateString()}
                &nbsp;
                {new Date(comment.time * 1000).toLocaleTimeString()}
        </Typography>
        <Typography variant="body2" component="p">
          {comment.text}
        </Typography>
        <div>{nestedComment}</div>
      </CardContent>
    </Card>
  );
}
