'use client'
import Feed from "@/components/chatComp/feed";
import SideChat from "@components/chatComp/side-chat";
import PowerofAi from "@components/chatComp/powerofai";
import Navbar from "@components/navbar/chatNav";
import "./chat.css"
import { useState } from "react";
// import '@styles/globals.css';


export default function Chat() {
  
  const [showNewChat, setShowNewChat] = useState(false);

  // Toggle function to manage state
  const toggleContainers = () => {
    setShowNewChat((prev) => !prev);
  };
  return (
    <>
      <div className="navbar-component">
        <Navbar  />
      </div>
      <div className="chat-container">
        {/* <AI /> */}
        <div className="chat-section">
          <PowerofAi showNewChat={showNewChat} toggleContainers={toggleContainers}/>
          <Feed />
        </div>
        <SideChat toggleContainers={toggleContainers}/>
      </div>
    </>
  );
}
