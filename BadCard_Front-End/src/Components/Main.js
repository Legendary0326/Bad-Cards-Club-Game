import React, { useState, useEffect } from "react";
import "./Main.css";
import Cards from "./Cards";
import Chatbox from "./Chatbox";

const Main = ({ socket }) => {

  const [openRooms, setOpenRooms] = useState([])

  useEffect(() => {
    socket.on("rooms", (data) => {
      console.log(data)
      let i = 0 
      const rooms = data.map((element) => {
        i ++;
        return <Cards key={i} />
      })

      setOpenRooms(rooms)
    }, [socket, openRooms.length])
  })

  return (
    <React.Fragment>
      <div className="main-data">
        <div className="main-heading">
          <span>Games:</span>
        </div>
        <div className="cards">
          {openRooms}
          {/* <Cards />
          <Cards />
          <Cards />
          <Cards />
          <Cards />
          <Cards />
          <Cards />
          <Cards /> */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Main;
