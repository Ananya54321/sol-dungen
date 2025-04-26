"use client";

import { useState } from "react";

import { ModeToggle } from "./ui/mode-toggle";

import Link from "next/link";
import { Menu, X } from "lucide-react";

export function Appbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex backdrop-blur-lg  mx-4 md:mx-24 justify-between items-center px-4 md:px-6 py-4 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 sticky top-2 z-50">
      <div className="text-2xl font-bold tracking-tight">
        <Link href="/">Sol-Dungen</Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-gray-800 dark:text-white"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Desktop Navigation */}
      <header className="hidden md:flex items-center gap-4">
        <nav className="flex items-center gap-4">
          <Link href="/token" className="text-gray-800 dark:text-white">
            Tokens
          </Link>
          <Link href="/market" className="text-gray-800 dark:text-white">
            Market
          </Link>
          <Link href="/nfts" className="text-gray-800 dark:text-white">
            Nfts
          </Link>
          <Link href="/transactions" className="text-gray-800 dark:text-white">
            Transactions
          </Link>
        </nav>
        <ModeToggle />
      </header>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full  shadow-lg p-4 flex flex-col items-center gap-3 md:hidden">
          <nav className="flex items-center gap-4">
            <Link href="/token" className="text-gray-800 dark:text-white">
              Tokens
            </Link>
            <Link href="/market" className="text-gray-800 dark:text-white">
              Market
            </Link>
            <Link href="/nfts" className="text-gray-800 dark:text-white">
              Nfts
            </Link>
            <Link
              href="/transactions"
              className="text-gray-800 dark:text-white"
            >
              Transactions
            </Link>
          </nav>
          <ModeToggle />
        </div>
      )}
    </div>
  );
}
