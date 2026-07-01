import React from 'react';
import { BookOpen, Sparkles, Terminal, Code, Cpu, Calculator } from 'lucide-react';
import GlassCard from '../components/GlassCard';

export default function Documentation() {
  return (
    <div className="space-y-8 pb-20" id="documentation-page">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-display font-bold text-white flex items-center gap-2">
          <BookOpen className="h-7 w-7 text-emerald-400" /> Platform Documentation
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Technical specifications, algorithm blueprints, and developer integrations for the Global AI Policy Trends engine.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Content Area (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Section 1: Architecture Blueprint */}
          <GlassCard hoverEffect={false} className="p-6 space-y-4">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2 border-b border-white/5 pb-2">
              <Cpu className="h-5 w-5 text-brand-primary" /> 1. Algorithm blueprint
            </h2>
            <div className="text-xs sm:text-sm text-slate-300 space-y-3 leading-relaxed">
              <p>
                The platform works by ingesting raw legal drafts, compliance papers, or policy publications. Once uploaded, documents are normalized and directed to the <strong className="text-white">Gemini Semantic Parser Pipeline</strong>, executing in three synchronized stages:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
                <li><strong className="text-white">Named Entity Recognition (NER):</strong> Identifies regulatory agencies (e.g. CAC, FTC, IMDA), financial penalty tiers, and compliance boundaries.</li>
                <li><strong className="text-white">Sentiment Cluster Profiling:</strong> Assigns semantic weights along supportive-vs-restrictive dimensions based on positive/negative lexical density.</li>
                <li><strong className="text-white">Metric Index Synthesis:</strong> Calculates absolute Maturity and Risk indexes by mapping identified clauses to established OECD benchmarks.</li>
              </ul>
            </div>
          </GlassCard>

          {/* Section 2: Mathematical formulas */}
          <GlassCard hoverEffect={false} className="p-6 space-y-4">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2 border-b border-white/5 pb-2">
              <Calculator className="h-5 w-5 text-brand-accent" /> 2. Calculation Equations
            </h2>
            <div className="text-xs sm:text-sm text-slate-300 space-y-4 leading-relaxed">
              <div>
                <strong className="text-white block font-semibold mb-1">Policy Maturity Score (M_s):</strong>
                <p className="text-slate-400">
                  Calculated based on the precision and actionable parameters of compliance guidelines. Let <span className="font-mono text-brand-accent bg-white/5 px-1 py-0.5 rounded">C_d</span> represent documented clauses, and <span className="font-mono text-brand-accent bg-white/5 px-1 py-0.5 rounded">O_h</span> represent explicit oversight mechanisms:
                </p>
                <div className="font-mono text-xs text-brand-accent bg-brand-dark/60 p-3 rounded-xl border border-white/5 text-center my-3">
                  M_s = ( (Sum of C_d * 0.6) + (O_h * 0.4) ) / total_weights * 100
                </div>
              </div>

              <div>
                <strong className="text-white block font-semibold mb-1">Restrictiveness Risk Index (R_i):</strong>
                <p className="text-slate-400">
                  Evaluates administrative burdens, auditing requirements, and penalties for non-compliance:
                </p>
                <div className="font-mono text-xs text-rose-400 bg-brand-dark/60 p-3 rounded-xl border border-white/5 text-center my-3">
                  R_i = ( (Mandatory_Audits * 0.5) + (Financial_Penalties * 0.3) + (Bans * 0.2) ) * 100
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Section 3: API integration sample */}
          <GlassCard hoverEffect={false} className="p-6 space-y-4">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2 border-b border-white/5 pb-2">
              <Terminal className="h-5 w-5 text-brand-secondary" /> 3. Developer API reference
            </h2>
            <div className="space-y-4">
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Query parsed policy analyses or export datasets programmatically using the REST API.
              </p>

              {/* cURL Code Block */}
              <div className="space-y-1.5">
                <span className="text-xs text-slate-400 font-semibold block uppercase font-mono">Query with cURL:</span>
                <pre className="p-4 rounded-xl bg-brand-dark border border-white/10 font-mono text-xs text-slate-300 overflow-x-auto">
{`curl -X POST "https://api.aipolicytrends.org/v1/analyze" \\
  -H "Authorization: Bearer sk_policy_live_839a2f1..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "document_text": "Clause 14: Providers of high-risk AI models..."
  }'`}
                </pre>
              </div>

              {/* Python Code Block */}
              <div className="space-y-1.5 pt-2">
                <span className="text-xs text-slate-400 font-semibold block uppercase font-mono">Python Integration:</span>
                <pre className="p-4 rounded-xl bg-brand-dark border border-white/10 font-mono text-xs text-slate-300 overflow-x-auto">
{`import requests

headers = {
    "Authorization": "Bearer sk_policy_live_839a2f1...",
    "Content-Type": "application/json"
}

payload = {
    "document_text": "Clause 14: Providers of high-risk AI models..."
}

response = requests.post(
    "https://api.aipolicytrends.org/v1/analyze", 
    headers=headers, 
    json=payload
)

print(response.json())`}
                </pre>
              </div>
            </div>
          </GlassCard>

        </div>

        {/* Quick Guidelines Panel (4 cols) */}
        <div className="lg:col-span-4">
          <GlassCard hoverEffect={false} className="p-5 space-y-4 h-full">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider flex items-center gap-1.5 border-b border-white/5 pb-3">
              <Code className="h-4 w-4 text-emerald-400" /> API Status Indicators
            </h3>

            <div className="space-y-3.5 text-xs text-slate-300">
              <div className="flex items-center justify-between p-2 bg-white/5 rounded-lg border border-white/5">
                <span className="font-semibold text-white">System Status:</span>
                <span className="text-emerald-400 font-mono font-bold">● Active</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-white/5 rounded-lg border border-white/5">
                <span className="font-semibold text-white">API Version:</span>
                <span className="font-mono">v1.4.0 (JSON)</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-white/5 rounded-lg border border-white/5">
                <span className="font-semibold text-white">Parser Engine:</span>
                <span className="text-brand-accent font-mono font-bold">Gemini-2.5</span>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl border border-white/5 p-3 text-xs text-slate-400 leading-relaxed mt-6">
              <strong className="text-white block mb-0.5">Need custom SDKs?</strong>
              Our research team supports custom libraries in Python, Node.js, Go, and Ruby. Reach out on our About page.
            </div>
          </GlassCard>
        </div>

      </div>
    </div>
  );
}
