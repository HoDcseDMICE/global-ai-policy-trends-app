import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Sparkles, AlertCircle, Compass, RefreshCw, Calendar, Eye } from 'lucide-react';
import { forecastData } from '../data';
import { fetchForecasting } from '../services/api';
import { ForecastMetric } from '../types';
import GlassCard from '../components/GlassCard';

export default function Forecasting() {
  const [forecast, setForecast] = useState<ForecastMetric[]>(forecastData);

  useEffect(() => {
    async function loadForecast() {
      const res = await fetchForecasting();
      setForecast(res);
    }
    loadForecast();
  }, []);

  // Let's draw a beautiful SVG Area Chart representing Policy Growth projections to 2030
  // Chart size will be 600 width, 220 height
  // Points: (year, growthRate)
  const width = 600;
  const height = 180;
  const padding = 25;

  // Map forecast data points to SVG coordinates
  const points = forecast.map((d, i) => {
    const x = padding + (i * (width - 2 * padding)) / (forecast.length - 1);
    // invert y because svg (0,0) is top-left
    const y = height - padding - (d.growthRate * (height - 2 * padding)) / 100;
    return { x, y, year: d.year, val: d.growthRate };
  });

  // Build the path string for SVG Area and Line
  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;

  // Draw supportive vs restrictive lines
  const restrictivePoints = forecast.map((d, i) => {
    const x = padding + (i * (width - 2 * padding)) / (forecast.length - 1);
    const y = height - padding - (d.restrictiveRegulations * (height - 2 * padding)) / 100;
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  const supportivePoints = forecast.map((d, i) => {
    const x = padding + (i * (width - 2 * padding)) / (forecast.length - 1);
    const y = height - padding - (d.supportiveRegulations * (height - 2 * padding)) / 100;
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  return (
    <div className="space-y-8 pb-20" id="forecasting-page">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-display font-bold text-white flex items-center gap-2">
          <TrendingUp className="h-7 w-7 text-brand-primary animate-pulse" /> Trends & Regulatory Forecasting
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Predictive machine learning projections detailing regulatory tightening cycles and governance thresholds through 2030.
        </p>
      </div>

      {/* CORE GRAPH CARD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Large Forecast Area Graph (8 cols) */}
        <div className="lg:col-span-8">
          <GlassCard hoverEffect={false} className="p-6 relative">
            <div className="absolute top-0 right-0 w-44 h-44 radial-glow-1 opacity-30 pointer-events-none -z-10" />
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-white/5 pb-4">
              <div>
                <h3 className="text-sm font-semibold text-white flex items-center gap-1.5">
                  <TrendingUp className="h-4 w-4 text-brand-accent animate-bounce" /> Projected Stance Tightening (2024 - 2030)
                </h3>
                <p className="text-slate-400 text-xs mt-0.5">Weighted risk density algorithm</p>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-4 text-[10px] font-semibold">
                <span className="flex items-center gap-1 text-rose-400">
                  <span className="h-2 w-2 rounded-full bg-rose-500" /> Restrictive
                </span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" /> Supportive
                </span>
                <span className="flex items-center gap-1 text-brand-accent">
                  <span className="h-2 w-2 rounded-full bg-brand-accent" /> Cumulative Growth
                </span>
              </div>
            </div>

            {/* SVG Visual area graph */}
            <div className="w-full h-56 bg-brand-dark/40 rounded-xl border border-white/5 p-2 relative flex items-center justify-center">
              <svg className="w-full h-full" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
                
                {/* Horizontal reference grid lines */}
                {Array.from({ length: 4 }).map((_, i) => {
                  const y = padding + (i * (height - 2 * padding)) / 3;
                  return (
                    <line key={i} x1={padding} y1={y} x2={width - padding} y2={y} stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  );
                })}

                {/* Shaded Area fill for cumulative growth */}
                <motion.path 
                  d={areaPath} 
                  fill="url(#grad-blue)" 
                  opacity="0.12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.12 }}
                  transition={{ duration: 1 }}
                />

                {/* Restrictive (Red) line */}
                <motion.path 
                  d={restrictivePoints} 
                  fill="none" 
                  stroke="#ef4444" 
                  strokeWidth="2.2" 
                  strokeDasharray="4 2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                />

                {/* Supportive (Green) line */}
                <motion.path 
                  d={supportivePoints} 
                  fill="none" 
                  stroke="#10b981" 
                  strokeWidth="2.2" 
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                />

                {/* Cumulative line (Blue) */}
                <motion.path 
                  d={linePath} 
                  fill="none" 
                  stroke="#22d3ee" 
                  strokeWidth="3" 
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />

                {/* Data dots */}
                {points.map((p, i) => (
                  <circle 
                    key={i} 
                    cx={p.x} 
                    cy={p.y} 
                    r="4" 
                    fill="#020617" 
                    stroke="#22d3ee" 
                    strokeWidth="2" 
                    className="cursor-pointer hover:r-6 transition-all"
                  />
                ))}

                {/* Gradients definitions */}
                <defs>
                  <linearGradient id="grad-blue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22d3ee" />
                    <stop offset="100%" stopColor="#020617" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Year label tags overlay */}
              <div className="absolute bottom-1 left-0 right-0 px-8 flex justify-between text-[9px] text-slate-500 font-mono">
                {forecast.map(d => <span key={d.year}>{d.year}</span>)}
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Forecast Confidence indicators (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <GlassCard hoverEffect={false} className="p-5 h-full flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <h3 className="text-sm font-semibold text-white">Algorithm Stats</h3>
                <span className="text-[10px] text-brand-accent bg-brand-primary/10 px-2 py-0.5 rounded font-mono font-bold">ML-F8</span>
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex justify-between items-center bg-white/5 p-2 rounded-xl">
                  <span>Forecast Confidence:</span>
                  <strong className="text-white font-mono">92.4%</strong>
                </div>
                <div className="flex justify-between items-center bg-white/5 p-2 rounded-xl">
                  <span>MSE Loss Deviation:</span>
                  <strong className="text-rose-400 font-mono">0.024</strong>
                </div>
                <div className="flex justify-between items-center bg-white/5 p-2 rounded-xl">
                  <span>Predictive Cluster Sets:</span>
                  <strong className="text-brand-accent font-mono">18 active</strong>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2 text-xs text-slate-400 leading-relaxed pt-6">
              <AlertCircle className="h-4.5 w-4.5 text-brand-accent shrink-0 mt-0.5" />
              <span>
                Projections are modeled via Recurrent Neural Networks analyzing historical compliance drafts back to 2018.
              </span>
            </div>
          </GlassCard>
        </div>

      </div>

      {/* REVOLUTIONARY GOVERNANCE MILESTONES TIMELINE (2025 - 2030) */}
      <GlassCard hoverEffect={false} className="p-6">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2 border-b border-white/5 pb-3 mb-6">
          <Calendar className="h-4 w-4 text-brand-secondary" /> Regulatory Convergence Projections (2025 - 2030)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white/5 border border-white/5 rounded-2xl p-4 space-y-2 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 radial-glow-1 opacity-20 -z-10" />
            <span className="text-[10px] font-mono font-extrabold bg-blue-500/10 text-blue-400 px-2.5 py-0.5 rounded-full border border-blue-500/20">
              Q4 2025
            </span>
            <h4 className="font-semibold text-white text-sm pt-1">Algorithmic Auditing Standards</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Global standardization on algorithm registrations. Third-party auditing certifications become mandatory for models exceeding 10^25 FLOPs compute.
            </p>
          </div>

          <div className="bg-white/5 border border-white/5 rounded-2xl p-4 space-y-2 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 radial-glow-2 opacity-20 -z-10" />
            <span className="text-[10px] font-mono font-extrabold bg-purple-500/10 text-purple-400 px-2.5 py-0.5 rounded-full border border-purple-500/20">
              Q2 2027
            </span>
            <h4 className="font-semibold text-white text-sm pt-1">Immersive Content Watermarking</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Widespread legislative enforcement of cryptographic content provenance. Synthetic media platforms require metadata injections upon generation.
            </p>
          </div>

          <div className="bg-white/5 border border-white/5 rounded-2xl p-4 space-y-2 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 radial-glow-3 opacity-20 -z-10" />
            <span className="text-[10px] font-mono font-extrabold bg-cyan-500/10 text-cyan-400 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
              2030 Projections
            </span>
            <h4 className="font-semibold text-white text-sm pt-1">Fully Converged Global Treaty</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Unified cross-border governance structure resembling a "digital IAEC", establishing safety testing sandboxes for sentient autonomous agents.
            </p>
          </div>

        </div>
      </GlassCard>
    </div>
  );
}
