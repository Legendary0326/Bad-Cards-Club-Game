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
        if(data) {
          setUserInfo(data)
        }
      })
    }
  }, [account, socket])
  return (
    <div className="main-body" >
      <Routes>
        <Route 
          path="playgame/:id" 
          element={
            <div style={{ width: '100%', display: 'flex', paddingRight: '5px' }}>
              <div style={{ padding: 0, display: 'inline-block' }}>
                <Sidebar socket={socket} user={userInfo} />
              </div>
              <div style={{ padding: 0, display: 'inline-block', width: '100%' }}>
                <Games socket={socket} user={userInfo}/>
              </div>
            </div>
          }
        />
        <Route 
          path="home" 
          element={
            <div style={{ width: '100%', display: 'flex', paddingRight: '5px' }}>
              <div style={{ padding: 0, display: 'inline-block' }}>
                <Sidebar socket={socket} user={userInfo} />
              </div>
              <div style={{ padding: 0, display: 'inline-block', width: '100%' }}>
                <Home socket={socket} user={userInfo}/>
              </div>
            </div>
          } 
        />
      </Routes>
    </div>
  );
}

export default App;
