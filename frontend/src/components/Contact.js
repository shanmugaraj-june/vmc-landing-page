import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Send, MapPin, Phone, Mail, Clock, CheckCircle } from 'lucide-react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || '';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await axios.post(`${API_URL}/api/enquiry`, data);
      setSubmitted(true);
      reset();
      toast.success('Enquiry submitted! Our team will contact you within 24 hours.');
    } catch (err) {
      const msg = err.response?.data?.message || 'Something went wrong. Please try again.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative bg-carbon-800 overflow-hidden" ref={ref}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-amber-600/5 rounded-full blur-[120px]" />
      </div>

      <div className="section-padding max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-16"
        >
          <div className="section-label">Get in Touch</div>
          <h2 className="section-title">
            Start Your
            <br />
            <span className="text-amber-500">Precision Journey</span>
          </h2>
          <p className="text-steel-400 mt-4 max-w-xl leading-relaxed">
            Tell us about your machining requirements. Our applications engineers will
            recommend the right VMC configuration — no pressure, just expertise.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form — 3 cols */}
          <div className="lg:col-span-3">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="metal-card p-12 flex flex-col items-center justify-center text-center h-full min-h-[400px]"
              >
                <CheckCircle size={64} className="text-amber-500 mb-6" />
                <h3 className="font-display font-700 text-3xl text-white uppercase mb-4">
                  Enquiry Received
                </h3>
                <p className="text-steel-400 leading-relaxed max-w-sm mb-8">
                  Thank you! Our applications team will review your requirement and reach out
                  within 24 business hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="border border-steel-600 hover:border-amber-500 text-steel-400 hover:text-amber-400 font-mono text-xs tracking-widest uppercase px-8 py-3 transition-all"
                >
                  Submit Another
                </button>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 }}
                onSubmit={handleSubmit(onSubmit)}
                className="metal-card p-8 space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <label className="form-label">Full Name *</label>
                    <input
                      className={`form-input ${errors.name ? 'border-red-500/60' : ''}`}
                      placeholder="Rajesh Kumar"
                      {...register('name', {
                        required: 'Name is required',
                        minLength: { value: 2, message: 'At least 2 characters' }
                      })}
                    />
                    {errors.name && (
                      <span className="text-red-400 font-mono text-xs mt-1 block">{errors.name.message}</span>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="form-label">Phone Number *</label>
                    <input
                      className={`form-input ${errors.phone ? 'border-red-500/60' : ''}`}
                      placeholder="+91 98765 43210"
                      {...register('phone', {
                        required: 'Phone is required',
                        pattern: { value: /^[+]?[\d\s\-()]{8,15}$/, message: 'Enter a valid phone number' }
                      })}
                    />
                    {errors.phone && (
                      <span className="text-red-400 font-mono text-xs mt-1 block">{errors.phone.message}</span>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    className={`form-input ${errors.email ? 'border-red-500/60' : ''}`}
                    placeholder="rajesh@company.com"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email address' }
                    })}
                  />
                  {errors.email && (
                    <span className="text-red-400 font-mono text-xs mt-1 block">{errors.email.message}</span>
                  )}
                </div>

                {/* Company */}
                <div>
                  <label className="form-label">Company Name *</label>
                  <input
                    className={`form-input ${errors.company ? 'border-red-500/60' : ''}`}
                    placeholder="Precision Components Pvt. Ltd."
                    {...register('company', { required: 'Company name is required' })}
                  />
                  {errors.company && (
                    <span className="text-red-400 font-mono text-xs mt-1 block">{errors.company.message}</span>
                  )}
                </div>

                {/* Machine Interest */}
                <div>
                  <label className="form-label">Machine of Interest</label>
                  <select
                    className="form-input"
                    {...register('machineInterest')}
                  >
                    <option value="">Select a machine (optional)</option>
                    <option value="VMC-850">AXIOM VMC-850 — Entry Series</option>
                    <option value="VMC-1050">AXIOM VMC-1050 — Pro Series</option>
                    <option value="VMC-1370">AXIOM VMC-1370 — Elite Series</option>
                    <option value="HS-24">AXIOM HS-24 — High Speed Series</option>
                    <option value="Custom">Custom Requirement</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="form-label">Requirement Details *</label>
                  <textarea
                    rows={4}
                    className={`form-input resize-none ${errors.message ? 'border-red-500/60' : ''}`}
                    placeholder="Describe your machining requirements: materials, tolerances, component types, quantity, timeline, budget range..."
                    {...register('message', {
                      required: 'Please describe your requirement',
                      minLength: { value: 20, message: 'Please provide at least 20 characters' }
                    })}
                  />
                  {errors.message && (
                    <span className="text-red-400 font-mono text-xs mt-1 block">{errors.message.message}</span>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: loading ? 1 : 0.98 }}
                  className={`w-full flex items-center justify-center gap-3 font-display font-700 text-sm tracking-widest uppercase py-4 transition-all ${
                    loading
                      ? 'bg-amber-600/50 text-carbon-900/50 cursor-not-allowed'
                      : 'bg-amber-500 hover:bg-amber-400 text-carbon-900'
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-carbon-900/40 border-t-carbon-900 rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Send Enquiry <Send size={15} />
                    </>
                  )}
                </motion.button>

                <p className="font-mono text-xs text-steel-600 text-center tracking-wider">
                  No spam. No sales pressure. Only expert guidance.
                </p>
              </motion.form>
            )}
          </div>

          {/* Info — 2 cols */}
          <div className="lg:col-span-2 space-y-4">
            {[
              { icon: MapPin, label: 'Headquarters', value: 'Plot 42, MIDC Bhosari\nPune, Maharashtra 411026\nIndia' },
              { icon: Phone, label: 'Sales Hotline', value: '+91 20 2710 8800\n+91 98220 45678' },
              { icon: Mail, label: 'Email', value: 'sales@axiomcnc.com\nsupport@axiomcnc.com' },
              { icon: Clock, label: 'Response Time', value: 'Within 24 business hours\nDemo scheduling: 2-3 days' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.1 }}
                className="metal-card p-5 flex gap-4"
              >
                <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                  <item.icon size={18} className="text-amber-500" />
                </div>
                <div>
                  <div className="font-mono text-xs text-steel-500 tracking-widest mb-2">{item.label}</div>
                  <div className="text-steel-300 text-sm leading-relaxed whitespace-pre-line">{item.value}</div>
                </div>
              </motion.div>
            ))}

            {/* Regions served */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="metal-card p-5"
            >
              <div className="font-mono text-xs text-steel-500 tracking-widest mb-3">REGIONS SERVED</div>
              <div className="flex flex-wrap gap-2">
                {['India', 'UAE', 'Germany', 'USA', 'UK', 'Japan', 'Singapore', 'Australia', 'Canada'].map(r => (
                  <span key={r} className="bg-steel-800/50 border border-steel-700/30 text-steel-400 font-mono text-xs px-2 py-1">
                    {r}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
