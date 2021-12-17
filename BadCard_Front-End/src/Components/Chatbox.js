import React from 'react';
import "./Chatbox.css";
import Person from "../assets/person.jpg";
import Logo from "../assets/logo.png";

const Chatbox = () => {
    return (
        <div className="chatbox">
            <div className="chatbox-title">
                <span>Lobby Chat</span>
            </div>
            <div className="chatbox-data">
                <div className="chatbox-details">
                    <div className="person-image">
                        <img src={Logo} alt="person-image" />
                    </div>
                    <div className="chatbox-text">
                        <span>that was a great card!</span>
                    </div>
                </div>
                <div className="chatbox-details">
                    <div className="person-image">
                        <img src={Person} alt="person-image" />
                    </div>
                    <div className="chatbox-text">
                        <span>Tysm!</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chatbox