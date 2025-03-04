// components/LogoLogger.js
"use client";
import { useEffect } from "react";

export default function LogoLogger() {
  useEffect(() => {
    console.log(
      `
      %c  ███████╗ ██████╗  ██████╗ ███╗   ██╗ ██████╗ ██╗     ███████╗
      %c  ██╔════╝██╔═══██╗██╔═══██╗████╗  ██║██╔════╝ ██║     ██╔════╝
      %c  ███████╗██║   ██║██║   ██║██╔██╗ ██║██║  ███╗██║     █████╗  
      %c  ╚════██║██║   ██║██║   ██║██║╚██╗██║██║   ██║██║     ██╔══╝  
      %c  ███████║╚██████╔╝╚██████╔╝██║ ╚████║╚██████╔╝███████╗███████╗
      %c  ╚══════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝ ╚══════╝╚══════╝
      %c  This is Soongle's space. Welcome! 🎸💻
      `,
      "color:#4387f4",
      "color:#b477ef",
      "color:#fb63c8",
      "color:#ff7a95",
      "color:#ff9368",
      "color:#f5b400",
      "color:#ffffff"
    );
  }, []);

  return null; // 아무것도 렌더링하지 않음
}
