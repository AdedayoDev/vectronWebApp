import Image from "next/image";
import Profile from "../_components/Profile";
import SideBar from "../_components/SideBar";
import Search from "../_components/Search";

export default function Chat() {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-end p-2">
          <Profile />
        </div>
        <div className="flex flex-col lg:flex-row">
          <div className="flex flex-1 justify-center items-start w-full">
            <div className="relative border ">
              <div className="relative w-full h-40">
                <Image
                  src="/assets/images/bg-img.png"
                  alt="Background image"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col w-full lg:w-full p-3 sm:px-7">
                <div className="z-10 flex flex-col text-center w-full xl:w-[1023px] -mt-24 bg-white rounded-2xl shadow-xl">
                  <Search />
                </div>
              </div>
            </div>
          </div>
          <div className="flex place-self-center w-72 lg:place-self-start">
            <SideBar />
          </div>
        </div>
      </div>
    </>
  );
}
