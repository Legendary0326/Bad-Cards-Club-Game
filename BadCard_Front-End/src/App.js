import logo from './logo.svg';
import './App.css';
import Home from "./Components/Home";
import Games from "./Components/Games";
import { 
  BrowserRouter, 
  Routes, 
  Route 
} from 'react-router-dom';
import ModalData from "./Components/Modal";
import SignIn from "./Components/SignIn";
import Sidebar from "./Components/Sidebar";
import io from 'socket.io-client';

const socket = io.connect('/');

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/modal" element={<ModalData />} />
          <Route 
            path="/playgame/:id" 
            element={
              <div className="row main-body" >
                <div className="col-2">
                  <Sidebar socket={socket} />
                </div>
                <div className="col-10">
                  <Games socket={socket}/>
                </div>
              </div>
            }
            />
          <Route 
            path="/home" 
            element={
              <div className="row main-body" >
                <div className="col-2">
                  <Sidebar socket={socket} />
                </div>
                <div className="col-10">
                    <Home socket={socket} />
                </div>
              </div>
            } />
          <Route path="/" element={<SignIn socket={socket} />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
