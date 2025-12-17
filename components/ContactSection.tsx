"use client";

import { Youtube, Twitter, ArrowRight, Sparkles, Zap, Crown, Check, Star } from "lucide-react";
import { motion } from "framer-motion";

// Custom SVG icons
const DiscordIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 127.14 96.36">
    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
  </svg>
);

const TikTokIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.302.002.6.062.88.18v-3.29a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 5 20.1a6.34 6.34 0 0 0 11.86-3.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const socialChannels = [
  {
    id: 1,
    name: "Discord",
    description: "Join 10,000+ traders",
    icon: DiscordIcon,
    color: "bg-[#5865F2]",
    hoverColor: "hover:bg-[#4752c4]",
    link: "https://discord.gg/auron",
    buttonText: "Join Now"
  },
  {
    id: 2,
    name: "YouTube",
    description: "Tutorials & breakdowns",
    icon: Youtube,
    color: "bg-[#FF0000]",
    hoverColor: "hover:bg-[#cc0000]",
    link: "https://youtube.com/@auron_trading",
    buttonText: "Subscribe"
  },
  {
    id: 3,
    name: "Twitter",
    description: "Real-time updates",
    icon: Twitter,
    color: "bg-[#1DA1F2]",
    hoverColor: "hover:bg-[#1a8cd8]",
    link: "https://twitter.com/auron_trading",
    buttonText: "Follow"
  },
  {
    id: 4,
    name: "TikTok",
    description: "Quick trading tips",
    icon: TikTokIcon,
    color: "bg-black",
    hoverColor: "hover:bg-gray-800",
    link: "https://tiktok.com/@auron_trading",
    buttonText: "Follow"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export default function SocialChannels() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-16 px-4 border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Header with animation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 mb-4">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-blue-700">Community Access</span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Join Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Trading</span> Community
          </h1>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with thousands of successful traders across all platforms
          </p>
        </motion.div>

        {/* Social Grid with staggered animations */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {socialChannels.map((channel) => (
            <motion.div
              key={channel.id}
              variants={itemVariants}
              whileHover={{ 
                y: -8,
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300" />
              
              <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 overflow-hidden">
                {/* Animated background glow */}
                <div className={`absolute inset-0 ${channel.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                {/* Icon & Name in same line */}
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 ${channel.color} rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white">
                      {channel.icon === DiscordIcon || channel.icon === TikTokIcon ? (
                        <channel.icon />
                      ) : (
                        <channel.icon className="w-6 h-6" />
                      )}
                    </div>
                  </div>
                  <span className="font-bold text-gray-900 text-lg">{channel.name}</span>
                </div>

                {/* Small description */}
                <p className="text-gray-600 mb-6">
                  {channel.description}
                </p>

                {/* Button with hover effect */}
                <a
                  href={channel.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`relative w-full block text-center py-3 ${channel.color} ${channel.hoverColor} text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-xl overflow-hidden group/btn`}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {channel.buttonText}
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Premium Discord Section - Discord Colors with Premium Look */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-1.5 rounded-full font-bold text-sm shadow-lg flex items-center gap-2">
              <Star className="w-4 h-4" />
              PREMIUM ACCESS
            </div>
          </div>
          
          <motion.div
            whileHover={{ 
              y: -5,
              transition: { duration: 0.3 }
            }}
            className="bg-white rounded-2xl border-2 border-indigo-300 p-6 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >
            {/* Subtle gradient background effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/20 to-purple-50/10 opacity-0 hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative">
              <div className="flex flex-col md:flex-row md:items-start gap-6 mb-6">
                {/* Left: Icon & Title */}
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <DiscordIcon className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">Premium Discord</h2>
                    <p className="text-gray-600">
                      Exclusive access to our main trading community
                    </p>
                  </div>
                </div>
                
                {/* Right: Pricing */}
                <div className="md:ml-auto">
                  <div className="flex items-baseline gap-3">
                    <div className="text-right">
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-gray-900">$10</span>
                        <span className="text-lg text-gray-400 line-through">$30</span>
                      </div>
                      <span className="inline-block mt-1 bg-gradient-to-r from-green-100 to-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium border border-emerald-200">
                        Save $20 • 67% OFF
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features - Clean list */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider">What's Included:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "Private mentor access",
                    "24/7 chat availability", 
                    "Personal portfolio reviews",
                    "Advanced trading strategies",
                    "Exclusive webinars",
                    "Daily market analysis"
                  ].map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      whileHover={{ x: 3 }}
                      className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-white rounded-lg hover:from-indigo-50 hover:to-indigo-50 transition-all duration-200 group/feature border border-gray-100 hover:border-indigo-200"
                    >
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0 shadow-sm group-hover/feature:shadow-md transition-shadow">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-sm text-gray-700 font-medium group-hover/feature:text-gray-900">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CTA Button - Discord Color Accent */}
              <a
                href="https://discord.gg/auron-premium"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3.5 rounded-lg flex items-center justify-center gap-3 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              >
                <span className="flex items-center gap-2 relative z-10">
                  <Crown className="w-5 h-5" />
                  Get Premium Access Now
                </span>
                <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-2" />
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Animated shine effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000">
                  <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </div>
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Stats footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12 pt-8 border-t border-gray-200"
        >
          <div className="inline-flex items-center gap-2 text-gray-600 mb-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium">10,000+ active traders</span>
          </div>
          <p className="text-gray-500 text-sm">
            Join thousands of successful traders already learning with us
          </p>
        </motion.div>
      </div>
    </div>
  );
}