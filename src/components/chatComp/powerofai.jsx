import Image from "next/image";

export default function PowerofAi() {
  return (
    <div>
      <Image
        src="/assets/images/bg-img.png"
        alt="Background image"
        width={200}
        height={200}
        className="powerai-bg"
      />
      <div className="powerofAi-content">

      </div>
    </div>
  );
}
