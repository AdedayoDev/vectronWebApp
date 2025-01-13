"use client";
import { CldImage } from "next-cloudinary";
import SettingsSideBar from "../../components/SettingsSideBar";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function Delete_Account() {

  const [deleted, setDeleted] = useState([]);
  const router = useRouter();

  function handleDeleted() {
    setTimeout(() => {
      setDeleted("");
    }, 1000);
    router.push("/settings");
  }

  return (
    <>
      <section>
        {process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME && (
          <CldImage
            src="bg-img3_sjyfvr"
            alt="background image"
            width={200}
            height={200}
            className="w-[95%] h-[50px] object-cover mt-11 mx-auto"
          />
        )}
        <div className="block md:block lg:flex gap-[100px] w-[90%] relative -top-5 px-4 pt-11 shadow mx-auto">
          <SettingsSideBar />
          <div className="w-full lg:mt-[65px] h-[560px] lg:h-[630px]">
            {/* Account deleted */}
           <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
           {deleted && (
              <div className="absolute w-[90%] lg:w-[40%] left-[30px] lg:left-[35%] z-40 shadow-2xl items-center lg:top-[30%] top-[35%] mx-auto py-14 px-10 bg-white-500 bg-white rounded-md">
                <div className="mb-4 text-center">
                  <h1 className="text-red-700 text-xl lg:text-2xl font-semibold  mb-4">
                    Account Deletion Initiated
                  </h1>
                  <p>
                    We are processing your request. Your account will be deleted
                    within 30 days . If you change your mind you can restore it
                    during this period by logging in.
                  </p>
                </div>

                <div className="absolute cursor-pointer right-4 top-5 p-1 rounded border border-red-600" onClick={handleDeleted}>
                  <FaTimes color="red" />
                </div>
                {deleted}
              </div>
            )}
           </div>
          </div>
        </div>
      </section>
    </>
  );
}
