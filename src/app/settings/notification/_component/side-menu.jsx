'use client'
import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation'
export default function sideMenu() {
  const router= useRouter()
  return (

    // md:hidden
    <div className=' border-r-2 border-solid ml-5 pr-11'>
        <button className='hover:border-2 hover:border-solid hover:border-black flex gap-2 items-center border rounded-full mb-3 shadow-md w-56 py-2 pl-4'>
          <Image
          src='/assets/icons/toyota.png'
          width={20}
          height={20}
          alt='Icon'
          />
          <span className='text-gray-400'>Edit profile</span>
        </button>
        <button className='hover:border-2 hover:border-solid hover:border-black flex gap-2 items-center border rounded-full mb-3 shadow-md w-56 py-2 pl-4'>
          <Image
          src='/assets/icons/toyota.png'
          width={20}
          height={20}
          alt='Icon'
          />
          <span className='text-gray-400'>Password</span>
        </button>
        <button className='hover:border-2 hover:border-solid hover:border-black flex gap-2 items-center border rounded-full mb-3 shadow-md w-56 py-2 pl-4'>
          <Image
          src='/assets/icons/toyota.png'
          width={20}
          height={20}
          alt='Icon'
          />
          <span className='text-gray-400'>Notifications</span>
        </button>
        <button className='hover:border-2 hover:border-solid hover:border-black flex gap-2 items-center border rounded-full mb-3 shadow-md w-56 py-2 pl-4'>
          <Image
          src='/assets/icons/toyota.png'
          width={20}
          height={20}
          alt='Icon'
          />
          <span className='text-gray-400'>Chat export</span>
        </button>
        <button className='hover:border-2 hover:border-solid hover:border-black flex gap-2 items-center border rounded-full mb-3 shadow-md w-56 py-2 pl-4'>
          <Image
          src='/assets/icons/toyota.png'
          width={20}
          height={20}
          alt='Icon'
          />
          <span className='text-gray-400'>Sessions</span>
        </button>
        <button className='hover:border-2 hover:border-solid hover:border-black flex gap-2 items-center border rounded-full mb-3 shadow-md w-56 py-2 pl-4'>
          <Image
          src='/assets/icons/toyota.png'
          width={20}
          height={20}
          alt='Icon'
          />
          <span className='text-gray-400'>Applications</span>
        </button>
        <button className='hover:border-2 hover:border-solid hover:border-black flex gap-2 items-center border rounded-full mb-3 shadow-md w-56 py-2 pl-4'>
          <Image
          src='/assets/icons/toyota.png'
          width={20}
          height={20}
          alt='Icon'
          />
          <span className='text-gray-400'>Teams</span>
        </button>
        <hr className='border-1 border-solid w-full my-10' />
        <button className='hover:border-2 hover:border-solid hover:border-black flex gap-2 text-red-500 items-center border rounded-full mb-3 shadow-md w-56 py-2 pl-4'>
          <Image
          src='/assets/icons/toyota.png'
          width={20}
          height={20}
          alt='Icon'
          onClick={()=> router.push('/deleteaccount')}
          />
          Delete account
        </button>
    </div>
  )
}
 