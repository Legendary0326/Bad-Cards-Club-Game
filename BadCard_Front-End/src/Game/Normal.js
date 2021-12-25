import { useState, useEffect } from "react";

const Normal = ({ socket, room, user }) => {
    const [content, setContent] = useState({});
    const [card, setCard] = useState(null);

    let index = 0

    useEffect(() => {
        socket.on("content", data => {
            setContent(data);
        })
    }, [socket])

    const onPick = (e) => {
        const text = e.currentTarget.getElementsByTagName('p')[0].textContent
        const selCard = 
            <>
                <div className="second">
                    <h1>Selected Card:</h1>
                </div>
                <div className="third">
                    <div className="third-data">
                        <div className="third-data1">
                            <p>
                                {text}
                            </p>
                        </div>
                    </div>
                </div>
            </>
        
        if(!card) {
            e.currentTarget.style.display = 'none'
            setCard(selCard)
            socket.emit("pick", {
                room: room,
                user: user, 
                text: text
            })
        }
    }
    return (
        <>
            <div className="second">
                <h1>Question</h1>
                <h3>{content.question}</h3>
            </div>
            {card}
            <div className="third" id="origin-third">
                <div className="cards" style={{display: 'block', marginLeft: 0}}>
                    <h1>Your Cards :</h1>
                </div>
                <div className="third-data">
                {
                    content.content
                    ?   content.content.map(e => 
                            <div 
                                className="third-data1" 
                                onDoubleClick={onPick} 
                                key={index ++ } 
                                style={{ cursor: 'pointer' }}
                            >
                                <p>{e}</p>
                            </div>
                        )
                    :   ("")
                }
                </div>
            </div>
       </>
    );
}

export default Normal;