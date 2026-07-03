import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, User as UserIcon, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Register() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center relative">
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] radial-glow-1 opacity-20 -z-10 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] radial-glow-2 opacity-15 -z-10 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <div className="glass-panel p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-brand-primary/20 blur-[60px] -z-10" />
          
          <div className="text-center mb-10">
            <div className="mx-auto w-20 h-20 bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center mb-6 overflow-hidden p-3 shadow-lg shadow-black/20">
              <img src="/polaris-logo.png" alt="Polaris AI" className="w-full h-full object-contain" />
            </div>
            <h2 className="text-3xl font-display font-bold text-white mb-3 tracking-tight">Create an Account</h2>
            <p className="text-slate-400 text-base max-w-md mx-auto">Select the type of account you wish to create for POLARIS AI.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            
            <Link to="/register/user" className="group relative block">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/20 to-brand-primary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative h-full bg-[#0B1121]/80 backdrop-blur-sm border border-white/10 group-hover:border-brand-accent/50 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <UserIcon className="w-6 h-6 text-brand-accent" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">User Account</h3>
                <p className="text-sm text-slate-400 mb-6">Create a standard user account to access AI policy insights.</p>
                <div className="flex items-center text-sm font-medium text-brand-accent">
                  Register as User <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            <Link to="/register/admin" className="group relative block">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-rose-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative h-full bg-[#0B1121]/80 backdrop-blur-sm border border-white/10 group-hover:border-red-500/50 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <ShieldCheck className="w-6 h-6 text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Admin Account</h3>
                <p className="text-sm text-slate-400 mb-6">Create an administrator account with elevated privileges.</p>
                <div className="flex items-center text-sm font-medium text-red-400">
                  Register as Admin <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

          </div>
          
          <div className="mt-10 text-center">
            <p className="text-sm text-slate-500">
              Already have an account? <Link to="/login" className="text-brand-accent hover:text-white font-medium transition-colors">Sign in here</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
