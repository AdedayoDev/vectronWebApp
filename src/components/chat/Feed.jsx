import Image from "next/image";

export default function Feed() {
  return (
    <section>
      <div className="feed">
        <Image
          src="/assets/images/bg-img.png"
          alt="background image"
          width={800}
          height={200}
        />
        <div className="input-feed">
          <div className="feed-left">
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
          </div>
          <div className="feed-right">
          <Image
              src="/assets/icons/plus-circle.png"
              alt="voice"
              width={20}
              height={20}
            />
            <Image
              src="/assets/icons/voice.png"
              alt="voice"
              width={30}
              height={30}
            />
            
          </div>
        </div>
      </div>
    </section>
  );
}
