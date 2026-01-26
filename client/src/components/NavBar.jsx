// Make this more responsive

import React from 'react'
import { assets } from '../assets/assets'

// Notice how the Link component is from react-router-dom library as it's a matter of routing and redirection, not core React or Vite.
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
      <div className='flex flex-col gap-4 md:flex-row justify-between items-center py-3'>
          <Link to="/">
            <img className='w-32 sm:w-44' src={assets.logo} alt="BG Removal App Logo" />
          </Link>
          <div className='flex flex-col md:flex-row items-center gap-4 text-slate-500'>
              <Link to='/'>Home</Link>
              <Link to='/buy'>Buy Credit</Link>
      </div>
      
          <button className='flex items-center gap-4 px-4 py-2 bg-[#313131] text-white rounded-full sm:px-8 text-[12px] lg:text-sm'>Get Started <img className='sm:w-3 md:w-4' src={assets.arrow_icon} alt="Arrow Icon" /></button>
    </div>
  )
}

export default NavBar