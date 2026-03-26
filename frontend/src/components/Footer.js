import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Youtube, Instagram, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-carbon-900 border-t border-steel-800/50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-7 h-7 bg-amber-500 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-carbon-900 stroke-2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <div>
                <span className="font-display font-800 text-lg text-white tracking-wider uppercase">Axiom</span>
                <span className="font-display font-300 text-lg text-amber-500 tracking-widest uppercase"> CNC</span>
              </div>
            </div>
            <p className="text-steel-500 text-sm leading-relaxed mb-4">
              Engineering Excellence in Every Cut. Premium VMC machines for the world's most demanding industries.
            </p>
            <div className="flex gap-3">
              {[Linkedin, Twitter, Youtube, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 border border-steel-700/50 hover:border-amber-500 flex items-center justify-center text-steel-500 hover:text-amber-500 transition-all">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <div className="font-mono text-xs text-steel-500 tracking-widest uppercase mb-4">Products</div>
            <ul className="space-y-2">
              {['VMC-850', 'VMC-1050', 'VMC-1370', 'HS-24 High Speed', '5-Axis Solutions', 'Custom VMC'].map(p => (
                <li key={p}><a href="#machines" className="text-steel-400 hover:text-amber-400 text-sm transition-colors font-body">{p}</a></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <div className="font-mono text-xs text-steel-500 tracking-widest uppercase mb-4">Company</div>
            <ul className="space-y-2">
              {['About Us', 'Manufacturing Plant', 'Careers', 'Press & Media', 'Certifications', 'CSR'].map(p => (
                <li key={p}><a href="#about" className="text-steel-400 hover:text-amber-400 text-sm transition-colors font-body">{p}</a></li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <div className="font-mono text-xs text-steel-500 tracking-widest uppercase mb-4">Support</div>
            <ul className="space-y-2">
              {['Technical Docs', 'Spare Parts', 'Service Request', 'Training Center', 'AXIOM Connect App', 'Admin Portal'].map(p => (
                <li key={p}>
                  {p === 'Admin Portal' ? (
                    <a href="/admin" className="text-steel-400 hover:text-amber-400 text-sm transition-colors font-body">{p}</a>
                  ) : (
                    <a href="#" className="text-steel-400 hover:text-amber-400 text-sm transition-colors font-body">{p}</a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-steel-800/40 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-steel-600 font-mono text-xs tracking-wider">
            © {new Date().getFullYear()} AXIOM CNC Systems Pvt. Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-steel-600 hover:text-steel-400 font-mono text-xs tracking-wider transition-colors">Privacy Policy</a>
            <a href="#" className="text-steel-600 hover:text-steel-400 font-mono text-xs tracking-wider transition-colors">Terms of Use</a>
            <button
              onClick={scrollToTop}
              className="w-8 h-8 border border-steel-700/50 hover:border-amber-500 flex items-center justify-center text-steel-500 hover:text-amber-500 transition-all"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
