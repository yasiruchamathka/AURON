"use client";

import { Twitter, Youtube, MessageSquare } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8">

          {/* Brand */}
          <div className="text-center sm:text-left">
            <p className="text-lg font-semibold text-white tracking-tight">
              Auron Trading
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Professional trading education
            </p>
          </div>

          {/* Social */}
          <div className="flex items-center gap-5">
            <a
              href="https://twitter.com/auron_trading"
              target="_blank"
              aria-label="Twitter"
              className="text-gray-400 hover:text-white transition"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="https://youtube.com/@auron_trading"
              target="_blank"
              aria-label="YouTube"
              className="text-gray-400 hover:text-white transition"
            >
              <Youtube className="w-5 h-5" />
            </a>
            <a
              href="https://discord.gg/auron"
              target="_blank"
              aria-label="Discord"
              className="text-gray-400 hover:text-white transition"
            >
              <MessageSquare className="w-5 h-5" />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs text-gray-500 text-center sm:text-right">
            © {new Date().getFullYear()} Auron. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
