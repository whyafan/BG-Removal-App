"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import { CreditsProvider } from "./context/CreditsContext";
import { ImageProvider } from "./context/ImageContext";

const Providers = ({ children }) => {
  return (
    <ClerkProvider>
      <CreditsProvider>
        <ImageProvider>
          {children}
          <Toaster richColors position="bottom-right" />
        </ImageProvider>
      </CreditsProvider>
    </ClerkProvider>
  );
};

export default Providers;
