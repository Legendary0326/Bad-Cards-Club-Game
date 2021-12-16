import logo from './logo.svg';
import './App.css';
import Home from "./Components/Home";
import Chatbox from './Components/Chatbox';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ModalData from "./Components/Modal";
import PlayGame from "./Components/PlayGame";
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
          <div className="playgame-data">
          <div className="sidebar">
            <Sidebar />
          </div>
          <div className="playgame-menu">
            <PlayGame />
            <Chatbox />
          </div>
          </div>
        </Route>
        <Route path="/">
          <Home />
        </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
