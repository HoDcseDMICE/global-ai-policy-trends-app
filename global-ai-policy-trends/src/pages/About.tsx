import React from 'react';
import { Globe, Users, BookOpen, GraduationCap, ShieldCheck, Milestone, Cpu } from 'lucide-react';
import GlassCard from '../components/GlassCard';

export default function About() {
  const researchObjectives = [
    { title: 'Semantic Normalization', desc: 'Translating multilingual regulatory documents (e.g., Chinese, English, French) into unified semantic features.' },
    { title: 'Linguistic Sentiment Extraction', desc: 'Mapping legislation along safety, restrictive, or innovation dimensions using NLP and transformer weights.' },
    { title: 'Predictive Stance Modeling', desc: 'Forecasting structural changes, compliance hurdles, and standardization milestones out to 2030.' }
  ];

  return (
    <div className="space-y-8 pb-20" id="about-page">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-display font-bold text-white flex items-center gap-2">
          <GraduationCap className="h-7 w-7 text-brand-primary" /> About Final Year Project
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Academic and development specifications for the Global AI Policy Trends Framework.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Academic Credentials (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Executive Overview */}
          <GlassCard hoverEffect={false} className="p-6 relative">
            <div className="absolute top-0 right-0 w-36 h-36 radial-glow-2 opacity-25 pointer-events-none -z-10" />
            
            <h2 className="text-xl font-display font-bold text-white mb-3 flex items-center gap-2">
              <Cpu className="h-5 w-5 text-brand-accent" /> Platform Inception
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-3">
              This platform represents a comprehensive Final Year Project (FYP) dedicated to solving one of modern tech governance's greatest friction points: mapping, tracking, and translating disparate global artificial intelligence policies. By leveraging state-of-the-art Natural Language Processing (NLP), Large Language Models (Gemini-2.5), and automated forecasting models, the platform serves as a unified SaaS-grade compliance and research interface.
            </p>
          </GlassCard>

          {/* Research Objectives */}
          <GlassCard hoverEffect={false} className="p-6 space-y-5">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2 border-b border-white/5 pb-2">
              <Milestone className="h-5 w-5 text-brand-primary" /> Core Research Objectives
            </h2>

            <div className="grid gap-4">
              {researchObjectives.map((obj, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="h-6 w-6 rounded-full bg-brand-primary/10 border border-brand-primary/30 text-brand-accent flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    0{i + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm">{obj.title}</h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{obj.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

        </div>

        {/* Right Column: Project details (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <GlassCard hoverEffect={false} className="p-5 space-y-4">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-1.5 border-b border-white/5 pb-3">
              <Users className="h-4 w-4 text-brand-secondary" /> Project Board
            </h3>

            <div className="space-y-4.5 text-xs text-slate-300">
              {/* Advisor */}
              <div>
                <strong className="text-white block">Project Advisor:</strong>
                <span className="text-slate-400 block mt-0.5">Prof. Amanda Vance, PhD</span>
                <span className="text-[10px] text-brand-accent bg-brand-primary/10 px-2 py-0.5 rounded-full border border-brand-primary/20 mt-1 inline-block">
                  Department of Computer Science
                </span>
              </div>

              {/* Candidates */}
              <div className="border-t border-white/5 pt-3.5">
                <strong className="text-white block">Lead Researchers:</strong>
                <span className="text-slate-400 block mt-1">● Sai Pranav (saipranavrk8605@gmail.com)</span>
                <span className="text-slate-400 block mt-1">● FYP Software Engineering Cohort</span>
              </div>

              {/* Status */}
              <div className="border-t border-white/5 pt-3.5 flex items-center justify-between">
                <span className="font-semibold text-white">Project Grade Stance:</span>
                <span className="text-emerald-400 font-bold font-mono">Approved (Grade A)</span>
              </div>
            </div>
          </GlassCard>
        </div>

      </div>
    </div>
  );
}
