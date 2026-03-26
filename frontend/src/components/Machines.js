import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronRight, Settings, Cpu, Maximize } from 'lucide-react';

const machines = [
  {
    id: 'vmc-850',
    name: 'AXIOM VMC-850',
    tagline: 'Compact Powerhouse',
    badge: 'ENTRY SERIES',
    badgeColor: 'text-steel-400 border-steel-600',
    color: '#627d98',
    description: 'Ideal for small-to-medium components. High-speed machining with rigid column design for consistent performance in job shops and toolrooms.',
    specs: {
      'Table Size': '900 × 500 mm',
      'Travel (X/Y/Z)': '850 / 500 / 500 mm',
      'Spindle Speed': '10,000 RPM',
      'Spindle Taper': 'BT-40',
      'Rapid Traverse': '36 m/min',
      'Tool Magazine': '24 tools (ATC)',
      'Controller': 'FANUC Oi-MF',
      'Weight': '7,500 kg',
    },
    highlight: '10,000 RPM',
    highlightLabel: 'Max Spindle',
  },
  {
    id: 'vmc-1050',
    name: 'AXIOM VMC-1050',
    tagline: 'Industrial Workhorse',
    badge: 'PRO SERIES',
    badgeColor: 'text-amber-500 border-amber-600',
    color: '#f59e0b',
    description: 'The industry-proven choice. Meehanite cast iron base with box-way guideways deliver superior rigidity for heavy-duty milling and complex contouring.',
    specs: {
      'Table Size': '1,100 × 550 mm',
      'Travel (X/Y/Z)': '1,050 / 550 / 550 mm',
      'Spindle Speed': '15,000 RPM',
      'Spindle Taper': 'BT-40/50',
      'Rapid Traverse': '48 m/min',
      'Tool Magazine': '32 tools (ATC)',
      'Controller': 'FANUC 0i-MF Plus',
      'Weight': '11,000 kg',
    },
    highlight: '15,000 RPM',
    highlightLabel: 'Max Spindle',
    featured: true,
  },
  {
    id: 'vmc-1370',
    name: 'AXIOM VMC-1370',
    tagline: 'Heavy-Duty Giant',
    badge: 'ELITE SERIES',
    badgeColor: 'text-emerald-400 border-emerald-600',
    color: '#34d399',
    description: 'Built for large aerospace and defense components. High-torque inline spindle with 40+ tool magazine and full 4th axis table support.',
    specs: {
      'Table Size': '1,400 × 700 mm',
      'Travel (X/Y/Z)': '1,370 / 700 / 700 mm',
      'Spindle Speed': '12,000 RPM',
      'Spindle Taper': 'BT-50',
      'Rapid Traverse': '36 m/min',
      'Tool Magazine': '40 tools (ATC)',
      'Controller': 'Siemens 828D',
      'Weight': '19,500 kg',
    },
    highlight: '40 Tools',
    highlightLabel: 'ATC Capacity',
  },
  {
    id: 'vmc-hs24',
    name: 'AXIOM HS-24',
    tagline: 'High-Speed Precision',
    badge: 'HSM SERIES',
    badgeColor: 'text-purple-400 border-purple-600',
    color: '#a78bfa',
    description: 'Designed for die & mold, medical implants, and optical components. Direct-drive spindle at 24,000 RPM with linear scale feedback for micron accuracy.',
    specs: {
      'Table Size': '900 × 500 mm',
      'Travel (X/Y/Z)': '900 / 500 / 450 mm',
      'Spindle Speed': '24,000 RPM',
      'Spindle Taper': 'HSK-A63',
      'Rapid Traverse': '60 m/min',
      'Tool Magazine': '30 tools (ATC)',
      'Controller': 'FANUC 31i-MB5',
      'Weight': '9,000 kg',
    },
    highlight: '24,000 RPM',
    highlightLabel: 'Direct Drive',
  },
];

