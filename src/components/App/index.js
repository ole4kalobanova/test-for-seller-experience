import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import Header from '../Header'
import Main from '../Main';
import styles from './index.module.css'

function App() {
  return (
    <div className={styles.app}>
      <Router>
        <Header />
        <Main />
      </Router>
    </div>
  );
}

export default App;
