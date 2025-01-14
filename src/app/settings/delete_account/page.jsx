"use client";
import { CldImage } from "next-cloudinary";
import SettingsSideBar from "../../settings/components/SettingsSideBar";
import { Lock, Trash } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Delete_Account() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [alert, setAlert] = useState("");
  const [secondAlert, setSecondAlert] = useState("");
  const [submit, setSubmit] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);

  function handleAlert() {
    setSecondAlert([]);
    setAlert("");
  }

  //Delete
  function handleDelete() {
    setSecondAlert("");
    setTimeout(() => {
      setSubmit("");
    }, 3000);
    router.push("/settings/delete_account/account_deletion_initiated");
  }

  const option = [
    "Remove your personal data",
    "Cancel any active subscription",
    "Delete your profile and saved preferences",
    "Erase your account history",
  ];

  const handleCheckboxChange = (option) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };
  const validateSelection = () => {
    if (selectedOptions.length === 0) {
      setError("Please select at least one option before submitting.");
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }
    handleDelete(selectedOptions);
  };

  //Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (password.length >= 12) {
      setAlert([]);
    } else {
      setError("Password must be at least 12 characters long.");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

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
        <div className="block md:block lg:flex gap-[100px] w-[90%] relative -top-5 px-4 pt-11 bg-white rounded-sm shadow mx-auto">
          <SettingsSideBar />
          <div className="w-full lg:mt-[65px] h-[560px] lg:h-[630px]">
            <h1 className="font-bold text-2xl mb-20">
              We're sorry to see you go
            </h1>
            <div className="lg:w-[80%]">
              <p className="mb-11">
                Warning: Deleting your account will permanently remove all of
                your data and cannot be undone. This includes your profile,
                conversations, comments, and any other information associated
                with your account. Are you sure you want to proceed with
                deleting your account?
              </p>
              <div>
                <label className="text-gray-500">Your password</label>
                <form className="mt-2" onSubmit={handleSubmit}>
                  <div className="w-full border bg-white flex items-center gap-2 p-3 rounded-lg">
                    <Lock size={20} />
                    <input
                      type="password"
                      value={password}
                      className="w-full outline-none"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <p className="mt-2 text-gray-600 text-sm">
                    Minimum of 12 characters
                  </p>
                  {error && (
                    <p className="text-red-500 text-sm mt-2">{error}</p>
                  )}
                  <button
                    type="submit"
                    className="bg-red-600 flex items-center gap-3 text-white rounded-full mt-7 justify-center w-[250px] p-3"
                  >
                    Delete my account
                    <Trash color="white" />
                  </button>
                </form>
              </div>

              {/* Delete account confirmation alert */}

              {alert && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
                  <div className="absolute w-[80%] lg:w-[45%] left-[60px] lg:left-[30%] z-40 shadow-lg items-center top-[25%]  mx-auto py-6 px-10 bg-white-500 bg-white rounded-md">
                    <div className="mb-4">
                      <h1 className="font-bold text-lg mb-4">
                        Delete Account Confirmation
                      </h1>
                      <p className="text-gray-500 text-base mb-4">
                        Are you sure you want to delete your account?
                      </p>
                      <p className="mb-1 text-gray-500">
                        We are sorry to see you go. Deleting your account is
                        permanent and will:
                      </p>
                      <ul className="text-gray-500 list-disc">
                        <li className="mb-1 ml-7">Remove your personal data</li>
                        <li className="mb-1 ml-7">
                          Cancel any active subscription
                        </li>
                        <li className="mb-1 ml-7">
                          Delete your profile and saved preferences
                        </li>
                        <li className="mb-1 ml-7">
                          Erase your account history
                        </li>
                      </ul>
                      <div className="flex items-center gap-2 mt-3 mb-5">
                        <Image
                          src="/assets/icons/danger.svg"
                          width={20}
                          height={20}
                          alt="danger"
                        />
                        <p className="text-sm font-bold">
                          This action cannot be undone. All data will be
                          permanently deleted within 30 days.
                        </p>
                      </div>
                    </div>

                    <div className="mb-3 flex items-center gap-5">
                      <button
                        onClick={handleAlert}
                        className="bg-red-600 text-white rounded-full p-3 w-[200px]"
                      >
                        I understand
                      </button>
                      <button
                        className="bg-white rounded-full p-2 w-[150px] border-4 border-solid border-purple-400"
                        onClick={() => {
                          setAlert("");
                        }}
                      >
                        Cancel
                      </button>
                    </div>

                    {alert}
                  </div>
                </div>
              )}

              {/* Alert2 */}

              {secondAlert && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
                  <div className="absolute w-[80%] lg:w-[30%] left-[60px] lg:left-[37%] z-40 shadow-lg items-center top-[30%] mx-auto py-6 px-10 bg-white-500 bg-white rounded-md">
                    <div className="mb-4">
                      <p className="text-gray-500 text-base mb-4">
                        Are you sure you want to delete your account?
                      </p>

                      <ul className="text-gray-500 list-disc">
                        {option.map((option) => (
                          <li
                            key={option}
                            className="mb-1 ml-7 flex justify-between"
                          >
                            {option}
                            <input
                              type="checkbox"
                              checked={selectedOptions.includes(option)}
                              onChange={() => handleCheckboxChange(option)}
                            />
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-3">
                      <button
                        className="bg-blue-600 text-white rounded-full p-3"
                        onClick={validateSelection}
                      >
                        Submit
                      </button>
                      {error && (
                        <p className="text-red-500 text-sm mt-2">{error}</p>
                      )}
                    </div>

                    {secondAlert}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
