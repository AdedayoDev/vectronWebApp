import Image from "next/image";

function ChatBody() {
  return (
    <div className="flex flex-col items-center justify-center text-2xl md:text-6xl text-blue-800 p-3">
      <div className="flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:space-x-3 items-center justify-between">
        <ChatTitle />
        <div className="flex flex-col xl:flex-row space-y-3 xl:space-y-0 xl:space-x-3">
          <ChatFeeds />
          <ChatFeeds />
        </div>
      </div>
    </div>
  );
}

function ChatTitle() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center space-y-3 lg:space-y-0 lg:space-x-3">
      <div className="flex flex-col w-32 h-32 space-y-2 bg-blue-400 p-3 rounded-lg text-white">
        <div className="relative w-5 h-5">
          <Image
            src="/assets/icons/explore.png"
            alt="explore"
            fill
            className="object-cover"
          />
        </div>
        <p className="text-sm font-semibold">Explore</p>
        <p className="text-xs">Learn how to use Vechtron.ai for needs</p>
      </div>
      <div className="relative w-6 h-8">
        <Image
          src="/assets/icons/frame-bars.png"
          alt="frame-bars"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}
function ChatFeeds() {
  return (
    <div className="flex flex-col bg-[#EBF3FF] p-3  space-y-2 lg:space-y-3 text-black rounded-xl">
      <div className="relative w-7 h-7">
        <Image
          src="/assets/icons/spotify.png"
          alt="spotify"
          fill
          className="object-cover"
        />
      </div>
      <p className="text-xs lg:text-sm font-semibold">Entertainment</p>
      <div className="flex items-center justify-between space-x-1 lg:space-x-3 hover:cursor-pointer my-2">
        <p className="text-[8px] lg:text-xs my-1">
          What Music do you want to listen to?
        </p>
        <div className="relative w-3 h-2">
          <Image
            src="/assets/icons/arrow.png"
            alt="arrow"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
export default ChatBody;
