import React from 'react';
import { motion } from 'framer-motion';
import { X, Printer, Download, Mail, Phone, Github, Linkedin, Calendar, MapPin, Award, CheckCircle2 } from 'lucide-react';

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
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-eco-400 animate-pulse" />
            <h3 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
              Curriculum Vitae • SDE Candidate
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={triggerPrint}
              className="inline-flex items-center gap-1.5 rounded-lg border border-eco-500/30 bg-eco-500/10 px-3.5 py-1.5 text-xs font-semibold text-eco-400 transition-all hover:bg-eco-500 hover:text-dark-950"
            >
              <Printer className="h-3.5 w-3.5" /> Print / Save as PDF
            </button>
            <button 
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors p-1"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Resume Content Box (Printable ATS-Friendly Area) */}
        <div className="flex-1 overflow-y-auto p-8 sm:p-12 bg-white text-slate-900 font-sans" id="printable-resume">
          
          {/* Header */}
          <div className="text-center space-y-2.5 pb-6 border-b border-slate-200">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 uppercase">Rashmi Pandey</h1>
            <p className="text-sm font-bold text-slate-700">
              Software Development Engineer (SDE) Candidate • Cloud & Distributed Systems Focus
            </p>
            
            {/* Contact details */}
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-slate-600 font-medium">
              <a href="mailto:rashmipd870@gmail.com" className="flex items-center gap-1 hover:underline text-slate-800">
                <Mail className="h-3.5 w-3.5 text-slate-600" /> rashmipd870@gmail.com
              </a>
              <span className="flex items-center gap-1 text-slate-800">
                <Phone className="h-3.5 w-3.5 text-slate-600" /> +91 87093 68696
              </span>
              <a href="https://github.com/rashmipandey870" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline text-slate-800">
                <Github className="h-3.5 w-3.5 text-slate-600" /> github.com/rashmipandey870
              </a>
              <a href="https://linkedin.com/in/rashmi-pandey-590a22340" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline text-slate-800">
                <Linkedin className="h-3.5 w-3.5 text-slate-600" /> linkedin.com/in/rashmi-pandey-590a22340
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-6">
            
            {/* Left Column (Main details) */}
            <div className="md:col-span-8 space-y-6">
              
              {/* Professional Summary */}
              <section className="space-y-1.5">
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b-2 border-slate-900 pb-1">
                  Professional Profile
                </h2>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Computer Science & Engineering undergraduate with proven experience building high-throughput distributed systems, Java enterprise platforms, and cloud infrastructure on AWS. Strong foundations in Object-Oriented Design, Data Structures & Algorithms, multi-region routing optimization, and ACID relational data modeling. Targeting Software Development Engineer (SDE) and Cloud Systems roles at Amazon.
                </p>
              </section>

              {/* Experience */}
              <section className="space-y-3">
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b-2 border-slate-900 pb-1">
                  Engineering Experience
                </h2>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xs font-bold text-slate-900">Summer Research Intern — Distributed Systems</h3>
                      <p className="text-[11px] font-semibold text-slate-600">NIAMT (National Institute of Advanced Manufacturing Technology), Ranchi</p>
                    </div>
                    <div className="text-right text-[11px] font-bold text-slate-700">
                      <span>June 1, 2026 – July 15, 2026</span>
                    </div>
                  </div>
                  
                  <p className="text-[10px] text-slate-600 font-semibold italic">Supervised by: Dr. Rahul Mishra</p>
                  
                  <ul className="list-disc list-outside pl-4 text-xs text-slate-700 space-y-1.5">
                    <li>
                      Architected <strong>DVQ</strong>, an intelligent carbon-aware workload router across a live 7-region AWS deployment, formulating request placement as a Lyapunov drift-plus-penalty optimization problem to balance strict SLA latency against real-time grid emissions.
                    </li>
                    <li>
                      Achieved carbon footprint reductions of <strong>35.87% (Interactive)</strong>, <strong>30.28% (Realtime)</strong>, and <strong>16.58% (Batch)</strong> versus a Least-Connections baseline, with a verified <strong>0.0% SLA violation rate</strong> across all evaluation trials.
                    </li>
                    <li>
                      Maintained a <strong>median routing decision overhead of 61 µs</strong> in a PM2-supervised production environment; conducted synthetic chaos tests under traffic surges and simulated regional AWS grid outages.
                    </li>
                  </ul>
                </div>
              </section>

              {/* Projects */}
              <section className="space-y-4">
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b-2 border-slate-900 pb-1">
                  Selected Engineering Projects
                </h2>

                {/* DVQ */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xs font-bold text-slate-900">DVQ — Distributed Cloud Workload Routing System</h3>
                    <span className="text-[10px] font-bold text-slate-600 font-mono">AWS • Node.js • PM2</span>
                  </div>
                  <ul className="list-disc list-outside pl-4 text-xs text-slate-700 space-y-1">
                    <li>Engineered decoupled 6-microservice architecture (Gateway, Telemetry Ingestion, Carbon Matrix Prober, State Vector Store, CloudWatch Metrics Collector, Dispatcher) handling asynchronous health checks.</li>
                    <li>Integrated real-time carbon telemetry from Electricity Maps API and latency metrics from AWS CloudWatch.</li>
                  </ul>
                </div>

                {/* EXAMORA */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xs font-bold text-slate-900">EXAMORA — Jakarta Enterprise Academic Portal</h3>
                    <span className="text-[10px] font-bold text-slate-600 font-mono">Java 17 • Tomcat 11 • MySQL</span>
                  </div>
                  <ul className="list-disc list-outside pl-4 text-xs text-slate-700 space-y-1">
                    <li>Architected full-stack enterprise web application on Apache Tomcat 11 using Jakarta Servlets 6.0, JSP/JSTL, and DAO design patterns for clean layer separation.</li>
                    <li>Built ACID-compliant relational schema across 10+ SQL migration phases; implemented secure authentication using BCrypt password hashing and role-based access control.</li>
                    <li>Integrated Apache PDFBox for streaming text extraction from academic documents to auto-populate question repositories.</li>
                  </ul>
                </div>

                {/* Sangathan */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xs font-bold text-slate-900">Sangathan — Sports Fixture & Tournament Platform</h3>
                    <span className="text-[10px] font-bold text-slate-600 font-mono">Android Java • Node.js • MongoDB</span>
                  </div>
                  <ul className="list-disc list-outside pl-4 text-xs text-slate-700 space-y-1">
                    <li>Developed full-stack mobile solution managing tournament workflows for 100+ athletes with round-robin and single-elimination bracket generation algorithms.</li>
                    <li>Engineered 10+ RESTful APIs achieving sub-200ms latency; utilized Retrofit 2 for reactive background synchronization, reducing administrative coordination time by ~80%.</li>
                  </ul>
                </div>

              </section>

            </div>

            {/* Right Column (Side details) */}
            <div className="md:col-span-4 space-y-5 border-t md:border-t-0 md:border-l border-slate-200 pt-6 md:pt-0 md:pl-6">
              
              {/* Education */}
              <section className="space-y-2">
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b-2 border-slate-900 pb-1">
                  Education
                </h2>
                <div>
                  <h3 className="text-xs font-bold text-slate-900">Amity University Jharkhand</h3>
                  <p className="text-[11px] text-slate-700 font-semibold">B.Tech, Computer Science & Engineering</p>
                  <p className="text-[10px] font-bold text-slate-900 mt-0.5">2024 – 2028 | CGPA: 8.00 / 10.0</p>
                </div>
                <div className="text-[10px] text-slate-600 space-y-0.5 pt-1">
                  <p><strong>Senior Secondary (Class XII)</strong>: 88.2%</p>
                  <p><strong>Secondary (Class X)</strong>: 85.0%</p>
                </div>
              </section>

              {/* Technical Skills */}
              <section className="space-y-2">
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b-2 border-slate-900 pb-1">
                  Technical Skills
                </h2>
                <div className="space-y-2.5 text-xs text-slate-700 font-medium">
                  <div>
                    <span className="block text-[10px] font-bold text-slate-900 uppercase tracking-wide">Languages</span>
                    <span>Java 17, Python 3, C/C++, JavaScript, SQL</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-slate-900 uppercase tracking-wide">Enterprise & Backend</span>
                    <span>Jakarta Servlets 6.0, Tomcat 11, Node.js, Express, REST APIs, JSTL</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-slate-900 uppercase tracking-wide">Cloud & Systems</span>
                    <span>AWS (EC2, CloudWatch 7-Region), PM2, Multi-Threading, Concurrency</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-slate-900 uppercase tracking-wide">Databases</span>
                    <span>MySQL (ACID, Schema Migrations), MongoDB, Oracle SQL</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-slate-900 uppercase tracking-wide">Mobile & Tools</span>
                    <span>Android Studio, Retrofit 2, Git, GitHub, Postman, Apache PDFBox</span>
                  </div>
                </div>
              </section>

              {/* Amazon Alignment */}
              <section className="space-y-2 bg-slate-50 p-3 rounded-lg border border-slate-200">
                <h2 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">
                  Amazon LP Focus
                </h2>
                <ul className="text-[10px] text-slate-700 space-y-1">
                  <li>• <strong>Dive Deep:</strong> 61µs latency profiling & Lyapunov queue math.</li>
                  <li>• <strong>Invent & Simplify:</strong> 6-microservice architecture on AWS.</li>
                  <li>• <strong>Deliver Results:</strong> 100% SLA adherence & production delivery.</li>
                </ul>
              </section>

              {/* Certifications */}
              <section className="space-y-2">
                <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b-2 border-slate-900 pb-1">
                  Certifications
                </h2>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-start gap-1.5">
                    <Award className="h-3.5 w-3.5 text-slate-700 mt-0.5 shrink-0" />
                    <span>Microsoft Data Pro — SQL Server AI Capabilities</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Award className="h-3.5 w-3.5 text-slate-700 mt-0.5 shrink-0" />
                    <span>NPTEL — Joy of Computing Using Python (IIT Madras)</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <Award className="h-3.5 w-3.5 text-slate-700 mt-0.5 shrink-0" />
                    <span>Infosys Springboard — Java Fundamentals</span>
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
