"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@components/ui/button";
import { ArrowRight } from "lucide-react";
import Toggle from "./toggle";

export default function SideChat({ showNewChat, toggleContainers }) {
  return (
    <div className="side-chat-container">
      <div className="side-first-content ">
        <Link href="/chat/newchat">
          <Button variant="secondary" className="msg-button">
            <Image
              src="/assets/icons/newmessage.png"
              alt="message icon"
              width={15}
              height={15}
              className="w-full"
            />
            New message
          </Button>
        </Link>
        
        <div className="prev-chat">
          <h4>Recents</h4>
          <div className="prev-cat-one">
            <Image
              src="/assets/icons/recent.png"
              alt="message icon"
              width={15}
              height={15}
            />
            <p>Advantages of AI</p>
          </div>
          <div className="prev-cat-one">
            <Image
              src="/assets/icons/recent.png"
              alt="message icon"
              width={15}
              height={15}
            />
            <p>Reasons for car over heating </p>
          </div>
        </div>
        <Link className="see-more-btn" href="/chat/chathistory">
          View all <ArrowRight className="arrow-right" />
        </Link>
      </div>
      <div className="side-vehicles">
        <h4>Vehicles</h4>
        <div className="prev-cat-one">
          <Image
            src="/assets/icons/tesla.png"
            alt="message icon"
            width={15}
            height={15}
          />
          <p>Tesla</p>
        </div>
        <div className="prev-cat-one">
          <Image
            src="/assets/icons/toyota.png"
            alt="message icon"
            width={15}
            height={15}
          />
          <p>Toyota Camry 2012</p>
        </div>
      </div>

      <div className="side-features">
        <div className="side-features-one">
          <p>Explore</p>
          <Toggle />
        </div>

        <div className="side-features-one">
          <p>Maintenance Recommendations</p>
          <Toggle />
        </div>

        <div className="side-features-one">
          <p>Troubleshooting & Diagnostics</p>
          <Toggle />
        </div>

        <div className="side-features-one">
          <p>Vehicle Profile Management</p>
          <Toggle />
        </div>
      </div>

      <div className="side-second-content">
        <div className="other-option">
          <div className="other-option-one">
            <Image
              src="/assets/icons/upload.png"
              alt="message icon"
              width={15}
              height={15}
            />
            <Link href="#">
              <p>Updates & FAQ</p>
            </Link>
          </div>
          <div className="other-option-one">
            <Image
              src="/assets/icons/settings.png"
              alt="message icon"
              width={15}
              height={15}
            />
            <Link href="/settings">
              <p>Settings</p>
            </Link>
          </div>
        </div>
      </div>

      <div className="side-third-content">
        <button>x</button>
        <Image
          src="/assets/images/Empty-chat.png"
          alt="message icon"
          width={150}
          height={150}
          className="upgrade-image"
        />
       <Link href='/pricing'>
       <div className="upgrade">
          <span>Upgrade to Pro</span>
          <Image
            src="/assets/icons/solid.png"
            alt="message icon"
            width={15}
            height={15}
          />
        </div>
       </Link>
      </div>
    </div>
  );
}
