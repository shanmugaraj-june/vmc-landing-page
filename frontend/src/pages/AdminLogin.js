import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Lock, User, Eye, EyeOff, ShieldCheck } from 'lucide-react';

const API_URL = process.env.REACT_APP_API_URL || '';

export default function AdminLogin() {
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, data);
      localStorage.setItem('adminToken', res.data.token);
      toast.success('Access granted.');
      navigate('/admin/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-carbon-900 grid-overlay flex items-center justify-center px-4">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-steel-800/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-amber-600/10 rounded-full blur-[80px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-16 h-16 bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto mb-4"
          >
            <ShieldCheck size={32} className="text-amber-500" />
          </motion.div>
          <h1 className="font-display font-800 text-3xl text-white uppercase tracking-wide">
            Admin Access
          </h1>
          <p className="font-mono text-xs text-steel-500 tracking-widest mt-2">
            AXIOM CNC · RESTRICTED PORTAL
          </p>
        </div>

        <div className="metal-card p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Username */}
            <div>
              <label className="form-label">Username</label>
              <div className="relative">
                <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-steel-500" />
                <input
                  className={`form-input pl-9 ${errors.username ? 'border-red-500/60' : ''}`}
                  placeholder="admin"
                  {...register('username', { required: 'Username required' })}
                />
              </div>
              {errors.username && (
                <span className="text-red-400 font-mono text-xs mt-1 block">{errors.username.message}</span>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="form-label">Password</label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-steel-500" />
                <input
                  type={showPass ? 'text' : 'password'}
                  className={`form-input pl-9 pr-10 ${errors.password ? 'border-red-500/60' : ''}`}
                  placeholder="••••••••"
                  {...register('password', { required: 'Password required' })}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-steel-500 hover:text-steel-300"
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errors.password && (
                <span className="text-red-400 font-mono text-xs mt-1 block">{errors.password.message}</span>
              )}
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: 0.97 }}
              className={`w-full flex items-center justify-center gap-3 font-display font-700 text-sm tracking-widest uppercase py-4 transition-all mt-2 ${
                loading ? 'bg-amber-600/50 cursor-not-allowed text-carbon-900/50' : 'bg-amber-500 hover:bg-amber-400 text-carbon-900'
              }`}
            >
              {loading ? (
                <><div className="w-4 h-4 border-2 border-carbon-900/40 border-t-carbon-900 rounded-full animate-spin" /> Authenticating...</>
              ) : (
                <><Lock size={15} /> Access Dashboard</>
              )}
            </motion.button>
          </form>
        </div>

        <div className="text-center mt-6">
          <a href="/" className="font-mono text-xs text-steel-600 hover:text-steel-400 tracking-widest transition-colors">
            ← BACK TO WEBSITE
          </a>
        </div>
      </motion.div>
    </div>
  );
}
