import React, {useState, useEffect} from 'react';
import "./Sidebar.css";
import Modal from "react-modal";
import Logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useEthers } from "@usedapp/core";
import discord_img from '../assets/discord.png';
import { Button } from 'react-bootstrap';

const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

const Sidebar = ({socket}) => {

    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalDataOpen, setModelDataOpen] = useState(false);
    const { account, deactivate } = useEthers();
    const [username, setUsername] = useState("");
    const [user, setUser] = useState({});
    const [roomname, setRoomName] = useState("");
    const navigate = useNavigate();

    useEffect( () => {
        if(account) {
            socket.emit("userInfo", {wallet: account})
            socket.on("userInfo", data => {
                if(data) {
                    setUser(data)
                    setUsername(data.username);
                }
            })
        }
    }, [socket, account])

    useEffect( () => {
    }, [username, roomname])

    function openModal() {
      setIsOpen(true);
    }
  
    function afterOpenModal() {
      // references are now sync'd and can be accessed.
    //   subtitle.style.color = '#f00';
    }
  
    function closeModal() {
      setIsOpen(false);
    }

    function newGame() {
        setModelDataOpen(true);
    }

    function afterOpenDataModal() {
        // references are now sync'd and can be accessed.
        // subtitle.style.color = '#f00';
      }

    function closeDataModal() {
        setModelDataOpen(false);
    }

    function handleDisconnect() {
        deactivate();
        window.location = "/";
    }

    const changeUsername = (e) => {
        setUsername(e.target.value);
    }

    const changeRoomname = (e) => {
        setRoomName(e.target.value)
    }

    const handleSettings = (e) => {
        socket.emit("addUser", {
            username : username,
            wallet : account,
        })
        closeModal()
    }

    const handleCreateRoom = (e) => {
        socket.emit("createRoom", {
            wallet : account,
            roomname : roomname
        })
        closeDataModal()
        socket.on('userInfo', data => {
            if(data.wallet == account && data.room != "") {
                navigate('/playgame/' + data.room)
            } 
        })
    }

    return (
        <div className="sidebar-menu">
            <div className="sidebar-logo-area">
                <div className="sidebar-logo">
                    <img src={Logo} alt="logo" />
                </div>
                <div className="sidebar-logo-btn">
                    <button>{ String(account).substring(0, 6) + "..." + String(account).substring(38)}</button>
                </div>
            </div>
            <div className="sidebar-menu-items">
                <div className="sidebar-menu-item">
                    <Link to="/home" style={{display : "flex", gap : "10px"}}>
                        <span><i className="fa fa-home"></i></span>
                        <span>Home</span>
                    </Link>
                </div>
                <div className="sidebar-menu-item">
                    <Link to={"/playgame/" + (user ? (user.room ? user.room : "") : "")} style={{display : "flex", gap : "10px"}}>
                        <span><i className="fa fa-user"></i></span>
                        <span>Games</span>
                    </Link>
                </div>
                <div className="sidebar-menu-item">
                        {/* <span><i className="fa fa-discord"></i></span> */}
                        <img src={discord_img}></img>
                        <span>Discord</span>
                </div>
                <div className="sidebar-menu-item">
                        <span><i className="fa fa-gear"></i></span>
                        <a href="#" onClick={openModal}>Setting</a>
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <button className="modal-close" onClick={closeModal}>X</button>
                    <div className="modal-data">
                        <div className="modal-text">
                            <span>Settings:</span>
                        </div>
                        <form onSubmit={handleSettings}>
                            <div>
                            <label>Username</label>
                            <input type="text" onChange={changeUsername} defaultValue={username} />
                            </div>
                            <div>
                            <label>Other Settings</label>
                            <input type="text" />
                            </div>
                            <div>
                            <label>Other Settings</label>
                            <input type="text" />
                            </div>
                            <div className="modal-data-btn">
                            <button type="submit" className="submit-btn">enter</button>
                            </div>
                        </form>
                    </div>
                </Modal>
                </div>
                <div className="sidebar-menu-item">
                    <Button 
                        onClick={newGame} 
                        disabled={user ? (user.room ? true : false) : false}
                    >
                        <span>
                            <i className="fa fa-plus"></i>
                        </span>&nbsp;Create New Game
                    </Button>
                    <Modal
                      isOpen={modalDataOpen}
                      onAfterOpen={afterOpenDataModal}
                      onRequestClose={closeDataModal}
                      style={customStyles}
                      contentLabel="Example Modal"
                    >
                        <button className="modal-close" onClick={closeDataModal}>X</button>
                        <div className="modal-game-data">
                            <div className="modal-text">
                                <span>Create New Game:</span>
                            </div>
                            <form onSubmit={handleCreateRoom}>
                                <div className="game-name-data">
                                <label>Game Name:</label>
                                <input type="text" placeholder="Text Goes Here" value={roomname} onChange={changeRoomname} />
                                </div>
                                <p>Packs:</p>
                                <div className="game-data-pack">
                                <input type="radio" id="html" name="fav_language" value="Starter Pack" />
                                <label htmlFor="html">Starter Pack</label>
                                <input type="radio" id="css" name="fav_language" value="Expansion X"  />
                                <label htmlFor="css">Expansion X</label>
                                </div>
                                <div className="modal-data-game-btn">
                                <button type="submit" className="submit-btn">enter</button>
                                </div>
                            </form>
                        </div>
                    </Modal>
                </div>
            </div>
            <div className="sidebar-menu-disconnect-area">
                <span><i className="fa fa-power-off"></i></span>
                <a onClick={handleDisconnect}>Disconnect</a>
            </div>
        </div>
    )
}

export default Sidebar
