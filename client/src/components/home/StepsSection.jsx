// ============================================================================
// SOURCES / REFERENCES (by feature used in this file)
// ----------------------------------------------------------------------------
// React + JSX
// - React components (functional component pattern):
//   https://react.dev/learn/your-first-component
// - JSX syntax (returning HTML-like markup from JS):
//   https://react.dev/learn/writing-markup-with-jsx
//
// Tailwind CSS utilities (layout + spacing + typography)
// - Responsive prefixes (desktop-first with `sm:*`, `md:*`, `lg:*`):
//   https://tailwindcss.com/docs/responsive-design
// - Grid + column templates (`grid`, `grid-cols-*`) and gaps (`gap-*`):
//   https://tailwindcss.com/docs/grid-template-columns
//   https://tailwindcss.com/docs/gap
// - Spacing utilities (`px-*`, `py-*`, `mt-*`, `p-*`) and arbitrary values (`mt-[71px]`):
//   https://tailwindcss.com/docs/padding
//   https://tailwindcss.com/docs/margin
//   https://tailwindcss.com/docs/adding-custom-styles#using-arbitrary-values
// - Border + radius utilities (`border`, `rounded-*`) and custom colors:
//   https://tailwindcss.com/docs/border-width
//   https://tailwindcss.com/docs/border-color
//   https://tailwindcss.com/docs/border-radius
// - Box shadow utilities (custom shadow via arbitrary value):
//   https://tailwindcss.com/docs/box-shadow#arbitrary-values
// - Typography utilities (font size/weight/leading):
//   https://tailwindcss.com/docs/font-size
//   https://tailwindcss.com/docs/font-weight
//   https://tailwindcss.com/docs/line-height
// - Background gradients + clipping for gradient text:
//   https://tailwindcss.com/docs/background-image
//   https://tailwindcss.com/docs/background-clip
//   https://tailwindcss.com/docs/text-color#making-text-transparent
//
// CSS overflow (why shadows can appear “cut off”)
// - Overflow clipping behavior (concept):
//   https://developer.mozilla.org/en-US/docs/Web/CSS/overflow
//
// Icons (Heroicons)
// - Heroicons (outline style reference; we inline SVG paths):
//   https://heroicons.com/
// ============================================================================

// Describe: Import React so JSX compiles correctly in this module.
import React from "react";

// Describe: Define a small “StepCard” component so the section stays clean and reusable.
const StepCard = ({ title, description, iconPath }) => {
  // Describe: Return the markup for a single card.
  return (
    // Describe: Card container with border, rounded corners, white bg, responsive padding, and subtle shadow.
    <div className="flex items-start gap-6 rounded-2xl border border-[#E1E1E1] bg-white p-6 md:p-8 lg:p-6 shadow-[0_4px_15px_rgba(0,0,0,0.05)]">
      {/* Describe: Icon wrapper sized to 44x44 with a purple gradient and rounded corners. */}
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#7C48FE,#C849F8)]">
        {/* Describe: Inline SVG icon (Heroicons-style) using white stroke for contrast. */}
        <svg
          // Describe: Set icon size inside the 44x44 container.
          className="h-6 w-6"
          // Describe: Define viewbox coordinate system for the SVG.
          viewBox="0 0 24 24"
          // Describe: Ensure the icon is stroke-only (no fill).
          fill="none"
          // Describe: Use white stroke to stand out against purple gradient.
          stroke="white"
        >
          {/* Describe: Draw the icon path passed into this card. */}
          <path
            // Describe: Use a comfortable stroke width similar to Heroicons outline set.
            strokeWidth="2"
            // Describe: Round the line ends for a cleaner icon style.
            strokeLinecap="round"
            // Describe: Round the corners where lines join.
            strokeLinejoin="round"
            // Describe: Use the path string passed in for this specific step icon.
            d={iconPath}
          />
        </svg>
      </div>

      {/* Describe: Text container so title and description stack nicely. */}
      <div>
        {/* Describe: Card title styled bold and dark for hierarchy (responsive size). */}
        <h3 className="text-xl md:text-xl font-semibold text-black">{title}</h3>

        {/* Describe: Card body text with your specified gray and newline-friendly rendering. */}
        <p className="mt-3 text-base md:text-sm leading-snug text-[#7C7C7C] whitespace-pre-line">
          {description}
        </p>
      </div>
    </div>
  );
};

// Describe: Define the full Steps section component (heading + cards).
const StepsSection = () => {
  // Describe: Define your cards as data so the UI can be rendered by mapping over an array.
  const steps = [
    // Describe: Step 1 data (upload).
    {
      title: "Upload image",
      description:
        "This is a demo text, will replace it later.\nThis is a demo..",
      // Describe: Icon path (upload) in a Heroicons-like outline style.
      iconPath:
        "M3 16.5V19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2.5M12 3v13m0 0 4-4m-4 4-4-4",
    },
    // Describe: Step 2 data (remove background).
    {
      title: "Remove background",
      description:
        "This is a demo text, will replace it later.\nThis is a demo..",
      // Describe: Icon path (scissors-ish) in a Heroicons-like outline style.
      iconPath:
        "M9.5 9.5 3 3m6.5 6.5L3 16m13.5-6.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM21 21l-7-7",
    },
    // Describe: Step 3 data (download).
    {
      title: "Download image",
      description:
        "This is a demo text, will replace it later.\nThis is a demo..",
      // Describe: Icon path (download) in a Heroicons-like outline style.
      iconPath:
        "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4m14-7-5 5m0 0-5-5m5 5V3",
    },
  ];

  // Describe: Return the full section layout.
  return (
    // Describe: Section wrapper for the “Steps” block.
    <section className="w-full">
      {/* Describe: Use the same container standard as Header for consistent alignment. */}
      <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
        {/* Describe: Center the heading like your Figma. */}
        <div className="text-center">
          {/* Describe: Heading with gray gradient and exact typography spec (50px, 600, 100% line-height) on desktop. */}
          <h2 className="bg-[linear-gradient(180deg,#353535,#9B9B9B)] bg-clip-text text-transparent font-semibold text-3xl sm:text-4xl md:text-[42px]">
            Steps to remove background
            <br />
            image in seconds
          </h2>
        </div>

        {/* Describe: Overflow wrapper prevents any parent overflow rules from clipping box shadows. */}
        <div className="overflow-visible">
          {/* Describe: Grid with exact vertical gap from heading (71px) and 48px gap between 3 cards on desktop (lg:gap-12). */}
          <div className="mt-[71px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 lg:gap-10">
            {/* Describe: Render each step card from the data array. */}
            {steps.map((step) => (
              // Describe: Render a single StepCard for each entry.
              <StepCard
                // Describe: Provide React key for list rendering.
                key={step.title}
                // Describe: Pass the title string to the card.
                title={step.title}
                // Describe: Pass the description string to the card.
                description={step.description}
                // Describe: Pass the SVG path to the card icon.
                iconPath={step.iconPath}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Describe: Export so Home page can import this section component.
export default StepsSection;
