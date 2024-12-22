import Image from "next/image";
import React from "react";

export default function deleteComfirmation() {
  return (
    <>
      <div className="delete-confirmation w-2/4 mx-auto">
        <h1 className="font-bold text-4xl">We’re sorry to see you go</h1>
        <p className="text-gray-400 mt-4 text-base">
          Warning: Deleting your account will permanently remove all of your
          data and cannot be undone. This includes your profile, conversations,
          comments, and any other information associated with your account. Are
          you sure you want to proceed with deleting your account?
        </p>

        <div className="password-input mt-10">
          <label htmlFor="password mb-3 text-gray-400 text-sm">
            Your password
          </label>
          <div className="flex gap-1 items-center bg-white">
            <Image
              src="/assets/icons/delete.png"
              width={20}
              height={20}
              alt="icon"
            />
            <input type="password" className="border outline-none"  />
          </div>
        </div>

        <div className="delete-btn my-32 flex items-center gap-3">
          <button className="flex items-center gap-2 bg-red-500 text-white rounded-full p-3">
            Delete 
            <Image
              src="/assets/icons/delete.png"
              width={20}
              height={20}
              alt="icon"
            />
            </button>
            <button className="rounded-full border-4 border-solid border-purple-400 py-2 px-3">
Cancel
            </button>
        </div>
      </div>
    </>
  );
}
