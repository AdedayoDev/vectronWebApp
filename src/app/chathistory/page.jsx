import AI from "@components/chatComp/ai-side";
import Aside from "@components/chatComp/side-chat";
import ChathistoryData from "@components/chathistoryComp/chathistoryData";
import "./chathistory.css";
import "@app/chat/chat.css";
import PowerofAi from "../../components/chatComp/powerofai";

export default function ChatHistory() {
  return (
    <>
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
