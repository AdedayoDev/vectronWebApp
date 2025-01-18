"use client"

import React, {useState} from 'react'
import Image from 'next/image'

const Profile = () => {
  const [image, setImage] = useState<string | null>(null)

  return (
    <main>
      {/* Image Container  */}
      <div>
      {image ? <Image
      src={image}
      alt='user_image'
      className="w-full h-full object-cover"
      /> : (
        <div>
          No Image
        </div>
      )}
      </div>
      <div>
        
      </div>
    </main>
  )
}

export default Profile
