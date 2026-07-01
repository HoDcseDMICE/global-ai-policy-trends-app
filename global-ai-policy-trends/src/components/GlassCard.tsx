import React from 'react';
import { motion } from 'motion/react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  hoverEffect?: boolean;
  glowColor?: 'blue' | 'indigo' | 'cyan' | 'none';
  onClick?: () => void;
  key?: React.Key;
}

export default function GlassCard({
  children,
  className = '',
  id,
  hoverEffect = true,
  glowColor = 'none',
  onClick
}: GlassCardProps) {
  const glowClasses = {
    blue: 'glow-blue hover:border-blue-500/30',
    indigo: 'glow-indigo hover:border-indigo-500/30',
    cyan: 'glow-cyan hover:border-cyan-500/30',
    none: ''
  };

  return (
    <motion.div
      id={id}
      onClick={onClick}
      className={`glass-card rounded-2xl p-6 border border-white/10 relative overflow-hidden ${
        hoverEffect ? 'glass-card-hover cursor-pointer' : ''
      } ${glowClasses[glowColor]} ${className}`}
      whileHover={hoverEffect ? { y: -4, transition: { duration: 0.2 } } : undefined}
    >
      {/* Accent light reflect border effect */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
      {children}
    </motion.div>
  );
}
