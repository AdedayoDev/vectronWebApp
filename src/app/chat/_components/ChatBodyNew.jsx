import Image from "next/image";
import Link from "next/link";

function ChatBody() {
  return (
    <div className="flex justify-center items-center w-full">
      <div className="max-w-4xl mx-auto p-6 ">
        <div className="flex items-center justify-center gap-4 ">
          {/* Explore Section */}
          <div className="flex items-start space-x-8">
            {/* <ChatTitle 
              title="Explore" 
              description="Learn how to use Vechtron.ai for needs" 
            /> */}

            <EntertainmentFeed />
          </div>

          {/* Tutorial Section */}
          <div className="flex items-start space-x-8">
            {/* <ChatTitle 
              title="Tutorial" 
              description="Get a clear knowledge base about vechtron.ai" 
            /> */}

            <NavigationFeed />
          </div>

          {/* Support Section */}
          <div className="flex items-start space-x-8">
            {/* <ChatTitle 
              title="Support" 
              description="Access Vechtron's help and support options" 
            /> */}

            <HealthFeed />
          </div>
        </div>
      </div>
    </div>
  );
}
function ExploreBody() {
  return (
    <div className="flex flex-col items-center justify-center text-2xl md:text-6xl text-blue-800 p-3">
      <div className="flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:space-x-3 items-center justify-between">
        {/* <ChatTitle /> */}
        <div className="flex flex-col xl:flex-row space-y-3 xl:space-y-0 xl:space-x-3">
          <EntertainmentFeed />
        </div>
      </div>
    </div>
  );
}

function HealthBody() {
  return (
    <div className="flex flex-col items-center justify-center text-2xl md:text-6xl text-blue-800 p-3">
      <div className="flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:space-x-3 items-center justify-between">
        {/* <ChatTitle /> */}
        <div className="flex flex-col xl:flex-row space-y-3 xl:space-y-0 xl:space-x-3">
          <HealthFeed />
        </div>
      </div>
    </div>
  );
}
function RouteBody() {
  return (
    <div className="flex flex-col items-center justify-center text-2xl md:text-6xl text-blue-800 p-3">
      <div className="flex flex-col lg:flex-row space-y-3 lg:space-y-0 lg:space-x-3 items-center justify-between">
        {/* <ChatTitle /> */}
        <div className="flex flex-col xl:flex-row space-y-3 xl:space-y-0 xl:space-x-3">
          <NavigationFeed />
        </div>
      </div>
    </div>
  );
}
function ChatTitle() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center space-y-3 lg:space-y-0 lg:space-x-3">
      <div className="flex flex-col w-auto h-auto space-y-2 bg-blue-400 p-3 rounded-lg text-white">
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
      {/* <div className="relative w-6 h-8">
        <Image
          src="/assets/icons/frame-bars.png"
          alt="frame-bars"
          fill
          className="object-cover"
        />
      </div> */}
    </div>
  );
}

function EntertainmentFeed() {
  return (
    <div className="flex flex-col bg-[#EBF3FF] p-3  space-y-2 lg:space-y-3 text-black rounded-xl ">
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

function NavigationFeed() {
  return (
    <Link href="/route" className="w-full">
      <div className="flex flex-col bg-[#FFFFFF] p-3  space-y-2 lg:space-y-3 text-black rounded-xl border">
        <div className="relative w-auto h-auto">
          <svg
            width="21"
            height="30"
            viewBox="0 0 21 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_3269_30125)">
              <path
                d="M5.76953 22.2237C6.63712 23.3294 7.42679 24.4941 8.13283 25.7094C8.73561 26.8523 8.98689 27.6273 9.42741 29.0045C9.69757 29.7653 9.94174 29.9924 10.4667 29.9924C11.0387 29.9924 11.2983 29.6061 11.4988 29.0086C11.9152 27.7081 12.2419 26.7156 12.7574 25.7777C13.7689 23.9671 15.0258 22.3581 16.2608 20.8118C16.5951 20.3741 18.7568 17.8244 19.7299 15.8126C19.7299 15.8126 20.926 13.6027 20.926 10.5163C20.926 7.62927 19.7464 5.62695 19.7464 5.62695L16.3504 6.53644L14.288 11.9684L13.7777 12.7174L13.6757 12.8531L13.54 13.023L13.3018 13.2943L12.9614 13.6346L11.1249 15.1308L6.53335 17.7819L5.76953 22.2237Z"
                fill="#34A853"
              />
              <path
                d="M1.03125 15.4415C2.15188 18.0012 4.31286 20.2513 5.77493 22.2259L13.5407 13.0269C13.5407 13.0269 12.4466 14.4578 10.462 14.4578C8.25144 14.4578 6.46558 12.6925 6.46558 10.4666C6.46558 8.94021 7.38389 7.8916 7.38389 7.8916L2.11231 9.30414L1.03125 15.4415Z"
                fill="#FBBC04"
              />
              <path
                d="M13.6273 0.472656C16.2065 1.30424 18.414 3.05004 19.7493 5.6244L13.5429 13.0204C13.5429 13.0204 14.4612 11.9528 14.4612 10.4359C14.4612 8.15821 12.5433 6.45663 10.4713 6.45663C8.512 6.45663 7.38672 7.88511 7.38672 7.88511V3.22571L13.6273 0.472656Z"
                fill="#4285F4"
              />
              <path
                d="M2.45312 3.74101C3.99359 1.89793 6.70422 0 10.4412 0C12.2543 0 13.6202 0.475995 13.6202 0.475995L7.38024 7.88959H2.95912L2.45312 3.74101Z"
                fill="#1A73E8"
              />
              <path
                d="M1.03095 15.44C1.03095 15.44 0 13.4211 0 10.4963C0 7.73195 1.0746 5.3156 2.45354 3.74023L7.38417 7.88947L1.03095 15.44Z"
                fill="#EA4335"
              />
            </g>
            <defs>
              <clipPath id="clip0_3269_30125">
                <rect width="20.9264" height="30" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <p className="text-xs lg:text-sm font-semibold">Navigation</p>
        <div className="flex items-center justify-between space-x-1 lg:space-x-3 hover:cursor-pointer my-2">
          <p className="text-[8px] lg:text-xs my-1">
            Get your directions faster
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
    </Link>
  );
}

function HealthFeed() {
  return (
    <Link href="/vehicle_management/portal" className="w-full">
      <div className="flex flex-col bg-[#fc8077] p-3  space-y-2 lg:space-y-3 text-black rounded-xl">
        <div className="relative w-7 h-7">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 8.99959V14.9996M8.99998 11.9996H15M19.463 3.99359C16.781 2.34859 14.44 3.01059 13.034 4.06659C12.458 4.49959 12.17 4.71659 12 4.71659C11.83 4.71659 11.542 4.49959 10.966 4.06659C9.55998 3.01059 7.21898 2.34959 4.53698 3.99359C1.01798 6.15159 0.221981 13.2736 8.33998 19.2826C9.88598 20.4266 10.659 20.9986 12 20.9986C13.341 20.9986 14.114 20.4266 15.66 19.2826C23.778 13.2736 22.982 6.15359 19.463 3.99359Z"
              stroke="#FBFDFF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <p className="text-white text-xs lg:text-sm font-semibold">
          Health and Maintenance
        </p>
        <div className="flex items-center justify-between space-x-1 lg:space-x-3 hover:cursor-pointer my-2">
          <p className="text-white text-[8px] lg:text-xs my-1">
            Maintenance tips and reminders
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
    </Link>
  );
}

export default ChatBody;
