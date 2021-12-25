import { useState, useEffect } from "react";

const Judge = ({ socket, room, user }) => {

    const [content, setContent] = useState({});
    const [voteInfo, setVoteInfo] = useState([]);

    let index = 0;
    let i = 0;

    useEffect( () => {
        if(room.id) {
            socket.emit("content", room.id)
            socket.on("content", data => {
                setContent(data);
            })
        }
    }, [socket])

    const confirm = () => {
        socket.emit("next", { vote: voteInfo, room: room });
    }

    const vote = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;

        if(checked) {
            const isExist = voteInfo.find(e => e == value)
            if(!isExist) {
                voteInfo.push(value)
            }
        } else {
            const isExist = voteInfo.find(e => e == value)
            if(isExist) {
                const index = voteInfo.findIndex(e => e == value)
                voteInfo.splice(index, 1)
            }
        }
        setVoteInfo(voteInfo)
    }
    return (
        <>
            <div className="second">
                <h1>You selected as Judge in this turn</h1>
                <h1>Question</h1>
                <h3>{content.question}</h3>
            </div>
            <div className="third" id="origin-third">
                <div className="cards" style={{display: 'block', marginLeft: 0}}>
                    <h1>Cards :</h1>
                </div>
                <div className="third-data">
                {
                    content.content
                    ?   content.content.map(e => 
                            <div 
                                className="third-data1"
                                key={index ++ } 
                            >
                                <p>{e}</p>
                            </div>
                        )
                    :   ("")
                }
                </div>
            </div>
            <div 
                className="second"
                style={{ 
                    flexDirection: 'initial',
                    paddingLeft: '1rem',
                    paddingRight: '1rem'
                }}
            >
                <h1 style={{ display: 'inline-block'}}>Player's card</h1>
                <button 
                    className="sidebar-menu-item-btn" 
                    style={{ 
                        display: 'inline-block', 
                        marginLeft: 'auto',
                        marginTop: 'auto',
                        marginBottom: 'auto'
                    }} 
                    onClick={confirm}
                >
                    Confirm
                </button>
            </div>
            <div className="third">
                <div className="third-data" style={{display: 'inline-flex'}}>
                    {
                        room.pick.map(e => 
                            <>
                                <div 
                                    className="third-data1"
                                    style={{ height: 'calc(200px + 2.5rem)'}}
                                    key={i ++ } 
                                >
                                    <div 
                                        style={{ 
                                            padding: '1rem',
                                            display: 'flex',
                                            fontSize: '1.5rem',
                                            fontWeight: 500,
                                            paddingBottom: 0
                                        }}>{e.user.username}
                                        <input 
                                            type="checkbox" 
                                            disabled={(room.pick.length == room.users.length - 1) ? false: true}
                                            value={e.user.wallet}
                                            onChange={vote}
                                            style={{
                                                marginTop: 'auto',
                                                marginBottom: 'auto',
                                                marginLeft: 'auto',
                                                width: '1.5rem',
                                                height: '1.5rem'
                                            }}
                                        />
                                    </div>
                                    <p style={{ height: 'initial'}}>{e.text}</p>
                                </div>
                            </>
                        )
                    }
                </div>
            </div>
        </>
    );
}

export default Judge;