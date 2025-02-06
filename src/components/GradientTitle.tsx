"use client";

import React from "react";

interface GradientTitleProps {
  children: React.ReactNode;
  className?: string; // Permet d'ajouter des styles supplémentaires si besoin
}

export default function GradientTitle({ children, className = "" }: GradientTitleProps) {
  return (
    <div className="relative w-full text-center">
      {/* Ombre en arrière-plan */}
      <h1 className={`absolute inset-0 text-4xl sm:text-5xl font-extrabold text-center text-gray-900 opacity-40 blur-md ${className}`}>

        {children}
      </h1>

      {/* Titre avec animation et gradient */}
      <h1
        className={`relative bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text animate-color-shift bg-[size:200%_200%] font-extrabold text-4xl sm:text-5xl ${className}`}
      >
        {children}
      </h1>
    </div>
  );
}