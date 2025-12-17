'use client';

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import ProductGrid from "../components/ProductGrid";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}

export default function Home() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const initial = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      speed: Math.random() * 0.4 + 0.2,
      opacity: Math.random() * 0.4 + 0.4,
    }));
    setParticles(initial);

    const interval = setInterval(() => {
      setParticles(prev =>
        prev.map(p => ({
          ...p,
          y: p.y > 100 ? -5 : p.y + p.speed,
        }))
      );
    }, 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/hero.png"
          alt="Trading background"
          fill
          priority
          className="object-cover brightness-110"
        />
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />

      </div>

      {/* Snow */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map(p => (
          <span
            key={p.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              filter: "blur(1px)",
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col justify-end px-4 pb-14 sm:px-8 sm:pb-20 max-w-6xl mx-auto">

        <div className="space-y-4 text-center sm:text-left">

          <p className="text-[11px] tracking-[0.3em] text-gray-400">
            ヤシル • TRADING ORDER
          </p>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
            The Edge Is Earned
            <span className="block text-gray-300 font-medium">
              Not Given
            </span>
          </h1>

          <p className="text-gray-300 max-w-xl mx-auto sm:mx-0 text-sm leading-relaxed">
            Markets reward precision, patience, and restraint.
            <br />
            This is a place for those who endure the process.
          </p>

          {/* MOBILE: Watch Now then Discord */}
          <div className="pt-6 flex flex-col gap-4 items-center sm:items-start sm:flex-row">

            {/* Watch Now (mobile visible) */}
            <Link
              href="./components/ProductGrid"

              className="
                sm:hidden
                w-full
                inline-flex
                justify-center
                items-center
                gap-2
                rounded-full
                bg-red-600
                px-6
                py-3
                text-sm
                font-semibold
                text-white
                hover:bg-red-500
                transition
              "
            >
              ▶ Watch Now
            </Link>

            {/* Discord */}
            <Link
              href="https://discord.gg/np7bhdJ6bU"
              target="_blank"
              className="
                inline-flex
                items-center
                justify-center
                gap-3
                rounded-full
                bg-[#5865F2]
                px-12
                py-3
                text-sm
                font-semibold
                text-white
                hover:bg-[#4752C4]
                transition
                w-full
                sm:w-auto
              "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 71 55"
                className="w-5 h-5"
                fill="currentColor"
              >
                <path d="M60.104 4.551A58.589 58.589 0 0 0 46.728 0l-2.065 4.36a54.005 54.005 0 0 1 10.083 2.656A41.074 41.074 0 0 0 34.1 4.346a41.526 41.526 0 0 0-4.274.127 41.017 41.017 0 0 0-18.248 4.294 53.94 53.94 0 0 1 10.083-2.656L24.286 0a58.589 58.589 0 0 0-13.376 4.551C1.5 19.053-1.5 33.349.183 47.488c11.235 8.343 22.251 13.48 33.408 13.48 11.142 0 22.156-5.137 33.392-13.48 1.683-14.139-1.68-28.435-10.079-42.937Z" />
              </svg>
              Join Discord Community
            </Link>

          </div>
        </div>
      </div>

      {/* DESKTOP Watch Now — SAME LEVEL AS CONTENT */}
      <Link
        href="./ProductGrid"
        className="
          hidden
          sm:inline-flex
          items-center
          gap-2
          absolute
          bottom-20
          right-8
          rounded-full
          bg-red-600
          px-6
          py-3
          text-sm
          font-semibold
          text-white
          hover:bg-red-500
          transition
          z-20
        "
      >
        ▶ Watch Now
      </Link>

    </div>
  );
}
