import React, { useState, useEffect } from 'react';
import { BarChart3, Filter, Globe, Map, RefreshCw, Layers, Sliders, Calendar } from 'lucide-react';
import { initialPolicies } from '../data';
import { fetchPolicies } from '../services/api';
import { PolicyDocument } from '../types';
import GlassCard from '../components/GlassCard';

export default function Analytics() {
  const [policies, setPolicies] = useState<PolicyDocument[]>(initialPolicies);
  const [filterCountry, setFilterCountry] = useState('All');
  const [filterYear, setFilterYear] = useState('All');
  const [filterTopic, setFilterTopic] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    async function loadPolicies() {
      const res = await fetchPolicies();
      setPolicies(res);
    }
    loadPolicies();
  }, []);

  // Compute available unique values for filter dropdowns
  const uniqueCountries = ['All', ...Array.from(new Set(policies.map(p => p.country)))];
  const uniqueYears = ['All', ...Array.from(new Set(policies.map(p => p.year.toString())))];
  const uniqueTopics = ['All', ...Array.from(new Set(policies.flatMap(p => p.topics)))];
  const uniqueStatuses = ['All', 'Adopted', 'Proposed', 'Under Review'];

  // Filter application
  const filtered = policies.filter((p) => {
    if (filterCountry !== 'All' && p.country !== filterCountry) return false;
    if (filterYear !== 'All' && p.year.toString() !== filterYear) return false;
    if (filterTopic !== 'All' && !p.topics.includes(filterTopic)) return false;
    if (filterStatus !== 'All' && p.status !== filterStatus) return false;
    return true;
  });

  const resetFilters = () => {
    setFilterCountry('All');
    setFilterYear('All');
    setFilterTopic('All');
    setFilterStatus('All');
  };

  return (
    <div className="space-y-8 pb-20" id="analytics-page">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-white flex items-center gap-2">
            <BarChart3 className="h-7 w-7 text-brand-accent" /> Governance Analytics Dashboard
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Aggregated policy metrics, world heatmaps, and regulatory tightening radar vectors.
          </p>
        </div>
        
        <button
          onClick={resetFilters}
          className="flex items-center gap-1.5 text-xs text-brand-accent border border-brand-accent/20 bg-brand-primary/10 px-3.5 py-2 rounded-xl font-semibold hover:bg-brand-primary/20 transition-all self-start sm:self-center"
        >
          <RefreshCw className="h-3.5 w-3.5" /> Reset All Filters
        </button>
      </div>

      {/* FILTERS CONTROL BAR */}
      <GlassCard hoverEffect={false} className="p-4 flex flex-wrap gap-4 items-center justify-between" id="analytics-filters">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest border-r border-white/5 pr-4 mr-2">
          <Filter className="h-4 w-4 text-brand-accent" /> Filter Matrix
        </div>

        <div className="flex flex-wrap gap-3 flex-1">
          {/* Country select */}
          <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-slate-300">
            <Globe className="h-3.5 w-3.5 text-brand-primary" />
            <select
              value={filterCountry}
              onChange={(e) => setFilterCountry(e.target.value)}
              className="bg-transparent border-0 ring-0 outline-none text-white font-medium cursor-pointer"
            >
              {uniqueCountries.map(c => <option key={c} value={c} className="bg-brand-dark text-white">{c}</option>)}
            </select>
          </div>

          {/* Year select */}
          <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-slate-300">
            <Calendar className="h-3.5 w-3.5 text-brand-accent" />
            <select
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className="bg-transparent border-0 ring-0 outline-none text-white font-medium cursor-pointer"
            >
              {uniqueYears.map(y => <option key={y} value={y} className="bg-brand-dark text-white">{y}</option>)}
            </select>
          </div>

          {/* Topic select */}
          <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-slate-300">
            <Layers className="h-3.5 w-3.5 text-brand-secondary" />
            <select
              value={filterTopic}
              onChange={(e) => setFilterTopic(e.target.value)}
              className="bg-transparent border-0 ring-0 outline-none text-white font-medium cursor-pointer max-w-[150px]"
            >
              {uniqueTopics.map(t => <option key={t} value={t} className="bg-brand-dark text-white">{t}</option>)}
            </select>
          </div>

          {/* Status select */}
          <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-slate-300">
            <Sliders className="h-3.5 w-3.5 text-emerald-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-transparent border-0 ring-0 outline-none text-white font-medium cursor-pointer"
            >
              {uniqueStatuses.map(s => <option key={s} value={s} className="bg-brand-dark text-white">{s}</option>)}
            </select>
          </div>
        </div>

        <div className="text-xs text-slate-400">
          Showing <strong className="text-white font-mono">{filtered.length}</strong> of {initialPolicies.length} policies
        </div>
      </GlassCard>

      {/* DASHBOARD CHARTS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* World Heatmap Visual (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <GlassCard hoverEffect={false} className="p-6">
            <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Map className="h-4 w-4 text-brand-primary" /> Global AI Adoption Heatmap
              </h3>
              <span className="text-[10px] bg-brand-primary/10 border border-brand-primary/20 text-brand-accent px-2 py-0.5 rounded-full font-semibold uppercase tracking-widest">
                Maturity Density
              </span>
            </div>

            {/* Custom stylized graphic representation of a World Map with glowing nodes */}
            <div className="h-72 w-full rounded-xl bg-brand-dark/60 border border-white/5 relative flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />
              
              {/* Fake abstract visual continent groupings */}
              <div className="absolute top-10 left-12 h-20 w-32 rounded-full bg-slate-800/10 border border-white/5 flex items-center justify-center filter blur-md pointer-events-none">NA</div>
              <div className="absolute top-8 right-24 h-24 w-36 rounded-full bg-slate-800/10 border border-white/5 flex items-center justify-center filter blur-md pointer-events-none">EU & Asia</div>
              <div className="absolute bottom-12 left-1/3 h-20 w-24 rounded-full bg-slate-800/10 border border-white/5 flex items-center justify-center filter blur-md pointer-events-none">AF</div>

              {/* Real preloaded glowing country nodes */}
              <div className="absolute top-[28%] left-[20%] text-center">
                <span className="h-3 w-3 bg-blue-500 rounded-full animate-ping absolute" />
                <button 
                  onClick={() => setFilterCountry('United States')}
                  className="h-3 w-3 bg-blue-500 rounded-full relative block hover:scale-125 transition-transform" 
                  title="Select United States"
                />
                <span className="text-[10px] text-white font-mono mt-1 block">USA (85)</span>
              </div>

              <div className="absolute top-[22%] left-[48%] text-center">
                <span className="h-3 w-3 bg-indigo-500 rounded-full animate-ping absolute" />
                <button 
                  onClick={() => setFilterCountry('European Union')}
                  className="h-3 w-3 bg-indigo-500 rounded-full relative block hover:scale-125 transition-transform" 
                  title="Select European Union"
                />
                <span className="text-[10px] text-white font-mono mt-1 block">EU (92)</span>
              </div>

              <div className="absolute top-[24%] right-[38%] text-center">
                <span className="h-3 w-3 bg-teal-400 rounded-full animate-ping absolute" />
                <button 
                  onClick={() => setFilterCountry('United Kingdom')}
                  className="h-3 w-3 bg-teal-400 rounded-full relative block hover:scale-125 transition-transform" 
                  title="Select United Kingdom"
                />
                <span className="text-[10px] text-white font-mono mt-1 block">UK (78)</span>
              </div>

              <div className="absolute top-[42%] right-[32%] text-center">
                <span className="h-3 w-3 bg-cyan-400 rounded-full animate-ping absolute" />
                <button 
                  onClick={() => setFilterCountry('India')}
                  className="h-3 w-3 bg-cyan-400 rounded-full relative block hover:scale-125 transition-transform" 
                  title="Select India"
                />
                <span className="text-[10px] text-white font-mono mt-1 block">IND (72)</span>
              </div>

              <div className="absolute top-[48%] right-[20%] text-center">
                <span className="h-3 w-3 bg-emerald-400 rounded-full animate-ping absolute" />
                <button 
                  onClick={() => setFilterCountry('Singapore')}
                  className="h-3 w-3 bg-emerald-400 rounded-full relative block hover:scale-125 transition-transform" 
                  title="Select Singapore"
                />
                <span className="text-[10px] text-white font-mono mt-1 block">SGP (88)</span>
              </div>

              {/* Map Guide Overlay instructions */}
              <div className="absolute bottom-3 left-3 bg-brand-dark/90 border border-white/10 rounded-lg p-2.5 text-[10px] text-slate-300 max-w-[200px]">
                <strong className="text-white block font-semibold mb-0.5">Interactive Nodes</strong>
                Click on any glowing center node to isolate that region's governance dashboard instantly.
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Comparison Distribution Radar mockup (4 cols) */}
        <div className="lg:col-span-4">
          <GlassCard hoverEffect={false} className="p-6 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
                <h3 className="text-sm font-semibold text-white">Adoption Milestones</h3>
                <span className="text-[10px] text-slate-400">Current Cohort</span>
              </div>

              <div className="space-y-4">
                {filtered.slice(0, 4).map((p) => (
                  <div key={p.id} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-white font-medium truncate max-w-[160px]">{p.title}</span>
                      <span className="font-mono text-brand-accent font-bold">{p.maturityScore}/100</span>
                    </div>
                    {/* SVG progress line */}
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-brand-primary to-brand-accent rounded-full" 
                        style={{ width: `${p.maturityScore}%` }}
                      />
                    </div>
                  </div>
                ))}

                {filtered.length === 0 && (
                  <div className="text-center py-10 text-slate-500 text-xs">
                    No matching policies under selected filters. Clear a category to refresh metrics.
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white/5 rounded-xl border border-white/5 p-3 text-xs text-slate-400 leading-relaxed mt-6">
              <strong className="text-white block mb-0.5">Summary Insight</strong>
              Selected cluster exhibits an average maturity of <span className="text-brand-accent font-bold font-mono">
                {filtered.length > 0 ? (filtered.reduce((acc, c) => acc + c.maturityScore, 0) / filtered.length).toFixed(1) : '0'}%
              </span>. Focus lies mainly on biometric bans and copyright controls.
            </div>
          </GlassCard>
        </div>

      </div>

      {/* FILTERED REGISTRY TABLE */}
      <GlassCard hoverEffect={false} className="p-6">
        <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-3">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <Layers className="h-4 w-4 text-brand-secondary" /> Isolated Governance Registry
          </h3>
          <span className="text-xs text-slate-400">
            Realtime database snapshot
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs text-slate-300">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Country</th>
                <th className="py-3 px-4 text-center">Maturity</th>
                <th className="py-3 px-4 text-center">Risk</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Focus Areas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4 font-semibold text-white max-w-[220px] truncate">{p.title}</td>
                  <td className="py-3 px-4 font-mono">{p.country}</td>
                  <td className="py-3 px-4 text-center font-bold text-emerald-400 font-mono">{p.maturityScore}%</td>
                  <td className="py-3 px-4 text-center font-bold text-rose-400 font-mono">{p.riskScore}%</td>
                  <td className="py-3 px-4">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-bold border ${
                      p.status === 'Adopted' 
                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                        : p.status === 'Under Review' 
                        ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' 
                        : 'bg-brand-primary/10 border-brand-primary/20 text-brand-primary'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1 max-w-[200px]">
                      {p.topics.slice(0, 2).map(t => (
                        <span key={t} className="text-[9px] bg-white/5 text-slate-400 px-1.5 py-0.5 rounded">
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-slate-500 italic">
                    No regulations match the chosen filter configuration. Click reset above.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
