import { LockIcon, Router, Trash } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function DeleteConfirmation() {
  return (
    <div className="delete-confirmation sm:w-80 lg:mx-auto lg:w-2/4 sm:ml-0 lg:mt-0 sm:mt-20 ">
      <h1 className="font-bold text-4xl">We’re sorry to see you go</h1>
      <p className="text-gray-400 mt-4 text-base leading-relaxed">
        Warning: Deleting your account will permanently remove all of your data 
        and cannot be undone. This includes your profile, conversations, 
        comments, and any other information associated with your account. Are 
        you sure you want to proceed with deleting your account?
      </p>

      <div className="password-input mt-10">
        <label htmlFor="password" className="mb-3 text-gray-400 text-sm block">
          Your password
        </label>
        <div className="flex gap-3 items-center border rounded-lg p-2 w-full bg-white shadow-sm">
          <LockIcon size={20} className="text-gray-500" />
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            required
            className="w-full border-none outline-none text-gray-700"
          />
        </div>
        <p className="mt-2 text-sm text-gray-500">Minimum 12 characters</p>
      </div>

      <div className="delete-btn my-10 lg:my-24 flex items-center gap-6">
        <button className="flex items-center justify-center sm:w-80 lg:w-52 gap-2 bg-red-500 text-white rounded-full py-3 shadow-md hover:bg-red-600">
          Delete my account
          <Trash size={20} className="text-white" />
        </button>
       <Link href='/settings'>
       <button 
        className="rounded-full border-2 border-solid border-purple-400 py-2 px-6 text-purple-400 hover:bg-purple-100">
          Cancel
        </button>
       </Link>
      </div>
    </div>
  );
}
