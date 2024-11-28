import AI from "@components/chatComp/ai-side";
import Aside from "@components/chatComp/side-chat";
import ChathistoryData from "@components/chathistoryComp/chathistoryData";
import './chathistory.css'
import '@app/chat/chat.css'

export default function ChatHistory() {
  return (
    <>
      <div className="chat-history-container">
        <AI />
        <ChathistoryData />
        <Aside />
      </div>
    </>
  );
}
