import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEthers } from "@usedapp/core";
import "./PlayGame.css";

const PlayGame = ({socket}) => {

    const { id } = useParams();
    const [players, setPlayers] = useState([])
    const [userInfo, setUserInfo] = useState([])
    const [roomInfo, setRoomInfo] = useState({})
    const { account, deactivate } = useEthers();

    useEffect( () => {
        if(account) {
            let index = 0
            socket.emit("room", {id : id})
            socket.on("room", (data) => {
                const roomUsers = data.users.map(e => 
                        <div className="player1" key={index ++ }>
                            <button>{e.username}</button>
                        </div>
                    )
                setPlayers(roomUsers)
                setRoomInfo(data.room)
            })

            socket.emit("userInfo", {wallet: account})
            socket.on("userInfo", data => {
                setUserInfo(data)
            })
        }
    }, [socket] )

    return (
        <div className="playgame">
            <div className="first">
                <div className="game-name">
                    <h2>{roomInfo.name}</h2>
                    <div className="player-x">
                        {players}
                    </div>
                </div>
                <div className="player-y">
                    <h3>{userInfo.username}</h3>
                    <p>Is the bad buddy</p>
                </div>
            </div>
            <div className="second">
                <h1>Question</h1>
                <h3>This is the sample question.</h3>
            </div>
            <div className="third">
                <div className="cards">
                    <h1>Your Cards :</h1>
                </div>
                <div className="third-data">
                    <div className="third-data1"><p>Answer 1</p></div>
                    <div className="third-data1"><p>Answer 2</p></div>
                    <div className="third-data1"><p>Answer 3</p></div>
                    <div className="third-data1"><p>Answer 4</p></div>
                    <div className="third-data1"><p>Answer 5</p></div>
                    <div className="third-data1"><p>Answer 6</p></div>
                </div>
            </div>
        </div>
    )
}

export default PlayGame
