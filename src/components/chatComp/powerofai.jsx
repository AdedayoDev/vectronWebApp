import Image from "next/image";

export default function PowerofAi() {
  return (
    <>
      <Image
        src="/assets/images/bg-img.png"
        alt="Background image"
        width={200}
        height={200}
        className="powerai-bg"
      />
      <div className="powerai-container">
        <div className="powerofAi-content">
          <div className="powerai-header">
            <h1>Unlock the power of AI</h1>
            <p>
              Meet docvantage, our AI chat app revolutionizing conversations
            </p>
          </div>
         <div className="powerai-cards">
          <div className="card-chat-option">
            
          </div>
         <div className="powerai-card-head">
            <span>Super</span>
            <span>High</span>
            <span>Medium</span>
            <span>Low</span>
          </div>
         </div>
        </div>
      </div>
    </>
  );
}
