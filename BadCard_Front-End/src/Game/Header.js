import { useNavigate } from "react-router-dom";
import { Button, Tooltip, OverlayTrigger } from 'react-bootstrap';

const Header = ({ socket, room, user }) => {
    
    let index = 0
    const navigate = useNavigate()
    const leaveTooltip = (props) => (
        <Tooltip 
            id="leave-tooltip"
            {...props}
        >
            Leave the room
        </Tooltip>
    );
    const cancelTooltip = (props) => (
        <Tooltip 
            id="cancel-tooltip"
            {...props}
        >
            Cancel the room
        </Tooltip>
    )

    const leave = () => {
        socket.emit("leave", {room: room, user: user})
        if(user.wallet == room.judge.wallet && room.state == 1 && room.users.length > 1) {
            socket.emit("next", { vote: [], room: room })
        }
        navigate('/home');
    }

    const quit = () => {
        socket.emit("quit", room);
    }
    
    return (
        <>
            <div className="first">
                <div className="game-name">
                    <h2>{room.name}</h2>
                    <div className="player-x">
                    { room.users
                        ?  room.users.map(e => 
                                <div 
                                    className="player1" 
                                    key={index ++} 
                                >
                                    <button
                                        style={{ 
                                            backgroundColor: (room.pick_turn ? (room.pick_turn.wallet == e.wallet ? 'white': '#999'): '#999')
                                        }}
                                    >{e.username}
                                    <p style={{ marginBottom: 0 }}>{e.vote ? e.vote : 0} Points</p>
                                    </button>
                                </div>
                            )
                        :  ""
                    }
                    </div>
                </div>
                <div className="player-y">
                    <h3>{user ? user.username : ""}</h3>
                    <div 
                        style={{
                            paddingTop: '.5rem',
                            justifyContent: 'space-evenly',
                            display: 'flex',
                        }}
                    >
                        <OverlayTrigger
                            placement="left"
                            delay={{ show: 250, hide: 400 }}
                            overlay={leaveTooltip}
                        >
                            <Button variant="secondary" size="sm" onClick={leave}>
                                <i className="fas fa-external-link-alt"></i>
                            </Button>
                        </OverlayTrigger>
                        { room && user && room.state == 0 && user.wallet == room.creator.wallet || 
                        room && user && room.state == 3 && user.wallet == room.creator.wallet
                            ? 
                            <OverlayTrigger
                                placement="left"
                                delay={{ show: 250, hide: 400 }}
                                overlay={cancelTooltip}
                            >
                                <Button variant="secondary" size="sm" onClick={quit}>
                                    <i className="fas fa-times"></i>
                                </Button>
                            </OverlayTrigger>
                            : <></>
                        }
                        
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;