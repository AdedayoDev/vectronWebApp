import AI from "@components/chatComp/ai-side";
import Aside from "@components/chatComp/side-chat";
import ChathistoryData from "@components/chathistoryComp/chathistoryData";
import "./chathistory.css";
import "@app/chat/chat.css";
import PowerofAi from "../../components/chatComp/powerofai";
import Navbar from '@components/navbar/Navbar'

export default function ChatHistory() {
  return (
    <>
    <Navbar link="/" text="My account" icon='/assets/icons/user.png' />
      <div className="chat-history-container">
        {/* <AI /> */}
        <ChathistoryData />
        <div className="chat-history-aside">
          <PowerofAi />
          <Aside />
        </div>
      </div>
    </>
  );
}
