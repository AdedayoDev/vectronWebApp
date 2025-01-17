import { Image  } from "next/image";


function ChatHead() {
  return (
    <div className="flex justify-center  p-2 md:p-3 rounded-2xl">
      {/* @next/next/no-img-element */}
      <img
        src="/assets/icons/Media.jpeg (1).png"
        alt="sidebar"
        width={50}
        height={50}
        className="object-cover"
      />
    </div>
  );
}

export default ChatHead;