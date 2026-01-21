import React from 'react'
import { assets } from '../assets/assets'

// Notice how the Link component is from react-router-dom library as it's a matter of routing and redirection, not core React or Vite.
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
      <div className='flex justify-between items-center py-3 mx-4 lg:mx-44'>
          <Link to="/">
            <img className='w-32 sm:w-44' src={assets.logo} alt="BG Removal App Logo" />
          </Link>
          <div className='hidden lg:flex items-center gap-10 text-slate-500'>
              <Link to='/'>Home</Link>
              <Link to='/buy'>Buy Credit</Link>
          </div>

          {/* This button is hidden on small screens and shown on large screens. */}
          <button className='hidden lg:flex items-center gap-2 px-4 py-2 bg-[#313131] text-white rounded-full sm:px-8 text-sm'>Get Started <img className='w-2 sm:w-4' src={assets.arrow_icon} alt="Arrow Icon" /></button>
    </div>
  )
}

export default NavBar