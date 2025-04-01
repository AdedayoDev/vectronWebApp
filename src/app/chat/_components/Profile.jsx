import Link from "next/link";
import { useAuthStore } from "@store/useStore";
import { FaBell, FaMoon, FaInfoCircle } from "react-icons/fa"; // Importing icons from react-icons
import Image from "next/image";
import NotificationBell from  "@components/navbar/notification";
import { ModeToggle } from "@components/Theme-provider/ModeToggle";

function Profile() {
  const { user } = useAuthStore();

  return (
    <div className="flex items-center space-x-3 text-gray-600"> {/* Ensure icons inherit text color */}
      <NotificationBell />
      {/* <FaMoon size={18} className="hover:cursor-pointer hover:text-blue-500 transition duration-200" /> */}
      {/* <FaInfoCircle size={18} className="hover:cursor-pointer hover:text-blue-500 transition duration-200" /> */}
     <ModeToggle/>
      {/* Profile Picture */}
      <div className="relative w-7 h-7">
        <Link href="/settings">
          <Image
            src={user?.profile_picture || "/assets/images/Avatar.png"}
            alt="User Profile"
            fill
            className="object-cover hover:cursor-pointer rounded-full"
          />
        </Link>
      </div>
    </div>
  );
}

export default Profile;
