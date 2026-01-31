// ============================================================================
// SOURCES / REFERENCES (by feature used in this file)
// ----------------------------------------------------------------------------
// React + JSX
// - React components (functional component pattern used here):
//   https://react.dev/learn/your-first-component
// - JSX overview (why we can write HTML-like markup in JS):
//   https://react.dev/learn/writing-markup-with-jsx
//
// Assets / bundler concepts
// - Importing static assets in React/Vite-style setups (concept: ES module imports):
//   Topic: “Static asset handling in Vite”
//   https://vitejs.dev/guide/assets.html
//
// Tailwind CSS utilities used in this file
// - Responsive design prefixes like `sm:*`, `md:*`, `xl:*`, `2xl:*`:
//   https://tailwindcss.com/docs/responsive-design
// - Grid layout utilities like `grid`, `grid-cols-*`:
//   https://tailwindcss.com/docs/grid-template-columns
// - Max-width utilities like `max-w-*`:
//   https://tailwindcss.com/docs/max-width
// - Spacing utilities like `px-*`, `py-*`, `mt-*`, `mb-*`, `gap-*`, `my-*`:
//   https://tailwindcss.com/docs/padding
//   https://tailwindcss.com/docs/margin
//   https://tailwindcss.com/docs/gap
// - Flexbox utilities used inside button like `inline-flex`, `gap-*`:
//   https://tailwindcss.com/docs/display
//   https://tailwindcss.com/docs/flex
// - Typography utilities like `text-*`, `font-bold`, `leading-*`:
//   https://tailwindcss.com/docs/font-size
//   https://tailwindcss.com/docs/font-weight
//   https://tailwindcss.com/docs/line-height
// - Colors utilities like `text-neutral-700`, `text-gray-500`:
//   https://tailwindcss.com/docs/text-color
// - Background gradient utilities like `bg-gradient-to-r`, `from-*`, `to-*`:
//   https://tailwindcss.com/docs/background-image
// - Background clip + text transparency (`bg-clip-text`, `text-transparent`):
//   https://tailwindcss.com/docs/background-clip
//   https://tailwindcss.com/docs/text-color#making-text-transparent
// - Hover + transitions + transforms (`hover:scale-105`, `transition-all`, `duration-*`):
//   https://tailwindcss.com/docs/hover-focus-and-other-states
//   https://tailwindcss.com/docs/transition-property
//   https://tailwindcss.com/docs/transition-duration
//   https://tailwindcss.com/docs/scale
// - Ordering utilities (`order-*`) for responsive re-ordering:
//   https://tailwindcss.com/docs/order
//
// HTML / Accessibility concepts
// - <input type="file"> (file upload control):
//   https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file
// - Using <label htmlFor="..."> to trigger a hidden file input:
//   https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label
// ============================================================================

// Describe: Import React so JSX compiles correctly in this module.
import React from "react";

// Describe: Import local app assets (logo/images/icons) from your assets module.
import { assets } from "../../assets/assets";

// Describe: Define the Header functional component for the Home page hero section.
const Header = () => {
  // Describe: Return JSX for the header layout.
  return (
    // Describe: Wrap the hero content in a responsive grid container centered with `mx-auto`.
    <div className="grid w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-20 mb-24 lg:mb-48 grid-cols-1 md:grid-cols-2 items-center gap-x-10 gap-y-10 md:gap-y-0">
      {/* Describe: Mark the start of the left-side content column (text + CTA). */}
      {/* Left Side */}

      {/* Describe: Keep your original note/comment about responsiveness and approach. */}
      {/* GreatStack considered responsiveness from Day 1. It's worth noting that. No mobile or desktop first, both. Jonas tau ght me desktop-first, and I prefered that. With these modern solutions, we do both together haha. */}

      {/* Describe: Create a left column container with responsive ordering and alignment. */}
      <div className="max-w-lg order-2 md:order-1 justify-self-center md:justify-self-start text-center md:text-start">
        {/* Describe: Explain the gradient background utility used for the highlighted word. */}
        {/* bg-gradient-to-r: background gradient that flows horizontally from left to right */}

        {/* Describe: Render the main hero headline with responsive font sizes and tight line-height. */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-neutral-700 leading-tight">
          {/* Describe: Render the first part of the headline text (kept exactly as you wrote it). */}
          Remove the
          {/* Describe: Highlight the word “background” using a gradient clipped to the text. */}
          <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
            {/* Describe: Preserve your original spacing approach around the highlighted text. */}{" "}
            background{" "}
          </span>{" "}
          {/* Describe: Render the last part of the headline text. */}
          from images for free.
        </h1>

        {/* Describe: Render the supporting paragraph text below the headline. */}
        <p className="text-md md:text-lg my-6 text-gray-500">
          {/* Describe: Keep your existing placeholder copy split across lines for readability. */}
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text
          ever.
        </p>

        {/* Describe: Wrap upload controls in a container so spacing/layout is easy to adjust later. */}
        <div>
          {/* Describe: Preserve your existing note about file input behavior. */}
          {/* I was surprised here because I thought there'd be a button with some extra JS to make it work, but it's the good-old <input> HTML tag */}

          {/* Describe: Render a hidden file input that will be triggered by the label button below. */}
          <input type="file" id="image-upload" hidden />

          {/* Describe: Preserve your existing note about hiding the input’s default UI. */}
          {/* We hid the above input because otherwise it'd show "Choose File No file chosen" to the user. This is from React. */}

          {/* Describe: Preserve your existing note about Tailwind hover + transition utilities. */}
          {/* Using TailwindCSS, we have applied the hover effect on this button that scales in size for a specific duration with transition classes too. "-105" indicates the said object scales up to 105% of its original size only when the user hovers over it.*/}

          {/* Describe: Use a label as the visible button, linked to the hidden input via htmlFor. */}
          <label
            //  Describe: Style the label like a button with gradient background, rounding, and hover animation. */
            className="inline-flex gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 hover:scale-105 transition-all duration-700"
            /* Describe: Connect this label to the hidden input so clicking it opens the file picker. */
            htmlFor="image-upload"
          >
            {/* Describe: Show the upload icon at a responsive size. */}
            <img
              /* Describe: Size the icon small on mobile and slightly larger on md+. */
              className="w-3 md:w-4"
              /* Describe: Load the icon source from your imported assets map. */
              src={assets.upload_btn_icon}
              /* Describe: Provide alt text for accessibility. */
              alt="Upload Image"
            />

            {/* Describe: Render the upload button label text. */}
            <p className="text-white text-xs md:text-sm">Upload your image</p>
          </label>
        </div>
      </div>

      {/* Describe: Mark the start of the right-side content column (hero image). */}
      {/* Right Side */}

      {/* Describe: Create a right column container with responsive ordering and alignment. */}
      <div className="w-full max-w-md justify-self-center md:justify-self-end order-1 md:order-2">
        {/* Describe: Render the hero image from your assets module. */}
        <img src={assets.header_img} alt="Header Image" />
      </div>
    </div>
  );
};

// Describe: Export the Header component so it can be used on the Home route.
export default Header;
