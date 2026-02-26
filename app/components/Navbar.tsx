"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null); // ✅ add ref for the toggle button

  // ✅ Close when clicking outside menu (but not on the toggle button)
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <nav className="bg-white border-b border-gray-300 py-4 px-6 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Left: Logo / Name */}
        <a href="/" className="font-semibold text-lg hover:text-yellow-600">
          Home
        </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-lg font-semibold">
          <li>
            <Link href="/tech" className="hover:text-yellow-600">
              Projects
            </Link>
          </li>
          <li>
            <Link href="/blogletters" className="hover:text-yellow-600">
              BlogLetters
            </Link>
          </li>
          <li>
            <Link href="/newsletter" className="hover:text-yellow-600">
              Newsletter
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:text-yellow-600">
              Contact
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          ref={buttonRef} // ✅ assign ref
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-2xl focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden mt-3 bg-white border-t border-gray-200 shadow-lg rounded-lg"
          >
            <ul className="flex flex-col items-center space-y-4 py-4 text-lg font-semibold">
              {[
                { name: "Projects", path: "/tech" },
                { name: "BlogLetters", path: "/blogletters" },
                { name: "Newsletter", path: "/newsletter" },
                { name: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="hover:text-yellow-600"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
