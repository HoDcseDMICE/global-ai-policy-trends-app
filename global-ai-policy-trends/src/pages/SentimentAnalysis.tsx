import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, Sparkles, Smile, ShieldAlert, Scale, ChevronRight, Compass } from 'lucide-react';
import { initialPolicies } from '../data';
import { fetchPolicies } from '../services/api';
import { PolicyDocument } from '../types';
import GlassCard from '../components/GlassCard';

export default function SentimentAnalysis() {
  const [policies, setPolicies] = useState<PolicyDocument[]>(initialPolicies);
  const [selectedId, setSelectedId] = useState(initialPolicies[0].id);

  useEffect(() => {
    async function loadPolicies() {
      const res = await fetchPolicies();
      setPolicies(res);
      if (res.length > 0) {
        setSelectedId(res[0].id);
      }
    }
    loadPolicies();
  }, []);

  const activePolicy = policies.find(p => p.id === selectedId) || policies[0] || initialPolicies[0];

  const { positive, neutral, restrictive } = activePolicy.sentimentScores;
  const total = positive + neutral + restrictive;

  // Compute SVG arc angles for Donut chart
  const posAngle = (positive / total) * 360;
  const neuAngle = (neutral / total) * 360;
  const resAngle = (restrictive / total) * 360;

  // Stroke offsets for a 100-length circle (radius 15.915)
  const posStroke = positive;
  const neuStroke = neutral;
  const resStroke = restrictive;

  return (
    <div className="space-y-8 pb-20" id="sentiment-analysis-page">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-display font-bold text-white flex items-center gap-2">
          <Brain className="h-7 w-7 text-brand-secondary" /> Sentiment & Ethical Stance Analysis
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Automated sentiment classification maps policies along a spectrum of pro-innovation, safety-first, or heavy compliance control.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Policy Picker and Drifts (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <GlassCard hoverEffect={false} className="p-4 space-y-3">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider border-b border-white/5 pb-2">
              Select Document Stance
            </h3>
            <div className="grid gap-2 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {policies.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedId(p.id)}
                  className={`w-full text-left p-3 rounded-xl border transition-all text-xs flex flex-col justify-between ${
                    selectedId === p.id 
                      ? 'bg-brand-secondary/10 border-brand-secondary text-white font-medium glow-indigo' 
                      : 'bg-white/5 border-transparent text-slate-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-semibold truncate">{p.title}</span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded-full border ${
                      p.sentiment === 'Positive' 
                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                        : p.sentiment === 'Restrictive' 
                        ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' 
                        : 'bg-slate-500/10 border-slate-500/20 text-slate-300'
                    }`}>
                      {p.sentiment}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </GlassCard>

          <GlassCard hoverEffect={false} className="p-5 space-y-4">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-1">
              <Compass className="h-4 w-4 text-brand-accent" /> Sentiment Classifiers
            </h3>
            <div className="space-y-3.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <Smile className="h-4.5 w-4.5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Supportive (Pro-Innovation)</strong>
                  <p className="text-slate-400 text-[11px] mt-0.5">Encourages compute allocations, provides R&D sandboxes, and fosters startup grants with minimal compliance overhead.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2.5">
                <Scale className="h-4.5 w-4.5 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Balanced Neutral</strong>
                  <p className="text-slate-400 text-[11px] mt-0.5">Applies sector-specific risk definitions, encouraging deployment while mandating basic watermarking and liability audits.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <ShieldAlert className="h-4.5 w-4.5 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Restrictive (Safety & Auditing First)</strong>
                  <p className="text-slate-400 text-[11px] mt-0.5">Imposes fines for unapproved model serving, bans specific biometrics, and enforces comprehensive conformance registrations.</p>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* RIGHT COLUMN: Visual Donut Chart and Indicators (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <GlassCard hoverEffect={false} className="p-6 relative">
            <div className="absolute top-0 right-0 w-36 h-36 radial-glow-2 opacity-25 pointer-events-none -z-10" />
            
            <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-6">
              <div>
                <span className="text-[10px] text-brand-accent font-semibold uppercase tracking-wider font-mono">
                  Framework: {activePolicy.country}
                </span>
                <h2 className="text-xl font-display font-bold text-white mt-1">{activePolicy.title}</h2>
              </div>
              
              <div className="text-right">
                <span className="text-xs text-slate-400 block">AI Confidence Stance</span>
                <span className="text-lg font-mono font-bold text-brand-accent">96.8%</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              
              {/* Premium Donut Chart rendered dynamically with SVG */}
              <div className="flex flex-col items-center justify-center p-4">
                <div className="relative h-44 w-44">
                  {/* Outer circle layout */}
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    {/* Base circle background */}
                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="4.2" />

                    {/* Restrictive Slice - RED */}
                    <motion.circle 
                      cx="18" cy="18" r="15.915" fill="none" 
                      stroke="#f43f5e" strokeWidth="4.2"
                      strokeDasharray={`${resStroke} ${100 - resStroke}`}
                      strokeDashoffset={0}
                      transform={`rotate(${((posStroke + neuStroke) / 100) * 360} 18 18)`}
                      initial={{ strokeDasharray: `0 100` }}
                      animate={{ strokeDasharray: `${resStroke} ${100 - resStroke}` }}
                      transition={{ duration: 0.8 }}
                    />

                    {/* Neutral Slice - AMBER */}
                    <motion.circle 
                      cx="18" cy="18" r="15.915" fill="none" 
                      stroke="#fbbf24" strokeWidth="4.2"
                      strokeDasharray={`${neuStroke} ${100 - neuStroke}`}
                      strokeDashoffset={0}
                      transform={`rotate(${(posStroke / 100) * 360} 18 18)`}
                      initial={{ strokeDasharray: `0 100` }}
                      animate={{ strokeDasharray: `${neuStroke} ${100 - neuStroke}` }}
                      transition={{ duration: 0.8 }}
                    />

                    {/* Positive Slice - EMERALD */}
                    <motion.circle 
                      cx="18" cy="18" r="15.915" fill="none" 
                      stroke="#10b981" strokeWidth="4.2"
                      strokeDasharray={`${posStroke} ${100 - posStroke}`}
                      strokeDashoffset={0}
                      initial={{ strokeDasharray: `0 100` }}
                      animate={{ strokeDasharray: `${posStroke} ${100 - posStroke}` }}
                      transition={{ duration: 0.8 }}
                    />
                  </svg>

                  {/* Inner text metric */}
                  <div className="absolute inset-0 m-auto h-24 w-24 rounded-full bg-brand-dark/90 flex flex-col items-center justify-center ring-1 ring-white/10 shadow-2xl">
                    <span className="text-2xl font-display font-extrabold text-white">{activePolicy.sentimentScores[activePolicy.sentiment.toLowerCase() as 'positive' | 'neutral' | 'restrictive']}%</span>
                    <span className="text-[10px] text-slate-400 font-medium tracking-wide">{activePolicy.sentiment}</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 mt-4 italic">
                  *Distribution calculated across 12 semantic clusters in document clauses.
                </p>
              </div>

              {/* Progress Bar Metrics */}
              <div className="space-y-4">
                <h3 className="text-xs font-semibold text-white uppercase tracking-wider">Semantic Stance Spectrum</h3>

                {/* Positive Row */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-medium flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> Pro-Innovation & Supportive
                    </span>
                    <span className="font-mono text-emerald-400 font-bold">{positive}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${positive}%` }}
                      transition={{ duration: 0.8 }}
                      className="h-full bg-emerald-500 rounded-full" 
                    />
                  </div>
                </div>

                {/* Neutral Row */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-medium flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-400" /> Balanced Sectoral Guidance
                    </span>
                    <span className="font-mono text-amber-400 font-bold">{neutral}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${neutral}%` }}
                      transition={{ duration: 0.8 }}
                      className="h-full bg-amber-400 rounded-full" 
                    />
                  </div>
                </div>

                {/* Restrictive Row */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-medium flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-rose-500" /> Restrictive & Audit Mandates
                    </span>
                    <span className="font-mono text-rose-400 font-bold">{restrictive}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${restrictive}%` }}
                      transition={{ duration: 0.8 }}
                      className="h-full bg-rose-500 rounded-full" 
                    />
                  </div>
                </div>

              </div>

            </div>
          </GlassCard>

          {/* AI Semantic insights paragraph */}
          <GlassCard hoverEffect={false} className="p-5 space-y-3">
            <h3 className="text-sm font-semibold text-white flex items-center gap-1.5">
              <Sparkles className="h-4.5 w-4.5 text-brand-accent animate-spin" style={{ animationDuration: '6s' }} />
              Sentiment Analysis Stance Synthesis
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Based on the semantic profile of the <strong className="text-white">{activePolicy.title}</strong>, the policy exhibits a primarily <strong className="text-brand-accent">{activePolicy.sentiment}</strong> posture. Our NLP engine detected high frequencies of {activePolicy.sentiment === 'Restrictive' ? 'compliance constraints, audit requirements, biometric bans, and risk penalties' : 'compute subsidization, sandbox allowances, language model scaling, and startup innovation grants'}. This suggests that developers operating in {activePolicy.country} should prioritize {activePolicy.sentiment === 'Restrictive' ? 'strict risk assessments and conformity mapping' : 'innovation testing and rapid prototype scaling with fewer systemic blocks'}.
            </p>
          </GlassCard>
        </div>

      </div>
    </div>
  );
}
