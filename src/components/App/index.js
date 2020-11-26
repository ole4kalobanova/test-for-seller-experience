import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import Header from '../Header'
import Main from '../Main';
import News from '../News';
import styles from './index.module.css'

function App() {
  return (
    <div className={styles.app}>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route exact path="/:item/">
            <News />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
