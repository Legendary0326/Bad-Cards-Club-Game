import { useState, useEffect } from "react";

const Wait = ({ socket, room, user }) => {

    const [disable, setDisable] = useState(false)

    useEffect(() => {
        if(room && 
            user && 
            room.creator.wallet ==  user.wallet) {
            setDisable(true)
        }
    }, [socket])

    const onStart = () => {
        socket.emit("start", room.id);
    }

    return (
        <div style={{ textAlign: 'center', paddingTop: '5rem' }}>
            <div className="second">
                <h1>Waiting users to join...</h1>
                <h3>
                    <button 
                        className="sidebar-menu-item-btn" 
                        style={{
                            display: 'inline',
                            disabled: disable
                        }} 
                        onClick={onStart}>Start the game</button>
                </h3>
            </div>
            <div className="third" id="origin-third">
                <div className="cards">
                </div>
                <div className="third-data"></div>
            </div>
        </div>
    );
}

export default Wait;