// app/signin/signup.tsx
"use client";
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../lib/AuthContext";

interface SignUpModalProps {
  onClose: () => void;
  onOpenSignin: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ onClose, onOpenSignin }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { signup } = useAuth();
  const [error, setError] = useState("");

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as any;
    const name = form[0].value;
    const email = form[1].value;
    const password = form[2].value;

    const success = signup(email, password, name);
    if (!success) {
      setError("Email already exists!");
    } else {
      setError("");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div ref={modalRef} className="relative w-full max-w-md rounded-xl bg-white p-8 shadow-xl text-black">
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-500 hover:text-black">✕</button>
        <h2 className="mb-4 text-center text-2xl font-semibold">Sign Up</h2>
        {error && <p className="text-red-600 mb-2">{error}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input type="text" placeholder="Full Name" className="w-full rounded-md border px-4 py-2" required />
          <input type="email" placeholder="Email" className="w-full rounded-md border px-4 py-2" required />
          <input type="password" placeholder="Password" className="w-full rounded-md border px-4 py-2" required />
          <button type="submit" className="w-full rounded-md bg-black py-2 text-white hover:bg-gray-800 transition">Sign Up</button>
        </form>
        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <button onClick={onOpenSignin} className="text-black font-medium hover:underline">Sign In</button>
        </p>
      </div>
    </div>
  );
};

export default SignUpModal;
