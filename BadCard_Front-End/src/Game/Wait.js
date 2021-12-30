import { useState, useEffect } from "react";
import { Button } from 'react-bootstrap';

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
                <h1>
                    Waiting For Other Players To Join
                    <span className="dot first-dot">.</span>
                    <span className="dot second-dot">.</span>
                    <span className="dot third-dot">.</span>
                </h1>
                <h3>
                    {( room && user && room.creator.wallet == user.wallet ) 
                        ?
                            <Button 
                                onClick={onStart}
                                size="lg"
                                disabled={room.users.length > 3 ? false: true}
                            >
                                Start the game
                            </Button>
                        : ""
                    }
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