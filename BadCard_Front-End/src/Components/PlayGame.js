import React from 'react';
import "./PlayGame.css";

const PlayGame = () => {
    return (
        <div className="playgame">
                    <div className="first">
            <div className="game-name">
                <h2>[Game Name]</h2>
                <div className="player-x">
                    <div className="player1"><button><p> player:x</p></button></div>
                    <div className="player1"><button><p> player:x</p></button></div>
                    <div className="player1"><button><p> player:x</p></button></div>
                    <div className="player1"><button><p> player:x</p></button></div>
                    <div className="player1"><button><p> player:x</p></button></div>
                    <div className="player1"><button><p> player:x</p></button></div>
                    <div className="player1"><button><p> player:x</p></button></div>
                    <div className="player8"><button><p> player:y</p></button></div>
                </div>
            </div>
            <div className="player-y">
                <h3>Player Y</h3>
                <p>Is the bad buddy</p>
            </div>
        </div>
        <div className="second">
            <h1>Question</h1>
            <h3>Sure, sex is great.But you have ever tried .........?</h3>
        </div>
        <div className="third">
            <div className="cards">
                <h1>Your Cards :</h1>
            </div>
            <div className="third-data">
                <div className="third-data1"><p>oprah's bank Account</p></div>
                <div className="third-data1"><p>Saying GM No Matter what Time it is</p></div>
                <div className="third-data1"><p>Shaking that little ass</p></div>
                <div className="third-data1"><p>Alpha</p></div>
                <div className="third-data1"><p>Snoop Dogg</p></div>
                <div className="third-data1"><p>Your Mom</p></div>
            </div>
        </div>
        </div>
    )
}

export default PlayGame
