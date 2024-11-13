import Image from "next/image";

export default function Feed() {
  return (
    <section>
      <div className="feed">
        <Image
          className="w-full"
          src="/assets/images/bg-img.png"
          alt="background image"
          width={500}
          height={500}
        />
        <div className="input-feed">
          <Image
            src="/assets/images/bot-small.png"
            alt="chat icon"
            width={30}
            height={30}
          />
          <div className="input">
            <input type="text" placeholder="Ask me anything" />
            <button>send</button>
          </div>
          <Image src='/assets/icons/voice.png' alt="voice" width={30} height={30} />
        </div>
      </div>
    </section>
  );
}
