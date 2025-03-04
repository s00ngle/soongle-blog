"use client";
import { useState } from "react";
import Link from "next/link";
import Nav from "./Nav";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b shadow-md">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center py-6">
            <Link
              href="/"
              className="text-2xl font-bold hover:scale-110 transition-transform duration-300"
            >
              Soongle
            </Link>
            {/* 데스크탑 네비게이션 */}
            <div className="hidden md:block">
              <Nav isMobile={false} />
            </div>
            {/* 모바일 햄버거 버튼 */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="text-gray-700 hover:text-gray-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              >
                {isOpen ? (
                  // 닫기 아이콘
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  // 햄버거 아이콘
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        {/* 모바일 드롭다운 네비게이션 */}
        {isOpen && (
          <div className="md:hidden bg-white border-t">
            <Nav isMobile onLinkClick={() => setIsOpen(false)} />
          </div>
        )}
      </header>
      <div className="h-20"></div>
    </>
  );
}
