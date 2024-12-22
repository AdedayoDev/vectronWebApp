import Image from "next/image";
import React from "react";
import SideMenu from "../notification/_component/side-menu";
import DeleteConfirmation from '../deleteaccount/_components/deleteComfirmation'
export default function page() {
  return (
    <>
      <div className="delete-account">
        <div>
          <Image
            src="/assets/images/bg-img3.png"
            alt="background image"
            width={200}
            height={200}
            className="w-full h-64 object-cover"
          />
        </div>
        <div className="notification-content px-4 py-2 w-90 lg:w-96 sm:left-6 relative rounded-t-lg shadow-custom bg-white left-8 -mt-11">
         <div className='mt-14 flex'>
         <SideMenu />
         <DeleteConfirmation/>
         </div>
        </div>
      </div>
    </>
  );
}
