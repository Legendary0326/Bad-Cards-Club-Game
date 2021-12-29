import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../Game/Header';
import Judge from '../Game/Judge';
import Wait from '../Game/Wait';
import End from '../Game/End';
import Normal from '../Game/Normal';
import "./PlayGame.css";

const PlayGame = ({socket, user}) => {

    const { id } = useParams();
    const [roomInfo, setRoomInfo] = useState({})
    const navigate = useNavigate();

    useEffect( () => {
        if(user) {
            socket.emit("room", {id : id})
            socket.on("room", (data) => {
                if(data) {
                    setRoomInfo(data);
                } else if(data === null) {
                    navigate('/home');
                }
            })
        }
    }, [socket, user] )
    
    useEffect( () => {
    }, [roomInfo]) 

    return (
        roomInfo 
        ?   <div className="playgame">
                <Header socket={socket} room={roomInfo} user={user} />
                {
                    roomInfo.state == 0 // waiting...
                    ? (<Wait socket={socket} room={roomInfo} user={user} />)
                    : (
                        roomInfo.state == 1 || roomInfo.state == 2 // progressing
                        ? (
                            user.wallet == roomInfo.judge.wallet  
                            ? (<Judge socket={socket} room={roomInfo} user={user} />) // if you are a judge
                            : (<Normal socket={socket} room={roomInfo} user={user} />) // you are normal player
                        )
                        : (
                            roomInfo.state == 3 // end
                            ? (<End socket={socket} room={roomInfo} user={user} />)
                            : (<></>)
                        )
                    )
                }
            </div>
        :   <div className="playgame">
                <Header socket={socket} room={roomInfo} user={user} />
            </div>
    )
}

export default PlayGame
