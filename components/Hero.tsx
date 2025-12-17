'use client';

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 创建更细腻的粒子效果
    const createParticles = () => {
      const count = 80; // 减少数量，更精细
      return Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1.5 + 0.5, // 更小的粒子
        speed: Math.random() * 0.3 + 0.1, // 更慢的速度
        opacity: Math.random() * 0.3 + 0.2, // 更低的透明度
      }));
    };
    
    setParticles(createParticles());

    const interval = setInterval(() => {
      setParticles(prev =>
        prev.map(p => ({
          ...p,
          y: p.y > 100 ? -5 : p.y + p.speed,
          // 轻微的水平摆动，更自然
          x: p.x + (Math.random() - 0.5) * 0.1
        }))
      );
    }, 80); // 更慢的更新间隔

    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-black text-white overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/hero.png"
          alt="Trading background"
          fill
          priority
          sizes="100vw"
          className="object-cover brightness-110"
        />
        {/* 增强的渐变遮罩，更好地突出文字 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
      </div>

      {/* 粒子背景 - 调整为更微妙的"数据流"效果 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map(p => (
          <div
            key={p.id}
            className="absolute rounded-full bg-cyan-500/40" // 使用青色，更符合科技感
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              filter: `blur(${p.size * 0.5}px)`,
              boxShadow: `0 0 ${p.size * 2}px rgba(6, 182, 212, 0.5)` // 添加发光效果
            }}
          />
        ))}
      </div>

      {/* 主要内容容器 - 调整到最底部 */}
      <div className="relative z-10 flex min-h-screen flex-col justify-end px-4 pb-14 sm:px-8 sm:pb-20 max-w-6xl mx-auto">
        
        {/* 文本内容区域 */}
        <div className="space-y-6 text-center sm:text-left mb-8">
          
          {/* 副标题 */}
          <div className="overflow-hidden">
            <p className="text-xs tracking-[0.3em] text-gray-300 opacity-0 animate-slideUp [animation-delay:0.2s] [animation-fill-mode:forwards]">
              ヤシル • TRADING ORDER
            </p>
          </div>

          {/* 主标题 */}
          <div className="overflow-hidden">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight opacity-0 animate-slideUp [animation-delay:0.4s] [animation-fill-mode:forwards]">
              The Edge Is
              <span className="block mt-2 bg-gradient-to-r from-cyan-400 to-white bg-clip-text text-transparent">
                Earned, Not Given
              </span>
            </h1>
          </div>

          {/* 描述文字 */}
          <div className="overflow-hidden">
            <p className="text-gray-300 max-w-xl mx-auto sm:mx-0 text-base sm:text-lg leading-relaxed opacity-0 animate-slideUp [animation-delay:0.6s] [animation-fill-mode:forwards]">
              Markets reward <span className="font-semibold text-cyan-300">precision</span>, 
              <span className="font-semibold text-cyan-300"> patience</span>, and 
              <span className="font-semibold text-cyan-300"> restraint</span>.
              <br />
              This is a place for those who endure the process.
            </p>
          </div>
        </div>

        {/* 按钮区域 - 移动端：Start Learn 在上，Discord 在下 */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 sm:gap-8 pt-6">
          
          {/* Discord 按钮 - 移动端在下，桌面端在左 */}
          <div className="overflow-hidden w-full sm:w-auto opacity-0 animate-slideUp [animation-delay:0.8s] [animation-fill-mode:forwards]">
            <Link
              href="https://discord.gg/np7bhdJ6bU"
              target="_blank"
              rel="noopener noreferrer"
              className="
                group
                inline-flex
                items-center
                justify-center
                gap-3
                rounded-xl
                bg-[#5865F2]
                hover:bg-[#4752C4]
                px-8
                py-4
                text-sm
                font-semibold
                text-white
                transition-all
                duration-300
                w-full
                sm:w-auto
                hover:scale-[1.03]
                hover:shadow-2xl
                hover:shadow-[#5865F2]/30
              "
            >
              {/* Discord 官方风格图标 */}
              <svg
                className="w-6 h-5 group-hover:scale-110 transition-transform"
                viewBox="0 0 127.14 96.36"
                fill="currentColor"
              >
                <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
              </svg>
              <span>Join Discord Community</span>
              <svg className="w-4 h-4 opacity-70 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

          {/* Start Learn 按钮 - 移动端在上，桌面端在右 */}
          <div className="overflow-hidden w-full sm:w-auto opacity-0 animate-slideUp [animation-delay:0.9s] [animation-fill-mode:forwards]">
            <Link
              href="./components/ProductGrid"
              className="
                group
                inline-flex
                items-center
                justify-center
                gap-3
                rounded-xl
                border-2
                border-red-500/40
                bg-gradient-to-r from-red-600 to-rose-700
                px-8
                py-4
                text-sm
                font-semibold
                text-white
                hover:from-red-500 hover:to-rose-600
                transition-all
                duration-300
                w-full
                sm:w-auto
                hover:scale-105
                hover:shadow-2xl
                hover:shadow-red-500/30
                animate-pulse-slow
              "
            >
              <div className="relative w-6 h-6 flex items-center justify-center">
                <div className="absolute w-4 h-4 bg-white rounded-full group-hover:animate-ping"></div>
                <span className="text-lg leading-none">▶</span>
              </div>
              <span>Start Learn</span>
              <svg className="w-4 h-4 opacity-70 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* 添加自定义动画样式 */}
      <style jsx global>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.8s ease-out forwards;
        }
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
            box-shadow: 0 0 20px rgba(239, 68, 68, 0.3);
          }
          50% {
            opacity: 0.9;
            box-shadow: 0 0 30px rgba(239, 68, 68, 0.5);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s infinite;
        }
      `}</style>
    </div>
  );
}
