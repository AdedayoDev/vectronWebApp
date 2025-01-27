import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from '@store/useStore';

function Profile() {
  const { user } = useAuthStore();
  return (
    <div className="flex items-center space-x-3">
      <Image
        src="/assets/icons/bell.png"
        alt="bell"
        width={18}
        height={18}
        className="hover:cursor-pointer"
      />
      <Image
        src="/assets/icons/moon.png"
        alt="moon"
        width={18}
        height={18}
        className="hover:cursor-pointer"
      />
      <Image
        src="/assets/icons/info.svg"
        alt="icon"
        width={18}
        height={18}
        className="hover:cursor-pointer"
      />
      <div className="relative w-7 h-7">
      <Link href="/settings">
        <Image
          src={user?.profile_picture || "/assets/images/Avatar.png"}
          alt="attachment image"
          fill
          className="object-cover hover:cursor-pointer rounded-full"
        />
        </Link>
      </div>
    </div>
  );
}

export default Profile;
