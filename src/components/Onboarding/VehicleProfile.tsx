import { SignupFormDemo } from '@components/AceternityForm/SignupFormDemo'
import Image from 'next/image'
import React from 'react'

const VehicleProfile = () => {
  return (
    <main className="flex items-center justify-center w-full h-screen">
    <section className="w-1/2 hidden lg:block ">
      <Image
        src="https://res.cloudinary.com/dpmy3egg2/image/upload/v1734961047/vech4_wjjixn.png"
        alt="user-onboarding"
        width={1000}
        height={100}
      />
    </section>
    <section className="lg:w-1/2 w-full ">
     <div>
        <SignupFormDemo />
     </div>
    </section>
  </main>
  )
}

export default VehicleProfile
