import Link from "next/link";
import Image from "next/image";
import Feed from "./Feed";
import PrevChat from "@components/chat/PrevChat";
import Ai from "@components/chat/Ai";

export default function Chat() {
  const chatLinks = [
    {
      href: "/",
      src: "/assets/icons/message.png",
      text: "AI Chat Tool Ethics",
    },
    {
      href: "/",
      src: "/assets/icons/message.png",
      text: "Al Chat Tool Impact Writing",
    },
    { href: "/", src: "/assets/icons/message.png", text: "New chat" },
  ];

  const actionLinks = [
    {
      href: "/",
      src: "/assets/icons/delete.png",
      alt: "Delete icon",
      text: "Clear conversation",
    },
    {
      href: "/",
      src: "/assets/icons/light.png",
      alt: "Light mode icon",
      text: "Light mode",
    },
    {
      href: "/",
      src: "/assets/icons/upload.png",
      alt: "Updates icon",
      text: "Updates & FAQ",
    },
    {
      href: "/",
      src: "/assets/icons/logout.png",
      alt: "Logout icon",
      text: "Log out",
    },
  ];

  return (
    <main>
      <div className="background-image"></div>
      <div className="container">
      <Ai />
      <Feed />
      <section className="chat-right">
      <Image
      className="mode"
        src="/assets/icons/moon-star.png"
        alt="dark mode"
        width={30}
        height={30}
      />
        <Link href="/">
          <button className="btn-dark">+ New Chat</button>
        </Link>
        <PrevChat links={chatLinks} />
        <Link href="/chathistory">
          <b>see all chat</b>
        </Link>

        <div className="chat-right-bottom">
          {actionLinks.map((link, index) => (
            <Link key={index} href={link.href} className="links">
              <Image src={link.src} alt={link.alt} width={20} height={20} />{" "}
              {link.text}
            </Link>
          ))}
        </div>
        <div className="upgrade">
          <div className="close_btn">x</div>
          <div className="upgrade-content">
            <Image
              src="/assets/images/Empty-chat.png"
              alt="upgade-image"
              width={150}
              height={100}
            />
            <button>
              Upgrade to Pro
              <Image
                src="/assets/icons/solid.png"
                alt="upgade-image"
                width={20}
                height={20}
              />
            </button>
          </div>
        </div>
          <p className="follow">Follow us on</p>
      </section>
      </div>
    </main>
  );
}
