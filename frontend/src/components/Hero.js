import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ArrowRight, Cpu, Shield, Zap } from 'lucide-react';

const stats = [
  { value: '±0.001mm', label: 'Positional Accuracy' },
  { value: '24,000', label: 'Max RPM Spindle' },
  { value: '30+', label: 'Years Experience' },
  { value: '500+', label: 'Machines Installed' },
];

export default function Hero() {
  const scrollToSection = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-carbon-900 grid-overlay noise-bg">
      {/* Animated background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-steel-800/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-amber-600/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-steel-900/30 rounded-full blur-[150px]" />
      </div>

      {/* Top accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent origin-left"
      />

      {/* Main content */}
      <div className="flex-1 flex items-center max-w-7xl mx-auto w-full px-6 md:px-12 pt-28 pb-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center w-full">
          {/* Left content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-3"
            >
              <div className="h-[1px] w-12 bg-amber-500" />
              <span className="font-mono text-amber-500 text-xs tracking-[0.3em] uppercase">
                Precision · Power · Performance
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <h1 className="font-display font-900 text-6xl md:text-8xl leading-none uppercase text-white">
                Engineer
                <br />
                <span className="shimmer-text">Excellence</span>
                <br />
                <span className="text-amber-500">In Every</span>
                <br />
                Cut.
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="font-body text-steel-300 text-lg leading-relaxed max-w-lg"
            >
              AXIOM CNC manufactures world-class Vertical Machining Centers engineered
              for aerospace, defense, and automotive industries — where tolerance is not
              negotiable.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.85 }}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                onClick={() => scrollToSection('#machines')}
                whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(245,158,11,0.4)' }}
                whileTap={{ scale: 0.97 }}
                className="bg-amber-500 text-carbon-900 font-display font-700 text-sm tracking-widest uppercase px-8 py-4 flex items-center gap-2 transition-all"
              >
                Explore Machines <ArrowRight size={16} />
              </motion.button>
              <motion.button
                onClick={() => scrollToSection('#contact')}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="border border-steel-600 hover:border-amber-500 text-steel-300 hover:text-amber-400 font-display font-600 text-sm tracking-widest uppercase px-8 py-4 flex items-center gap-2 transition-all"
              >
                Request Demo
              </motion.button>
            </motion.div>

            {/* Quick badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex flex-wrap gap-3"
            >
              {[
                { icon: Shield, text: 'ISO 9001:2015' },
                { icon: Cpu, text: 'FANUC Controls' },
                { icon: Zap, text: '5-Axis Ready' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 bg-steel-800/40 border border-steel-700/30 px-3 py-2">
                  <Icon size={13} className="text-amber-500" />
                  <span className="font-mono text-xs text-steel-400 tracking-wider">{text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right - Machine visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative hidden lg:flex items-center justify-center"
          >
            {/* Machine SVG Illustration */}
            <div className="relative w-full max-w-xl">
              {/* Outer glow ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border border-amber-500/10 border-dashed"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-8 rounded-full border border-steel-600/20 border-dashed"
              />

              {/* Machine body */}
              <motion.div
                animate={{ y: [-8, 8, -8] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-10"
              >
                <VMCIllustration />
              </motion.div>

              {/* Floating spec cards */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
                className="absolute -left-8 top-16 bg-carbon-800/90 border border-amber-500/30 px-4 py-3 backdrop-blur-sm"
              >
                <div className="font-mono text-xs text-steel-400 tracking-wider">SPINDLE SPEED</div>
                <div className="font-display font-700 text-xl text-amber-400">24,000 RPM</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4 }}
                className="absolute -right-8 bottom-24 bg-carbon-800/90 border border-steel-600/30 px-4 py-3 backdrop-blur-sm"
              >
                <div className="font-mono text-xs text-steel-400 tracking-wider">ACCURACY</div>
                <div className="font-display font-700 text-xl text-white">±0.001<span className="text-sm">mm</span></div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="border-t border-steel-800/50 bg-carbon-800/40 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-steel-700/40">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 + i * 0.1 }}
                className="md:px-8 text-center md:text-left"
              >
                <div className="font-display font-700 text-2xl text-amber-400">{stat.value}</div>
                <div className="font-mono text-xs text-steel-500 tracking-wider mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollToSection('#about')}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-steel-600 hover:text-amber-500 transition-colors"
      >
        <ChevronDown size={24} />
      </motion.button>
    </section>
  );
}

