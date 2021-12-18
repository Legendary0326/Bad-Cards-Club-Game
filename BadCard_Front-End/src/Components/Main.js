import React from "react";
import "./Main.css";
import Cards from "./Cards";
import Chatbox from "./Chatbox";

const Main = () => {
  return (
    <React.Fragment>
      <div className="main-data">
        
        <div className="row">
          <div className="main-heading ml-2">
            <span>Games:</span>
          </div>
          <div className="col-3">
            <Cards />
          </div>
          <div className="col-3">
            <Cards />
          </div>
          <div className="col-3">
            <Cards />
          </div>
          <div className="col-3">
            <Cards />
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <Cards />
          </div>
          <div className="col-3">
            <Cards />
          </div>
          <div className="col-3">
            <Cards />
          </div>

        </div>
      </div>
    </React.Fragment>
  );
};

export default Main;
