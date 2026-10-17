import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  Cpu, 
  Award, 
  BookOpen, 
  Briefcase, 
  Code2, 
  Database, 
  ExternalLink, 
  ChevronRight,
  ShieldCheck,
  Zap,
  ArrowRight, 
  CheckCircle2, 
  Server,
  Layers,
  Sparkles,
  Globe2,
  FileText,
  GraduationCap,
  Calendar,
  MapPin,
  Send
} from 'lucide-react';
import AICopilot from './components/AICopilot';
import ResumeModal from './components/ResumeModal';

function App() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [contactMessage, setContactMessage] = useState('');

  const projects = [
    {
      id: 'dvq',
      title: 'DVQ — Carbon-Aware Cloud Workload Routing System',
      tagline: 'Intelligent workload router balancing real-time grid carbon intensity against strict SLA constraints across 7 AWS regions.',
      category: 'cloud',
      tech: ['AWS (7 Regions)', 'Node.js', 'Express.js', 'PM2', 'MongoDB', 'Electricity Maps API', 'AWS CloudWatch'],
      github: 'https://github.com/rashmipandey870',
      description: 'Built during a Summer Research Internship at NIAMT under Dr. Rahul Mishra. Architected a decoupled 6-microservice system on AWS that dynamically evaluates live grid carbon intensity and network latency to place workloads optimally without breaching SLAs.',
      highlights: [
        'Formulated carbon-aware routing algorithms cutting carbon emissions by up to 35.8% compared to AWS Least Connections.',
        'Sustained a verified 0.0% SLA violation rate across extensive evaluation trials and synthetic traffic bursts.',
        'Engineered in-memory state caching to achieve sub-100 microsecond (61 µs median) gateway routing decision latency.',
        'Validated system resilience and automated failover under simulated AWS regional grid outages.'
      ]
    },
    {
      id: 'examora',
      title: 'EXAMORA — Enterprise Academic Assessment Platform',
      tagline: 'High-performance Java enterprise web application deployed on Apache Tomcat 11 with ACID relational schema and PDF parsing pipeline.',
      category: 'java',
      tech: ['Java 17', 'Jakarta Servlets 6.0', 'Apache Tomcat 11', 'MySQL', 'BCrypt', 'Apache PDFBox', 'JSP / JSTL', 'DAO Pattern'],
      github: 'https://github.com/rashmipandey870/EXAMORA',
      description: 'Architected a multi-role academic portal from scratch using native Jakarta Servlets 6.0 on Apache Tomcat 11. Designed strict MVC separation with Data Access Object (DAO) patterns and built an automated document ingestion pipeline with Apache PDFBox to parse exam papers into structured question banks.',
      highlights: [
        'Developed with 61 sequential commits in an active repository following clean software engineering practices.',
        'Designed an ACID-compliant MySQL relational database across 10+ staged migration scripts ensuring data integrity.',
        'Implemented secure session management using salted BCrypt password hashing and role-based access control.',
        'Built with zero framework bloat: Native Servlets optimize cold starts and minimize memory overhead on Tomcat.'
      ]
    },
    {
      id: 'sports',
      title: 'Sangathan — Tournament Fixture & Algorithmic Scheduling Platform',
      tagline: 'Full-stack Android tournament management platform featuring automated round-robin & knockout bracket generation algorithms.',
      category: 'mobile',
      tech: ['Android (Java)', 'Node.js', 'Express.js', 'MongoDB', 'Retrofit 2', 'REST APIs', 'Graph Algorithms'],
      github: 'https://github.com/rashmipandey870/Sangathan-sports-management-Android-application-',
      githubBackend: 'https://github.com/rashmipandey870/Sangathan-Backend',
      description: 'Engineered an end-to-end sports tournament platform used by 100+ athletes and coordinators. Developed combinatorial scheduling algorithms in Java to generate balanced round-robin match pairings and single-elimination tournament bracket trees, syncing live scores in real time.',
      highlights: [
        'Automated round-robin and knockout tournament brackets, eliminating manual scheduling errors for 100+ participants.',
        'Architected 10+ RESTful backend endpoints in Node.js/Express achieving sub-200ms latency under concurrent usage.',
        'Implemented asynchronous network calls with Retrofit 2 and OkHttp token interceptors for reliable mobile data sync.',
        'Reduced tournament coordination overhead by approximately 80% compared to traditional spreadsheet tracking.'
      ]
    },
    {
      id: 'papertracker',
      title: 'Faculty Research Paper Tracker — Publication & Metrics System',
      tagline: 'Academic publication tracking and citation analytics dashboard featuring OTP verification and automated Google Form ingestion.',
      category: 'fullstack',
      tech: ['Node.js', 'Express.js', 'MongoDB Atlas', 'Mongoose', 'JWT Auth', 'Nodemailer OTP', 'Google Forms API'],
      github: 'https://github.com/rashmipandey870',
      description: 'Developed a publication management platform for university faculty members. Features secure two-factor email OTP authentication, automated Google Forms import webhooks, and indexed citation analytics with a modern glassmorphic interface.',
      highlights: [
        'Automated paper intake via Google Forms API ingestion, streamlining faculty publication submissions.',
        'Implemented secure two-factor authentication via Nodemailer OTP and stateless JWT token authorization.',
        'Designed indexed MongoDB schemas supporting multi-attribute querying across ISSN, DOI, and publication dates.',
        'Provides real-time faculty research analytics and automated citation metric summaries.'
      ]
    },
    {
      id: 'planner',
      title: 'Study Planner — Dynamic Constraint-Based Scheduling Algorithm',
      tagline: 'Algorithmic Java tool solving multi-factor time-block assignment with deadline urgency and cognitive fatigue mitigation.',
      category: 'java',
      tech: ['Java 17', 'Object-Oriented Design', 'Priority Queues', 'Greedy Heuristics', 'Algorithmic Optimization'],
      github: 'https://github.com/rashmipandey870/Study-Planner-Scheduling-Algorithm-',
      description: 'Engineered a dynamic scheduling algorithm in Java that takes subject difficulty, upcoming exam deadlines, and daily study capacity to generate an optimized weekly timetable using priority queues and heuristic constraint satisfaction.',
      highlights: [
        'Formulated multi-objective scheduling algorithm factoring in deadline proximity and cognitive fatigue thresholds.',
        'Utilized Java PriorityQueue min-heaps to execute fast schedule recalculations in O(N log N) time.',
        'Automatically reserves spaced repetition buffers before major exam milestones to prevent cramming.',
        'Demonstrates clean Object-Oriented design principles and algorithmic optimization in pure Java.'
      ]
    }
  ];

  const filteredProjects = activeTab === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeTab);

  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-200 font-sans selection:bg-blue-500/20 selection:text-blue-300 bg-grid-subtle">
      
      {/* Decorative Background Lighting */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Navigation Bar */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#0b1120]/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#" className="flex items-center gap-2 font-mono text-lg font-bold tracking-tight text-white group">
            <span className="text-blue-400 group-hover:text-indigo-400 transition-colors">&lt;</span>
            <span>Rashmi Pandey</span>
            <span className="text-indigo-400 group-hover:text-blue-400 transition-colors">/&gt;</span>
          </a>
          
          <nav className="hidden items-center gap-7 md:flex">
            <a href="#about" className="text-sm font-medium text-slate-400 transition-colors hover:text-white">About</a>
            <a href="#experience" className="text-sm font-medium text-slate-400 transition-colors hover:text-white">Experience</a>
            <a href="#projects" className="text-sm font-medium text-slate-400 transition-colors hover:text-white">Projects</a>
            <a href="#skills" className="text-sm font-medium text-slate-400 transition-colors hover:text-white">Skills</a>
            <a href="#education" className="text-sm font-medium text-slate-400 transition-colors hover:text-white">Education</a>
            <a href="#contact" className="text-sm font-medium text-slate-400 transition-colors hover:text-white">Contact</a>
          </nav>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setResumeOpen(true)}
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 hover:bg-blue-500 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:shadow-blue-500/20"
            >
              Resume (PDF)
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-24 pt-12 space-y-24">
        
        {/* HERO SECTION */}
        <section id="hero" className="py-8 md:py-16">
          <div className="space-y-6 max-w-3xl">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-medium text-blue-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Computer Science Undergraduate • Targeting Software Development Engineer (SDE) Roles
            </div>
            
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl leading-[1.15]">
              Hi, I'm <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-400 bg-clip-text text-transparent">Rashmi Pandey</span>.
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed font-normal">
              A Computer Science & Engineering undergraduate at <strong>Amity University (CGPA 8.00/10)</strong> with hands-on research and production experience in <strong>distributed systems</strong>, <strong>Java enterprise platforms</strong>, and <strong>cloud infrastructure on AWS</strong>.
            </p>

            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              I enjoy solving complex technical problems—from formulating sub-millisecond cloud routing algorithms during my NIAMT research internship to engineering multi-tier Java enterprise web applications with raw Servlets and ACID relational databases.
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="portfolio-card p-4 rounded-xl">
                <div className="font-mono text-2xl font-bold text-white">8.00 / 10</div>
                <div className="text-xs text-slate-400 mt-1">B.Tech CSE CGPA</div>
              </div>
              <div className="portfolio-card p-4 rounded-xl">
                <div className="font-mono text-2xl font-bold text-blue-400">NIAMT</div>
                <div className="text-xs text-slate-400 mt-1">Research Internship</div>
              </div>
              <div className="portfolio-card p-4 rounded-xl">
                <div className="font-mono text-2xl font-bold text-indigo-400">61 Commits</div>
                <div className="text-xs text-slate-400 mt-1">Enterprise Jakarta App</div>
              </div>
              <div className="portfolio-card p-4 rounded-xl">
                <div className="font-mono text-2xl font-bold text-sky-400">AWS + Java</div>
                <div className="text-xs text-slate-400 mt-1">Core Technical Focus</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a 
                href="#projects" 
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-all"
              >
                View My Projects <ChevronRight className="h-4 w-4" />
              </a>
              <button 
                onClick={() => setResumeOpen(true)}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 px-6 py-3 text-sm font-semibold text-white transition-all"
              >
                <FileText className="h-4 w-4 text-blue-400" /> View Resume
              </button>
              <a 
                href="#contact" 
                className="inline-flex items-center gap-2 rounded-xl bg-transparent hover:bg-slate-800/50 border border-slate-700/80 px-6 py-3 text-sm font-semibold text-slate-300 hover:text-white transition-all"
              >
                Get in Touch
              </a>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-5 pt-3 text-slate-400">
              <a href="https://github.com/rashmipandey870" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5 text-xs font-medium">
                <Github className="h-4 w-4" /> GitHub
              </a>
              <a href="https://linkedin.com/in/rashmi-pandey-590a22340" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5 text-xs font-medium">
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
              <a href="mailto:rashmipd870@gmail.com" className="hover:text-white transition-colors flex items-center gap-1.5 text-xs font-medium">
                <Mail className="h-4 w-4" /> rashmipd870@gmail.com
              </a>
              <span className="text-xs text-slate-600">|</span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Phone className="h-3.5 w-3.5" /> +91 87093 68696
              </span>
            </div>

          </div>
        </section>

        {/* ABOUT ME SECTION */}
        <section id="about" className="space-y-6 pt-4 border-t border-slate-800/60">
          <div className="flex items-center gap-2 text-blue-400 text-xs font-mono uppercase tracking-wider font-semibold">
            <BookOpen className="h-4 w-4" /> Introduction
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight sm:text-4xl">About Me</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-7 space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              <p>
                I am a passionate Computer Science and Engineering undergraduate at Amity University Jharkhand with a solid academic record (CGPA 8.00/10) and an enthusiastic drive to build robust, scalable software.
              </p>
              <p>
                My technical interests lie at the intersection of <strong>high-performance backend architectures</strong>, <strong>distributed systems</strong>, and <strong>cloud computing</strong>. I take pride in understanding systems from the ground up—whether that means implementing raw Jakarta Servlets on Apache Tomcat without framework overhead, analyzing time-space complexity of constraint satisfaction algorithms, or tuning cloud microservices on AWS for low-latency request dispatching.
              </p>
              <p>
                I actively seek opportunities where I can contribute to mission-critical systems, collaborate with experienced engineers, and apply my problem-solving skills to real-world challenges.
              </p>
            </div>

            <div className="md:col-span-5 space-y-4">
              <div className="portfolio-card p-5 rounded-2xl space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                  <GraduationCap className="h-4 w-4 text-blue-400" /> Academic Highlights
                </h3>
                
                <div className="space-y-3 text-xs">
                  <div className="border-l-2 border-blue-500 pl-3 space-y-0.5">
                    <div className="font-bold text-white text-sm">Amity University Jharkhand</div>
                    <div className="text-slate-400">B.Tech in Computer Science & Engineering</div>
                    <div className="text-blue-400 font-semibold">2024 – 2028 • CGPA: 8.00 / 10.0</div>
                  </div>

                  <div className="border-l-2 border-slate-700 pl-3 space-y-0.5">
                    <div className="font-semibold text-white">Sri Gurunanak Public School, Ramgarh</div>
                    <div className="text-slate-400">Senior Secondary (Class XII) — <strong>88.2%</strong></div>
                    <div className="text-slate-400">Secondary (Class X) — <strong>85.0%</strong></div>
                  </div>
                </div>
              </div>

              <div className="portfolio-card p-5 rounded-2xl space-y-2">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
                  What I Bring to an Engineering Team:
                </h3>
                <ul className="text-xs text-slate-300 space-y-1.5">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                    <span>Strong foundations in Java, OOP, and Data Structures & Algorithms</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                    <span>Hands-on experience deploying microservices & cloud apps on AWS</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                    <span>Demonstrated ownership, attention to detail, and rapid learning ability</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* WORK & RESEARCH EXPERIENCE */}
        <section id="experience" className="space-y-6 pt-4 border-t border-slate-800/60">
          <div className="flex items-center gap-2 text-blue-400 text-xs font-mono uppercase tracking-wider font-semibold">
            <Briefcase className="h-4 w-4" /> Professional Background
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight sm:text-4xl">Experience</h2>

          <div className="portfolio-card p-6 sm:p-8 rounded-2xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">Summer Research Intern — Distributed Systems</h3>
                <div className="text-sm font-semibold text-blue-400">
                  NIAMT (National Institute of Advanced Manufacturing Technology), Ranchi
                </div>
                <div className="text-xs text-slate-400 italic mt-0.5">
                  Supervised by: Dr. Rahul Mishra
                </div>
              </div>
              <div className="text-left sm:text-right font-mono text-xs text-slate-400 space-y-1">
                <div className="flex items-center sm:justify-end gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-blue-400" /> June 1, 2026 – July 15, 2026
                </div>
                <div className="flex items-center sm:justify-end gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-slate-500" /> Ranchi, Jharkhand
                </div>
              </div>
            </div>

            <ul className="text-sm text-slate-300 space-y-2.5 pl-1">
              <li className="flex items-start gap-2.5">
                <ChevronRight className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Engineered DVQ</strong>, an intelligent carbon-aware workload routing system across a live 7-region AWS cloud infrastructure, evaluating trade-offs between strict SLA latency and real-time grid emissions.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <ChevronRight className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                <span>
                  Achieved verified carbon footprint reductions of <strong>35.87% (Interactive)</strong> and <strong>30.28% (Real-time)</strong> versus standard AWS Least Connections baselines with a <strong>0.0% SLA breach rate</strong>.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <ChevronRight className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                <span>
                  Architected decoupled Node.js/Express microservices (telemetry ingestion, grid prober, state store, routing engine) running in a PM2-supervised production environment with a <strong>median routing latency of 61 µs</strong>.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <ChevronRight className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                <span>
                  Conducted fault-injection studies validating system robustness and automated failover during simulated regional grid outages.
                </span>
              </li>
            </ul>

            <div className="pt-2 flex flex-wrap gap-2">
              {['AWS Cloud', 'Distributed Systems', 'Node.js', 'Express', 'PM2', 'MongoDB', 'Latency Optimization', 'SLA Adherence'].map(t => (
                <span key={t} className="rounded-lg bg-slate-800/70 px-2.5 py-1 text-xs font-mono text-slate-300 border border-slate-700/60">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED PROJECTS SECTION */}
        <section id="projects" className="space-y-6 pt-4 border-t border-slate-800/60">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-blue-400 text-xs font-mono uppercase tracking-wider font-semibold">
                <Code2 className="h-4 w-4" /> Portfolio Showcase
              </div>
              <h2 className="text-3xl font-bold text-white tracking-tight sm:text-4xl">Featured Projects</h2>
              <p className="text-sm text-slate-400 mt-1">A curated selection of software systems and platforms I have engineered.</p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 bg-slate-900/90 rounded-xl p-1.5 border border-slate-800 self-start md:self-auto">
              {[
                { id: 'all', label: 'All Projects' },
                { id: 'cloud', label: 'Cloud & Distributed' },
                { id: 'java', label: 'Java & Enterprise' },
                { id: 'mobile', label: 'Mobile' },
                { id: 'fullstack', label: 'Full-Stack' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    activeTab === tab.id 
                      ? 'bg-blue-600 text-white font-semibold shadow-sm' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((p) => (
              <div 
                key={p.id}
                className="portfolio-card p-6 sm:p-7 rounded-2xl flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
                      {p.title}
                    </h3>
                    <p className="text-xs text-blue-400 font-medium mt-1">
                      {p.tagline}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {p.description}
                  </p>

                  {/* Highlights list */}
                  <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800/80 space-y-2">
                    <div className="text-[11px] uppercase font-mono font-bold tracking-wider text-slate-400">
                      Key Technical Details:
                    </div>
                    <ul className="text-xs text-slate-300 space-y-1.5">
                      {p.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-blue-400 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech stack pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {p.tech.map(t => (
                      <span key={t} className="rounded-md bg-slate-800/80 px-2 py-0.5 text-[11px] font-mono text-slate-300 border border-slate-700/60">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card actions */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex gap-3">
                    {p.github && (
                      <a 
                        href={p.github} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:text-blue-400 transition-colors"
                      >
                        <Github className="h-4 w-4" /> View GitHub Repo <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                    {p.githubBackend && (
                      <a 
                        href={p.githubBackend} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                      >
                        <Server className="h-3.5 w-3.5" /> Backend Code <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </section>

        {/* TECHNICAL SKILLS MATRIX */}
        <section id="skills" className="space-y-6 pt-4 border-t border-slate-800/60">
          <div className="flex items-center gap-2 text-blue-400 text-xs font-mono uppercase tracking-wider font-semibold">
            <Cpu className="h-4 w-4" /> Capabilities
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight sm:text-4xl">Technical Skills</h2>
          <p className="text-sm text-slate-400 max-w-2xl">
            A comprehensive breakdown of programming languages, enterprise frameworks, databases, and engineering tools I utilize in development.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            
            <div className="portfolio-card p-6 rounded-2xl space-y-3">
              <div className="h-10 w-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
                <Code2 className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-white text-base">Languages</h3>
              <div className="flex flex-wrap gap-2 text-xs">
                {['Java (JDK 17)', 'Python 3', 'C / C++', 'JavaScript (ES6+)', 'SQL'].map(s => (
                  <span key={s} className="rounded-lg bg-slate-800/80 px-2.5 py-1 text-slate-200 border border-slate-700/60 font-medium">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="portfolio-card p-6 rounded-2xl space-y-3">
              <div className="h-10 w-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
                <Server className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-white text-base">Backend & Enterprise</h3>
              <div className="flex flex-wrap gap-2 text-xs">
                {['Jakarta Servlets 6.0', 'Apache Tomcat 11', 'Node.js', 'Express.js', 'RESTful APIs', 'JSP / JSTL', 'DAO Pattern', 'Apache PDFBox'].map(s => (
                  <span key={s} className="rounded-lg bg-slate-800/80 px-2.5 py-1 text-slate-200 border border-slate-700/60 font-medium">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="portfolio-card p-6 rounded-2xl space-y-3">
              <div className="h-10 w-10 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center">
                <Database className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-white text-base">Databases & Storage</h3>
              <div className="flex flex-wrap gap-2 text-xs">
                {['MySQL (ACID, Foreign Keys)', '10+ Migration Scripts', 'MongoDB & Mongoose', 'Relational Normalization', 'Oracle SQL Developer'].map(s => (
                  <span key={s} className="rounded-lg bg-slate-800/80 px-2.5 py-1 text-slate-200 border border-slate-700/60 font-medium">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="portfolio-card p-6 rounded-2xl space-y-3">
              <div className="h-10 w-10 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center">
                <Globe2 className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-white text-base">Cloud & Distributed Systems</h3>
              <div className="flex flex-wrap gap-2 text-xs">
                {['AWS (EC2, CloudWatch)', 'Multi-Region Routing', 'PM2 Process Supervisor', 'Latency Optimization', 'SLA Adherence'].map(s => (
                  <span key={s} className="rounded-lg bg-slate-800/80 px-2.5 py-1 text-slate-200 border border-slate-700/60 font-medium">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="portfolio-card p-6 rounded-2xl space-y-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-white text-base">Mobile & Security</h3>
              <div className="flex flex-wrap gap-2 text-xs">
                {['Android Studio (Java)', 'Retrofit 2 HTTP Client', 'BCrypt Password Hashing', 'JWT Token Auth', 'Role-Based Access'].map(s => (
                  <span key={s} className="rounded-lg bg-slate-800/80 px-2.5 py-1 text-slate-200 border border-slate-700/60 font-medium">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="portfolio-card p-6 rounded-2xl space-y-3">
              <div className="h-10 w-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-white text-base">Engineering Concepts</h3>
              <div className="flex flex-wrap gap-2 text-xs">
                {['Object-Oriented Design (OOP)', 'Data Structures & Algorithms', 'Combinatorial Graphs', 'Concurrency & Threading', 'Git & GitHub'].map(s => (
                  <span key={s} className="rounded-lg bg-slate-800/80 px-2.5 py-1 text-slate-200 border border-slate-700/60 font-medium">
                    {s}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* EDUCATION & CERTIFICATIONS */}
        <section id="education" className="space-y-6 pt-4 border-t border-slate-800/60">
          <div className="flex items-center gap-2 text-blue-400 text-xs font-mono uppercase tracking-wider font-semibold">
            <Award className="h-4 w-4" /> Verified Credentials
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight sm:text-4xl">Education & Certifications</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Education Box */}
            <div className="portfolio-card p-6 rounded-2xl space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-blue-400" /> Academic Degrees
              </h3>
              
              <div className="space-y-4 text-xs sm:text-sm">
                <div className="border-l-2 border-blue-500 pl-4 space-y-1">
                  <div className="font-bold text-white text-base">Amity University Jharkhand</div>
                  <div className="text-slate-300 font-medium">Bachelor of Technology in Computer Science & Engineering</div>
                  <div className="text-blue-400 font-semibold font-mono text-xs">2024 – 2028 | Cumulative GPA: 8.00 / 10.0</div>
                  <div className="text-xs text-slate-400">Relevant coursework: Data Structures, Object-Oriented Programming, Database Management Systems, Operating Systems, Computer Networks.</div>
                </div>

                <div className="border-l-2 border-slate-700 pl-4 space-y-1">
                  <div className="font-bold text-white">Sri Gurunanak Public School, Ramgarh</div>
                  <div className="text-slate-300">Senior Secondary Examination (Class XII) — <strong>88.2%</strong></div>
                  <div className="text-slate-300">Secondary School Examination (Class X) — <strong>85.0%</strong></div>
                </div>
              </div>
            </div>

            {/* Certifications Box */}
            <div className="portfolio-card p-6 rounded-2xl space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Award className="h-5 w-5 text-indigo-400" /> Professional Certifications
              </h3>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
                  <Award className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-white text-xs sm:text-sm">Microsoft Data Pro — SQL Server AI Capabilities</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Validation of relational database structures, indexing, and SQL data modeling.</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
                  <Award className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-white text-xs sm:text-sm">NPTEL — Joy of Computing Using Python</h4>
                    <p className="text-xs text-slate-400 mt-0.5">IIT Madras • Algorithmic thinking, problem-solving, and computational data processing.</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
                  <Award className="h-5 w-5 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-white text-xs sm:text-sm">Infosys Springboard — Java Fundamentals</h4>
                    <p className="text-xs text-slate-400 mt-0.5">Core Java, Object-Oriented Principles, exception handling, and collections framework.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="space-y-6 pt-4 border-t border-slate-800/60">
          <div className="flex items-center gap-2 text-blue-400 text-xs font-mono uppercase tracking-wider font-semibold">
            <Mail className="h-4 w-4" /> Get in Touch
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight sm:text-4xl">Let's Connect</h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Contact details */}
            <div className="lg:col-span-5 space-y-5">
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                I am actively seeking Software Development Engineer (SDE) and Cloud/Backend Engineering roles. Whether you have an open opportunity, an interesting problem, or just want to connect, feel free to reach out!
              </p>

              <div className="space-y-3 pt-1">
                <a 
                  href="mailto:rashmipd870@gmail.com" 
                  className="portfolio-card p-4 rounded-xl flex items-center gap-3.5 hover:border-blue-500/40 transition-colors block"
                >
                  <div className="rounded-lg bg-blue-500/10 p-2.5 text-blue-400 border border-blue-500/20">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400 uppercase">Email Address</div>
                    <div className="text-sm font-semibold text-white">rashmipd870@gmail.com</div>
                  </div>
                </a>

                <a 
                  href="tel:+918709368696" 
                  className="portfolio-card p-4 rounded-xl flex items-center gap-3.5 hover:border-blue-500/40 transition-colors block"
                >
                  <div className="rounded-lg bg-indigo-500/10 p-2.5 text-indigo-400 border border-indigo-500/20">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400 uppercase">Phone Number</div>
                    <div className="text-sm font-semibold text-white">+91 87093 68696</div>
                  </div>
                </a>

                <a 
                  href="https://linkedin.com/in/rashmi-pandey-590a22340" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="portfolio-card p-4 rounded-xl flex items-center gap-3.5 hover:border-sky-500/40 transition-colors block"
                >
                  <div className="rounded-lg bg-sky-500/10 p-2.5 text-sky-400 border border-sky-500/20">
                    <Linkedin className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400 uppercase">LinkedIn Profile</div>
                    <div className="text-sm font-semibold text-white">linkedin.com/in/rashmi-pandey-590a22340</div>
                  </div>
                </a>

                <a 
                  href="https://github.com/rashmipandey870" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="portfolio-card p-4 rounded-xl flex items-center gap-3.5 hover:border-slate-500/40 transition-colors block"
                >
                  <div className="rounded-lg bg-slate-800 p-2.5 text-slate-300 border border-slate-700">
                    <Github className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400 uppercase">GitHub Profile</div>
                    <div className="text-sm font-semibold text-white">github.com/rashmipandey870</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Direct Message Form */}
            <div className="lg:col-span-7">
              <form 
                action="https://formsubmit.co/rashmipd870@gmail.com" 
                method="POST"
                className="portfolio-card p-6 sm:p-8 rounded-2xl space-y-4"
              >
                <input type="hidden" name="_subject" value="New Portfolio Message for Rashmi Pandey" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_next" value="https://rashmipandey870.github.io/Portfolio/" />
                <input type="hidden" name="_captcha" value="false" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5 font-mono uppercase">Your Name</label>
                    <input 
                      required 
                      type="text" 
                      name="name" 
                      placeholder="e.g. Hiring Manager / Recruiter" 
                      className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5 font-mono uppercase">Your Email</label>
                    <input 
                      required 
                      type="email" 
                      name="email" 
                      placeholder="e.g. recruiter@company.com" 
                      className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5 font-mono uppercase">Message</label>
                  <textarea 
                    required 
                    rows={5} 
                    name="message" 
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Hi Rashmi, we would love to connect with you regarding an engineering opportunity..." 
                    className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-blue-600/20 text-xs sm:text-sm flex items-center justify-center gap-2"
                >
                  <Send className="h-4 w-4" /> Send Message
                </button>
              </form>
            </div>

          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-[#090d16] py-8 text-center text-xs text-slate-500">
        <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>© {new Date().getFullYear()} Rashmi Pandey • B.Tech Computer Science & Engineering Undergraduate.</div>
          <div className="flex gap-5 text-slate-400">
            <a href="https://github.com/rashmipandey870" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
            <a href="https://linkedin.com/in/rashmi-pandey-590a22340" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="mailto:rashmipd870@gmail.com" className="hover:text-white transition-colors">Email</a>
          </div>
        </div>
      </footer>

      {/* Resume Modal */}
      <AnimatePresence>
        {resumeOpen && <ResumeModal onClose={() => setResumeOpen(false)} />}
      </AnimatePresence>

      {/* AI Copilot Widget */}
      <AICopilot />
    </div>
  );
}

export default App;
