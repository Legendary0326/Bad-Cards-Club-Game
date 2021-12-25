import { useState, useEffect } from "react";

const Header = ({ socket, room, user }) => {
    let index = 0
    return (
        <>
            <div className="first">
                <div className="game-name">
                <h2>{room.name}</h2>
                <div className="player-x">
                { room.users
                     ?  room.users.map(e => 
                            <div className="player1" key={index ++}>
                                <button>{e.username}</button>
                            </div>
                        )
                     :  ""
                }
                </div>
            </div>
                <div className="player-y">
                    <h3>{user.username}</h3>
                    <p>Is the bad buddy</p>
            </div>
            </div>
        </>
    );
}

export default Header;