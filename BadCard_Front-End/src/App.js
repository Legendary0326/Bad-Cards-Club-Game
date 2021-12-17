import logo from './logo.svg';
import './App.css';
import Home from "./Components/Home";
import Games from "./Components/Games";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ModalData from "./Components/Modal";
import SignIn from "./Components/SignIn";
import Sidebar from "./Components/Sidebar";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
        <Route path="/modal">
          <ModalData />
        </Route>
        <Route path="/playgame">
        <div className="row main-body" >
          <div className="col-2">
            <Sidebar />
          </div>
          <div className="col-10">
              <Games />
          </div>
        </div>
        </Route>
        <Route path="/home">
          <div className="row main-body" >
            <div className="col-2">
              <Sidebar />
            </div>
            <div className="col-10">
                <Home />
            </div>
          </div>
        </Route>
        <Route path="/">
          <SignIn />
        </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
