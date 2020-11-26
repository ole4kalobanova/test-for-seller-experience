import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import styles from './index.module.css';

export default function Header() {

  return (
    <div >
      <AppBar position="static" className={styles.headers} >
        <Toolbar>
          <Typography>
            Hacker News
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