function VMCIllustration() {
  return (
    <svg viewBox="0 0 400 480" xmlns="http://www.w3.org/2000/svg" className="w-full">
      {/* Base / Table */}
      <rect x="60" y="390" width="280" height="60" rx="2" fill="#1a2332" stroke="#334e68" strokeWidth="1.5"/>
      <rect x="80" y="410" width="240" height="20" rx="1" fill="#243b53" stroke="#486581" strokeWidth="1"/>
      {/* T-slots on table */}
      {[100, 140, 180, 220, 260, 300].map(x => (
        <rect key={x} x={x} y="414" width="6" height="12" rx="1" fill="#102a43"/>
      ))}

      {/* Column */}
      <rect x="160" y="80" width="80" height="320" rx="2" fill="#162030" stroke="#2d4a66" strokeWidth="1.5"/>
      <rect x="170" y="100" width="60" height="280" rx="1" fill="#1a2b3e" stroke="#334e68" strokeWidth="1"/>

      {/* Y-axis linear guides on column */}
      <rect x="162" y="90" width="6" height="300" fill="#243b53"/>
      <rect x="232" y="90" width="6" height="300" fill="#243b53"/>

      {/* Spindle head / Z-axis carriage */}
      <motion.g
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <rect x="140" y="160" width="120" height="90" rx="2" fill="#1e3045" stroke="#486581" strokeWidth="1.5"/>
        <rect x="155" y="175" width="90" height="60" rx="2" fill="#243b53"/>

        {/* Spindle motor */}
        <ellipse cx="200" cy="220" rx="28" ry="28" fill="#102a43" stroke="#627d98" strokeWidth="2"/>
        <ellipse cx="200" cy="220" rx="20" ry="20" fill="#0d1f2e" stroke="#486581" strokeWidth="1"/>
        <ellipse cx="200" cy="220" rx="10" ry="10" fill="#1a2b3e" stroke="#627d98" strokeWidth="1"/>
        {/* Spindle shaft */}
        <rect x="196" y="248" width="8" height="40" rx="3" fill="#627d98"/>
        {/* Tool holder */}
        <path d="M190 285 L200 320 L210 285 Z" fill="#f59e0b" stroke="#d97706" strokeWidth="1"/>

        {/* Coolant nozzles */}
        <line x1="175" y1="270" x2="185" y2="295" stroke="#486581" strokeWidth="2"/>
        <line x1="225" y1="270" x2="215" y2="295" stroke="#486581" strokeWidth="2"/>

        {/* Amber glow on spindle */}
        <ellipse cx="200" cy="300" rx="15" ry="8" fill="#f59e0b" opacity="0.15"/>
      </motion.g>

      {/* Top cover / enclosure top */}
      <rect x="100" y="50" width="200" height="40" rx="3" fill="#162030" stroke="#2d4a66" strokeWidth="1.5"/>
      <rect x="115" y="60" width="170" height="20" rx="1" fill="#1a2b3e"/>

      {/* Side panel */}
      <rect x="60" y="90" width="100" height="300" rx="2" fill="#111d29" stroke="#243b53" strokeWidth="1"/>

      {/* Control panel on side */}
      <rect x="70" y="200" width="80" height="120" rx="2" fill="#1a2b3e" stroke="#334e68" strokeWidth="1"/>
      <rect x="75" y="208" width="70" height="50" rx="1" fill="#0d1f2e"/>
      {/* Screen glow */}
      <rect x="76" y="209" width="68" height="48" rx="1" fill="#1a4a6e" opacity="0.6"/>
      {/* Green status lights */}
      <circle cx="82" cy="270" r="4" fill="#22c55e"/>
      <circle cx="95" cy="270" r="4" fill="#f59e0b"/>
      <circle cx="108" cy="270" r="4" fill="#ef4444"/>
      {/* Buttons */}
      {[82, 100, 118, 136].map(x => (
        <rect key={x} x={x} y="285" width="12" height="8" rx="2" fill="#243b53" stroke="#334e68" strokeWidth="0.5"/>
      ))}

      {/* Right side panel */}
      <rect x="240" y="90" width="100" height="300" rx="2" fill="#111d29" stroke="#243b53" strokeWidth="1"/>

      {/* Tool magazine (ATC) */}
      <circle cx="290" cy="160" r="40" fill="#162030" stroke="#334e68" strokeWidth="1.5"/>
      <circle cx="290" cy="160" r="30" fill="#1a2b3e" stroke="#486581" strokeWidth="1"/>
      {/* Tool pockets around ATC */}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
        const x = 290 + 25 * Math.cos(angle);
        const y = 160 + 25 * Math.sin(angle);
        return (
          <circle key={i} cx={x} cy={y} r={4} fill={i % 3 === 0 ? '#f59e0b' : '#243b53'} stroke="#486581" strokeWidth="0.5"/>
        );
      })}
      <circle cx="290" cy="160" r="8" fill="#102a43" stroke="#627d98" strokeWidth="1"/>

      {/* Chip tray */}
      <rect x="65" y="385" width="270" height="8" rx="1" fill="#243b53" stroke="#334e68" strokeWidth="1"/>

      {/* Labels */}
      <text x="200" y="470" textAnchor="middle" fill="#627d98" fontSize="9" fontFamily="JetBrains Mono">AXIOM VMC-1050</text>
      <text x="200" y="480" textAnchor="middle" fill="#486581" fontSize="7" fontFamily="JetBrains Mono">VERTICAL MACHINING CENTER</text>

      {/* Ambient glow effect */}
      <ellipse cx="200" cy="390" rx="100" ry="10" fill="#f59e0b" opacity="0.05"/>
    </svg>
  );
}
