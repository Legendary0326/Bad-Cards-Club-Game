import React, {useState, useEffect} from 'react';
import "./Sidebar.css";
import Modal from "react-modal";
import Logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useEthers } from "@usedapp/core";
import discord_img from '../assets/discord.png';
import { Button, Form, InputGroup, FormControl } from 'react-bootstrap';

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

const Sidebar = ({socket, user}) => {

    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalDataOpen, setModelDataOpen] = useState(false);
    const { account, deactivate } = useEthers();
    const [username, setUsername] = useState("");
    const [pack, setPack] = useState(1);
    const [password, setPassword] = useState("");
    const [roomname, setRoomName] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    // useEffect( () => {
    //     if(account) {
    //         socket.emit("userInfo", {wallet: account})
    //         socket.on("userInfo", data => {
    //             if(data) {
    //                 setUser(data)
    //                 setUsername(data.username);
    //             }
    //         })
    //     }
    // }, [socket, account])

    useEffect(() => {
        if(user) {
            setUsername(user.username);
        }
    }, [user])

    useEffect( () => {
    }, [username, roomname])

    function openModal() {
      setIsOpen(true);
    }
  
    function closeModal() {
      setIsOpen(false);
    }

    function newGame() {
        setModelDataOpen(true);
    }

    function closeDataModal() {
        setModelDataOpen(false);
    }

    function handleDisconnect() {
        deactivate();
        socket.emit("logout");
        window.location = "/";
    }

    const changeUsername = (e) => {
        setUsername(e.target.value);
    }

    const changeRoomname = (e) => {
        setRoomName(e.target.value)
    }

    const changePack = (e) => {
        const value = e.target.value
        setPack(value)
    }

    const changePassword = (e) => {
        setPassword(e.target.value)
    }

    const changePasswordShow = () => {
        setShowPassword(!showPassword);
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
            roomname : roomname,
            password: password,
            pack: pack
        })
        closeDataModal()
        socket.on('userInfo', data => {
            if(data && data.wallet == account && data.room != "") {
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
                    <Link to={"/playgame/" + (user ? (user.room ? user.room : "0") : "0")} style={{display : "flex", gap : "10px"}}>
                        <span><i className="fa fa-user"></i></span>
                        <span>Games</span>
                    </Link>
                </div>
                <div className="sidebar-menu-item">
                    <a href="https://discord.com" target="_blank" style={{display : "flex", gap : "10px"}}>
                        <span><img src={discord_img}></img></span>
                        <span>Discord</span>
                    </a>
                </div>
                <div className="sidebar-menu-item">
                    <a href="#" onClick={openModal} style={{display : "flex", gap : "10px"}}>
                        <span><i className="fa fa-gear"></i></span>
                        <span>Setting</span>
                    </a>
                <Modal
                    isOpen={modalIsOpen}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
                    onRequestClose={closeModal}
                    style={customStyles}
                    ariaHideApp={false}
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
                      onRequestClose={closeDataModal}
                      style={customStyles}
                      ariaHideApp={false}
                      contentLabel="Example Modal"
                    >
                        <button className="modal-close" onClick={closeDataModal}>X</button>
                        <div className="modal-game-data">
                            <div className="modal-text">
                                <span>Create New Game:</span>
                            </div>
                            <Form onSubmit={handleCreateRoom}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Game Name</Form.Label>
                                    <Form.Control type="text" placeholder="Text Goes Here" value={roomname} onChange={changeRoomname} required={true} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <InputGroup className="mb-3">
                                        <FormControl
                                        placeholder="Password"
                                        aria-label="Password"
                                        aria-describedby="basic-addon2"
                                        type={ pack == 1 ? "password" : (showPassword ? 'text' : 'password')}
                                        disabled={pack == 1 ? true: false} required={pack == 2 ? true : false} value={password} onChange={changePassword}
                                        />
                                        <InputGroup.Text id="basic-addon2" onClick={pack == 1 ? null :changePasswordShow} style={{cursor: "pointer"}}>
                                            {
                                                pack == 1 
                                                ? <i className="fa fa-eye"></i>
                                                : (
                                                    showPassword 
                                                    ? <i className="fa fa-eye-slash"></i> 
                                                    : <i className="fa fa-eye"></i>
                                                )
                                            }
                                        </InputGroup.Text>
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Packs</Form.Label>
                                    <div style={{display: 'flex'}}>
                                        <Form.Check type="radio" label="Starter Pack" name="pack" checked={pack == 1 ? true : false} value={1} onChange={changePack} style={{display: 'inline-block'}} />
                                        <Form.Check type="radio" label="Expansion X" name="pack" checked={pack == 2 ? true : false} value={2} onChange={changePack} style={{display: 'inline-block', marginLeft: 'auto'}} />
                                    </div>
                                </Form.Group>
                                <Form.Group className="mb-3" style={{ textAlign: 'center' }}>
                                    <Button variant="dark" type="submit">
                                        enter
                                    </Button>
                                </Form.Group>
                            </Form>
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
