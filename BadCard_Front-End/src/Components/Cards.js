import React, { useEffect, useState } from "react";
import Logo from "../assets/Group.png";
import { useEthers } from "@usedapp/core";
import { useNavigate } from "react-router-dom";

const Cards = ({room, socket}) => {

  const { account } = useEthers();
  const navigate = useNavigate();
  
  function handleJoin() {
    socket.emit("join", { wallet: account, roomID: room.id });
    navigate('/playgame/' + room.id);
  }

  return (
      <div className="main-cards">
        <div className="main-card-item">
          <div className="main-card-item-text">
            <span>{room.name}</span>
            <span>Players : {room.users.length}</span>
            <span>Private? NO</span>
          </div>
          <div className="main-card-bottom">
            {!room.users.find(e => e.wallet == account)
              ? (<button onClick={ handleJoin }>Join</button>)
              : ""
            }
            <span>
                <img src={Logo} className="logo" alt="smiley" />
            </span>
          </div>
        </div>
      </div>
  );
};

export default Cards;
