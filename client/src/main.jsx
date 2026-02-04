import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ImageProvider } from "./context/ImageContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import { CreditsProvider } from "./context/CreditsContext.jsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Add VITE_CLERK_PUBLISHABLE_KEY to your .env.local file");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <BrowserRouter>
        <CreditsProvider>
          <ImageProvider>
            <App />
          </ImageProvider>
        </CreditsProvider>
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>,
);
