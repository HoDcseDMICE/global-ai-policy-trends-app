import React from 'react';
import { motion } from 'motion/react';
import { FileSearch, Globe, Brain, FileText, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import GlassCard from './GlassCard';

interface StatCardProps {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  iconName: string;
  key?: React.Key;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FileSearch,
  Globe,
  Brain,
  FileText
};

export default function StatCard({ label, value, change, isPositive, iconName }: StatCardProps) {
  const IconComponent = iconMap[iconName] || Globe;

  return (
    <GlassCard hoverEffect glowColor="blue" className="relative group">
      {/* Decorative backdrop glow */}
      <div className="absolute top-0 right-0 w-32 h-32 radial-glow-1 opacity-40 group-hover:opacity-60 transition-opacity pointer-events-none -z-10" />

      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">{label}</span>
        <div className="p-2.5 rounded-xl bg-gradient-to-tr from-brand-primary/20 to-brand-accent/20 border border-brand-primary/30 text-brand-accent group-hover:scale-110 transition-transform duration-300">
          <IconComponent className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-4 flex items-baseline justify-between">
        <motion.span 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-display font-bold text-white tracking-tight"
        >
          {value}
        </motion.span>
        
        <div className={`flex items-center space-x-0.5 px-2 py-0.5 rounded-full text-xs font-semibold border ${
          isPositive 
            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
            : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
        }`}>
          {isPositive ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
          <span>{change}</span>
        </div>
      </div>

      {/* Mini interactive sparkline-like dots under metric */}
      <div className="mt-4 flex items-center gap-1.5 h-1">
        {Array.from({ length: 6 }).map((_, i) => (
          <div 
            key={i} 
            className={`h-full rounded-full transition-all duration-300 ${
              i === 4 
                ? 'w-6 bg-brand-accent' 
                : 'w-3 bg-white/10 group-hover:bg-white/20'
            }`} 
          />
        ))}
      </div>
    </GlassCard>
  );
}
