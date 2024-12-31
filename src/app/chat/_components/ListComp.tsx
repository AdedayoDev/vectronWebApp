import Image from "next/image"

type Props = {
    src: string,
    children: string
    classes?: string
}
function ListComp({src, classes, children}:Props) {
    return (
        <div className={`flex items-center justify-start text-[#442066] space-x-3 my-1 ${classes}`}>
        <div className="relative w-5 h-5">
          <Image
            src={src}
            alt={children}
            fill
            className="object-cover"
          />
        </div>
        <p className="text-[16px] font-semibold">{children}</p>
      </div>
    )
}

export default ListComp
