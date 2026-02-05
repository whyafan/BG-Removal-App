// ============================================================================
// SOURCES / REFERENCES (by feature used in this file)
// ----------------------------------------------------------------------------
// React + JSX
// - React “useState” (mobile menu open/close state):
//   https://react.dev/reference/react/useState
// - React “Components and Props” (functional component pattern used here):
//   https://react.dev/learn/your-first-component
// - JSX overview (why `return ( ... )` can contain HTML-like syntax):
//   https://react.dev/learn/writing-markup-with-jsx
//
// Routing (react-router-dom)
// - <Link> component (client-side navigation without full reload):
//   https://reactrouter.com/en/main/components/link
//
// Tailwind CSS utilities (styling + responsive behavior)
// - Responsive design prefixes like `md:hidden` / `md:flex`:
//   https://tailwindcss.com/docs/responsive-design
// - Display utilities used for show/hide like `hidden` / `block` / `inline-flex`:
//   https://tailwindcss.com/docs/display
// - Flexbox utilities used for layout like `flex`, `items-center`, `justify-between`, `gap-*`:
//   https://tailwindcss.com/docs/flex
//   https://tailwindcss.com/docs/align-items
//   https://tailwindcss.com/docs/justify-content
//   https://tailwindcss.com/docs/gap
// - Spacing utilities like `p-*`, `px-*`, `py-*`, `mt-*`:
//   https://tailwindcss.com/docs/padding
//   https://tailwindcss.com/docs/margin
// - Border + radius utilities like `border`, `border-slate-200`, `rounded-md`, `rounded-xl`, `rounded-full`:
//   https://tailwindcss.com/docs/border-width
//   https://tailwindcss.com/docs/border-color
//   https://tailwindcss.com/docs/border-radius
// - Colors + hover states like `text-slate-500`, `hover:bg-slate-100`, `hover:text-slate-800`:
//   https://tailwindcss.com/docs/text-color
//   https://tailwindcss.com/docs/background-color
//   https://tailwindcss.com/docs/hover-focus-and-other-states
//
// Accessibility (ARIA + semantics)
// - aria-controls / aria-expanded (button controls collapsible region):
//   https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls
//   https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded
// - aria-label (accessible name for icon-only buttons):
//   https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
// - Semantic <header> usage (landmark for navigation area):
//   https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header
//
// SVG icon paths
// - The “hamburger/menu” and “X/close” icons follow the common outline style used by Heroicons:
//   https://heroicons.com/
//   (Concept: swapping icons based on state; we inline SVG rather than importing an icon library.)
// ============================================================================
// Describe: This file defines a responsive navigation bar component with a collapsible mobile menu.

// Import: Bring React into scope so JSX can compile correctly.
"use client";

import React, { useState } from "react";

// Import: Pull in your static assets (logo + arrow icon) from your local assets module.
import { assets } from "../../assets/assets";

// Import: Use Link from next/link for client-side navigation.
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

