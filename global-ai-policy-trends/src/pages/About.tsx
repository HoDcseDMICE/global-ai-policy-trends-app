import React from 'react';
import { ShieldCheck, Target, Eye, Cpu, Milestone, Network, Activity, Globe, Database, BarChart, BookOpen, Layers } from 'lucide-react';
import GlassCard from '../components/GlassCard';

export default function About() {
  const coreCapabilities = [
    { title: 'AI Policy Intelligence', icon: BookOpen },
    { title: 'Regulatory Monitoring', icon: Activity },
    { title: 'AI Governance Analytics', icon: BarChart },
    { title: 'Sentiment Analysis', icon: Network },
    { title: 'Compliance Assessment', icon: ShieldCheck },
    { title: 'Policy Similarity Detection', icon: Layers },
    { title: 'Trend Forecasting', icon: Milestone },
    { title: 'Cross-country Benchmarking', icon: Globe },
    { title: 'Document Intelligence', icon: Database },
    { title: 'AI-powered Reporting', icon: Cpu }
  ];

  return (
    <div className="space-y-8 pb-20" id="about-page">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-display font-bold text-white flex items-center gap-2">
           About Polaris AI
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Global AI Policy Intelligence Platform.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Platform Description (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Executive Overview */}
          <GlassCard hoverEffect={false} className="p-6 relative">
            <div className="absolute top-0 right-0 w-36 h-36 radial-glow-2 opacity-25 pointer-events-none -z-10" />
            
            <h2 className="text-xl font-display font-bold text-white mb-3 flex items-center gap-2">
              <Cpu className="h-5 w-5 text-brand-accent" /> Enterprise Intelligence
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-3">
              Polaris AI is an enterprise-grade Artificial Intelligence Policy Intelligence Platform designed to centralize, analyze, monitor, compare, and forecast global AI regulations across jurisdictions.
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-3 mt-4">
              The platform combines Natural Language Processing, Machine Learning, and modern analytics to help governments, enterprises, researchers, and compliance teams understand evolving AI governance worldwide.
            </p>
          </GlassCard>

          {/* Core Capabilities */}
          <GlassCard hoverEffect={false} className="p-6 space-y-5">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2 border-b border-white/5 pb-2">
              <Milestone className="h-5 w-5 text-brand-primary" /> Core Capabilities
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              {coreCapabilities.map((cap, i) => (
                <div key={i} className="flex gap-3 items-center">
                  <div className="h-8 w-8 rounded-full bg-brand-primary/10 border border-brand-primary/30 text-brand-accent flex items-center justify-center shrink-0">
                    <cap.icon className="w-4 h-4" />
                  </div>
                  <h4 className="font-semibold text-white text-sm">{cap.title}</h4>
                </div>
              ))}
            </div>
          </GlassCard>

        </div>

        {/* Right Column: Mission and Vision (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <GlassCard hoverEffect={false} className="p-6 space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-1.5 border-b border-white/5 pb-3">
              <Target className="h-5 w-5 text-brand-secondary" /> Mission
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Empowering organizations with actionable intelligence for responsible AI governance.
            </p>
          </GlassCard>

          <GlassCard hoverEffect={false} className="p-6 space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-1.5 border-b border-white/5 pb-3">
              <Eye className="h-5 w-5 text-emerald-400" /> Vision
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              To become the world's leading AI Policy Intelligence Platform.
            </p>
          </GlassCard>
        </div>

      </div>
    </div>
  );
}
