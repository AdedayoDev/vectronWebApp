import Image from "next/image"

type Props = {
    src: string,
    children: string
}
function ListComp({src, children}:Props) {
    return (
        <div className="flex items-center justify-start text-[#442066] space-x-3">
        <div className="relative w-5 h-5">
          <Image
            src={src}
            alt={children}
            fill
            className="object-cover"
          />
        </div>
        <p className="text-[16px]">{children}</p>
      </div>
    )
}

export default ListComp