// Define: Create the NavBar functional component that renders the site navigation.
const NavBar = () => {
  // State: Track whether the mobile menu is open (true) or hidden (false).
  // Resource: https://react.dev/reference/react/useState
  const [isOpen, setIsOpen] = useState(false);

  // Helper: Provide a single function to close the mobile menu after clicking a link.
  const closeMenu = () => setIsOpen(false);

  // Render: Return the JSX markup for the navigation header.
  return (
    // Layout: Wrap navigation in a semantic header element.
    <header className="py-3">
      {/* Layout: Create a top row with logo on the left and controls/nav on the right. */}
      <div className="flex items-center justify-between">
        {/* Action: Make the logo clickable and route to the home page. */}
        <Link href="/" onClick={closeMenu}>
          {/* Media: Render the brand logo image at responsive widths. */}
          <img
            className="w-32 sm:w-44"
            src={assets.logo}
            alt="BG Removal App Logo"
          />
        </Link>

        {/* Control: Show a hamburger toggle button only on mobile screens. */}
        <div className="flex items-center gap-2 md:hidden">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <button
            // Type: Ensure this button doesn’t submit a form if NavBar is ever inside one.
            type="button"
            // Styles: md:hidden means “hide on md+” and show only on small screens.
            className="inline-flex items-center justify-center rounded-md p-2 text-slate-600 hover:bg-slate-100"
            // A11y: Point to the controlled menu element by id.
            aria-controls="mobile-menu"
            // A11y: Expose expanded/collapsed state to screen readers.
            aria-expanded={isOpen}
            // A11y: Provide an accessible label for users who don’t see the icon.
            aria-label="Toggle navigation menu"
            // Interaction: Toggle open/close on each click.
            onClick={() => setIsOpen((v) => !v)}
          >
            {/* Icon: Use a single SVG that switches between hamburger and X based on isOpen. */}
            <svg
              // Sizing: Set the icon size.
              className="h-6 w-6"
              // Viewbox: Define the SVG coordinate system.
              viewBox="0 0 24 24"
              // Fill: No fill so stroke-only icon draws cleanly.
              fill="none"
              // Stroke: Use currentColor so Tailwind text color controls stroke color.
              stroke="currentColor"
            >
              {/* Conditional: If open show X, else show hamburger lines. */}
              {isOpen ? (
                // Path: Draw the “X” icon using two crossing lines.
                <path
                  strokeWidth="2"
                  strokeLinecap="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                // Path: Draw the hamburger icon using three horizontal lines.
                <path
                  strokeWidth="2"
                  strokeLinecap="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop: Render the full nav inline only on md+ screens. */}
        <nav className="hidden md:flex items-center gap-6 text-slate-500">
          {/* Link: Navigate to the home route; hover color increases contrast. */}
          <Link href="/" className="hover:text-slate-800">
            {/* Text: Label for the Home link. */}
            Home
          </Link>

          {/* Link: Navigate to the buy credits route; hover color increases contrast. */}
          <Link href="/buy" className="hover:text-slate-800">
            {/* Text: Label for the Buy Credit link. */}
            Buy Credit
          </Link>

          {/* CTA: Primary call-to-action button displayed on desktop. */}
          <SignedOut>
            <SignInButton mode="modal">
              <button className="flex items-center cursor-pointer gap-4 px-4 py-2 bg-[#313131] text-white rounded-full sm:px-8 text-[12px] lg:text-sm">
                {/* Text: CTA label. */}
                Get Started
                {/* Media: Show the arrow icon to the right of the CTA label. */}
                <img
                  className="w-3 md:w-4"
                  src={assets.arrow_icon}
                  alt="Arrow Icon"
                />
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </nav>
      </div>

      {/* Mobile: Collapsible menu container that appears below the top row. */}
      <div
        // Id: Match aria-controls on the hamburger button.
        id="mobile-menu"
        // Visibility: Use isOpen to switch between hidden and block on mobile; md:hidden keeps it off desktop.
        className={`${
          isOpen ? "block" : "hidden"
        } md:hidden mt-3 rounded-xl border border-slate-200 bg-white p-3`}
      >
        {/* Stack: Arrange mobile items vertically with consistent spacing. */}
        <nav className="flex flex-col gap-3 text-slate-500">
          {/* Link: Mobile Home link closes the menu after navigation for better UX. */}
          <Link
            href="/"
            onClick={closeMenu}
            className="rounded-lg px-3 py-2 hover:bg-slate-100"
          >
            {/* Text: Label for the mobile Home link. */}
            Home
          </Link>

          {/* Link: Mobile Buy Credit link closes the menu after navigation for better UX. */}
          <Link
            href="/buy"
            onClick={closeMenu}
            className="rounded-lg px-3 py-2 hover:bg-slate-100"
          >
            {/* Text: Label for the mobile Buy Credit link. */}
            Buy Credit
          </Link>

          {/* CTA: Mobile call-to-action button; full width to match mobile tap targets. */}
          <SignedOut>
            <SignInButton mode="modal">
              <button
                // Interaction: Close menu on click (you can also navigate here if you attach routing later).
                onClick={closeMenu}
                // Styles: w-full makes it full width; justify-center centers content; rounded-full matches desktop style.
                className="mt-1 cursor-pointer flex w-full items-center justify-center gap-3 px-4 py-2 bg-[#313131] text-white rounded-full text-[12px]"
              >
                {/* Text: CTA label on mobile. */}
                Get Started
                {/* Media: Arrow icon on mobile CTA. */}
                <img className="w-3" src={assets.arrow_icon} alt="Arrow Icon" />
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <div className="flex justify-center">
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>
        </nav>
      </div>
    </header>
  );
};

// Export: Make NavBar available for import in other parts of the app.
export default NavBar;
