import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useEthers, useInterval } from "@usedapp/core";
import Header from '../Game/Header';
import Judge from '../Game/Judge';
import Wait from '../Game/Wait';
import End from '../Game/End';
import Normal from '../Game/Normal';
import "./PlayGame.css";

const PlayGame = ({socket}) => {

    const { id } = useParams();
    const [userInfo, setUserInfo] = useState([])
    const [roomInfo, setRoomInfo] = useState({})
    const { account } = useEthers();

    useEffect( () => {
        if(account) {
            socket.emit("room", {id : id})
            socket.on("room", (data) => {
                setRoomInfo(data)
            })

            socket.emit("userInfo", {wallet: account})
            socket.on("userInfo", data => {
                setUserInfo(data)
            })
        }
    }, [socket, account] )
    
    useEffect( () => {

    }, [roomInfo, userInfo]) 

    return (
        roomInfo 
        ?   <div className="playgame">
                <Header socket={socket} room={roomInfo} user={userInfo} />
                {
                    roomInfo.state == 0 // waiting...
                    ? (<Wait socket={socket} room={roomInfo} user={userInfo} />)
                    : (
                        roomInfo.state == 1 // progressing
                        ? (
                            userInfo.wallet == roomInfo.judge.wallet  
                            ? (<Judge socket={socket} room={roomInfo} user={userInfo} />) // if you are a judge
                            : (<Normal socket={socket} room={roomInfo} user={userInfo} />) // you are normal player
                        )
                        : (<End socket={socket} room={roomInfo} user={userInfo} />)
                    )
                }
            </div>
        :   <></>
        // <div className="playgame">
        //     <div className="first">
        //         <div className="game-name">
        //             <h2>{roomInfo.name}</h2>
        //             <div className="player-x">
        //                 {players}
        //             </div>
        //         </div>
        //         <div className="player-y">
        //             <h3>{userInfo.username}</h3>
        //             <p>Is the bad buddy</p>
        //         </div>
        //     </div>
        //     <CardPanel 
        //         state={roomInfo.state} 
        //         card={card}
        //         onStart={onStart}
        //         onNext={onNext} 
        //         onGiveUp={onGiveUp}
        //         onPick = {onPick}
        //         onSkip={onSkip}
        //         onQuit={onQuit}
        //         onWinner={onWinner}
        //         content={content} />
        // </div>
    )
}

// const CardPanel = ({
//     state, 
//     card,
//     onStart, 
//     onNext,
//     onSkip,
//     onWinner,
//     onGiveUp,
//     onPick,
//     onQuit,
//     content, 
// }) => {
//     let i = 0;
//     switch (state) {
//         case 0:
//             return (
//                 <div style={{ textAlign: 'center' }}>
//                     <div className="second">
//                         <h1>Waiting users to join...</h1>
//                         <h3>
//                             <button className="sidebar-menu-item-btn" style={{display: 'span'}} onClick={onStart}>Start the game</button>
//                         </h3>
//                     </div>
//                     <div className="third" id="origin-third">
//                         <div className="cards">
//                         </div>
//                         <div className="third-data"></div>
//                     </div>
//                 </div>
//             )
//         case 1:
//             return ( 
//                 <div>
//                     <div className="second">
//                         <h1>Question
//                             <button className="sidebar-menu-item-btn" style={{ display: 'inline', float: 'right'}} onClick={onNext}>Next</button>
//                             <button className="sidebar-menu-item-btn" style={{ display: 'inline', float: 'right'}} onClick={onQuit}>Quit</button>
//                         </h1>
//                         <h3>{content.question}</h3>
//                     </div>
//                         { card }
//                     <div className="third" id="origin-third">
//                         <div className="cards">
//                             <h1>Your Cards :</h1>
//                         </div>
//                         <div className="third-data">{
//                             content.content.map(e => 
//                                 <div className="third-data1" onDoubleClick={onPick} key={i ++ } style={{ cursor: 'pointer' }}>
//                                     <p>{e}</p>
//                                 </div>
//                             )
//                         }
//                         </div>
//                     </div>
//                 </div>
//             )
//         case 2:
//             return (
//                 <>
//                     <div style={{ textAlign: 'center' }}>
//                         <div className="second">
//                             <h1>The game is finished.</h1>
//                             <h3>
//                                 <Link to="/home">
//                                     <button className="sidebar-menu-item-btn">Back to the games</button>
//                                 </Link>
//                             </h3>
//                         </div>
//                         <div className="third" id="origin-third">
//                             <div className="cards">
//                             </div>
//                             <div className="third-data"></div>
//                         </div>
//                     </div>
//                 </>
//             )
//         default:
//             return (
//             <></>
//             )
//     }

// }
export default PlayGame
