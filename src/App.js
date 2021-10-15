import logo from './logo.svg';
import './App.css';
import DrawingCanvas from './Components/DrawingCanvas';
import ViewingCanvas from './Components/ViewingCanvas';
import CardList from './Components/CardList';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <body>
        <Router>
          <Switch>
            <Redirect from="/" exact to="/home" />
            <Route path="/home" component={CardList} />
            <Route path="/addCard" component={DrawingCanvas} />
            <Route path='/viewCard/:handle'>
              <ViewingCanvas />
            </Route>
          </Switch>
        </Router>
      </body>
    </div>
  );
}

export default App;
