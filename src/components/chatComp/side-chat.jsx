'use client'
import Link from "next/link";
import Image from "next/image";
import { Button } from "@components/ui/button";

export default function SideChat() {
  return (
    <div className="side-chat-container">
      <div className="side-first-content">
        <Button variant='ghost' size='icon'>
          + New chat
        </Button>
        {/* <button className="new-chat-btn">+ New chat</button> */}
        <div className="prev-chat">
          <div className="prev-cat-one">
            <Image
              src="/assets/icons/message.png"
              alt="message icon"
              width={20}
              height={20}
            />
            <p>AI Chat Tool Ethics</p>
          </div>
          <div className="prev-cat-one">
            <Image
              src="/assets/icons/message.png"
              alt="message icon"
              width={20}
              height={20}
            />
            <p>AI Chat Tool Ethics</p>
          </div>
          <div className="prev-cat-one">
            <Image
              src="/assets/icons/message.png"
              alt="message icon"
              width={20}
              height={20}
            />
            <p>AI Chat Tool Ethics</p>
          </div>
        </div>
        <Link className="see-more-btn" href="/chathistory">
          See all more
        </Link>
      </div>
      <div className="side-second-content">
        <div className="other-option">
          <div className="other-option-one">
            <Image
              src="/assets/icons/delete.png"
              alt="message icon"
              width={20}
              height={20}
            />
            <p>Clear conversation</p>
          </div>
          <div className="other-option-one">
            <Image
              src="/assets/icons/light.png"
              alt="message icon"
              width={20}
              height={20}
            />
            <p>Light mode</p>
          </div>
          <div className="other-option-one">
            <Image
              src="/assets/icons/logout.png"
              alt="message icon"
              width={20}
              height={20}
            />
            <p>Updates & FAQ</p>
          </div>
          <div className="other-option-one">
            <Image
              src="/assets/icons/logout.png"
              alt="message icon"
              width={20}
              height={20}
            />
            <p>Log out</p>
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
        />
        <div className="upgrade">
          <span>Upgrade to Pro</span>
          <Image
            src="/assets/icons/solid.png"
            alt="message icon"
            width={20}
            height={20}
          />
        </div>
      </div>
      <p className="follow-us">Follow us on</p>
    </div>
  );
}
