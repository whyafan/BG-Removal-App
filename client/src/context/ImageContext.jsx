import React, { createContext, useContext, useMemo, useState } from "react";

const ImageContext = createContext(null);

export const ImageProvider = ({ children }) => {
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const setImageFromFile = (file) => {
    if (!file) return;
    if (imageUrl) URL.revokeObjectURL(imageUrl);
    const nextUrl = URL.createObjectURL(file);
    setImageFile(file);
    setImageUrl(nextUrl);
  };

  const value = useMemo(
    () => ({
      imageFile,
      imageUrl,
      setImageFromFile,
    }),
    [imageFile, imageUrl],
  );

  return <ImageContext.Provider value={value}>{children}</ImageContext.Provider>;
};

export const useImageContext = () => {
  const ctx = useContext(ImageContext);
  if (!ctx) {
    throw new Error("useImageContext must be used within ImageProvider");
  }
  return ctx;
};
