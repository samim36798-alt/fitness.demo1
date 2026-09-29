import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Dumbbell, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenTour: () => void;
  onOpenJoin: (tier?: 'starter' | 'pro' | 'elite') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTour, onOpenJoin }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Programs', href: '#programs' },
    { name: 'Schedule', href: '#classes' },
    { name: 'Trainers', href: '#trainers' },
    { name: 'Membership', href: '#membership' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 px-4 md:px-10 ${
          isScrolled
            ? 'glass-panel py-3 shadow-lg shadow-black/40 border-b border-[#242834]'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Gym Name Brand Logo with Entry Animation */}
          <a href="#home" className="flex items-center gap-2.5 group cursor-pointer">
            {/* Dumbbell Icon with Spin-in Animation */}
            <motion.div
              initial={{ rotate: -180, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, type: 'spring', stiffness: 200 }}
              whileHover={{ rotate: 15, scale: 1.08 }}
              className="w-10 h-10 bg-[#CCFF00] flex items-center justify-center rounded-sm shadow-[0_0_15px_rgba(204,255,0,0.4)]"
            >
              <Dumbbell className="w-5 h-5 text-black stroke-[2.5]" />
            </motion.div>

            {/* Gym Name with Cascading Entry Animation */}
            <div className="flex flex-col">
              <motion.div
                initial={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
                className="font-display text-2xl font-bold tracking-wider text-white leading-none flex items-center"
              >
                <span>IRON</span>
                <span className="text-[#CCFF00] drop-shadow-[0_0_10px_rgba(204,255,0,0.5)]">
                  FORGE
                </span>
              </motion.div>
              <motion.span
                initial={{ opacity: 0, letterSpacing: '0.1em' }}
                animate={{ opacity: 1, letterSpacing: '0.25em' }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-[9px] text-gray-400 font-semibold leading-tight tracking-[0.25em]"
              >
                FITNESS
              </motion.span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-7 text-sm font-medium tracking-wide text-gray-300">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-[#CCFF00] transition-colors duration-200 cursor-pointer text-xs font-semibold uppercase tracking-wider"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenTour}
              className="px-4 py-2 rounded-sm border border-[#242834] text-xs font-bold tracking-wider text-gray-200 hover:border-[#CCFF00] hover:text-[#CCFF00] transition-all duration-300 cursor-pointer"
            >
              BOOK TOUR
            </button>
            <button
              onClick={() => onOpenJoin('pro')}
              className="px-5 py-2 rounded-sm bg-[#CCFF00] text-black text-xs font-extrabold tracking-wider hover:bg-white hover:shadow-[0_0_20px_rgba(204,255,0,0.4)] transition-all duration-300 cursor-pointer flex items-center gap-1.5"
            >
              <span>JOIN NOW</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setIsMobileOpen(true)}
            aria-label="Toggle Mobile Menu"
            className="lg:hidden text-white hover:text-[#CCFF00] p-1 focus:outline-none cursor-pointer"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="fixed inset-0 bg-[#070709]/98 z-[60] backdrop-blur-xl flex flex-col justify-between p-6 sm:p-8 lg:hidden"
          >
            {/* Drawer Header with Gym Name */}
            <div className="flex items-center justify-between border-b border-[#242834] pb-5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#CCFF00] flex items-center justify-center rounded-sm">
                  <Dumbbell className="w-4 h-4 text-black stroke-[2.5]" />
                </div>
                <span className="font-display text-xl font-bold tracking-wider text-white">
                  IRON<span className="text-[#CCFF00]">FORGE</span>
                </span>
              </div>
              <button
                onClick={() => setIsMobileOpen(false)}
                aria-label="Close Mobile Navigation"
                className="text-gray-400 hover:text-white p-1 cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Nav Links */}
            <div className="flex flex-col gap-4 font-display text-xl text-gray-200 my-auto">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="hover:text-[#CCFF00] transition-colors py-1"
                >
                  {link.name.toUpperCase()}
                </a>
              ))}
            </div>

            {/* Mobile CTAs */}
            <div className="flex flex-col gap-3 pt-6 border-t border-[#242834]">
              <button
                onClick={() => {
                  setIsMobileOpen(false);
                  onOpenJoin('pro');
                }}
                className="w-full py-3.5 bg-[#CCFF00] text-black font-extrabold tracking-wider text-center rounded-sm hover:bg-white transition-colors cursor-pointer"
              >
                JOIN NOW
              </button>
              <button
                onClick={() => {
                  setIsMobileOpen(false);
                  onOpenTour();
                }}
                className="w-full py-3 border border-[#242834] text-white font-bold tracking-wider text-center rounded-sm hover:border-[#CCFF00] hover:text-[#CCFF00] transition-colors cursor-pointer"
              >
                BOOK A TOUR
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
