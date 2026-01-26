import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
      <div className="grid w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-20 grid-cols-1 md:grid-cols-2 items-center gap-x-10 gap-y-10 md:gap-y-0">
          {/* Left Side */}

          {/* GreatStack considered responsiveness from Day 1. It's worth noting that. No mobile or desktop first, both. Jonas tau ght me desktop-first, and I prefered that. With these modern solutions, we do both together haha. */}
          <div className='max-w-lg order-2 md:order-1 justify-self-center md:justify-self-start text-center md:text-start'>
              {/* bg-gradient-to-r: background gradient that flows horizontally from left to right */}
              <h1 className='text-2xl sm:text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-neutral-700 leading-tight'>Remove the <span className='bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent'> background </span> from images for free.</h1>   
              <p className='text-md md:text-lg my-6 text-gray-500'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever.</p>
              <div>
                  {/* I was surprised here because I thought there'd be a button with some extra JS to make it work, but it's the good-old <input> HTML tag */}
                  <input type="file" id='image-upload' hidden/>
                  {/* We hid the above input because otherwise it'd show "Choose File No file chosen" to the user. This is from React. */}
                  {/* Using TailwindCSS, we have applied the hover effect on this button that scales in size for a specific duration with transition classes too. "-105" indicates the said object scales up to 105% of its original size only when the user hovers over it.*/}
                  <label className='inline-flex gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 hover:scale-105 transition-all duration-700' htmlFor="image-upload">
                      <img className='w-3 md:w-4' src={assets.upload_btn_icon} alt="Upload Image" />
                      <p className='text-white text-xs md:text-sm'>Upload your image</p>
                  </label>
              </div>
          </div>

          {/* Right Side */}

          <div className='w-full max-w-md justify-self-center md:justify-self-end order-1 md:order-2'>
              <img src={assets.header_img} alt="Header Image" />
          </div>
    </div>
  )
}

export default Header