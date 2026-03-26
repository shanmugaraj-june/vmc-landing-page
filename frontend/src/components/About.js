import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, Globe, Users, TrendingUp } from 'lucide-react';

const milestones = [
  { year: '1994', event: 'Founded in Pune, India' },
  { year: '2002', event: 'Launched first 5-axis VMC' },
  { year: '2010', event: 'ISO 9001 certification' },
  { year: '2018', event: 'Expanded to 14 countries' },
  { year: '2024', event: '500+ installations worldwide' },
];

const pillars = [
  { icon: Award, title: 'Certified Excellence', desc: 'ISO 9001:2015 quality management with stringent in-process inspection protocols at every stage.' },
  { icon: Globe, title: 'Global Reach', desc: 'Serving aerospace, defense, medical and automotive clients across 14 countries with full support.' },
  { icon: Users, title: 'Expert Team', desc: '200+ engineers and technicians dedicated to delivering precision machinery and aftersales service.' },
  { icon: TrendingUp, title: 'Innovation First', desc: 'Continuous R&D investment in smart automation, IoT integration, and energy-efficient spindle systems.' },
];

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="about" className="relative bg-carbon-800 overflow-hidden" ref={ref}>
      {/* Top border */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-steel-600/50 to-transparent" />

      <div className="section-padding max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="section-label">About AXIOM CNC</div>
              <h2 className="section-title mb-6">
                Three Decades of
                <br />
                <span className="text-amber-500">Machine Mastery</span>
              </h2>
              <p className="text-steel-300 text-lg leading-relaxed mb-6">
                Since 1994, AXIOM CNC has been synonymous with precision manufacturing
                equipment. We don't just build machines — we engineer confidence for
                industries where a single micron can mean the difference between
                success and failure.
              </p>
              <p className="text-steel-400 leading-relaxed mb-10">
                Our Vertical Machining Centers are designed from the ground up using
                high-damping Meehanite cast iron, paired with FANUC or Siemens CNC
                controllers and direct-drive spindle technology — delivering consistent
                performance across 50,000+ production hours.
              </p>

              {/* Timeline */}
              <div className="space-y-0 border-l border-steel-700/40 pl-6">
                {milestones.map((m, i) => (
                  <motion.div
                    key={m.year}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="relative pb-6 last:pb-0"
                  >
                    <div className="absolute -left-[25px] top-1 w-2 h-2 bg-amber-500 rotate-45" />
                    <div className="font-mono text-xs text-amber-500 tracking-widest">{m.year}</div>
                    <div className="text-steel-300 text-sm mt-1">{m.event}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — Pillars */}
          <div className="space-y-4">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.12 }}
                className="group metal-card p-6 flex gap-5 hover:border-amber-500/30 transition-all duration-300"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-amber-500/10 border border-amber-500/20 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                  <p.icon size={22} className="text-amber-500" />
                </div>
                <div>
                  <h3 className="font-display font-700 text-white text-lg uppercase tracking-wide mb-2">
                    {p.title}
                  </h3>
                  <p className="text-steel-400 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </motion.div>
            ))}

            {/* Certification badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-3 pt-4"
            >
              {['ISO 9001:2015', 'CE Certified', 'FANUC Partner', 'Siemens Partner', 'Made in India'].map(cert => (
                <span key={cert} className="border border-steel-600/40 bg-steel-800/30 text-steel-400 font-mono text-xs tracking-wider px-3 py-2">
                  {cert}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <div className="h-[1px] bg-gradient-to-r from-transparent via-steel-600/50 to-transparent" />
    </section>
  );
}
