import Link from "next/link";
import Image from "next/image";
import Feed from "./Feed";

export default function Chat() {
  return (
    <main>
      <section>
        <div className="chat-left">
          <Link href="/" className='links'>
            <Image
              src="/assets/images/logo2.png"
              alt="Logo 2"
              width={40}
              height={40}
            />
          </Link>
          <Link href="/" className='links'>
            <Image
              src="/assets/images/logo3.png"
              alt="Logo 3"
              width={40}
              height={40}
            />
          </Link>
          <Link href="/" className='links'>
            <Image
              src="/assets/images/logo5.png"
              alt="Logo 5"
              width={40}
              height={40}
            />
          </Link>
          <Link href="/" className='links'>
            <Image
              src="/assets/images/logo.png"
              alt="Logo"
              width={40}
              height={40}
            />
          </Link>
          <Link href="/" className='links'>
            <Image
              src="/assets/images/logo4.png"
              alt="Logo 4"
              width={40}
              height={40}
            />
          </Link>
          <Link href="/" className='links'>
            <Image
              src="/assets/icons/add.png"
              alt="Add icon"
              width={40}
              height={40}
            />
          </Link>
        </div>
      </section>

      <Feed/>

      <section className="chat-right">
        <div className="chat-right-top">
          <Link href="/">
            <button className="btn-dark">+ New Chat</button>
          </Link>
          <Link href="/" className="links">
            <Image src="/assets/icons/message.png" alt="Message icon" width={20} height={20} /> AI Chat Tool Ethics
          </Link>
          <Link href="/" className="links">
            <Image src="/assets/icons/message.png" alt="Message icon" width={20} height={20} /> AI Chat Tool Ethics
          </Link>
          <Link href="/" className="links">
            <Image src="/assets/icons/message.png" alt="Message icon" width={20} height={20} /> AI Chat Tool Ethics
          </Link>
          <Link href="/" className="links">
            <Image src="/assets/icons/message.png" alt="Message icon" width={20} height={20} /> AI Chat Tool Ethics
          </Link>
        </div>

        <div className="chat-right-bottom">
          <Link href="/" className="links">
            <Image src="/assets/icons/delete.png" alt="Delete icon" width={20} height={20} /> Clear conversation
          </Link>
          <Link href="/" className="links">
            <Image src="/assets/icons/light.png" alt="Light mode icon" width={20} height={20} /> Light mode
          </Link>
          <Link href="/" className="links">
            <Image src="/assets/icons/upload.png" alt="Updates icon" width={20} height={20} /> Updates & FAQ
          </Link>
          <Link href="/" className="links">
            <Image src="/assets/icons/logout.png" alt="Logout icon" width={20} height={20} /> Log out
          </Link>
        </div>
        <div className="upgrade"></div>
      </section>
    </main>
  );
}
