import React from 'react'
import Profile from './Profile'
import Link from 'next/link'

function Navbar() {
  return (
    <div className='flex justify-between items-center'>
        <Link href={"/"}>
            <h1>Logo</h1>
        </Link>


        <Profile />

    </div>

  )
}

export default Navbar