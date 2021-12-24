import React, { useEffect, useRef, useState } from 'react';
import "./Chatbox.css";
import Person from "../assets/person.jpg";
import Logo from "../assets/logo.png";

const Chatbox = ({socket}) => {
    const [chats, setChats] = useState([]);
    const [content, setContent] = useState("");

    const contentRef = useRef(null)

    useEffect( () => {
        let index = 0
        socket.emit("chats");
        socket.on("chats", (data) => {
            const contents = data.map((element) => 
                <div className="chatbox-details" key={ index ++ }>
                    <div className="person-image">
                        <img src={Logo} alt="person-image" />
                    </div>
                    <div className="chatbox-text">
                        <span>{element.content}</span>
                    </div>
                </div>
            )

            setChats(contents)
        })
    }, [socket]);

    const onSend = () => {
        if(content === "") {
            contentRef.current.style.border = '1px solid red';
        } else {
            socket.emit("addChats", {
                username : 'user1',
                content: content
            })
        }

        setContent("");
    }

    const changeContent = (e) => {
        if(e.target.value) {
            contentRef.current.style.border = '1px solid #999';
        }
        setContent(e.target.value);
    }

    return (
        <div className="chatbox">
            <div className="chatbox-title">
                <span>Lobby Chat</span>
            </div>
            <div className="chatbox-data">
                {chats}
                {/* <div className="chatbox-details">
                    <div className="person-image">
                        <img src={Logo} alt="person-image" />
                    </div>
                    <div className="chatbox-text">
                        <span>that was a great card!</span>
                    </div>
                </div>
                <div className="chatbox-details">
                    <div className="person-image">
                        <img src={Person} alt="person-image" />
                    </div>
                    <div className="chatbox-text">
                        <span>Tysm!</span>
                    </div>
                </div> */}
            </div>
            <div className="chatbox-send">
                <div className="content">
                    <input type="text" ref={contentRef} value={content} onChange={changeContent} />
                </div>
                <div className="send">
                    <button type="button" className="submit-btn" onClick={onSend}>Send</button>
                </div>
            </div>
        </div>
    )
}

export default Chatbox