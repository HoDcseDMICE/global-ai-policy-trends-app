import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Cpu, 
  ShieldCheck, 
  AlertTriangle, 
  Layers, 
  BookOpen, 
  Sparkles, 
  RefreshCw, 
  ArrowRight,
  TrendingUp,
  Fingerprint,
  Users
} from 'lucide-react';

import { initialPolicies } from '../data';
import { PolicyDocument } from '../types';
import { fetchPolicies, analyzeText } from '../services/api';
import GlassCard from '../components/GlassCard';

export default function PolicyAnalysis() {
  const location = useLocation();
  const [policies, setPolicies] = useState<PolicyDocument[]>(initialPolicies);
  const [selectedPolicy, setSelectedPolicy] = useState<PolicyDocument>(initialPolicies[0]);
  const [customText, setCustomText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Load policies from backend
  useEffect(() => {
    async function loadPolicies() {
      const res = await fetchPolicies();
      setPolicies(res);
      // Select first policy if not guided by navigation
      if (!location.state || !(location.state as any).selectedPolicyId) {
        if (res.length > 0) {
          setSelectedPolicy(res[0]);
        }
      }
    }
    loadPolicies();
  }, []);

  // Check if navigate passed a specific policy from another page
  useEffect(() => {
    if (location.state && (location.state as any).selectedPolicyId) {
      const found = policies.find(p => p.id === (location.state as any).selectedPolicyId);
      if (found) {
        setSelectedPolicy(found);
      }
    }
  }, [location.state, policies]);

  const handleSelectPolicy = (p: PolicyDocument) => {
    setSelectedPolicy(p);
    setErrorMsg('');
  };

  // Live real-time analysis using `/api/analyze` or a beautiful high-fidelity smart generator
  const runCustomAnalysis = async () => {
    if (!customText.trim()) return;
    setIsAnalyzing(true);
    setErrorMsg('');

    try {
      const customResult = await analyzeText(customText);
      setSelectedPolicy(customResult);
      // Prepend to current session list
      setPolicies(prev => [customResult, ...prev]);
    } catch (e: any) {
      console.error('Analysis error:', e);
      setErrorMsg('Failed to run analysis. Running offline fallback...');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8 pb-20" id="policy-analysis-page">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-display font-bold text-white flex items-center gap-2">
          <FileText className="h-7 w-7 text-brand-primary" /> AI Document Analysis
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Perform syntactic reviews, risk score compilations, and recommended compliance maps for global frameworks.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Input and Document selection (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Select preloaded Document */}
          <GlassCard hoverEffect={false} className="p-4 space-y-4">
            <h2 className="text-sm font-semibold text-white uppercase tracking-wider border-b border-white/5 pb-2">
              Select Framework
            </h2>
            <div className="grid gap-2 max-h-72 overflow-y-auto pr-1">
              {policies.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleSelectPolicy(p)}
                  className={`w-full text-left p-2.5 rounded-xl transition-all border text-xs flex flex-col ${
                    selectedPolicy.id === p.id 
                      ? 'bg-brand-primary/10 border-brand-primary text-white font-medium glow-blue' 
                      : 'bg-white/5 border-transparent text-slate-300 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-semibold truncate">{p.title}</span>
                    <span className="text-[9px] text-slate-500 font-mono shrink-0 ml-1">{p.countryCode}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 line-clamp-1">{p.summary}</span>
                </button>
              ))}
            </div>
          </GlassCard>

          {/* Direct Draft Tester */}
          <GlassCard hoverEffect={false} className="p-4 space-y-3">
            <h2 className="text-sm font-semibold text-white uppercase tracking-wider border-b border-white/5 pb-2 flex items-center justify-between">
              <span>Paste Custom Draft</span>
              <Sparkles className="h-4 w-4 text-brand-accent animate-pulse" />
            </h2>
            <textarea
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="Paste regulatory clauses, company AI guidelines, or compliance rules to generate detailed ratings and actionable audits..."
              rows={5}
              className="w-full bg-brand-dark/50 border border-white/10 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent resize-none transition-all"
            />
            <button
              onClick={runCustomAnalysis}
              disabled={isAnalyzing || !customText.trim()}
              className="w-full bg-brand-primary hover:bg-blue-600 disabled:opacity-50 text-white font-semibold text-xs py-2.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="h-3.5 w-3.5 animate-spin" /> Analyzing Framework...
                </>
              ) : (
                <>
                  <Cpu className="h-3.5 w-3.5" /> Run AI Analysis Engine
                </>
              )}
            </button>
          </GlassCard>

        </div>

        {/* RIGHT COLUMN: AI analysis metrics (8 cols) */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            {isAnalyzing ? (
              <motion.div
                key="analyzing-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-96 flex flex-col items-center justify-center space-y-4 text-center glass-panel rounded-2xl border border-white/10 p-6"
              >
                <div className="relative">
                  <div className="h-16 w-16 rounded-full border-4 border-brand-primary/20 border-t-brand-accent animate-spin" />
                  <Sparkles className="h-6 w-6 text-brand-accent absolute inset-0 m-auto animate-pulse" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Gemini Semantic Analysis Pipeline</h3>
                  <p className="text-xs text-slate-400 mt-1 max-w-sm">
                    Parsing legal syntax, calculating risk indexes, extracting regulatory agencies, and aligning with global governance standards...
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={selectedPolicy.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                
                {/* Header Summary Card */}
                <GlassCard hoverEffect={false} className="p-6 relative">
                  <div className="absolute top-0 right-0 w-44 h-44 radial-glow-2 opacity-35 -z-10 pointer-events-none" />
                  
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-mono font-bold bg-brand-primary/10 border border-brand-primary/20 text-brand-accent px-3 py-1 rounded-full uppercase tracking-wider">
                      {selectedPolicy.country}
                    </span>
                    <span className="text-xs text-slate-500 font-semibold flex items-center gap-1">
                      Release Year: <strong className="text-white font-mono">{selectedPolicy.year}</strong>
                    </span>
                  </div>

                  <h2 className="text-2xl font-display font-bold text-white tracking-tight">{selectedPolicy.title}</h2>
                  <p className="text-slate-300 text-sm mt-3 leading-relaxed">{selectedPolicy.summary}</p>
                </GlassCard>

                {/* Score Indicators Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Policy Maturity Gauge */}
                  <GlassCard hoverEffect={false} className="p-5 flex items-center gap-5">
                    <div className="relative h-20 w-20 shrink-0 flex items-center justify-center">
                      {/* SVG circle track */}
                      <svg className="absolute w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="16" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                        <motion.circle 
                          cx="18" cy="18" r="16" fill="none" 
                          stroke="#10b981" strokeWidth="3" 
                          strokeDasharray="100"
                          initial={{ strokeDashoffset: 100 }}
                          animate={{ strokeDashoffset: 100 - selectedPolicy.maturityScore }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                        />
                      </svg>
                      <div className="text-center">
                        <span className="text-xl font-display font-extrabold text-white">{selectedPolicy.maturityScore}</span>
                        <span className="text-[9px] text-slate-400 block -mt-1">/100</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-white flex items-center gap-1.5">
                        <ShieldCheck className="h-4 w-4 text-emerald-400" /> Policy Maturity Score
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        Evaluates regulatory precision, auditability, operational guidelines, and coverage of foundation model guidelines.
                      </p>
                    </div>
                  </GlassCard>

                  {/* Policy Risk Index */}
                  <GlassCard hoverEffect={false} className="p-5 flex items-center gap-5">
                    <div className="relative h-20 w-20 shrink-0 flex items-center justify-center">
                      <svg className="absolute w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="16" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                        <motion.circle 
                          cx="18" cy="18" r="16" fill="none" 
                          stroke="#ef4444" strokeWidth="3" 
                          strokeDasharray="100"
                          initial={{ strokeDashoffset: 100 }}
                          animate={{ strokeDashoffset: 100 - selectedPolicy.riskScore }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                        />
                      </svg>
                      <div className="text-center">
                        <span className="text-xl font-display font-extrabold text-white">{selectedPolicy.riskScore}</span>
                        <span className="text-[9px] text-slate-400 block -mt-1">/100</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-white flex items-center gap-1.5">
                        <AlertTriangle className="h-4 w-4 text-rose-400" /> Restrictiveness & Penalty Risk
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        Measures administrative hurdles, technical sandboxes exclusion, and financial penalty structures of compliance.
                      </p>
                    </div>
                  </GlassCard>

                </div>

                {/* Topics, Keywords & Entities Extraction */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Topics panel */}
                  <GlassCard hoverEffect={false} className="p-4 space-y-3">
                    <h3 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-1.5">
                      <Layers className="h-4 w-4 text-brand-primary" /> Key Focus Areas
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedPolicy.topics.map((t) => (
                        <span key={t} className="text-[10px] bg-brand-primary/10 border border-brand-primary/20 text-blue-300 px-2.5 py-1 rounded-lg">
                          {t}
                        </span>
                      ))}
                    </div>
                  </GlassCard>

                  {/* Entities panel */}
                  <GlassCard hoverEffect={false} className="p-4 space-y-3">
                    <h3 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-1.5">
                      <Users className="h-4 w-4 text-brand-secondary" /> Regulatory Bodies
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedPolicy.entities.map((e) => (
                        <span key={e} className="text-[10px] bg-brand-secondary/10 border border-brand-secondary/20 text-indigo-300 px-2.5 py-1 rounded-lg">
                          {e}
                        </span>
                      ))}
                    </div>
                  </GlassCard>

                  {/* Keywords panel */}
                  <GlassCard hoverEffect={false} className="p-4 space-y-3">
                    <h3 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-1.5">
                      <Fingerprint className="h-4 w-4 text-brand-accent" /> Semantic Tags
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedPolicy.keywords.map((k) => (
                        <span key={k} className="text-[10px] bg-brand-accent/10 border border-brand-accent/20 text-cyan-300 px-2.5 py-1 rounded-lg">
                          #{k}
                        </span>
                      ))}
                    </div>
                  </GlassCard>

                </div>

                {/* AI Compliance Recommendations */}
                <GlassCard hoverEffect={false} className="p-6 space-y-4">
                  <h3 className="text-base font-semibold text-white flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-brand-accent" /> Actionable Compliance Recommendations
                  </h3>
                  <div className="grid gap-3.5">
                    {selectedPolicy.recommendations.map((rec, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="h-5 w-5 rounded-full bg-brand-primary/10 border border-brand-primary/30 text-brand-accent flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                          {i + 1}
                        </div>
                        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">{rec}</p>
                      </div>
                    ))}
                  </div>
                </GlassCard>

              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
