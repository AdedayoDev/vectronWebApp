import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function Ai() {
  const LogoLink = ({ href, src, alt }) => (
    <Link href={href} className="links">
      <Image src={src} alt={alt} width={40} height={40} />
    </Link>
  );

  const logoLinks = [
    { href: "/", src: "/assets/images/logo2.png", alt: "Logo 2" },
    { href: "/", src: "/assets/images/logo3.png", alt: "Logo 3" },
    { href: "/", src: "/assets/images/logo5.png", alt: "Logo 5" },
    { href: "/", src: "/assets/images/logo.png", alt: "Logo" },
    { href: "/", src: "/assets/images/logo4.png", alt: "Logo 4" },
    { href: "/", src: "/assets/icons/add.png", alt: "Add icon" },
  ];
  return (
    <div>
      <section className="chat-left">
        {logoLinks.map((link, index) => (
          <LogoLink key={index} {...link} />
        ))}
      </section>
    </div>
  );
}
