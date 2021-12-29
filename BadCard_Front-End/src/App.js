import './App.css';
import Home from "./Components/Home";
import Games from "./Components/Games";
import { 
  BrowserRouter, 
  Routes, 
  Route 
} from 'react-router-dom';
import Sidebar from "./Components/Sidebar";
import { useEthers } from "@usedapp/core";
import { useEffect, useState } from 'react';

function App({socket}) {
  const [userInfo, setUserInfo] = useState([])
  const { account } = useEthers();

  useEffect(() => {
    if(account) {
      socket.emit("userInfo", {wallet: account})
      socket.on("userInfo", data => {
        setUserInfo(data)
      })
    }
  }, [account, socket])
  return (
    <div className="row main-body" >
      <Routes>
        <Route 
          path="playgame/:id" 
          element={
            <>
              <div className="col-2">
                <Sidebar socket={socket} />
              </div>
              <div className="col-10">
                <Games socket={socket} user={userInfo}/>
              </div>
            </>
          }
        />
        <Route 
          path="home" 
          element={
            <>
              <div className="col-2">
                <Sidebar socket={socket} />
              </div>
              <div className="col-10">
                <Home socket={socket} user={userInfo}/>
              </div>
            </>
          } 
        />
      </Routes>
    </div>
  );
}

export default App;
