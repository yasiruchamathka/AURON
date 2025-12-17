// app/signin/signin.tsx
"use client";
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../lib/AuthContext";

interface SignInModalProps {
  onClose: () => void;
  onOpenSignup: () => void;
}

const SignInModal: React.FC<SignInModalProps> = ({ onClose, onOpenSignup }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { login } = useAuth();
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
    const email = form[0].value;
    const password = form[1].value;

    const success = login(email, password);
    if (!success) {
      setError("Incorrect email or password!");
    } else {
      setError("");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div ref={modalRef} className="relative w-full max-w-md rounded-xl bg-white p-8 shadow-xl text-black">
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-500 hover:text-black">✕</button>
        <h2 className="mb-4 text-center text-2xl font-semibold">Sign In</h2>
        {error && <p className="text-red-600 mb-2">{error}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" className="w-full rounded-md border px-4 py-2" required />
          <input type="password" placeholder="Password" className="w-full rounded-md border px-4 py-2" required />
          <button type="submit" className="w-full rounded-md bg-black py-2 text-white hover:bg-gray-800 transition">Sign In</button>
        </form>
        <p className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <button onClick={onOpenSignup} className="text-black font-medium hover:underline">Sign Up</button>
        </p>
      </div>
    </div>
  );
};

export default SignInModal;
