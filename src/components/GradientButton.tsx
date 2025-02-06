"use client";

import React from "react";

interface GradientButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
}

export default function GradientButton({ children, onClick, href, className = "" }: GradientButtonProps) {
  const baseClass = `bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white px-6 py-2 rounded-md 
                     bg-[size:200%_200%] animate-color-shift hover:brightness-110 transition-all`;

  if (href) {
    return (
      <a href={href} className={`${baseClass} ${className}`}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={`${baseClass} ${className}`}>
      {children}
    </button>
  );
}