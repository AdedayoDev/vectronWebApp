import Link from "next/link";
import Image from "next/image";

const AIData = [
  {
    image: "/assets/images/logo.png",
    href: "/",
  },
  {
    image: "/assets/images/logo3.png",
    href: "/",
  },
  {
    image: "/assets/images/logo2.png",
    href: "/",
  },
  {
    image: "/assets/images/logo4.png",
    href: "/",
  },
  {
    image: "/assets/images/logo5.png",
    href: "/",
  },
  {
    image: "/assets/images/logo6.png",
    href: "/",
  },
];

export default function AI() {
  return (
    <div className="ai-side">
      {AIData.map((data, id) => (
        <div key={id} className="ai-img">
          <Link href={data.href}>
            <Image src={data.image} alt="ai icon" width={40} height={40} />
          </Link>
        </div>
      ))}
      <div className="add-mode">
        <Image
          src="/assets/icons/add.png"
          alt="ai icon"
          width={40}
          height={40}
        />
      </div>
      <Image
        src="/assets/icons/moon-star.png"
        alt="ai icon"
        width={25}
        height={25}
      />
    </div>
  );
}
