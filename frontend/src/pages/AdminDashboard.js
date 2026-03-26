import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import {
  LogOut, Trash2, CheckCircle, Circle, Search,
  RefreshCw, Mail, Phone, Building, MessageSquare,
  Users, Clock, CheckSquare, TrendingUp, ChevronDown, X
} from 'lucide-react';

const API_URL = process.env.REACT_APP_API_URL || '';

const getAuthHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` }
});

export default function AdminDashboard() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const fetchEnquiries = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/enquiry`, getAuthHeaders());
      setEnquiries(res.data);
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.removeItem('adminToken');
        navigate('/admin');
        toast.error('Session expired. Please log in again.');
      } else {
        toast.error('Failed to fetch enquiries.');
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => { fetchEnquiries(); }, [fetchEnquiries]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this enquiry?')) return;
    try {
      await axios.delete(`${API_URL}/api/enquiry/${id}`, getAuthHeaders());
      setEnquiries(prev => prev.filter(e => e._id !== id));
      if (selected?._id === id) setSelected(null);
      toast.success('Enquiry deleted.');
    } catch {
      toast.error('Failed to delete.');
    }
  };

  const handleToggleContacted = async (id, current) => {
    try {
      const res = await axios.patch(
        `${API_URL}/api/enquiry/${id}`,
        { contacted: !current },
        getAuthHeaders()
      );
      setEnquiries(prev => prev.map(e => e._id === id ? res.data : e));
      if (selected?._id === id) setSelected(res.data);
      toast.success(!current ? 'Marked as contacted.' : 'Marked as pending.');
    } catch {
      toast.error('Failed to update status.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
    toast.success('Logged out.');
  };

  const filtered = enquiries.filter(e => {
    const matchSearch = [e.name, e.email, e.company, e.phone]
      .join(' ').toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      filterStatus === 'all' ||
      (filterStatus === 'contacted' && e.contacted) ||
      (filterStatus === 'pending' && !e.contacted);
    return matchSearch && matchStatus;
  });

  const stats = {
    total: enquiries.length,
    pending: enquiries.filter(e => !e.contacted).length,
    contacted: enquiries.filter(e => e.contacted).length,
    today: enquiries.filter(e => {
      const d = new Date(e.createdAt);
      const now = new Date();
      return d.toDateString() === now.toDateString();
    }).length,
  };

  return (
    <div className="min-h-screen bg-carbon-900">
      {/* Top bar */}
      <div className="bg-carbon-800/90 border-b border-steel-800/50 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-7 h-7 bg-amber-500 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-carbon-900 stroke-2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <div>
              <span className="font-display font-800 text-white tracking-wider uppercase">AXIOM</span>
              <span className="font-mono text-xs text-steel-500 ml-3 tracking-widest">ADMIN DASHBOARD</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchEnquiries}
              className="p-2 border border-steel-700/50 hover:border-steel-500 text-steel-500 hover:text-steel-300 transition-all"
              title="Refresh"
            >
              <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
            </button>
            <a href="/" target="_blank" className="font-mono text-xs text-steel-500 hover:text-steel-300 tracking-wider transition-colors hidden md:block">
              View Site →
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 border border-steel-700/50 hover:border-red-500/50 text-steel-500 hover:text-red-400 font-mono text-xs tracking-wider px-4 py-2 transition-all"
            >
              <LogOut size={13} /> Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Users, label: 'Total Enquiries', value: stats.total, color: '#f59e0b' },
            { icon: Clock, label: 'Pending Follow-up', value: stats.pending, color: '#fb923c' },
            { icon: CheckSquare, label: 'Contacted', value: stats.contacted, color: '#34d399' },
            { icon: TrendingUp, label: "Today's Enquiries", value: stats.today, color: '#60a5fa' },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="metal-card p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs text-steel-500 tracking-wider">{s.label}</span>
                <s.icon size={16} style={{ color: s.color }} />
              </div>
              <div className="font-display font-800 text-4xl" style={{ color: s.color }}>
                {loading ? '—' : s.value}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-steel-500" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name, email, company..."
              className="form-input pl-9 w-full"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'pending', 'contacted'].map(f => (
              <button
                key={f}
                onClick={() => setFilterStatus(f)}
                className={`font-mono text-xs tracking-widest uppercase px-5 py-3 border transition-all ${
                  filterStatus === f
                    ? 'bg-amber-500 text-carbon-900 border-amber-500'
                    : 'border-steel-700/50 text-steel-400 hover:border-steel-500'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="metal-card overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-48">
              <div className="w-8 h-8 border-2 border-steel-700 border-t-amber-500 rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-steel-600">
              <MessageSquare size={32} className="mb-3" />
              <span className="font-mono text-sm tracking-wider">No enquiries found</span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-steel-800/60">
                    {['Name / Company', 'Contact', 'Machine', 'Status', 'Date', 'Actions'].map(h => (
                      <th key={h} className="px-5 py-3 text-left font-mono text-xs text-steel-500 tracking-widest">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((e, i) => (
                    <motion.tr
                      key={e._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03 }}
                      onClick={() => setSelected(e)}
                      className={`border-b border-steel-800/30 hover:bg-steel-800/20 cursor-pointer transition-colors ${
                        selected?._id === e._id ? 'bg-amber-500/5 border-l-2 border-l-amber-500' : ''
                      }`}
                    >
                      <td className="px-5 py-4">
                        <div className="font-display font-700 text-white text-sm uppercase tracking-wide">{e.name}</div>
                        <div className="font-mono text-xs text-steel-500 flex items-center gap-1 mt-1">
                          <Building size={10} /> {e.company}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="font-mono text-xs text-steel-400 flex items-center gap-1">
                          <Mail size={10} /> {e.email}
                        </div>
                        <div className="font-mono text-xs text-steel-400 flex items-center gap-1 mt-1">
                          <Phone size={10} /> {e.phone}
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="font-mono text-xs text-amber-400/80 border border-amber-500/20 bg-amber-500/5 px-2 py-1">
                          {e.machineInterest || 'General'}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <button
                          onClick={(ev) => { ev.stopPropagation(); handleToggleContacted(e._id, e.contacted); }}
                          className={`flex items-center gap-1.5 font-mono text-xs tracking-wider border px-3 py-1 transition-all ${
                            e.contacted
                              ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10'
                              : 'text-orange-400 border-orange-500/30 bg-orange-500/5 hover:bg-orange-500/10'
                          }`}
                        >
                          {e.contacted ? <CheckCircle size={11} /> : <Circle size={11} />}
                          {e.contacted ? 'Contacted' : 'Pending'}
                        </button>
                      </td>
                      <td className="px-5 py-4">
                        <span className="font-mono text-xs text-steel-500">
                          {new Date(e.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: '2-digit' })}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <button
                          onClick={(ev) => { ev.stopPropagation(); handleDelete(e._id); }}
                          className="p-2 hover:bg-red-500/10 text-steel-600 hover:text-red-400 transition-all border border-transparent hover:border-red-500/20"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Detail panel */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-6 right-6 w-full max-w-md metal-card border-amber-500/30 p-6 shadow-2xl z-50"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="font-display font-700 text-white text-lg uppercase tracking-wide">{selected.name}</div>
                  <div className="font-mono text-xs text-amber-500 tracking-wider">{selected.company}</div>
                </div>
                <button onClick={() => setSelected(null)} className="text-steel-500 hover:text-white transition-colors p-1">
                  <X size={16} />
                </button>
              </div>

              <div className="space-y-3 mb-4">
                {[
                  { icon: Mail, val: selected.email },
                  { icon: Phone, val: selected.phone },
                  { icon: Building, val: selected.machineInterest || 'General Enquiry' },
                ].map(({ icon: Icon, val }) => (
                  <div key={val} className="flex items-center gap-2 text-sm text-steel-300">
                    <Icon size={13} className="text-steel-500" /> {val}
                  </div>
                ))}
              </div>

              <div className="bg-carbon-900/60 border border-steel-800/40 p-4 mb-4 rounded-none">
                <div className="font-mono text-xs text-steel-500 tracking-widest mb-2">MESSAGE</div>
                <p className="text-steel-300 text-sm leading-relaxed">{selected.message}</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handleToggleContacted(selected._id, selected.contacted)}
                  className={`flex-1 flex items-center justify-center gap-2 font-mono text-xs tracking-widest uppercase py-3 border transition-all ${
                    selected.contacted
                      ? 'border-orange-500/40 text-orange-400 hover:bg-orange-500/10'
                      : 'border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10'
                  }`}
                >
                  {selected.contacted ? <Circle size={12} /> : <CheckCircle size={12} />}
                  {selected.contacted ? 'Mark Pending' : 'Mark Contacted'}
                </button>
                <button
                  onClick={() => handleDelete(selected._id)}
                  className="flex items-center justify-center gap-2 border border-red-500/30 text-red-400 hover:bg-red-500/10 font-mono text-xs tracking-widest uppercase px-4 py-3 transition-all"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
