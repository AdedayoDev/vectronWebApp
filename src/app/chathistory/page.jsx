import AI from "@components/chatComp/ai-side";
import Aside from "@components/chatComp/side-chat";
import ChathistoryData from "@components/chathistoryComp/chathistoryData";
import "./chathistory.css";
import "@app/chat/chat.css";
import Navbar from "@components/navbar/chatNav";
import Image from "next/image";
import { Search } from "lucide-react";

export default function ChatHistory() {
  return (
    <>
      <Navbar link="/" text="My account" icon="/assets/icons/user.png" />
      <div className="chat-history-container">
        <div className="chat-history-bg">
          <Image
            src="/assets/images/bg-img.png"
            alt="Background image"
            width={200}
            height={200}
            className="chathistory-bg"
          />
          <div className="chat-history-data">
            <div className="search-container">
              <button>
                <Search size={20} color="gray" />
              </button>
              <input type="text" placeholder="Search conversation" />
            </div>
          <div className="conversation-container">
          <div className="conversation">
              <div className="conversation-text">
                <h3>Troubleshooting car wont stop</h3>
                <p>Today</p>
              </div>
              <div className="conversation-icon">
                <Image
                  src="/assets/icons/dots.png"
                  alt="Background image"
                  width={3}
                  height={15}
                  className="conversation-icon"
                />
              </div>
            </div>
            <div className="conversation">
              <div className="conversation-text">
                <h3>What is the recommended tire pressure for my vehicle</h3>
                <p>Today</p>
              </div>
              <div className="conversation-icon">
                <Image
                  src="/assets/icons/dots.png"
                  alt="Background image"
                  width={3}
                  height={15}
                  className="conversation-icon"
                />
              </div>
            </div>
            <div className="conversation">
              <div className="conversation-text">
                <h3>Can you explain what the check engine light means</h3>
                <p>Today</p>
              </div>
              <div className="conversation-icon">
                <Image
                  src="/assets/icons/dots.png"
                  alt="Background image"
                  width={3}
                  height={15}
                  className="conversation-icon"
                />
              </div>
            </div>
            <div className="conversation">
              <div className="conversation-text">
                <h3>Troubleshooting car wont stop</h3>
                <p>Today</p>
              </div>
              <div className="conversation-icon">
                <Image
                  src="/assets/icons/dots.png"
                  alt="Background image"
                  width={3}
                  height={15}
                  className="conversation-icon"
                />
              </div>
            </div>
            <div className="conversation">
              <div className="conversation-text">
                <h3>Troubleshooting car wont stop</h3>
                <p>Today</p>
              </div>
              <div className="conversation-icon">
                <Image
                  src="/assets/icons/dots.png"
                  alt="Background image"
                  width={3}
                  height={15}
                  className="conversation-icon"
                />
              </div>
            </div>
            <div className="conversation">
              <div className="conversation-text">
                <h3>Troubleshooting car wont stop</h3>
                <p>Today</p>
              </div>
              <div className="conversation-icon">
                <Image
                  src="/assets/icons/dots.png"
                  alt="Background image"
                  width={3}
                  height={15}
                  className="conversation-icon"
                />
              </div>
            </div>
          </div>
          </div>
        </div>
        <div className="chat-history-aside">
          <Aside />
        </div>
      </div>
    </>
  );
}
