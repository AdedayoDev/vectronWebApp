import Feed from "@/components/chatComp/feed";
import AI from "@components/chatComp/ai-side";
import SideChat from "@components/chatComp/side-chat";
import PowerofAi from "@components/chatComp/powerofai";
import "./chat.css";
// import '@styles/globals.css';


export default function Chat() {
  return (
    <>
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
