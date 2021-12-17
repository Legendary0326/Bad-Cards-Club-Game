import React, {useState} from 'react';
import "./Sidebar.css";
import Modal from "react-modal";
import Logo from "../assets/logo.png";
import {Link} from "react-router-dom";

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

const Sidebar = () => {

    let subtitle;
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalDataOpen, setModelDataOpen] = useState(false);
  
    function openModal() {
      setIsOpen(true);
    }
  
    function afterOpenModal() {
      // references are now sync'd and can be accessed.
      subtitle.style.color = '#f00';
    }
  
    function closeModal() {
      setIsOpen(false);
    }

    function newGame() {
        setModelDataOpen(true);
    }

    function afterOpenDataModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
      }

    function closeDataModal() {
        setModelDataOpen(false);
      }

    return (
        <div className="sidebar-menu">
            <div className="sidebar-logo-area">
                <div className="sidebar-logo">
                    <img src={Logo} alt="logo" />
                </div>
                <div className="sidebar-logo-btn">
                    <button>Connect Wallet</button>
                </div>
            </div>
            <div className="sidebar-menu-items">
                <div className="sidebar-menu-item">
                    <Link to="/home" style={{display : "flex", gap : "10px"}}>
                        <span><i class="fa fa-home"></i></span>
                        <a href="">Home</a>
                    </Link>
                </div>
                <div className="sidebar-menu-item">
                    <Link to="/playgame" style={{display : "flex", gap : "10px"}}>
                        <span><i class="fa fa-user"></i></span>
                        <a href="#">Games</a>
                    </Link>
                </div>
                <div className="sidebar-menu-item">
                        <span><i class="fa fa-envelope"></i></span>
                        <a href="#">Discord</a>
                </div>
                <div className="sidebar-menu-item">
                        <span><i class="fa fa-gear"></i></span>
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
            <form>
                <div>
                <label>Username</label>
                <input type="text" />
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
                    <button onClick={newGame} className="sidebar-menu-item-btn"><span><i class="fa fa-plus"></i></span>&nbsp; &nbsp;Create New Game</button>
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
            <form>
                <div className="game-name-data">
                <label>Game Name:</label>
                <input type="text" placeholder="Text Goes Here" />
                </div>
                <p>Packs:</p>
                <div className="game-data-pack">
                <input type="radio" id="html" name="fav_language" value="Starter Pack" />
                <label for="html">Starter Pack</label>
                <input type="radio" id="css" name="fav_language" value="Expansion X" />
                <label for="css">Expansion X</label>
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
                <span><i class="fa fa-power-off"></i></span>
                <a href="/">Disconnect</a>
            </div>
        </div>
    )
}

export default Sidebar
