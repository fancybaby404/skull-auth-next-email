import React from 'react'
import Profile from './Profile'
import Link from 'next/link'
import { Skull } from 'lucide-react'

function Navbar() {
  return (
    <div className='flex justify-between items-center'>
        <Link href={"/"}>
            <Skull />
        </Link>


        <Profile />

    </div>

  )
}

export default Navbar