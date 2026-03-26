import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight } from 'lucide-react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Machines', href: '#machines' },
  { label: 'Features', href: '#features' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-carbon-900/95 backdrop-blur-md border-b border-steel-800/50 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="/"
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-8 h-8 bg-amber-500 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-carbon-900">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
            </div>
            <div>
              <span className="font-display font-800 text-xl text-white tracking-wider uppercase">Axiom</span>
              <span className="font-display font-300 text-xl text-amber-500 tracking-widest uppercase"> CNC</span>
            </div>
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="nav-link font-mono text-xs text-steel-300 hover:text-amber-400 tracking-widest uppercase transition-colors duration-200"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <motion.button
              onClick={() => handleNavClick('#contact')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-amber-500 hover:bg-amber-400 text-carbon-900 font-display font-700 text-xs tracking-widest uppercase px-6 py-3 transition-colors duration-200 flex items-center gap-2"
            >
              Get Quote <ChevronRight size={14} />
            </motion.button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-steel-300 hover:text-white p-1"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 bg-carbon-900/98 backdrop-blur-xl flex flex-col pt-24 px-8"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left font-display font-700 text-3xl text-white hover:text-amber-400 uppercase tracking-wider transition-colors border-b border-steel-800/30 pb-4"
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onClick={() => handleNavClick('#contact')}
                className="bg-amber-500 text-carbon-900 font-display font-700 text-sm tracking-widest uppercase px-8 py-4 mt-4 flex items-center gap-2 w-full justify-center"
              >
                Get Quote <ChevronRight size={16} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
