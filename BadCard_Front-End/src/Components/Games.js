import React from 'react';
import "./Games.css";
import Sidebar from "./Sidebar";
import Chatbox from './Chatbox';
import PlayGame from "./PlayGame";

const Games = () => {
    return (
        <div className="playgame-data">
            {/* <div className="sidebar">
                <Sidebar />
            </div> */}
            <div className="main">
                <PlayGame />
                <Chatbox />
            </div>
        </div>
    )
}

export default Games
