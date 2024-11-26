import Link from "next/link"
import Image from "next/image"

export default function Nav() {
  return (
    <div>
        <Link href="/signin">
            Sign in
            <Image
              src="/assets/icons/logout.png"
              alt="icon"
              width={30}
              height={30}
            />
          </Link>
    </div>
  )
}
