import React from 'react';
import { motion } from 'framer-motion';
import { 
  X, 
  ExternalLink, 
  Github, 
  Cpu, 
  Server, 
  Database, 
  ShieldCheck, 
  Layers, 
  Activity, 
  CheckCircle2, 
  GitBranch, 
  Flame, 
  Zap,
  Code2
} from 'lucide-react';

export default function ArchitectureModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-dark-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 no-print">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-4xl bg-dark-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="bg-dark-950 px-6 py-4 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-eco-500/10 p-2 border border-eco-500/20 text-eco-400">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <div className="font-mono text-[10px] text-eco-400 font-bold uppercase tracking-wider">
                System Architecture Deep-Dive
              </div>
              <h3 className="text-lg font-bold text-white leading-tight">
                {project.title}
              </h3>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 text-slate-300 font-sans">
          
          {/* Executive Summary & Leadership Principles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 glass-panel p-5 rounded-xl border border-white/5 space-y-2">
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-slate-500">
                Core Architectural Objective
              </span>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                {project.archObjective || project.description}
              </p>
            </div>

            <div className="glass-panel p-5 rounded-xl border border-eco-500/20 bg-eco-500/5 space-y-2">
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-eco-400 flex items-center gap-1.5">
                <Flame className="h-3.5 w-3.5" /> Amazon LP Alignment
              </span>
              <div className="text-xs font-bold text-white">
                {project.amazonLP || 'Dive Deep & Deliver Results'}
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">
                {project.amazonLPDetail || 'Rigorous engineering metrics, deterministic failure recovery, and zero SLA compromise.'}
              </p>
            </div>
          </div>

          {/* Architecture Diagram Visualization */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <GitBranch className="h-4 w-4 text-cyan-400" /> System Flow & Topology
              </span>
              <span className="text-[10px] font-mono text-slate-500">Interactive Model</span>
            </div>

            <div className="rounded-xl border border-white/10 bg-dark-950 p-6 space-y-6">
              {project.archFlow ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {project.archFlow.map((step, idx) => (
                    <div key={idx} className="relative p-4 rounded-xl border border-white/5 bg-dark-900/60 space-y-2">
                      <div className="flex items-center justify-between text-[10px] font-mono font-bold text-eco-400">
                        <span>STAGE 0{idx + 1}</span>
                        <step.icon className="h-4 w-4 text-slate-400" />
                      </div>
                      <h4 className="font-bold text-xs text-white">{step.title}</h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed">{step.desc}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-xs text-slate-400 font-mono">
                  Full service topology with decoupled microservices and persistent storage tiers.
                </div>
              )}
            </div>
          </div>

          {/* Key Technical Deep-Dives */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Engineering Decisions & Trade-offs */}
            <div className="glass-panel p-6 rounded-xl border border-white/5 space-y-4">
              <h4 className="font-mono text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                <Zap className="h-4 w-4" /> Technical Trade-offs & Decisions
              </h4>
              <ul className="space-y-3 text-xs text-slate-300">
                {(project.decisions || [
                  'Decoupled microservices architecture ensures failures in telemetry do not impact routing critical paths.',
                  'In-memory state vector caching achieves sub-100 microsecond decision overhead.',
                  'Deterministic queue bounding guarantees 0.0% SLA breach rates.'
                ]).map((d, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Performance Benchmarks & Reliability */}
            <div className="glass-panel p-6 rounded-xl border border-white/5 space-y-4">
              <h4 className="font-mono text-xs font-bold text-eco-400 uppercase tracking-wider flex items-center gap-2">
                <Activity className="h-4 w-4" /> Benchmark Metrics & Fault-Tolerance
              </h4>
              <ul className="space-y-3 text-xs text-slate-300">
                {(project.benchmarks || [
                  '61 µs median gateway decision latency under production PM2 supervision.',
                  '35.87% carbon footprint reduction across 7 live AWS regions.',
                  'Resilience verified under synthetic multi-region grid failures.'
                ]).map((b, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-eco-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Tech Stack Pills */}
          <div>
            <div className="text-[10px] uppercase font-mono tracking-widest text-slate-500 font-bold mb-2.5">
              Production Stack & Protocols:
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="rounded-lg bg-white/5 px-2.5 py-1 text-xs font-mono text-slate-300 border border-white/10">
                  {t}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-dark-950 px-6 py-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            {project.isConfidential && (
              <div className="inline-flex items-center gap-2 rounded-lg bg-amber-500/10 border border-amber-500/30 px-3.5 py-2 text-xs font-mono text-amber-300">
                <ShieldCheck className="h-4 w-4 text-amber-400" />
                <span>Confidential Research (Under Peer Review &bull; Source Protected)</span>
              </div>
            )}
            {project.github && (
              <a 
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-white/10 hover:bg-white/20 px-4 py-2 text-xs font-bold text-white transition-all"
              >
                <Github className="h-4 w-4" /> View GitHub Repository <ExternalLink className="h-3 w-3" />
              </a>
            )}
            {project.githubBackend && (
              <a 
                href={project.githubBackend}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-white/5 hover:bg-white/10 px-4 py-2 text-xs font-bold text-slate-300 transition-all border border-white/10"
              >
                <Server className="h-4 w-4" /> Backend API Repo <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-eco-500 hover:bg-eco-400 text-dark-950 text-xs font-bold rounded-lg transition-all"
          >
            Close Deep-Dive
          </button>
        </div>

      </motion.div>
    </div>
  );
}
