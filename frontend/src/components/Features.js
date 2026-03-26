import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Target, Zap, Bot, Thermometer, Shield, BarChart2, Layers, Radio } from 'lucide-react';

const features = [
  {
    icon: Target,
    title: 'Micron Precision',
    desc: 'Linear scale feedback with ±0.001mm positional accuracy. Pre-loaded ballscrews eliminate backlash for mirror-finish contouring.',
    metric: '±0.001mm',
    metricLabel: 'Accuracy',
    color: '#f59e0b',
  },
  {
    icon: Zap,
    title: 'High-Speed Spindle',
    desc: 'Built-in motorized spindles from 10,000 to 24,000 RPM. Ceramic hybrid bearings with oil-air lubrication for thermal stability.',
    metric: '24,000',
    metricLabel: 'Max RPM',
    color: '#60a5fa',
  },
  {
    icon: Bot,
    title: 'Smart Automation',
    desc: 'FANUC Robot-ready interface. Pallet changers, bar feeders, and collaborative robot integration for unmanned night operations.',
    metric: '24/7',
    metricLabel: 'Unmanned Ops',
    color: '#a78bfa',
  },
  {
    icon: Thermometer,
    title: 'Thermal Compensation',
    desc: 'Real-time thermal error compensation using 32 temperature sensors across the structure. Drift under 1μm over 8-hour cycles.',
    metric: '<1μm',
    metricLabel: 'Thermal Drift',
    color: '#34d399',
  },
  {
    icon: Shield,
    title: 'Rigid Structure',
    desc: 'FEA-optimized Meehanite cast iron with box-way or linear-way options. Vibration damping up to 3× better than competitor machines.',
    metric: '3×',
    metricLabel: 'Better Damping',
    color: '#fb923c',
  },
  {
    icon: BarChart2,
    title: 'IoT Monitoring',
    desc: 'Real-time spindle load, axis performance, and alarm history streaming via built-in OPC-UA server. MTConnect compatible.',
    metric: 'Real-time',
    metricLabel: 'Data Streaming',
    color: '#f472b6',
  },
  {
    icon: Layers,
    title: '5-Axis Ready',
    desc: 'Optional 4th and 5th axis rotary table packages. RTCP (Rotation Tool Center Point) for complex aerospace component machining.',
    metric: '5-Axis',
    metricLabel: 'Optional',
    color: '#38bdf8',
  },
  {
    icon: Radio,
    title: 'Remote Diagnostics',
    desc: 'AXIOM Connect app provides remote monitoring, predictive maintenance alerts, and on-call engineer video support 24/7.',
    metric: '24/7',
    metricLabel: 'Support',
    color: '#4ade80',
  },
];

export default function Features() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="features" className="relative bg-carbon-800 overflow-hidden" ref={ref}>
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-[100px]" />
        <div className="absolute right-0 top-1/4 w-64 h-64 bg-steel-600/10 rounded-full blur-[80px]" />
      </div>

      <div className="section-padding max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-16"
        >
          <div className="section-label">Core Capabilities</div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="section-title">
              Engineering Features
              <br />
              <span className="text-amber-500">That Matter</span>
            </h2>
            <p className="text-steel-400 max-w-md leading-relaxed md:text-right">
              Every AXIOM machine is engineered with features that translate directly into better parts, 
              faster cycle times, and lower cost per component.
            </p>
          </div>
        </motion.div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.07 }}
              className="group metal-card p-6 hover:border-opacity-60 transition-all duration-300 cursor-default"
              style={{ '--feature-color': f.color }}
            >
              {/* Icon */}
              <div
                className="w-10 h-10 flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                style={{ backgroundColor: `${f.color}15`, border: `1px solid ${f.color}30` }}
              >
                <f.icon size={18} style={{ color: f.color }} />
              </div>

              {/* Big metric */}
              <div className="mb-3">
                <span className="font-display font-800 text-2xl" style={{ color: f.color }}>
                  {f.metric}
                </span>
                <span className="font-mono text-xs text-steel-500 ml-2 tracking-wider">{f.metricLabel}</span>
              </div>

              <h3 className="font-display font-700 text-white text-lg uppercase tracking-wide mb-3">
                {f.title}
              </h3>
              <p className="text-steel-500 text-sm leading-relaxed group-hover:text-steel-400 transition-colors">
                {f.desc}
              </p>

              {/* Bottom accent line on hover */}
              <div
                className="h-[2px] mt-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, ${f.color}, transparent)` }}
              />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-12 bg-gradient-to-r from-steel-900/80 to-carbon-900/80 border border-amber-500/20 p-8 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <div className="font-display font-700 text-2xl text-white uppercase tracking-wide">
              Want to see it in action?
            </div>
            <div className="text-steel-400 mt-1">Schedule a live machining demo at our facility.</div>
          </div>
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(245,158,11,0.3)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' })}
            className="bg-amber-500 hover:bg-amber-400 text-carbon-900 font-display font-700 text-sm tracking-widest uppercase px-10 py-4 whitespace-nowrap transition-all"
          >
            Book a Demo
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
