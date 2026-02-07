"use client";

import { Toaster } from "sonner";
import { KindeProvider } from "@kinde-oss/kinde-auth-nextjs";
import { CreditsProvider } from "./context/CreditsContext";
import { ImageProvider } from "./context/ImageContext";
import { AuthProvider } from "./context/AuthContext";

const Providers = ({ children }) => {
  return (
    <KindeProvider>
      <AuthProvider>
        <CreditsProvider>
          <ImageProvider>
            {children}
            <Toaster richColors position="bottom-right" />
          </ImageProvider>
        </CreditsProvider>
      </AuthProvider>
    </KindeProvider>
  );
};

export default Providers;
