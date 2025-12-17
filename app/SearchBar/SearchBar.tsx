"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ isOpen, onClose }) => {
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const keywords = ["ICT", "Gold Batch", "MACRO", "Algorythems", "Phychology"];
  const [currentKeyword, setCurrentKeyword] = useState(keywords[0]);

  // Rotate placeholder keyword every 2 seconds
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % keywords.length;
      setCurrentKeyword(keywords[index]);
    }, 1000); // Change every 2 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-32"
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            ref={searchBoxRef}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white w-full max-w-lg rounded-xl shadow-lg p-4"
          >
            <div className="flex items-center">
              <Search className="w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder={`Search ${currentKeyword}...`}
                className="ml-2 w-full outline-none text-black"
                autoFocus
              />
              <button onClick={onClose} aria-label="Close search">
                <X className="w-6 h-6 text-gray-600 hover:text-black" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchBar;
