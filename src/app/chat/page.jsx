import Feed from "@/components/chatComp/feed";
// import AI from "@components/chatComp/ai-side";
import SideChat from "@components/chatComp/side-chat";
import PowerofAi from "@components/chatComp/powerofai";
import Navbar from "@components/navbar/navbar";
import "./chat.css";
// import '@styles/globals.css';


export default function Chat() {
  return (
    <>
      <div className="navbar-component">
        <Navbar link="/" text="My account" icon='/assets/icons/user.png' />
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
