import React from 'react';
import { motion } from 'framer-motion';
import { X, Printer, Download, Mail, Phone, Github, Linkedin, Calendar, MapPin, Award } from 'lucide-react';

function ResumeModal({ onClose }) {
  const triggerPrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-dark-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 no-print">
      
      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-4xl bg-dark-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[90vh]"
      >
        
        {/* Modal Toolbar */}
        <div className="bg-dark-950 px-6 py-4 border-b border-white/5 flex items-center justify-between">
          <h3 className="font-mono text-xs font-bold text-white uppercase tracking-wider">Curriculum Vitae</h3>
          <div className="flex items-center gap-3">
            <button 
              onClick={triggerPrint}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-white transition-all hover:bg-white/10"
            >
              <Printer className="h-3.5 w-3.5" /> Print / Save PDF
            </button>
            <button 
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Resume Content Box (Printable Area) */}
        <div className="flex-1 overflow-y-auto p-8 sm:p-12 bg-white text-slate-900 font-sans" id="printable-resume">
          
          {/* Header */}
          <div className="text-center space-y-3 pb-6 border-b border-slate-200">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 uppercase">Rashmi Pandey</h1>
            <p className="text-sm font-semibold text-slate-500">Computer Science & Engineering Undergraduate</p>
            
            {/* Contact details */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-slate-600 font-medium">
              <a href="mailto:rashmipd870@gmail.com" className="flex items-center gap-1 hover:underline">
                <Mail className="h-3.5 w-3.5" /> rashmipd870@gmail.com
              </a>
              <span className="flex items-center gap-1">
                <Phone className="h-3.5 w-3.5" /> +91 87093 68696
              </span>
              <a href="https://github.com/rashmipandey870" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline">
                <Github className="h-3.5 w-3.5" /> github.com/rashmipandey870
              </a>
              <a href="https://linkedin.com/in/rashmi-pandey-590a22340" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline">
                <Linkedin className="h-3.5 w-3.5" /> linkedin.com/in/rashmi-pandey-590a22340
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8">
            
            {/* Left Column (Main details) */}
            <div className="md:col-span-8 space-y-8">
              
              {/* Objective */}
              <section className="space-y-2">
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b-2 border-slate-800 pb-1">Objective</h2>
                <p className="text-xs text-slate-700 leading-relaxed">
                  CSE undergraduate with production-grade experience in distributed systems, cloud infrastructure, and full-stack development, seeking an InStep project in cloud computing, AI/ML, or digital transformation.
                </p>
              </section>

              {/* Experience */}
              <section className="space-y-4">
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b-2 border-slate-800 pb-1">Experience</h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xs font-bold text-slate-900">Summer Research Intern</h3>
                      <p className="text-[11px] font-semibold text-slate-500">NIAMT, Ranchi (National Institute of Advanced Manufacturing Technology)</p>
                    </div>
                    <div className="text-right text-[11px] font-bold text-slate-700 space-y-0.5">
                      <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5 text-slate-500" /> June 1, 2026 – July 15, 2026</span>
                      <span className="flex items-center gap-1 justify-end"><MapPin className="h-3.5 w-3.5 text-slate-500" /> Ranchi, Jharkhand</span>
                    </div>
                  </div>
                  
                  <p className="text-[10px] text-slate-600 font-semibold italic">Supervised by: Dr. Rahul Mishra</p>
                  
                  <ul className="list-disc list-outside pl-4 text-xs text-slate-700 space-y-2">
                    <li>Engineering **DVQ**, a carbon-aware edge-routing system for AWS cloud infrastructure, formulating workload placement as a Lyapunov drift-plus-penalty optimization to jointly balance SLA latency constraints and real-time grid carbon intensity across a live 7-region deployment.</li>
                    <li>Achieved carbon footprint reductions of **35.87% (Interactive)**, **30.28% (Realtime)**, and **16.58% (Batch)** workload tiers versus a performance-centric Least Connections baseline, while sustaining a **0.0% SLA violation rate** across all evaluation trials.</li>
                    <li>Conducted ablation and fault-injection studies validating system robustness under traffic spikes and full regional grid outages; identified the dynamic weighting mechanism as the primary driver of performance, accounting for 64.2% of savings degradation when removed.</li>
                  </ul>
                </div>
              </section>

              {/* Projects */}
              <section className="space-y-4">
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b-2 border-slate-800 pb-1">Projects</h2>

                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xs font-bold text-slate-900">DVQ — Carbon-Aware Edge Routing System</h3>
                    <span className="text-[11px] font-bold text-slate-600">2026</span>
                  </div>
                  <p className="text-[10px] font-bold text-slate-500 font-mono">Node.js • Express.js • MongoDB • AWS (7-region) • REST APIs</p>
                  <ul className="list-disc list-outside pl-4 text-xs text-slate-700 space-y-1.5">
                    <li>Built a decoupled 6-microservice backend (routing, telemetry, state, RTT, carbon, and AWS-metrics services) implementing DVQ's Lyapunov-based routing engine, with real-time telemetry ingestion from AWS CloudWatch and the Electricity Maps API.</li>
                    <li>Achieved a **median gateway routing-decision overhead of 61 µs** under a PM2-supervised production deployment, demonstrating the system scales without introducing measurable queueing delays.</li>
                    <li>Produced structured research documentation targeting conference submission; results validate carbon-aware routing as viable for globally distributed, high-throughput cloud applications.</li>
                  </ul>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xs font-bold text-slate-900">Sports Fixture Management System</h3>
                    <span className="text-[11px] font-bold text-slate-600">2025</span>
                  </div>
                  <p className="text-[10px] font-bold text-slate-500 font-mono">Android • Java • Node.js • Express.js • MongoDB • Retrofit</p>
                  <ul className="list-disc list-outside pl-4 text-xs text-slate-700 space-y-1.5">
                    <li>Built and deployed a full-stack Android application managing end-to-end tournament workflows for 100+ participants — registration, live fixture tracking, and dynamic leaderboards.</li>
                    <li>Architected 10+ RESTful APIs (Node.js/Express.js) with MongoDB achieving **sub-200ms response time**; automated round-robin and knockout bracket generation, eliminating manual scheduling.</li>
                    <li>Implemented real-time score updates via Retrofit HTTP client, reducing tournament coordination overhead by **~80%** vs. prior spreadsheet-based workflow.</li>
                  </ul>
                </div>
              </section>

            </div>

            {/* Right Column (Side details) */}
            <div className="md:col-span-4 space-y-6 border-t md:border-t-0 md:border-l border-slate-200 pt-6 md:pt-0 md:pl-6">
              
              {/* Education */}
              <section className="space-y-3">
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b-2 border-slate-800 pb-1">Education</h2>
                <div className="space-y-2">
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">Amity University Jharkhand</h3>
                    <p className="text-[10px] text-slate-500 font-semibold">B.Tech, Computer Science & Engineering</p>
                    <p className="text-[10px] font-bold text-slate-700">2024 – 2028 | CGPA: 8.00 / 10</p>
                  </div>
                  <div className="text-[11px] text-slate-600 space-y-1">
                    <p>**Class XII**: 88.2%</p>
                    <p>**Class X**: 85.0%</p>
                    <p className="italic text-[10px]">Sri Gurunanak Public School, Ramgarh</p>
                  </div>
                </div>
              </section>

              {/* Skills */}
              <section className="space-y-3">
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b-2 border-slate-800 pb-1">Technical Skills</h2>
                <div className="space-y-3 text-xs text-slate-700 font-medium">
                  <div>
                    <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide">Languages</span>
                    <span>Java, Python, C/C++, JavaScript, SQL</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide">Web & Backend</span>
                    <span>Node.js, Express.js, React.js, REST APIs, XML</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide">Databases</span>
                    <span>MongoDB, MySQL, Oracle Developer</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide">Cloud & DevOps</span>
                    <span>AWS (EC2, CloudWatch, multi-region)</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide">Tools</span>
                    <span>Git, GitHub, Android Studio, Postman, VS Code, Retrofit</span>
                  </div>
                </div>
              </section>

              {/* Certifications */}
              <section className="space-y-3">
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b-2 border-slate-800 pb-1">Certifications</h2>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-1.5">
                    <Award className="h-4 w-4 text-slate-600 mt-0.5 shrink-0" />
                    <span>Microsoft Data Pro — SQL Server AI Capabilities</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Award className="h-4 w-4 text-slate-600 mt-0.5 shrink-0" />
                    <span>NPTEL — Joy of Computing Using Python (IIT Madras)</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Award className="h-4 w-4 text-slate-600 mt-0.5 shrink-0" />
                    <span>Infosys Springboard — Java Programming Fundamentals</span>
                  </li>
                </ul>
              </section>

            </div>

          </div>

        </div>

      </motion.div>

    </div>
  );
}

export default ResumeModal;
