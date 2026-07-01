import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, Download, FileSpreadsheet, FileCode, CheckCircle, Sparkles, RefreshCw, Layers } from 'lucide-react';
import GlassCard from '../components/GlassCard';

export default function Reports() {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [successId, setSuccessId] = useState<string | null>(null);

  const archiveReports = [
    {
      id: 'rep-1',
      title: 'Global AI Act Compliance Frameworks (Q3 2026)',
      desc: 'Comparative compliance study mapping the European AI Board standards against NIST RMF guidelines.',
      size: '2.4 MB',
      format: 'PDF',
      date: '2026-06-15'
    },
    {
      id: 'rep-2',
      title: 'Autonomous Systems & LLM Liability Parameters',
      desc: 'A legal research review focusing on copyright, algorithmic training fair use, and biometric exclusions.',
      size: '1.8 MB',
      format: 'PDF',
      date: '2026-05-29'
    },
    {
      id: 'rep-3',
      title: 'Sovereign Compute Subsidization & GPGPU Clusters',
      desc: 'A comprehensive database profiling public fund allocations for national computing systems across Asia and the EU.',
      size: '4.2 MB',
      format: 'XLSX',
      date: '2026-05-02'
    },
    {
      id: 'rep-4',
      title: 'OECD Generative AI Regulatory Draft Consensus',
      desc: 'Consensus document profiling transparency guidelines, synthetic markers, and watermark registries.',
      size: '950 KB',
      format: 'CSV',
      date: '2026-04-12'
    }
  ];

  const handleDownload = (id: string) => {
    setDownloadingId(id);
    setSuccessId(null);
    
    setTimeout(() => {
      setDownloadingId(null);
      setSuccessId(id);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessId(null);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="space-y-8 pb-20" id="reports-page">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-display font-bold text-white flex items-center gap-2">
          <FileText className="h-7 w-7 text-brand-primary" /> Compliance Reports & Exports
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Compile custom summaries, download legal comparison sheets, or export raw regulatory matrices.
        </p>
      </div>

      {/* CORE GENERATOR CONTROL PANEL */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* PDF Export card */}
        <GlassCard hoverEffect={true} glowColor="blue" className="p-6 text-center group">
          <div className="mx-auto p-4 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full w-fit group-hover:scale-110 transition-transform">
            <FileText className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-semibold text-white mt-4">Compile Policy PDF</h3>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            Assembles a structured PDF report containing selected regulatory summaries, risk indexes, and compliance advice.
          </p>
          <button 
            onClick={() => handleDownload('btn-pdf')}
            disabled={downloadingId === 'btn-pdf'}
            className="w-full bg-brand-primary hover:bg-blue-600 disabled:opacity-60 text-white font-semibold text-xs py-2.5 rounded-xl transition-all shadow-md mt-6 flex items-center justify-center gap-1.5"
          >
            {downloadingId === 'btn-pdf' ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" /> Compiling...
              </>
            ) : successId === 'btn-pdf' ? (
              <>
                <CheckCircle className="h-4 w-4 text-emerald-400" /> Compiled & Downloaded!
              </>
            ) : (
              <>
                <Download className="h-4 w-4" /> Export Executive PDF
              </>
            )}
          </button>
        </GlassCard>

        {/* Excel Export card */}
        <GlassCard hoverEffect={true} glowColor="indigo" className="p-6 text-center group">
          <div className="mx-auto p-4 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-full w-fit group-hover:scale-110 transition-transform">
            <FileSpreadsheet className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-semibold text-white mt-4">Download Excel Sheets</h3>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            Consolidates granular data tables, metrics, and regional rankings across all analyzed countries in Excel format.
          </p>
          <button 
            onClick={() => handleDownload('btn-excel')}
            disabled={downloadingId === 'btn-excel'}
            className="w-full bg-brand-secondary hover:bg-indigo-600 disabled:opacity-60 text-white font-semibold text-xs py-2.5 rounded-xl transition-all shadow-md mt-6 flex items-center justify-center gap-1.5"
          >
            {downloadingId === 'btn-excel' ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" /> Consolidating...
              </>
            ) : successId === 'btn-excel' ? (
              <>
                <CheckCircle className="h-4 w-4 text-emerald-400" /> Sheets Exported!
              </>
            ) : (
              <>
                <Download className="h-4 w-4" /> Download Excel Dataset
              </>
            )}
          </button>
        </GlassCard>

        {/* CSV Export card */}
        <GlassCard hoverEffect={true} glowColor="cyan" className="p-6 text-center group">
          <div className="mx-auto p-4 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-full w-fit group-hover:scale-110 transition-transform">
            <FileCode className="h-8 w-8" />
          </div>
          <h3 className="text-lg font-semibold text-white mt-4">Export CSV / JSON Matrix</h3>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            Generates a high-fidelity comma-separated matrix containing keywords, topics, and sentiment scores, optimized for custom scripts.
          </p>
          <button 
            onClick={() => handleDownload('btn-csv')}
            disabled={downloadingId === 'btn-csv'}
            className="w-full bg-brand-accent/20 border border-brand-accent/30 hover:bg-brand-accent/30 text-white font-semibold text-xs py-2.5 rounded-xl transition-all shadow-md mt-6 flex items-center justify-center gap-1.5"
          >
            {downloadingId === 'btn-csv' ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" /> Packaging...
              </>
            ) : successId === 'btn-csv' ? (
              <>
                <CheckCircle className="h-4 w-4 text-emerald-400" /> Export Completed!
              </>
            ) : (
              <>
                <Download className="h-4 w-4" /> Export Raw CSV Matrix
              </>
            )}
          </button>
        </GlassCard>

      </div>

      {/* AI GENERATED SUMMARY */}
      <GlassCard hoverEffect={false} className="p-6 relative">
        <div className="absolute top-0 right-0 w-36 h-36 radial-glow-2 opacity-25 pointer-events-none -z-10" />
        
        <h3 className="text-base font-semibold text-white flex items-center gap-2 mb-3">
          <Sparkles className="h-5 w-5 text-brand-accent" /> AI Generated Policy Insights Synthesis
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-3">
          Our global governance parser has aggregated the regulatory stances across <strong className="text-white">42 active countries</strong>. The overriding macro trend indicates an <strong className="text-brand-accent">8.4% tightening</strong> of general compliance timelines and pre-market safety reviews for foundational models. Regulators are steadily shifting away from broad definitions toward sector-led liability assessments (e.g. medical AI, automated credit lines, driverless telemetry). Organizations operating multi-regionally should prepare to maintain granular model documentation pipelines, specifically mapping watermarking compliance to meet impending 2027 mandates.
        </p>
      </GlassCard>

      {/* ARCHIVED REPORTS DIRECTORY */}
      <GlassCard hoverEffect={false} className="p-6">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2 border-b border-white/5 pb-3 mb-4">
          <Layers className="h-4 w-4 text-brand-secondary" /> Archive & Historical Publications
        </h3>

        <div className="grid gap-4">
          {archiveReports.map((report) => (
            <div 
              key={report.id} 
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl gap-4 hover:border-brand-primary/20 transition-colors"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold bg-brand-primary/10 text-brand-accent px-2 py-0.5 rounded border border-brand-primary/20 uppercase">
                    {report.format}
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">Published: {report.date}</span>
                </div>
                <h4 className="font-semibold text-white text-sm mt-1.5">{report.title}</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed max-w-2xl">{report.desc}</p>
              </div>

              <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                <span className="text-[11px] text-slate-500 font-mono">{report.size}</span>
                <button
                  onClick={() => handleDownload(report.id)}
                  disabled={downloadingId === report.id}
                  className="bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg border border-white/10 text-xs font-semibold flex items-center gap-1 transition-all"
                >
                  {downloadingId === report.id ? (
                    <>
                      <RefreshCw className="h-3.5 w-3.5 animate-spin" /> Downloading...
                    </>
                  ) : successId === report.id ? (
                    <>
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-400" /> Completed
                    </>
                  ) : (
                    <>
                      <Download className="h-3.5 w-3.5" /> Download
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
