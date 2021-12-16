import React from "react";
import Logo from "../assets/logo.png";

const Cards = () => {
  return (
      <div className="main-cards">
        <div className="main-card-item">
          <div className="main-card-item-text">
            <span>ButtLicker69s</span>
            <span>Players : 4</span>
            <span>Private? NO</span>
          </div>
          <div className="main-card-bottom">
            <button>Join</button>
            <span>
                <img src={Logo} className="logo" alt="smiley" />
            </span>
          </div>
        </div>
      </div>
  );
};

export default Cards;
