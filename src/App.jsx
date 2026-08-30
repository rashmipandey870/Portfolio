import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  Cpu, 
  Terminal as TermIcon, 
  MessageSquare, 
  Award, 
  BookOpen, 
  Briefcase, 
  Code2, 
  Database, 
  ExternalLink, 
  ChevronRight,
  Lock,
  Unlock,
  AlertCircle
} from 'lucide-react';
import AttendanceDashboard from './components/AttendanceDashboard';
import DeveloperTerminal from './components/DeveloperTerminal';
import AICopilot from './components/AICopilot';
import ResumeModal from './components/ResumeModal';

function App() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorHovered, setCursorHovered] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  // Examora local state confirmation
  const [examoraConfirmed, setExamoraConfirmed] = useState(false);
  const [examoraInputs, setExamoraInputs] = useState({
    purpose: '',
    users: '',
    pdfFeature: ''
  });
  const [showExamoraForm, setShowExamoraForm] = useState(false);

  // Track mouse coordinates for custom cursor
  useEffect(() => {
    const updateMouse = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMouse);
    return () => window.removeEventListener('mousemove', updateMouse);
  }, []);

  // Check hover state for custom cursor
  useEffect(() => {
    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('interactive-cursor');
      setCursorHovered(!!isInteractive);
    };
    window.addEventListener('mouseover', handleMouseOver);
    return () => window.removeEventListener('mouseover', handleMouseOver);
  }, []);

  const projects = [
    {
      id: 'dvq',
      title: 'DVQ — Distributed Cloud Workload Routing System',
      tagline: 'A distributed, MERN-stack system for intelligent workload routing across AWS cloud infrastructure.',
      category: 'backend',
      tech: ['Node.js', 'Express.js', 'React.js', 'MongoDB', 'AWS (EC2, CloudWatch)', 'REST APIs', 'PM2'],
      github: null, // Removed as it is not public
      description: 'Built as part of an ongoing research internship at NIAMT (National Institute of Advanced Manufacturing Technology). A decoupled 6-microservice Node.js/Express backend (routing, telemetry, state, RTT, and metrics services) with MongoDB for data storage, and a React frontend visualizing live routing decisions across a 7-region AWS deployment. Ingests real-time telemetry from AWS CloudWatch and third-party APIs. Runs in a PM2-supervised production environment with sub-100 microsecond routing-decision latency. Includes fault-injection and robustness testing under simulated regional outages.',
      bullets: [
        'Decoupled 6-microservice Node.js/Express backend (routing, telemetry, state, RTT, and metrics services).',
        'React frontend visualizing live routing decisions across a 7-region AWS deployment.',
        'Ingests real-time telemetry from AWS CloudWatch and third-party APIs.',
        'Runs in a PM2-supervised production environment with sub-100 microsecond routing-decision latency.',
        'Includes fault-injection and robustness testing under simulated regional outages.'
      ],
      underReview: true
    },
    {
      id: 'sports',
      title: 'Sports Fixture Management System (Sangathan)',
      tagline: 'A full-stack Android tournament management platform used by 100+ participants.',
      category: 'mobile',
      tech: ['Java (Android)', 'Node.js', 'Express.js', 'MongoDB', 'Retrofit', 'REST APIs'],
      github: 'https://github.com/rashmipandey870/Sangathan-sports-management-Android-application-',
      githubBackend: 'https://github.com/rashmipandey870/Sangathan-Backend',
      description: 'A role-based sports management Android app where captains select/reject players, coordinators manage teams, and students view team status. Built 10+ RESTful APIs (Node.js/Express) with MongoDB achieving sub-200ms response time. Automated round-robin and knockout bracket generation, eliminating manual scheduling. Implemented real-time score updates via Retrofit HTTP client, reducing tournament coordination overhead by ~80% compared to the prior spreadsheet-based workflow.',
      bullets: [
        'Role-based sports management Android app where captains select/reject players, coordinators manage teams, and students view team status.',
        'Built 10+ RESTful APIs (Node.js/Express) with MongoDB achieving sub-200ms response time.',
        'Automated round-robin and knockout bracket generation, eliminating manual scheduling.',
        'Implemented real-time score updates via Retrofit HTTP client, reducing tournament coordination overhead by ~80%.'
      ]
    },
    {
      id: 'planner',
      title: 'Study Planner — Scheduling Algorithm',
      tagline: 'A Java-based tool that auto-generates balanced weekly study schedules.',
      category: 'backend',
      tech: ['Java'],
      github: 'https://github.com/rashmipandey870/Study-Planner-Scheduling-Algorithm-',
      description: 'Takes subject, topic, time, deadline, and priority as input and generates a dynamic weekly schedule, distributing workload efficiently across available time. Tracks progress and ensures balanced study with dedicated revision time for better time management. A small, focused project demonstrating algorithmic/scheduling logic — present it modestly as a personal utility, not a large production system.',
      bullets: [
        'Takes subject, topic, time, deadline, and priority as input and generates a dynamic weekly schedule.',
        'Distributes workload efficiently across available time blocks.',
        'Tracks progress and ensures balanced study with dedicated revision time for better time management.',
        'Focused personal utility demonstrating algorithmic/scheduling logic in pure Java.'
      ]
    },
    {
      id: 'examora',
      title: 'EXAMORA — Jakarta Enterprise Application',
      tagline: examoraConfirmed ? `An enterprise web application confirming raw JSP/Servlet document processes.` : 'Java enterprise web application deployed on Apache Tomcat (WAR).',
      category: 'backend',
      tech: ['Java (Jakarta Servlet + JSP + JSTL)', 'MySQL', 'BCrypt', 'Jackson', 'Apache PDFBox', 'Tomcat'],
      github: 'https://github.com/rashmipandey870/EXAMORA',
      description: examoraConfirmed 
        ? `Confirmed Functionality: ${examoraInputs.purpose}. Built for: ${examoraInputs.users}. PDF Parsing: ${examoraInputs.pdfFeature}. This raw Servlet/JSP app uses MySQL for storage, BCrypt for secure hashing, and Apache PDFBox to process exam/study material, making it the most active repository with 61 commits.`
        : '[PENDING CONFIRMATION] Based on the codebase, this appears to be a Java enterprise web application using raw Servlets/JSP, with MySQL for data storage, BCrypt for secure password hashing, and Apache PDFBox for extracting text from PDF files (exam papers or study material). This is the most actively developed project with 61 commits.',
      bullets: examoraConfirmed 
        ? [
            `Purpose: ${examoraInputs.purpose}`,
            `Target Audience: ${examoraInputs.users}`,
            `PDF Parser role: ${examoraInputs.pdfFeature}`,
            'Most active project repository with 61 sequential commits.'
          ]
        : [
            'Java enterprise web application using raw Jakarta Servlets and JSP (no Spring framework).',
            'Uses MySQL for structured database storage and BCrypt for secure password hashing.',
            'Uses Apache PDFBox library to extract text and process PDF documents.',
            'Most active project repository with 61 sequential commits.'
          ],
      locked: !examoraConfirmed
    }
  ];

  const handleExamoraSubmit = (e) => {
    e.preventDefault();
    if (examoraInputs.purpose && examoraInputs.users && examoraInputs.pdfFeature) {
      setExamoraConfirmed(true);
      setShowExamoraForm(false);
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#10b981', '#06b6d4', '#ffffff']
      });
    }
  };

  const filteredProjects = activeTab === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeTab);

  return (
    <div className="relative min-h-screen bg-dark-950 bg-grid-pattern selection:bg-eco-500/20 selection:text-eco-400">
      
      {/* Custom Cursor Ring */}
      <div 
        className="hidden md:block fixed pointer-events-none z-50 rounded-full border border-eco-500/50 -translate-x-1/2 -translate-y-1/2 transition-all duration-75"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          width: cursorHovered ? '50px' : '24px',
          height: cursorHovered ? '50px' : '24px',
          backgroundColor: cursorHovered ? 'rgba(16, 185, 129, 0.05)' : 'transparent',
          boxShadow: cursorHovered ? '0 0 15px rgba(16, 185, 129, 0.3)' : 'none',
        }}
      />

      {/* Background Decorative Gradients */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-eco-500/5 to-transparent pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-eco-500/5 blur-[120px] pointer-events-none" />

      {/* Header / Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-dark-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#" className="flex items-center gap-2 font-mono text-xl font-bold tracking-tight text-white">
            <span className="text-eco-500">&lt;</span>
            <span>Rashmi Pandey</span>
            <span className="text-cyan-400">/&gt;</span>
          </a>
          
          <nav className="hidden items-center gap-8 md:flex">
            <a href="#about" className="text-sm font-medium text-slate-400 transition-colors hover:text-eco-400">About</a>
            <a href="#attendance" className="text-sm font-medium text-slate-400 transition-colors hover:text-eco-400">Attendance System</a>
            <a href="#projects" className="text-sm font-medium text-slate-400 transition-colors hover:text-eco-400">Projects</a>
            <a href="#console" className="text-sm font-medium text-slate-400 transition-colors hover:text-eco-400">API Console</a>
            <a href="#contact" className="text-sm font-medium text-slate-400 transition-colors hover:text-eco-400">Contact</a>
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setResumeOpen(true)}
              className="relative inline-flex items-center justify-center rounded-full bg-gradient-to-r from-eco-500 to-cyan-500 px-5 py-2 text-sm font-semibold text-dark-950 shadow-md transition-all hover:scale-105 hover:shadow-eco-500/20"
            >
              Resume
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 pb-24 pt-12">
        
        {/* HERO SECTION */}
        <section id="hero" className="grid grid-cols-1 items-center gap-12 py-16 lg:grid-cols-12 lg:py-24">
          <div className="space-y-6 lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-eco-500/20 bg-eco-500/5 px-4 py-1.5 font-mono text-xs font-semibold text-eco-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-eco-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-eco-500"></span>
              </span>
              Available for Freelance Projects
            </div>
            
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              Engineering <span className="bg-gradient-to-r from-eco-400 to-cyan-400 bg-clip-text text-transparent">Carbon-Aware</span> Cloud Infrastructure
            </h1>
            
            <p className="max-w-xl text-lg text-slate-400">
              I am a CSE undergraduate specializing in distributed systems, high-performance backends, and carbon-efficient resource routing. I formulate optimization algorithms to reduce environmental impact without sacrificing SLA latency constraints.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a 
                href="#projects" 
                className="inline-flex items-center gap-2 rounded-lg bg-white/5 border border-white/10 px-6 py-3 font-semibold text-white transition-all hover:bg-white/10 hover:border-white/20"
              >
                Inspect My Work <ChevronRight className="h-4 w-4" />
              </a>
              <a 
                href="#contact" 
                className="inline-flex items-center gap-2 rounded-lg bg-eco-500 px-6 py-3 font-semibold text-dark-950 shadow-md transition-all hover:bg-eco-400 hover:scale-102"
              >
                Hire Me
              </a>
            </div>

            <div className="flex items-center gap-6 pt-8 text-slate-500">
              <a href="https://github.com/rashmipandey870" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                <Github className="h-6 w-6" />
              </a>
              <a href="https://linkedin.com/in/rashmi-pandey-590a22340" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="mailto:rashmipd870@gmail.com" className="hover:text-white transition-colors">
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div className="flex justify-center lg:col-span-5">
            <div className="relative w-full max-w-[400px] aspect-square rounded-2xl border border-white/10 bg-gradient-to-br from-dark-900 to-dark-950 p-1">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-eco-500 to-cyan-500 rounded-2xl opacity-30 blur-lg animate-pulse-slow pointer-events-none" />
              <div className="relative w-full h-full rounded-2xl bg-dark-950 overflow-hidden flex flex-col items-center justify-center p-6">
                <div className="absolute top-4 left-4 font-mono text-xs text-white/40">&lt;System_Node&gt;</div>
                <Cpu className="h-20 w-20 text-eco-500 animate-float mb-6" />
                <h3 className="font-mono text-lg font-bold text-white mb-2">Lyapunov Opt Engine</h3>
                <p className="text-center text-xs text-slate-500 max-w-[280px]">
                  Solving: min (Carbon(t)) s.t. queueing delay &lt; V * SLA(t)
                </p>
                <div className="w-full bg-white/5 h-2 rounded-full mt-6 overflow-hidden">
                  <div className="bg-gradient-to-r from-eco-500 to-cyan-400 h-full w-[80%] rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT & SKILLS */}
        <section id="about" className="py-20 border-t border-white/5">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-4">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Technical Stack & Expertise
              </h2>
              <p className="text-slate-400 leading-relaxed">
                As a Computer Science & Engineering undergraduate at Amity University (CGPA 8.00/10), my research and engineering are aligned around high-performance systems and eco-friendly web architecture.
              </p>
              <div className="rounded-lg border border-white/5 bg-white/5 p-6 space-y-4">
                <h4 className="font-mono text-sm font-semibold text-white flex items-center gap-2">
                  <Award className="h-4 w-4 text-eco-500" /> Key Certifications
                </h4>
                <ul className="space-y-3 text-xs text-slate-400">
                  <li className="flex items-start gap-2">
                    <span className="text-eco-500">•</span>
                    <span>Microsoft Data Pro — SQL Server AI Capabilities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-eco-500">•</span>
                    <span>NPTEL — Joy of Computing Using Python (IIT Madras)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-eco-500">•</span>
                    <span>Infosys Springboard — Java Programming Fundamentals</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="glass-panel rounded-xl p-6">
                <h3 className="font-mono text-sm font-bold text-eco-400 mb-4 flex items-center gap-2">
                  <Code2 className="h-4 w-4" /> Languages
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['Java', 'Python', 'C/C++', 'JavaScript', 'SQL'].map(s => (
                    <span key={s} className="rounded bg-white/5 px-2.5 py-1 text-xs text-white border border-white/5">{s}</span>
                  ))}
                </div>
              </div>

              <div className="glass-panel rounded-xl p-6">
                <h3 className="font-mono text-sm font-bold text-eco-400 mb-4 flex items-center gap-2">
                  <Briefcase className="h-4 w-4" /> Web & Backend
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['Node.js', 'Express.js', 'React.js', 'REST APIs', 'XML'].map(s => (
                    <span key={s} className="rounded bg-white/5 px-2.5 py-1 text-xs text-white border border-white/5">{s}</span>
                  ))}
                </div>
              </div>

              <div className="glass-panel rounded-xl p-6">
                <h3 className="font-mono text-sm font-bold text-eco-400 mb-4 flex items-center gap-2">
                  <Database className="h-4 w-4" /> Databases & DevOps
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['MongoDB', 'MySQL', 'Oracle Developer', 'AWS (EC2/CloudWatch)', 'Multi-region deployment'].map(s => (
                    <span key={s} className="rounded bg-white/5 px-2.5 py-1 text-xs text-white border border-white/5">{s}</span>
                  ))}
                </div>
              </div>

              <div className="glass-panel rounded-xl p-6">
                <h3 className="font-mono text-sm font-bold text-eco-400 mb-4 flex items-center gap-2">
                  <Cpu className="h-4 w-4" /> Research & Tools
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['Carbon-aware edge routing', 'Lyapunov optimization', 'Git/GitHub', 'Android Studio', 'Postman', 'Retrofit'].map(s => (
                    <span key={s} className="rounded bg-white/5 px-2.5 py-1 text-xs text-white border border-white/5">{s}</span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ATTENDANCE SYSTEM SHOWCASE */}
        <section id="attendance" className="py-20 border-t border-white/5">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Attendance Management Showcase</h2>
            <p className="mx-auto max-w-2xl text-slate-400">
              An interactive administration dashboard built for the Student Management System (SMS). Register class lists, inspect attendance percentages, or filter students with low attendance (below 75%) to demonstrate database index schema handling.
            </p>
          </div>
          <AttendanceDashboard />
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="py-20 border-t border-white/5">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Featured Projects</h2>
              <p className="text-slate-400">Factual and verifiable project implementations.</p>
            </div>
            <div className="flex items-center gap-2 mt-4 md:mt-0 bg-white/5 rounded-lg p-1 border border-white/5">
              {['all', 'backend', 'mobile'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-all ${
                    activeTab === tab 
                      ? 'bg-eco-500 text-dark-950 shadow-sm' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((p, idx) => (
              <div key={p.id} className="glass-panel rounded-xl p-8 flex flex-col justify-between h-full relative overflow-hidden group">
                
                {/* Out-of-the-box Confirmation lock logic for EXAMORA */}
                {p.locked && (
                  <div className="absolute inset-0 bg-dark-950/95 backdrop-blur-md z-20 flex flex-col p-6 items-center justify-center text-center">
                    {!showExamoraForm ? (
                      <div className="space-y-4 max-w-[280px]">
                        <Lock className="h-10 w-10 text-yellow-500 mx-auto" />
                        <h4 className="font-mono text-sm font-bold text-white uppercase tracking-wider">Verification Required</h4>
                        <p className="text-slate-400 text-xs leading-relaxed">
                          This project card is locked until the developer provides project functionality metadata.
                        </p>
                        <button
                          onClick={() => setShowExamoraForm(true)}
                          className="w-full py-2 bg-yellow-500 hover:bg-yellow-400 text-dark-950 text-xs font-bold rounded-lg transition-all"
                        >
                          Configure Metadata
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleExamoraSubmit} className="space-y-3 w-full text-left font-mono">
                        <div className="flex items-center gap-2 text-xs font-bold text-yellow-400 mb-2">
                          <AlertCircle className="h-4 w-4" /> Verify EXAMORA Metadata
                        </div>
                        <div>
                          <label className="block text-[9px] uppercase tracking-wide text-slate-400 mb-1">1. What does the app do?</label>
                          <input 
                            required 
                            type="text" 
                            placeholder="e.g. Online exam portal"
                            value={examoraInputs.purpose}
                            onChange={(e) => setExamoraInputs({...examoraInputs, purpose: e.target.value})}
                            className="w-full bg-dark-900 border border-white/10 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-yellow-500"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] uppercase tracking-wide text-slate-400 mb-1">2. Who are the target users?</label>
                          <input 
                            required 
                            type="text" 
                            placeholder="e.g. Students and teachers"
                            value={examoraInputs.users}
                            onChange={(e) => setExamoraInputs({...examoraInputs, users: e.target.value})}
                            className="w-full bg-dark-900 border border-white/10 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-yellow-500"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] uppercase tracking-wide text-slate-400 mb-1">3. What is the PDF-parsing for?</label>
                          <input 
                            required 
                            type="text" 
                            placeholder="e.g. Extract exam questions"
                            value={examoraInputs.pdfFeature}
                            onChange={(e) => setExamoraInputs({...examoraInputs, pdfFeature: e.target.value})}
                            className="w-full bg-dark-900 border border-white/10 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-yellow-500"
                          />
                        </div>
                        <div className="flex gap-2 pt-2">
                          <button 
                            type="button" 
                            onClick={() => setShowExamoraForm(false)} 
                            className="flex-1 py-1.5 border border-white/10 text-white hover:bg-white/5 rounded text-xs"
                          >
                            Cancel
                          </button>
                          <button 
                            type="submit" 
                            className="flex-1 py-1.5 bg-eco-500 text-dark-950 font-bold rounded text-xs"
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                )}

                <div>
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-white group-hover:text-eco-400 transition-colors leading-tight mr-4">{p.title}</h3>
                    {p.underReview && (
                      <span className="shrink-0 bg-eco-500/10 border border-eco-500/20 text-[9px] font-semibold text-eco-400 px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Under Review
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-eco-400/90 font-medium mb-4 italic">{p.tagline}</p>
                  
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {p.tech.map(t => (
                      <span key={t} className="bg-white/5 px-2 py-0.5 rounded text-[10px] font-mono text-slate-400 border border-white/5">{t}</span>
                    ))}
                  </div>

                  <p className="text-slate-400 text-xs leading-relaxed mb-5">{p.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    <div className="text-[10px] uppercase font-mono tracking-widest text-slate-500 font-bold">Key Implementations:</div>
                    <ul className="list-disc pl-4 text-xs text-slate-400 space-y-1">
                      {p.bullets.map((b, bIdx) => (
                        <li key={bIdx}>{b}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-4 flex flex-wrap gap-3 items-center justify-between">
                  <div className="flex gap-4">
                    {p.github && (
                      <a 
                        href={p.github} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-eco-400 transition-colors"
                      >
                        GitHub Repo <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                    {p.githubBackend && (
                      <a 
                        href={p.githubBackend} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-eco-400 transition-colors"
                      >
                        Backend <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* DEVELOPER TERMINAL / API SANDBOX */}
        <section id="console" className="py-20 border-t border-white/5">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-2">API Console & Terminal Sandbox</h2>
            <p className="text-slate-400">Execute console queries directly or fetch simulated REST API responses from my backend modules.</p>
          </div>
          <DeveloperTerminal />
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-20 border-t border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 space-y-6">
              <h2 className="text-3xl font-bold text-white">Let's build something significant together</h2>
              <p className="text-slate-400 leading-relaxed">
                If you are looking for a backend architect, cloud systems specialist, or full-stack software engineer who understands performance, design, and environmental impact, let's talk.
              </p>
              
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-eco-500/10 p-3 border border-eco-500/20 text-eco-400">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 uppercase font-mono">Email</div>
                    <a href="mailto:rashmipd870@gmail.com" className="text-sm font-semibold text-white hover:text-eco-400">rashmipd870@gmail.com</a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-eco-500/10 p-3 border border-eco-500/20 text-eco-400">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 uppercase font-mono">Phone</div>
                    <a href="tel:+918709368696" className="text-sm font-semibold text-white hover:text-eco-400">+91 87093 68696</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <form 
                action="https://formsubmit.co/rashmipd870@gmail.com" 
                method="POST"
                className="space-y-4"
              >
                {/* FormSubmit configurations */}
                <input type="hidden" name="_subject" value="New Portfolio Client Inquiry!" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_next" value="https://rashmipandey870.github.io/Portfolio/" />
                <input type="hidden" name="_captcha" value="false" />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase font-mono mb-2">Name</label>
                    <input required type="text" name="name" className="w-full bg-dark-900 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-eco-500 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase font-mono mb-2">Email</label>
                    <input required type="email" name="email" className="w-full bg-dark-900 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-eco-500 transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase font-mono mb-2">Project Brief</label>
                  <textarea required rows={4} name="message" className="w-full bg-dark-900 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-eco-500 transition-colors" placeholder="Explain what you need compiled..."></textarea>
                </div>
                <button type="submit" className="w-full py-3 bg-eco-500 hover:bg-eco-400 transition-colors text-dark-950 font-bold rounded-lg shadow-md hover:scale-102">
                  Send Project Proposal
                </button>
              </form>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-dark-900 py-8">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">&copy; {new Date().getFullYear()} Rashmi Pandey. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-slate-500">
            <a href="https://github.com/rashmipandey870" target="_blank" rel="noreferrer" className="hover:text-white">GitHub</a>
            <a href="https://linkedin.com/in/rashmi-pandey-590a22340" target="_blank" rel="noreferrer" className="hover:text-white">LinkedIn</a>
          </div>
        </div>
      </footer>

      {/* Modals & Chatbot */}
      <AnimatePresence>
        {resumeOpen && <ResumeModal onClose={() => setResumeOpen(false)} />}
      </AnimatePresence>
      <AICopilot />
    </div>
  );
}

export default App;
