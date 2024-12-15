import Feed from "@/components/chatComp/feed";
import SideChat from "@components/chatComp/side-chat";
import PowerofAi from "@components/chatComp/powerofai";
import Navbar from "@components/navbar/chatNav";
import "./chat.css";
// import '@styles/globals.css';


export default function Chat() {
  return (
    <>
      <div className="navbar-component">
        <Navbar  />
      </div>
      <div className="chat-container">
        {/* <AI /> */}
        <div className="chat-section">
          <PowerofAi />
          <Feed />
        </div>
        <SideChat />
      </div>
    </>
  );
}
