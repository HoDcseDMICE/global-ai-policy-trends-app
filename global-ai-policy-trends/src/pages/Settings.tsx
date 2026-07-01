import React, { useState } from 'react';
import { Settings as SettingsIcon, Sliders, ShieldAlert, Cpu, Bell, CheckCircle2 } from 'lucide-react';
import GlassCard from '../components/GlassCard';

export default function Settings() {
  const [activeModel, setActiveModel] = useState('gemini-flash');
  const [riskMultiplier, setRiskMultiplier] = useState(1.0);
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [sandboxMode, setSandboxMode] = useState(true);
  const [successMsg, setSuccessMsg] = useState('');

  const handleSave = () => {
    setSuccessMsg('Settings saved and synchronized with Tokyo Edge cluster!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <div className="space-y-8 pb-20" id="settings-page">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-display font-bold text-white flex items-center gap-2">
          <SettingsIcon className="h-7 w-7 text-brand-primary" /> Core Engine Settings
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Adjust Gemini inference models, set risk scaling factors, and configure administrative alert pipelines.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Success Banner */}
        {successMsg && (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400 text-xs sm:text-sm font-semibold flex items-center gap-2 animate-bounce">
            <CheckCircle2 className="h-5 w-5" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Inference model selection */}
        <GlassCard hoverEffect={false} className="p-6 space-y-4">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2 border-b border-white/5 pb-2">
            <Cpu className="h-4.5 w-4.5 text-brand-accent" /> Inference Parser Core
          </h3>

          <p className="text-xs text-slate-400 leading-relaxed">
            Select which machine-learning base model powers your document scanning, clause parsing, and entity extraction tasks.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            
            <button
              onClick={() => setActiveModel('gemini-flash')}
              className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                activeModel === 'gemini-flash'
                  ? 'bg-brand-primary/10 border-brand-primary text-white glow-blue'
                  : 'bg-white/5 border-transparent text-slate-400 hover:bg-white/10'
              }`}
            >
              <span className="font-semibold text-xs text-white">Gemini 2.5 Flash (Default)</span>
              <span className="text-[10px] text-slate-400 mt-1 leading-relaxed">Extremely fast inference and sub-second parsing, optimized for high volume.</span>
            </button>

            <button
              onClick={() => setActiveModel('gemini-pro')}
              className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                activeModel === 'gemini-pro'
                  ? 'bg-brand-secondary/10 border-brand-secondary text-white glow-indigo'
                  : 'bg-white/5 border-transparent text-slate-400 hover:bg-white/10'
              }`}
            >
              <span className="font-semibold text-xs text-white">Gemini 2.5 Pro</span>
              <span className="text-[10px] text-slate-400 mt-1 leading-relaxed">Deep reasoning, legal clause audits, and exceptional entity classification accuracy.</span>
            </button>

            <button
              onClick={() => setActiveModel('fine-tuned')}
              className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                activeModel === 'fine-tuned'
                  ? 'bg-brand-accent/20 border-brand-accent/40 text-white glow-cyan'
                  : 'bg-white/5 border-transparent text-slate-400 hover:bg-white/10'
              }`}
            >
              <span className="font-semibold text-xs text-white">Sovereign Fine-tuned ML-v2</span>
              <span className="text-[10px] text-slate-400 mt-1 leading-relaxed">Proprietary model specifically trained on cross-border AI legislation archives.</span>
            </button>

          </div>
        </GlassCard>

        {/* Sliding scales */}
        <GlassCard hoverEffect={false} className="p-6 space-y-4">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2 border-b border-white/5 pb-2">
            <Sliders className="h-4.5 w-4.5 text-brand-primary" /> Risk Multiplier & Scoring Severity
          </h3>

          <p className="text-xs text-slate-400 leading-relaxed">
            Configure the severity calibration used when computing compliance risk indexes. High scales flag more exceptions as high-risk.
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex justify-between text-xs text-slate-300 font-mono">
              <span>Calibration factor:</span>
              <strong className="text-brand-accent">{riskMultiplier.toFixed(1)}x severity</strong>
            </div>
            <input 
              type="range" 
              min="0.5" 
              max="1.5" 
              step="0.1"
              value={riskMultiplier} 
              onChange={(e) => setRiskMultiplier(parseFloat(e.target.value))}
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-accent"
            />
            <div className="flex justify-between text-[9px] text-slate-500 uppercase tracking-widest font-bold">
              <span>Lenient (0.5x)</span>
              <span>Standard (1.0x)</span>
              <span>Aggressive (1.5x)</span>
            </div>
          </div>
        </GlassCard>

        {/* Switches */}
        <GlassCard hoverEffect={false} className="p-6 space-y-4">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2 border-b border-white/5 pb-2">
            <ShieldAlert className="h-4.5 w-4.5 text-brand-secondary" /> Administrative Audit Controls
          </h3>

          <div className="space-y-4 pt-2">
            
            {/* Toggle 1 */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-white block">Real-Time Compliance Alerts</span>
                <span className="text-[10px] text-slate-400 mt-0.5">Push active browser alerts when a major country updates or drafts new laws.</span>
              </div>
              <button 
                onClick={() => setAlertsEnabled(!alertsEnabled)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  alertsEnabled ? 'bg-brand-primary' : 'bg-white/10'
                }`}
              >
                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  alertsEnabled ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>

            {/* Toggle 2 */}
            <div className="flex items-center justify-between border-t border-white/5 pt-4">
              <div>
                <span className="text-xs font-semibold text-white block">Sovereign Sandbox Isolation</span>
                <span className="text-[10px] text-slate-400 mt-0.5">Encrypts, sandboxes, and purges all uploaded drafts locally to prevent memory leakage.</span>
              </div>
              <button 
                onClick={() => setSandboxMode(!sandboxMode)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  sandboxMode ? 'bg-brand-primary' : 'bg-white/10'
                }`}
              >
                <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  sandboxMode ? 'translate-x-5' : 'translate-x-0'
                }`} />
              </button>
            </div>

          </div>
        </GlassCard>

        {/* CTA Save settings */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="px-6 py-3 rounded-xl font-semibold bg-brand-primary hover:bg-blue-600 text-white shadow-lg glow-blue transition-all"
          >
            Save Administrative Settings
          </button>
        </div>

      </div>
    </div>
  );
}