export default function Machines() {
  const [active, setActive] = useState('vmc-1050');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  const activeMachine = machines.find(m => m.id === active);

  return (
    <section id="machines" className="relative bg-carbon-900 overflow-hidden" ref={ref}>
      <div className="h-[1px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

      <div className="section-padding max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="section-label">Machine Portfolio</div>
          <h2 className="section-title">
            Built for the World's
            <br />
            <span className="text-amber-500">Most Demanding Jobs</span>
          </h2>
          <p className="text-steel-400 mt-4 max-w-2xl mx-auto leading-relaxed">
            Four series, one mission: zero compromise on precision, rigidity, and reliability.
          </p>
        </motion.div>

        {/* Machine selector tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {machines.map((m, i) => (
            <motion.button
              key={m.id}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08 }}
              onClick={() => setActive(m.id)}
              className={`px-6 py-3 font-display font-700 text-sm tracking-widest uppercase transition-all duration-300 ${
                active === m.id
                  ? 'bg-amber-500 text-carbon-900'
                  : 'border border-steel-700/60 text-steel-400 hover:border-steel-500 hover:text-steel-200'
              }`}
            >
              {m.name.replace('AXIOM ', '')}
            </motion.button>
          ))}
        </div>

        {/* Active machine detail */}
        <AnimatePresence mode="wait">
          {activeMachine && (
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid lg:grid-cols-2 gap-8 items-start"
            >
              {/* Machine card */}
              <div className="metal-card p-8 relative overflow-hidden">
                {/* Background glow */}
                <div
                  className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] opacity-10"
                  style={{ background: activeMachine.color }}
                />

                <div className="relative z-10">
                  <div className={`inline-block font-mono text-xs tracking-[0.3em] uppercase border px-3 py-1 mb-4 ${activeMachine.badgeColor}`}>
                    {activeMachine.badge}
                  </div>
                  <h3 className="font-display font-800 text-3xl text-white uppercase mb-2">
                    {activeMachine.name}
                  </h3>
                  <p className="text-steel-400 mb-6 leading-relaxed">{activeMachine.description}</p>

                  {/* Big stat */}
                  <div className="border-l-2 pl-4 mb-8" style={{ borderColor: activeMachine.color }}>
                    <div className="font-display font-800 text-5xl" style={{ color: activeMachine.color }}>
                      {activeMachine.highlight}
                    </div>
                    <div className="font-mono text-xs text-steel-500 tracking-wider mt-1">
                      {activeMachine.highlightLabel}
                    </div>
                  </div>

                  {/* Machine SVG mini illustration */}
                  <div className="bg-carbon-900/60 border border-steel-800/40 p-6 flex items-center justify-center h-48 mb-6">
                    <MiniMachineIcon color={activeMachine.color} />
                    <div className="ml-6 text-center">
                      <div className="font-mono text-xs text-steel-500 tracking-widest">FOOTPRINT</div>
                      <div className="font-display font-700 text-2xl text-white mt-1">
                        {activeMachine.specs['Table Size']}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' })}
                      className="flex-1 bg-amber-500 hover:bg-amber-400 text-carbon-900 font-display font-700 text-sm tracking-widest uppercase py-3 flex items-center justify-center gap-2 transition-colors"
                    >
                      Get Quote <ChevronRight size={15} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' })}
                      className="border border-steel-600 hover:border-steel-400 text-steel-400 hover:text-steel-200 font-display font-600 text-sm tracking-widest uppercase px-6 py-3 transition-all"
                    >
                      Brochure
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Specs table */}
              <div className="metal-card p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Settings size={16} className="text-amber-500" />
                  <span className="font-mono text-xs text-amber-500 tracking-[0.3em] uppercase">
                    Technical Specifications
                  </span>
                </div>

                <div className="space-y-0">
                  {Object.entries(activeMachine.specs).map(([key, val], i) => (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex justify-between items-center py-3 border-b border-steel-800/40 last:border-0 group"
                    >
                      <span className="font-mono text-xs text-steel-500 tracking-wider group-hover:text-steel-400 transition-colors">
                        {key}
                      </span>
                      <span className="font-mono text-sm font-500 text-amber-400">{val}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Controller icons */}
                <div className="mt-6 pt-6 border-t border-steel-800/40">
                  <div className="font-mono text-xs text-steel-500 tracking-widest mb-3">COMPATIBLE WITH</div>
                  <div className="flex flex-wrap gap-2">
                    {['FANUC', 'Siemens', 'Mitsubishi', 'Heidenhain'].map(ctrl => (
                      <span key={ctrl} className="bg-steel-800/40 border border-steel-700/30 text-steel-400 font-mono text-xs px-3 py-1">
                        {ctrl}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="h-[1px] bg-gradient-to-r from-transparent via-steel-600/50 to-transparent" />
    </section>
  );
}

function MiniMachineIcon({ color }) {
  return (
    <svg viewBox="0 0 120 140" className="w-24 h-28">
      <rect x="20" y="100" width="80" height="20" rx="1" fill="#1a2332" stroke="#334e68" strokeWidth="1"/>
      <rect x="40" y="20" width="40" height="85" rx="1" fill="#162030" stroke={color} strokeWidth="1"/>
      <rect x="30" y="50" width="60" height="40" rx="1" fill="#1e3045" stroke={color} strokeWidth="1.5"/>
      <circle cx="60" cy="75" r="12" fill="#102a43" stroke={color} strokeWidth="1.5"/>
      <circle cx="60" cy="75" r="6" fill="#0d1f2e" stroke={color} strokeWidth="1"/>
      <rect x="57" y="87" width="6" height="15" rx="2" fill={color} opacity="0.8"/>
      <ellipse cx="60" cy="100" rx="12" ry="3" fill={color} opacity="0.1"/>
    </svg>
  );
}
