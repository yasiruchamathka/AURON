"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Search,
  ShoppingCart,
  ChevronDown,
  User,
  Home,
  Package,
  CreditCard,
  Phone,
  CheckCircle,
  Plus,
  Minus,
  Trash2,
} from "lucide-react";

import SignInModal from "../app/signin/signin";
import SignUpModal from "../app/signin/signup";
import SearchBar from "../app/SearchBar/SearchBar";

const Navbar: React.FC = () => {
  const menuRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isAuthenticated = false; // <-- replace later with real auth

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [showSigninReminder, setShowSigninReminder] = useState(false);
  const [cartItems, setCartItems] = useState([
    { id: "1", title: "Premium Course", price: 29.99, quantity: 1 },
    { id: "2", title: "E-book Bundle", price: 19.99, quantity: 1 },
  ]);

  const navLinks = [
    { label: "Home", href: "/", icon: Home },
    { label: "Teachings", href: "/products/page", icon: Package },
    { label: "Pricing", href: "/about", icon: CreditCard },
    { label: "Contact", href: "/contact", icon: Phone },
  ];

  const productLinks = [
    { label: "News", href: "/products/polo" },
    { label: "Teachings", href: "/products/new-arrivals" },
  ];

  useEffect(() => {
    const onScroll = () => setHasScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      const timer = setTimeout(() => {
        setShowSigninReminder(true);
      }, 60000); // 1 minute
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 w-full z-50 bg-white transition-all duration-300 ${hasScrolled ? "shadow-md py-1.5" : "py-2.5"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-black hover:opacity-80 transition-opacity duration-300">
            AURON
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.label}
                href={link.href}
                className="relative text-black transition-all duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}

            <div className="relative">
              <button
                onClick={() =>
                  setActiveDropdown(activeDropdown === "products" ? null : "products")
                }
                className="flex items-center text-black hover:text-gray-700 transition-colors duration-300 relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full"
              >
                Products <ChevronDown className="ml-1 w-4 h-4 text-black transition-transform duration-300" />
              </button>

              <AnimatePresence>
                {activeDropdown === "products" && (
                  <motion.div
                    ref={dropdownRef}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute top-full mt-3 w-44 bg-white rounded-xl shadow-lg border border-gray-100"
                  >
                    {productLinks.map(item => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setActiveDropdown(null)}
                        className="block px-4 py-2 text-black hover:bg-gray-50 rounded-lg transition-colors duration-300 relative after:absolute after:left-4 after:right-4 after:-bottom-1 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-[calc(100%-2rem)]"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* DESKTOP ACTIONS */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-black hover:text-gray-700 transition-colors duration-300 p-1.5 hover:bg-gray-100 rounded-full"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative text-black hover:text-gray-700 transition-colors duration-300 p-1.5 hover:bg-gray-100 rounded-full"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-black text-white text-xs w-4 h-4 rounded-full flex items-center justify-center text-[10px]">
                  {totalItems}
                </span>
              )}
            </button>

            {!isAuthenticated ? (
              <button
                onClick={() => setShowLoginModal(true)}
                className="text-sm font-medium text-black border border-black px-4 py-1.5 rounded-full hover:bg-black hover:text-white transition-all duration-300"
              >
                Sign in
              </button>
            ) : (
              <div className="relative">
                <button className="text-black hover:text-gray-700 transition-colors duration-300 p-1.5 hover:bg-gray-100 rounded-full">
                  <User className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-black p-1 hover:bg-gray-100 rounded-full transition-colors duration-300"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* MOBILE POPUP MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="fixed top-16 right-4 z-40 w-60 bg-white rounded-2xl shadow-xl p-3 md:hidden border border-gray-100"
          >
            {isAuthenticated ? (
              <div className="mb-3 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-black" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium text-black text-sm">John Doe</span>
                      <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                    </div>
                    <span className="text-xs text-green-600 font-medium bg-green-50 px-1.5 py-0.5 rounded">Verified</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600">john.doe@example.com</p>
              </div>
            ) : null}

            <div className="space-y-0.5">
              {navLinks.map(link => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2.5 text-black p-2.5 rounded-lg hover:bg-gray-100 transition-all duration-300 text-sm"
                  >
                    <Icon className="w-4 h-4 text-black" />
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="flex justify-between mt-4 pt-3 border-t border-gray-100">
              <button
                onClick={() => {
                  setIsSearchOpen(true);
                  setIsMenuOpen(false);
                }}
                className="flex flex-col items-center gap-0.5 p-2 text-black hover:bg-gray-100 rounded-lg transition-all duration-300 flex-1 relative"
              >
                <Search className="w-4.5 h-4.5" />
                <span className="text-xs">Search</span>
              </button>

              <button
                onClick={() => {
                  setIsCartOpen(true);
                  setIsMenuOpen(false);
                }}
                className="flex flex-col items-center gap-0.5 p-2 text-black hover:bg-gray-100 rounded-lg transition-all duration-300 flex-1 relative"
              >
                <ShoppingCart className="w-4.5 h-4.5" />
                <span className="text-xs">Cart</span>
                {totalItems > 0 && (
                  <span className="absolute top-0.5 right-1.5 bg-black text-white text-[10px] w-3.5 h-3.5 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>

            {!isAuthenticated && (
              <button
                onClick={() => {
                  setShowLoginModal(true);
                  setIsMenuOpen(false);
                }}
                className="mt-3 w-full text-center text-sm font-medium border border-black rounded-lg py-2.5 text-black hover:bg-black hover:text-white transition-all duration-300"
              >
                Sign in to continue
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* SIGN IN REMINDER */}
      <AnimatePresence>
        {showSigninReminder && !isAuthenticated && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-6 right-6 z-50 bg-white shadow-xl rounded-xl p-4 text-black max-w-xs border border-gray-200"
          >
            <div className="flex justify-between items-start mb-2">
              <p className="text-sm font-medium">
                Please sign in to continue and unlock premium access.
              </p>
              <button
                onClick={() => setShowSigninReminder(false)}
                className="ml-2 text-gray-400 hover:text-black transition-colors duration-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={() => {
                setShowSigninReminder(false);
                setShowLoginModal(true);
              }}
              className="mt-3 w-full bg-black text-white py-2 rounded-lg text-sm hover:bg-gray-800 transition-all duration-300"
            >
              Sign in
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CART MODAL - Professional Design */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setIsCartOpen(false)}
            />
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[85vh] overflow-hidden flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <div>
                  <h2 className="text-xl font-bold text-black">Shopping Cart</h2>
                  <p className="text-sm text-gray-600">{cartItems.length} items</p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-gray-400 hover:text-black p-2 hover:bg-gray-100 rounded-full transition-colors duration-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {cartItems.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Your cart is empty</p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="px-6 py-2 border border-black text-black rounded-lg hover:bg-black hover:text-white transition-all duration-300"
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl hover:border-gray-200 transition-all duration-300">
                        {/* Product Image Placeholder */}
                        <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Package className="w-8 h-8 text-gray-400" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-black truncate">{item.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">${item.price.toFixed(2)} each</p>

                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors duration-300"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="w-8 text-center font-medium">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors duration-300"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="flex items-center gap-4">
                              <span className="font-bold text-black">
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="text-red-500 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors duration-300"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {cartItems.length > 0 && (
                <div className="border-t border-gray-100 p-6 bg-gray-50">
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium text-green-600">Free</span>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                      <span className="text-lg font-bold text-black">Total</span>
                      <span className="text-xl font-bold text-black">${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-all duration-300">
                      Proceed to Checkout
                    </button>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="w-full border border-gray-300 text-black py-3 rounded-lg font-medium hover:bg-gray-50 transition-all duration-300"
                    >
                      Continue Shopping
                    </button>
                  </div>

                  <p className="text-center text-xs text-gray-500 mt-4">
                    Secure checkout • 30-day money-back guarantee
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {showLoginModal && (
        <SignInModal
          onClose={() => setShowLoginModal(false)}
          onOpenSignup={() => {
            setShowLoginModal(false);
            setShowSignupModal(true);
          }}
        />

      )}

      {showSignupModal && (
        <SignUpModal
          onClose={() => setShowSignupModal(false)}
          onOpenSignin={() => {
            setShowSignupModal(false);
            setShowLoginModal(true);
          }}
        />

      )}
    </>
  );
};

export default Navbar;
