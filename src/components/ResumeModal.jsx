import React from 'react';
import { motion } from 'framer-motion';
import { X, Printer, Download, Mail, Phone, Github, Linkedin, Calendar, MapPin, Award, CheckCircle2 } from 'lucide-react';

function ResumeModal({ onClose }) {
  const triggerPrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 no-print">
      
      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-[90vh]"
      >
        
        {/* Modal Toolbar */}
        <div className="bg-[#F4F6FB] px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#4F46E5] animate-pulse" />
            <h3 className="font-mono text-xs font-bold text-[#1E293B] uppercase tracking-wider">
              Curriculum Vitae • SDE Candidate
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={triggerPrint}
              className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-200 bg-indigo-50 px-3.5 py-1.5 text-xs font-semibold text-[#4F46E5] transition-all hover:bg-[#4F46E5] hover:text-white"
            >
              <Printer className="h-3.5 w-3.5" /> Print / Save as PDF
            </button>
            <button 
              onClick={onClose}
              className="text-slate-400 hover:text-slate-700 transition-colors p-1"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Resume Content Box (Printable ATS-Friendly Area) */}
        <div className="flex-1 overflow-y-auto p-8 sm:p-12 bg-white text-[#1E293B] font-sans" id="printable-resume">
          
          {/* Header */}
          <div className="text-center space-y-2 pb-6 border-b border-slate-200">
            <h1 className="text-3xl font-extrabold tracking-tight text-[#1E293B] uppercase">Rashmi Pandey</h1>
            <p className="text-sm font-bold text-[#4F46E5]">
              Software Development Engineer (SDE) Candidate • Cloud & Distributed Systems Focus
            </p>
            
            {/* Contact details */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-1.5 text-xs text-[#475569] font-medium">
              <a href="mailto:rashmipd870@gmail.com" className="flex items-center gap-1 hover:text-[#4F46E5]">
                <Mail className="h-3.5 w-3.5" /> rashmipd870@gmail.com
              </a>
              <span className="flex items-center gap-1">
                <Phone className="h-3.5 w-3.5" /> +91 87093 68696
              </span>
              <a href="https://linkedin.com/in/rashmi-pandey-590a22340" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-[#4F46E5]">
                <Linkedin className="h-3.5 w-3.5" /> linkedin.com/in/rashmi-pandey-590a22340
              </a>
              <a href="https://github.com/rashmipandey870" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-[#4F46E5]">
                <Github className="h-3.5 w-3.5" /> github.com/rashmipandey870
              </a>
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" /> Bokaro / Ranchi, India
              </span>
            </div>
          </div>

          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-6">
            
            {/* Left Column (Primary Experience & Projects) */}
            <div className="md:col-span-8 space-y-6">
              
              {/* Summary */}
              <section className="space-y-1.5">
                <h2 className="text-xs font-bold text-[#1E293B] uppercase tracking-wider border-b-2 border-[#1E293B] pb-1">
                  Executive Summary
                </h2>
                <p className="text-xs text-[#334155] leading-relaxed">
                  B.Tech Computer Science student (CGPA: 8.00/10) with verified experience in distributed systems, AWS multi-region infrastructure, and Java enterprise backends. Microsoft Certified Azure Database Administrator with 1,200+ GitHub contributions, proven ability to build sub-100µs cloud routing systems and high-throughput Jakarta Servlets on Apache Tomcat.
                </p>
              </section>

              {/* Research Experience */}
              <section className="space-y-3">
                <h2 className="text-xs font-bold text-[#1E293B] uppercase tracking-wider border-b-2 border-[#1E293B] pb-1">
                  Research & Industry Experience
                </h2>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-xs font-bold text-[#1E293B]">
                      Summer Research Intern — Distributed Systems & Cloud Infrastructure
                    </h3>
                    <span className="text-[10px] font-mono text-[#64748B]">Jun 2026 – Jul 2026</span>
                  </div>
                  <div className="text-[11px] font-semibold text-[#4F46E5]">
                    National Institute of Advanced Manufacturing Technology (NIAMT), Ranchi • Guided by Dr. Rahul Mishra
                  </div>
                  <ul className="list-disc list-outside pl-4 text-xs text-[#334155] space-y-1">
                    <li>
                      Architected <strong>DVQ</strong>, an intelligent carbon-aware workload router across a live 7-region AWS deployment, formulating request placement as a Lyapunov drift-plus-penalty optimization problem to balance strict SLA latency against real-time grid emissions.
                    </li>
                    <li>
                      Achieved carbon footprint reductions of <strong>35.87% (Interactive)</strong>, <strong>30.28% (Realtime)</strong>, and <strong>16.58% (Batch)</strong> versus a Least-Connections baseline, with a verified <strong>0.0% SLA violation rate</strong> across all evaluation trials.
                    </li>
                    <li>
                      Maintained a <strong>median routing decision overhead of 61 µs</strong> under PM2 supervision on Linux; conducted synthetic chaos tests under traffic surges and simulated regional AWS grid outages.
                    </li>
                  </ul>
                </div>
              </section>

              {/* Projects */}
              <section className="space-y-4">
                <h2 className="text-xs font-bold text-[#1E293B] uppercase tracking-wider border-b-2 border-[#1E293B] pb-1">
                  Selected Engineering Projects
                </h2>

                {/* DVQ */}
                <div className="space-y-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xs font-bold text-[#1E293B]">DVQ — Multi-Region Cloud Workload Routing System</h3>
                    <span className="text-[10px] font-mono text-[#64748B]">AWS • Node.js • PM2</span>
                  </div>
                  <ul className="list-disc list-outside pl-4 text-xs text-[#334155] space-y-0.5">
                    <li>Engineered decoupled 6-microservice architecture processing live telemetry from AWS CloudWatch and Electricity Maps API.</li>
                    <li>Sub-100µs (61µs median) gateway routing decisions with zero queueing delay under high-throughput traffic.</li>
                  </ul>
                </div>

                {/* EXAMORA */}
                <div className="space-y-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xs font-bold text-[#1E293B]">EXAMORA — Jakarta Enterprise Academic Portal</h3>
                    <span className="text-[10px] font-mono text-[#64748B]">Java 17 • Tomcat 11 • MySQL</span>
                  </div>
                  <ul className="list-disc list-outside pl-4 text-xs text-[#334155] space-y-0.5">
                    <li>Constructed 61 commits in active repo: Native Jakarta Servlets 6.0 with DAO pattern, JSP/JSTL, and zero framework bloat.</li>
                    <li>ACID-compliant MySQL schema across 10+ staged migrations; BCrypt security and Apache PDFBox question bank ingestion.</li>
                  </ul>
                </div>

                {/* Sangathan */}
                <div className="space-y-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xs font-bold text-[#1E293B]">Sangathan — Tournament Fixture & Algorithmic Scheduling</h3>
                    <span className="text-[10px] font-mono text-[#64748B]">Android Java • Node.js • MongoDB</span>
                  </div>
                  <ul className="list-disc list-outside pl-4 text-xs text-[#334155] space-y-0.5">
                    <li>Automated round-robin and knockout tournament brackets for 100+ athletes across 6 simultaneous sports.</li>
                    <li>10+ RESTful backend endpoints in Node.js/Express with sub-150ms response times and Retrofit 2 synchronization.</li>
                  </ul>
                </div>

                {/* Crop Recommendation */}
                <div className="space-y-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xs font-bold text-[#1E293B]">AI-Driven Crop Recommendation System (Machine Learning)</h3>
                    <span className="text-[10px] font-mono text-[#64748B]">Python • Scikit-learn • XGBoost</span>
                  </div>
                  <ul className="list-disc list-outside pl-4 text-xs text-[#334155] space-y-0.5">
                    <li>Supervised classification evaluating N, P, K, pH, rainfall, and temperature across 2,200+ agricultural samples.</li>
                    <li>Achieved 99.2% classification accuracy using Random Forest and XGBoost ensemble algorithms.</li>
                  </ul>
                </div>

              </section>

            </div>

            {/* Right Column (Side details) */}
            <div className="md:col-span-4 space-y-5 border-t md:border-t-0 md:border-l border-slate-200 pt-6 md:pt-0 md:pl-6">
              
              {/* Education */}
              <section className="space-y-2">
                <h2 className="text-xs font-bold text-[#1E293B] uppercase tracking-wider border-b-2 border-[#1E293B] pb-1">
                  Education
                </h2>
                <div>
                  <h3 className="text-xs font-bold text-[#1E293B]">Amity University Jharkhand</h3>
                  <p className="text-[11px] text-[#475569] font-semibold">B.Tech, Computer Science & Engineering</p>
                  <p className="text-[10px] font-bold text-[#4F46E5] mt-0.5">2024 – 2028 | CGPA: 8.00 / 10.0</p>
                </div>
                <div className="text-[10px] text-[#64748B] space-y-0.5 pt-1">
                  <p><strong>Senior Secondary (Class XII)</strong>: 88.2%</p>
                  <p><strong>Secondary (Class X)</strong>: 85.0%</p>
                </div>
              </section>

              {/* Technical Skills */}
              <section className="space-y-2">
                <h2 className="text-xs font-bold text-[#1E293B] uppercase tracking-wider border-b-2 border-[#1E293B] pb-1">
                  Technical Skills
                </h2>
                <div className="space-y-2.5 text-xs text-[#334155] font-medium">
                  <div>
                    <span className="block text-[10px] font-bold text-[#1E293B] uppercase tracking-wide">Languages</span>
                    <span>Java 17, Python 3, C/C++, JavaScript, SQL</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-[#1E293B] uppercase tracking-wide">Enterprise & Backend</span>
                    <span>Jakarta Servlets 6.0, Tomcat 11, Node.js, Express, REST APIs, DAO</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-[#1E293B] uppercase tracking-wide">Cloud & Systems</span>
                    <span>AWS (EC2, CloudWatch 7-Region), Azure, PM2, Linux/Unix</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-[#1E293B] uppercase tracking-wide">Databases</span>
                    <span>Azure SQL, MySQL (ACID), MongoDB Atlas</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-[#1E293B] uppercase tracking-wide">Data Science & ML</span>
                    <span>Scikit-learn, XGBoost, Pandas, NumPy</span>
                  </div>
                </div>
              </section>

              {/* Amazon Alignment */}
              <section className="space-y-2 bg-[#F4F6FB] p-3 rounded-lg border border-slate-200">
                <h2 className="text-[11px] font-bold text-[#1E293B] uppercase tracking-wider font-mono">
                  Amazon LP Focus
                </h2>
                <ul className="text-[10px] text-[#334155] space-y-1">
                  <li>• <strong>Dive Deep:</strong> 61µs latency profiling & Lyapunov queue math.</li>
                  <li>• <strong>Invent & Simplify:</strong> 6-microservice architecture on AWS.</li>
                  <li>• <strong>Deliver Results:</strong> 100% SLA adherence & production delivery.</li>
                </ul>
              </section>

              {/* Certifications */}
              <section className="space-y-2">
                <h2 className="text-xs font-bold text-[#1E293B] uppercase tracking-wider border-b-2 border-[#1E293B] pb-1">
                  Certifications
                </h2>
                <ul className="space-y-2 text-xs text-[#334155]">
                  <li className="flex items-start gap-1.5">
                    <Award className="h-3.5 w-3.5 text-[#4F46E5] mt-0.5 shrink-0" />
                    <span><strong>Microsoft:</strong> Azure Database Administrator Associate (ID: 647C0C2C5B35FA32)</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Award className="h-3.5 w-3.5 text-[#0EA5E9] mt-0.5 shrink-0" />
                    <span><strong>Microsoft:</strong> SQL Solutions by Using AI-Assisted Tools</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Award className="h-3.5 w-3.5 text-[#0D9488] mt-0.5 shrink-0" />
                    <span><strong>NPTEL (IIT Madras):</strong> Joy of Computing Using Python (87% Elite)</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Award className="h-3.5 w-3.5 text-[#F97316] mt-0.5 shrink-0" />
                    <span><strong>Infosys Springboard:</strong> Java Fundamentals</span>
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
