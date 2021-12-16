import React from "react";
import "./Main.css";
import Cards from "./Cards";
import Chatbox from "./Chatbox";

const Main = () => {
  return (
    <React.Fragment>
      <div className="main-data">
        <div className="main-heading">
          <span>Games:</span>
        </div>
        <div className="cards">
          <Cards />
          <Cards />
          <Cards />
          <Cards />
          <Cards />
          <Cards />
          <Cards />
          <Cards />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Main;
