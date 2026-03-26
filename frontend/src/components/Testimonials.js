import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Rajesh Kulkarni',
    role: 'VP Manufacturing',
    company: 'AeroTech India Pvt. Ltd.',
    industry: 'Aerospace',
    quote: 'We installed three AXIOM VMC-1050 machines for our titanium blade components. After 18 months of continuous operation, the dimensional consistency is phenomenal — within 1.5 microns across all three machines. AXIOM support is equally world-class.',
    rating: 5,
    machines: 'VMC-1050 × 3',
  },
  {
    name: 'Thomas Weber',
    role: 'Head of Production',
    company: 'Precision Defense Systems GmbH',
    industry: 'Defense',
    quote: 'The HS-24 handles our optical mirror blanks with accuracy we simply could not achieve before. The thermal compensation system eliminates afternoon drift entirely. We have now standardized AXIOM across our Munich facility.',
    rating: 5,
    machines: 'HS-24 × 2, VMC-850 × 5',
  },
  {
    name: 'Priya Nair',
    role: 'Technical Director',
    company: 'MedPrecision Components',
    industry: 'Medical Devices',
    quote: 'Medical implants require absolute consistency. The AXIOM HS-24 delivers Ra 0.2 surface finishes straight from the machine on our cobalt-chrome alloys — no rework. The FANUC 31i-MB5 probe cycles are invaluable for in-process verification.',
    rating: 5,
    machines: 'HS-24 × 1',
  },
  {
    name: 'Anand Mehta',
    role: 'Operations Manager',
    company: 'Bharat Auto Components',
    industry: 'Automotive',
    quote: 'Running AXIOM VMC-850s in our cell with a FANUC robot for 20-hour unmanned production. OEE improved from 67% to 89% in 6 months. The IoT monitoring caught a ballscrew wear issue before it caused any scrap. ROI achieved in 14 months.',
    rating: 5,
    machines: 'VMC-850 × 6',
  },
  {
    name: 'Sumit Agarwal',
    role: 'Founder & CEO',
    company: 'Agarwal Toolroom',
    industry: 'Die & Mold',
    quote: 'As a small shop, we needed a machine that would give us large-machine rigidity in a compact footprint. The VMC-1050 box-ways handle our P20 mold steel roughing without chatter. And when we need mirror finish, it delivers that too.',
    rating: 5,
    machines: 'VMC-1050 × 2',
  },
];

const industryColors = {
  Aerospace: '#60a5fa',
  Defense: '#fb923c',
  'Medical Devices': '#34d399',
  Automotive: '#f59e0b',
  'Die & Mold': '#a78bfa',
};

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(c => (c + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent(c => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent(c => (c + 1) % testimonials.length);

  const t = testimonials[current];

  return (
    <section id="testimonials" className="relative bg-carbon-900 overflow-hidden" ref={ref}>
      <div className="h-[1px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

      <div className="section-padding max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="section-label">Client Testimonials</div>
          <h2 className="section-title">
            Trusted by Leaders
            <br />
            <span className="text-amber-500">Across Industries</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main testimonial */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4 }}
                className="metal-card p-8 md:p-10 h-full relative"
              >
                {/* Quote icon */}
                <Quote size={48} className="text-amber-500/20 absolute top-6 right-8" />

                {/* Industry tag */}
                <div
                  className="inline-block font-mono text-xs tracking-[0.3em] uppercase border px-3 py-1 mb-6"
                  style={{ color: industryColors[t.industry], borderColor: `${industryColors[t.industry]}40` }}
                >
                  {t.industry}
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>

                <blockquote className="text-steel-200 text-xl leading-relaxed mb-8 font-body">
                  "{t.quote}"
                </blockquote>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-display font-700 text-white text-lg uppercase tracking-wide">{t.name}</div>
                    <div className="font-mono text-xs text-steel-500 tracking-wider mt-1">{t.role}</div>
                    <div className="font-mono text-xs text-amber-500/80 tracking-wider">{t.company}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-xs text-steel-600 tracking-wider mb-1">MACHINES INSTALLED</div>
                    <div className="font-mono text-sm text-steel-400">{t.machines}</div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center gap-4 mt-8 pt-6 border-t border-steel-800/40">
                  <button
                    onClick={prev}
                    className="w-10 h-10 border border-steel-700/60 hover:border-amber-500 flex items-center justify-center text-steel-400 hover:text-amber-500 transition-all"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={next}
                    className="w-10 h-10 border border-steel-700/60 hover:border-amber-500 flex items-center justify-center text-steel-400 hover:text-amber-500 transition-all"
                  >
                    <ChevronRight size={18} />
                  </button>
                  <div className="flex gap-2 ml-2">
                    {testimonials.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`h-1 rounded-full transition-all duration-300 ${
                          i === current ? 'w-8 bg-amber-500' : 'w-2 bg-steel-700'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Side list */}
          <div className="space-y-3">
            {testimonials.map((t2, i) => (
              <motion.button
                key={t2.name}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.07 }}
                onClick={() => setCurrent(i)}
                className={`w-full text-left p-4 border transition-all duration-300 ${
                  i === current
                    ? 'border-amber-500/50 bg-amber-500/5'
                    : 'border-steel-800/40 bg-steel-900/20 hover:border-steel-600/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-display font-700 text-sm text-white uppercase tracking-wide">
                    {t2.name}
                  </span>
                  <span
                    className="font-mono text-xs px-2 py-0.5 border"
                    style={{
                      color: industryColors[t2.industry],
                      borderColor: `${industryColors[t2.industry]}30`,
                      backgroundColor: `${industryColors[t2.industry]}08`
                    }}
                  >
                    {t2.industry}
                  </span>
                </div>
                <div className="font-mono text-xs text-steel-500 tracking-wider">{t2.company}</div>
              </motion.button>
            ))}

            {/* Numbers box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="bg-amber-500/10 border border-amber-500/20 p-5 mt-4"
            >
              <div className="font-mono text-xs text-amber-500 tracking-widest mb-3">CUSTOMER METRICS</div>
              <div className="space-y-3">
                {[
                  { val: '98.7%', label: 'Customer Satisfaction' },
                  { val: '4.9/5', label: 'Average NPS Score' },
                  { val: '<4hr', label: 'Avg. Response Time' },
                ].map(m => (
                  <div key={m.label} className="flex justify-between items-center">
                    <span className="text-steel-400 text-sm">{m.label}</span>
                    <span className="font-mono text-amber-400 font-500">{m.val}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="h-[1px] bg-gradient-to-r from-transparent via-steel-600/50 to-transparent" />
    </section>
  );
}
