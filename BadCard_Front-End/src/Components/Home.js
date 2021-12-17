import React from 'react';
import "./Home.css";
import Sidebar from "./Sidebar";
import Main from "./Main";
import Chatbox from './Chatbox';

const Home = () => {
    return (
        <div className="home">
            {/* <div className="sidebar">
                <Sidebar />
            </div> */}
            <div className="main">
                <Main />
                <Chatbox />
            </div>
        </div>
    )
}

export default Home
