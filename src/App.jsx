import React, { useState, useEffect, useRef } from 'react';
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
  ShieldCheck,
  Zap,
  ArrowRight, 
  CheckCircle2, 
  Network,
  Server,
  Layers,
  Sparkles,
  Flame,
  Globe2,
  FileText,
  Activity
} from 'lucide-react';
import AttendanceDashboard from './components/AttendanceDashboard';
import DeveloperTerminal from './components/DeveloperTerminal';
import AICopilot from './components/AICopilot';
import ResumeModal from './components/ResumeModal';
import AWSWorkloadSimulator from './components/AWSWorkloadSimulator';
import ArchitectureModal from './components/ArchitectureModal';

function App() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [selectedArchProject, setSelectedArchProject] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorHovered, setCursorHovered] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const canvasRef = useRef(null);

  // Contact Form State
  const [contactMessage, setContactMessage] = useState('');

  // Node Grid State for interactive graphic
  const [hoveredNode, setHoveredNode] = useState(null);

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

  // Hero Canvas Particle Animation (Distributed System Network Lines)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    const handleResize = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight || 550;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const particleCount = 38;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.5 + 1
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw network nodes
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0 || p1.x > canvas.width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > canvas.height) p1.vy *= -1;

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(16, 185, 129, 0.35)';
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);
          if (dist < 115) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${0.14 - dist / 900})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const projects = [
    {
      id: 'dvq',
      title: 'DVQ — Distributed Cloud Workload Routing System',
      tagline: 'Carbon-aware Lyapunov optimization engine balancing real-time grid emissions against strict latency SLAs across 7 AWS regions.',
      category: 'cloud',
      tech: ['AWS (7-Region)', 'Node.js', 'Express.js', 'Lyapunov Optimization', 'PM2', 'MongoDB', 'Electricity Maps API', 'AWS CloudWatch'],
      github: 'https://github.com/rashmipandey870',
      description: 'Engineered as part of a competitive Summer Research Internship at NIAMT under Dr. Rahul Mishra. Implemented a decoupled 6-microservice architecture on AWS to dynamically route user requests across 7 geographical regions. Utilizes Lyapunov drift-plus-penalty mathematical formulations to minimize grid carbon intensity without violating sub-100ms SLA constraints.',
      bullets: [
        'Achieved verified 35.87% carbon reduction (Interactive) and 30.28% (Real-Time) vs AWS Least Connections baseline.',
        'Sustained 0.0% SLA violation rate across thousands of evaluation trials and synthetic traffic bursts.',
        'Delivered 61 µs median gateway decision latency in a PM2-supervised production environment.',
        'Validated fault tolerance under simulated regional grid outages (us-east-1) with deterministic failover.'
      ],
      badge: 'Research Under Review',
      amazonLP: 'Dive Deep & Invent and Simplify',
      amazonLPDetail: 'Low-level 61µs latency profiling, mathematical queuing proofs, and architectural decoupling across 7 AWS regions.',
      archObjective: 'Formulate multi-region cloud routing as a Lyapunov drift-plus-penalty optimization problem to balance strict SLA latency against real-time grid emissions.',
      archFlow: [
        { title: 'Ingress & Rate Limiter', desc: 'API Gateway ingests requests and identifies workload tier (Interactive / Real-time / Batch).', icon: Network },
        { title: 'Telemetry & Carbon Prober', desc: 'Queries Electricity Maps API and CloudWatch RTT queues every 500ms into in-memory vector cache.', icon: Activity },
        { title: 'Lyapunov Dispatcher', desc: 'Computes argmin [V·Carbon + Queue·RTT] in 61µs and dispatches payload to optimal AWS region.', icon: Zap }
      ],
      decisions: [
        'Separated telemetry polling into an isolated microservice so external API rate limits never block the routing critical path.',
        'Utilized in-memory ring-buffer state vectors to eliminate database read bottlenecks during packet dispatching.',
        'Formulated V-parameter dynamic tuning to allow real-time SLA versus green-energy weighting.'
      ],
      benchmarks: [
        '61 µs median decision overhead (sub-millisecond line speed).',
        '35.87% carbon footprint reduction across 7 global AWS regions.',
        'Zero SLA violations even when us-east-1 experienced 180% carbon spikes.'
      ]
    },
    {
      id: 'examora',
      title: 'EXAMORA — Enterprise Academic Assessment & PDF Parsing Engine',
      tagline: 'High-throughput Java enterprise web application on Apache Tomcat 11 with ACID relational schema and Apache PDFBox parsing pipeline.',
      category: 'enterprise',
      tech: ['Java 17', 'Jakarta Servlets 6.0', 'Apache Tomcat 11', 'MySQL', 'BCrypt', 'Apache PDFBox', 'JSP / JSTL', 'DAO Pattern'],
      github: 'https://github.com/rashmipandey870/EXAMORA',
      description: 'Architected a multi-role enterprise web application from scratch using modern Jakarta EE (Servlet 6.0) on Apache Tomcat 11. Implemented strict Model-View-Controller (MVC) separation using Data Access Object (DAO) patterns with custom connection management. Features an automated document parsing pipeline powered by Apache PDFBox that extracts text and structured question banks from unstructured academic PDF exam sheets.',
      bullets: [
        'Most active production repository with 61 sequential commits demonstrating structured engineering lifecycle.',
        'Designed ACID-compliant relational schema across 10+ staged SQL migration phases with complete referential integrity.',
        'Secured user authentication and session management using salted BCrypt password hashing and role-based ACLs.',
        'Zero-framework overhead: Built with native Jakarta Servlets to optimize memory consumption and execution speed.'
      ],
      badge: 'Production Grade • 61 Commits',
      amazonLP: 'Ownership & Operational Excellence',
      amazonLPDetail: 'Authored 10+ database migrations, complete layer separation, and zero-framework performance optimization in pure Java.',
      archObjective: 'Deliver a robust, secure, and low-footprint enterprise academic testing engine capable of parsing raw PDF exams into queryable relational data.',
      archFlow: [
        { title: 'Jakarta Servlet Filter', desc: 'Intercepts incoming requests, validates session cookies, and enforces role-based access control.', icon: ShieldCheck },
        { title: 'DAO & Connection Pool', desc: 'Executes parameterized SQL queries with ACID transaction boundaries on MySQL.', icon: Database },
        { title: 'PDFBox Parsing Engine', desc: 'Streams PDF exam papers, extracts text blocks, and segments questions into structured DB entities.', icon: FileText }
      ],
      decisions: [
        'Chose raw Jakarta Servlets over heavy frameworks to achieve near-instant Tomcat cold starts and minimal JVM memory footprint.',
        'Implemented database migration versioning (phases 1 through 17) to guarantee schema consistency across staging and production.',
        'Streaming PDF parsing via Apache PDFBox prevents OutOfMemory errors when processing large academic papers.'
      ],
      benchmarks: [
        'Sub-15ms servlet request-response cycle on Tomcat 11.',
        '10+ verified database migration scripts maintaining zero data corruption.',
        'Bcrypt hashing with work-factor 12 ensuring brute-force resistance.'
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
      description: 'Engineered an end-to-end tournament management platform used by 100+ athletes and coordinators. Developed combinatorial scheduling algorithms in Java to generate balanced round-robin match pairings and single-elimination tournament bracket trees. Built 10+ RESTful APIs with Node.js/Express and MongoDB, synchronizing live scores and team statuses to mobile devices in real time via Retrofit 2.',
      bullets: [
        'Automated round-robin and knockout bracket generation, eliminating manual coordinator scheduling errors.',
        'Architected 10+ RESTful backend endpoints achieving sub-200ms latency under concurrent tournament usage.',
        'Implemented asynchronous network calls with Retrofit 2 and OkHttp token interceptors for reliable mobile sync.',
        'Reduced tournament coordination and score reporting overhead by ~80% compared to legacy spreadsheet workflows.'
      ],
      badge: '100+ Active Athletes',
      amazonLP: 'Customer Obsession & Deliver Results',
      amazonLPDetail: 'Solved real customer friction for 100+ athletes, eliminating manual scheduling errors and cutting admin time by 80%.',
      archObjective: 'Automate complex sports tournament operations, team registrations, and live bracket state synchronization via mobile and REST microservices.',
      archFlow: [
        { title: 'Android Mobile Client', desc: 'Captain/Player portal built in Java with Material UI and local SQLite caching.', icon: Cpu },
        { title: 'Retrofit HTTP Client', desc: 'Dispatches asynchronous REST queries with automatic token refreshing and retry logic.', icon: Server },
        { title: 'Express & Bracket Logic', desc: 'Node.js backend calculates graph permutations for round-robin and knockout brackets in MongoDB.', icon: Database }
      ],
      decisions: [
        'Designed decoupled REST backend so both Android mobile clients and future web portals consume identical scheduling endpoints.',
        'Automated bracket generation as a deterministic graph traversal rather than manual admin input.',
        'Implemented client-side optimistic UI updates to keep the app responsive during poor athletic field network conditions.'
      ],
      benchmarks: [
        'Sub-200ms average response time across all 10+ REST endpoints.',
        '80% reduction in manual tournament coordination effort.',
        'Zero schedule collision errors across 100+ participant rosters.'
      ]
    },
    {
      id: 'papertracker',
      title: 'Faculty Research Paper Tracker — Publication & Metrics System',
      tagline: 'Academic publication tracking and citation analytics dashboard featuring OTP verification and automated Google Form ingestion.',
      category: 'web',
      tech: ['Node.js', 'Express.js', 'MongoDB Atlas', 'Mongoose', 'JWT Auth', 'Nodemailer OTP', 'Google Forms API'],
      github: 'https://github.com/rashmipandey870',
      description: 'Developed an academic publication tracking platform for university faculty members. Features secure two-factor email OTP authentication, automated Google Forms webhook import pipelines, and indexed citation analytics. Designed with responsive glassmorphic UI and MongoDB Mongoose schemas to track journal rankings, conference indices, and co-author relationships.',
      bullets: [
        'Automated paper intake via Google Forms API ingestion, streamlining faculty publication submissions.',
        'Implemented secure two-factor authentication via Nodemailer OTP and stateless JWT token authorization.',
        'Designed indexed MongoDB schemas supporting multi-attribute querying across ISSN, DOI, and publication dates.',
        'Provides real-time faculty research analytics and automated citation metric summaries.'
      ],
      badge: 'Academic Production',
      amazonLP: 'Invent & Simplify',
      amazonLPDetail: 'Automated tedious faculty publication paperwork into a clean, unified digital submission and analytics pipeline.',
      archObjective: 'Streamline university research publication audits through automated ingestion, citation tracking, and verified faculty authentication.',
      archFlow: [
        { title: 'Submission / Webhook', desc: 'Faculty submit research details via portal or connected Google Forms webhooks.', icon: Network },
        { title: 'Auth & OTP Gate', desc: 'Nodemailer issues one-time passwords for zero-trust identity verification before DB writes.', icon: ShieldCheck },
        { title: 'MongoDB Index Store', desc: 'Mongoose schemas index publications by DOI, quartile ranking, and faculty author IDs.', icon: Database }
      ],
      decisions: [
        'Integrated stateless JWTs with short-lived access tokens to simplify horizontal scaling without Redis session store overhead.',
        'Utilized compound indexes in MongoDB to keep search queries below 10ms across thousands of publications.'
      ],
      benchmarks: [
        'Instantaneous webhook paper import from Google Forms.',
        'Two-factor OTP delivery in under 3 seconds via Nodemailer SMTP.',
        'Zero unauthorized submission tampering through cryptographic JWT claims.'
      ]
    },
    {
      id: 'planner',
      title: 'Study Planner — Dynamic Constraint-Based Scheduling Algorithm',
      tagline: 'Algorithmic Java tool solving multi-factor time-block assignment with deadline urgency and cognitive fatigue mitigation.',
      category: 'enterprise',
      tech: ['Java 17', 'Object-Oriented Design', 'Priority Queues', 'Greedy Heuristics', 'Algorithmic Optimization'],
      github: 'https://github.com/rashmipandey870/Study-Planner-Scheduling-Algorithm-',
      description: 'Engineered a dynamic scheduling algorithm in Java that takes subject difficulty, upcoming exam deadlines, and daily fatigue thresholds to generate an optimized weekly study timetable. Utilizes priority queues and heuristic constraint satisfaction to allocate revision windows and prevent cognitive overload.',
      bullets: [
        'Formulated multi-objective scheduling algorithm factoring in deadline proximity and cognitive fatigue.',
        'Utilized Java Collections PriorityQueues to execute fast schedule recalculations in O(N log N) time.',
        'Automatically reserves spaced repetition buffers before major exam milestones.',
        'Demonstrates clean Object-Oriented design principles and algorithmic optimization in pure Java.'
      ],
      badge: 'Algorithms & OOP',
      amazonLP: 'Dive Deep',
      amazonLPDetail: 'Modeled schedule allocation as a multi-objective constraint problem using pure Java algorithmic primitives.',
      archObjective: 'Demonstrate algorithmic problem-solving and clean Object-Oriented Design in Java for multi-constraint time allocation.',
      archFlow: [
        { title: 'Constraint Ingestion', desc: 'Parses course syllabi, deadline weights, and maximum daily study capacity.', icon: Layers },
        { title: 'Priority Scoring', desc: 'Calculates dynamic urgency weight: Urgency = (Deadline_Proximity · Difficulty) / Remaining_Days.', icon: Zap },
        { title: 'Schedule Synthesis', desc: 'Assigns balanced time slots using PriorityQueue min-heap and outputs conflict-free timetable.', icon: CheckCircle2 }
      ],
      decisions: [
        'Adopted priority heap structures to allow dynamic schedule re-balancing whenever a new deadline is inserted.',
        'Separated time slot constraints from task representations to ensure clean single-responsibility OOP boundaries.'
      ],
      benchmarks: [
        'O(N log N) schedule generation time.',
        'Guaranteed zero overlapping time-slot collisions.',
        '100% adherence to defined daily cognitive fatigue thresholds.'
      ]
    }
  ];

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
          width: cursorHovered ? '48px' : '22px',
          height: cursorHovered ? '48px' : '22px',
          backgroundColor: cursorHovered ? 'rgba(16, 185, 129, 0.08)' : 'transparent',
          boxShadow: cursorHovered ? '0 0 15px rgba(16, 185, 129, 0.35)' : 'none',
        }}
      />

      {/* Background Decorative Gradients */}
      <div className="absolute top-0 left-0 w-full h-[650px] bg-gradient-to-b from-eco-500/5 to-transparent pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[550px] h-[550px] rounded-full bg-cyan-500/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[550px] h-[550px] rounded-full bg-eco-500/5 blur-[140px] pointer-events-none" />

      {/* Header / Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-dark-950/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#" className="flex items-center gap-2 font-mono text-xl font-bold tracking-tight text-white group">
            <span className="text-eco-400 group-hover:text-cyan-400 transition-colors">&lt;</span>
            <span>Rashmi Pandey</span>
            <span className="text-cyan-400 group-hover:text-eco-400 transition-colors">/&gt;</span>
          </a>
          
          <nav className="hidden items-center gap-7 lg:flex">
            <a href="#about" className="text-sm font-medium text-slate-400 transition-colors hover:text-eco-400">About</a>
            <a href="#projects" className="text-sm font-medium text-slate-400 transition-colors hover:text-eco-400">Projects</a>
            <a href="#simulator" className="text-sm font-medium text-slate-400 transition-colors hover:text-eco-400 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-eco-400 animate-pulse" />
              AWS Simulator
            </a>
            <a href="#amazon-alignment" className="text-sm font-medium text-slate-400 transition-colors hover:text-eco-400">Amazon LPs</a>
            <a href="#console" className="text-sm font-medium text-slate-400 transition-colors hover:text-eco-400">API Terminal</a>
            <a href="#contact" className="text-sm font-medium text-slate-400 transition-colors hover:text-eco-400">Contact</a>
          </nav>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setResumeOpen(true)}
              className="relative inline-flex items-center justify-center rounded-full bg-gradient-to-r from-eco-500 to-cyan-500 px-5 py-2 text-xs font-bold font-mono uppercase tracking-wider text-dark-950 shadow-md transition-all hover:scale-105 hover:shadow-eco-500/25"
            >
              Resume (PDF)
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 pb-24 pt-8">
        
        {/* HERO SECTION */}
        <section id="hero" className="grid grid-cols-1 items-center gap-12 py-12 lg:grid-cols-12 lg:py-20 relative min-h-[580px]">
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />
          
          <div className="space-y-6 lg:col-span-7 z-10 relative">
            
            {/* SDE Target Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-eco-500/30 bg-eco-500/10 px-4 py-1.5 font-mono text-xs font-semibold text-eco-400 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-eco-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-eco-500"></span>
              </span>
              Targeting Software Development Engineer (SDE) & Cloud Systems Roles
            </div>
            
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl leading-[1.12]">
              Engineering Resilient <span className="bg-gradient-to-r from-eco-400 via-cyan-400 to-emerald-300 bg-clip-text text-transparent">Cloud Infrastructure</span> & High-Performance Backends
            </h1>
            
            <p className="max-w-xl text-base sm:text-lg text-slate-400 leading-relaxed">
              Computer Science & Engineering undergraduate at <strong>Amity University (CGPA 8.00/10)</strong> with completed research at <strong>NIAMT</strong> in Lyapunov-optimized distributed cloud routing on AWS. Passionate about sub-millisecond systems, Java enterprise architectures, and carbon-aware distributed computing.
            </p>

            {/* Recruiter Fast-Track Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="glass-panel p-3 rounded-xl border border-white/5">
                <div className="font-mono text-xl sm:text-2xl font-black text-eco-400">61 µs</div>
                <div className="text-[10px] uppercase font-mono text-slate-500 mt-0.5">Gateway Latency</div>
              </div>
              <div className="glass-panel p-3 rounded-xl border border-white/5">
                <div className="font-mono text-xl sm:text-2xl font-black text-cyan-400">-35.87%</div>
                <div className="text-[10px] uppercase font-mono text-slate-500 mt-0.5">Carbon Reduction</div>
              </div>
              <div className="glass-panel p-3 rounded-xl border border-white/5">
                <div className="font-mono text-xl sm:text-2xl font-black text-white">0.0%</div>
                <div className="text-[10px] uppercase font-mono text-slate-500 mt-0.5">SLA Breach Rate</div>
              </div>
              <div className="glass-panel p-3 rounded-xl border border-white/5">
                <div className="font-mono text-xl sm:text-2xl font-black text-emerald-400">8.00 / 10</div>
                <div className="text-[10px] uppercase font-mono text-slate-500 mt-0.5">B.Tech CGPA</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a 
                href="#projects" 
                className="inline-flex items-center gap-2 rounded-xl bg-eco-500 px-6 py-3.5 text-xs font-bold font-mono uppercase tracking-wider text-dark-950 shadow-lg shadow-eco-500/20 transition-all hover:bg-eco-400 hover:scale-102"
              >
                Inspect Projects <ChevronRight className="h-4 w-4" />
              </a>
              <a 
                href="#simulator" 
                className="inline-flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-6 py-3.5 text-xs font-bold font-mono uppercase tracking-wider text-white transition-all hover:bg-white/10 hover:border-white/20"
              >
                Launch AWS Simulator <Zap className="h-4 w-4 text-cyan-400" />
              </a>
            </div>

            <div className="flex items-center gap-6 pt-4 text-slate-500">
              <a href="https://github.com/rashmipandey870" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" title="GitHub">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com/in/rashmi-pandey-590a22340" target="_blank" rel="noreferrer" className="hover:text-white transition-colors" title="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="mailto:rashmipd870@gmail.com" className="hover:text-white transition-colors" title="Email">
                <Mail className="h-5 w-5" />
              </a>
              <span className="text-xs font-mono text-slate-600">|</span>
              <span className="text-xs font-mono text-slate-400">AWS • Java 17 • Distributed Systems • Jakarta EE</span>
            </div>
          </div>

          {/* Interactive Distributed Architecture Node Grid */}
          <div className="flex justify-center lg:col-span-5 z-10 relative">
            <div className="relative w-full max-w-[440px] aspect-square rounded-2xl border border-white/10 bg-dark-900/70 p-6 flex flex-col justify-between shadow-2xl backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-eco-400 uppercase tracking-widest flex items-center gap-1.5 font-bold">
                  <span className="h-2 w-2 rounded-full bg-eco-400 animate-ping" />
                  Live Distributed Systems Model
                </span>
                <span className="font-mono text-[9px] text-slate-500">7-Region AWS Mesh</span>
              </div>
              
              <div className="flex justify-between items-center mt-4">
                {/* Gateway node */}
                <div 
                  onMouseEnter={() => setHoveredNode('gateway')}
                  onMouseLeave={() => setHoveredNode(null)}
                  className={`rounded-xl border p-4 bg-dark-950/90 transition-all z-15 cursor-pointer text-center flex-1 mx-2 flex flex-col items-center justify-center ${
                    hoveredNode === 'gateway' ? 'border-eco-400 shadow-lg shadow-eco-500/20 scale-102' : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <Network className="h-5 w-5 text-eco-400 mb-1" />
                  <span className="font-mono text-[11px] text-white font-bold">API Gateway</span>
                  <span className="text-[9px] text-eco-400 font-mono font-semibold">RTT: 61 µs Overhead</span>
                </div>
              </div>

              <div className="flex justify-between items-center my-3">
                {/* Auth Service node */}
                <div 
                  onMouseEnter={() => setHoveredNode('auth')}
                  onMouseLeave={() => setHoveredNode(null)}
                  className={`rounded-xl border p-3.5 bg-dark-950/90 transition-all z-15 cursor-pointer text-center flex-1 mx-2 flex flex-col items-center justify-center ${
                    hoveredNode === 'auth' ? 'border-cyan-400 shadow-lg shadow-cyan-500/20 scale-102' : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <ShieldCheck className="h-4 w-4 text-cyan-400 mb-1" />
                  <span className="font-mono text-[10px] text-white font-bold">Auth / Security</span>
                  <span className="text-[9px] text-slate-400 font-mono">BCrypt + JWT</span>
                </div>
                
                {/* Telemetry node */}
                <div 
                  onMouseEnter={() => setHoveredNode('telemetry')}
                  onMouseLeave={() => setHoveredNode(null)}
                  className={`rounded-xl border p-3.5 bg-dark-950/90 transition-all z-15 cursor-pointer text-center flex-1 mx-2 flex flex-col items-center justify-center ${
                    hoveredNode === 'telemetry' ? 'border-eco-400 shadow-lg shadow-eco-500/20 scale-102' : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <Activity className="h-4 w-4 text-eco-400 mb-1" />
                  <span className="font-mono text-[10px] text-white font-bold">Carbon Prober</span>
                  <span className="text-[9px] text-slate-400 font-mono">Electricity Maps</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                {/* Database node */}
                <div 
                  onMouseEnter={() => setHoveredNode('db')}
                  onMouseLeave={() => setHoveredNode(null)}
                  className={`rounded-xl border p-4 bg-dark-950/90 transition-all z-15 cursor-pointer text-center flex-1 mx-2 flex flex-col items-center justify-center ${
                    hoveredNode === 'db' ? 'border-emerald-400 shadow-lg shadow-emerald-500/20 scale-102' : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <Database className="h-5 w-5 text-emerald-400 mb-1" />
                  <span className="font-mono text-[11px] text-white font-bold">Storage Tier</span>
                  <span className="text-[9px] text-slate-400 font-mono">MySQL ACID + MongoDB</span>
                </div>
              </div>

              {/* Status Explanation Card */}
              <div className="bg-dark-950 border border-white/10 rounded-xl p-3 min-h-[58px] font-mono text-[11px] text-slate-300 flex items-center justify-center text-center">
                {hoveredNode === 'gateway' && <span className="text-eco-400">API Gateway: Dispatches requests in 61µs using Lyapunov drift-plus-penalty optimization across 7 AWS nodes.</span>}
                {hoveredNode === 'auth' && <span className="text-cyan-400">Security Layer: Validates JWT stateless tokens and BCrypt work-factor 12 passwords with zero leakage.</span>}
                {hoveredNode === 'telemetry' && <span className="text-eco-400">Carbon Prober: Ingests live grid carbon intensity & CloudWatch latency into in-memory ring buffers.</span>}
                {hoveredNode === 'db' && <span className="text-emerald-400">Storage Layer: Enforces relational ACID schema boundaries across 10+ migrations and MongoDB document collections.</span>}
                {!hoveredNode && <span className="text-slate-400">Hover over any architectural node to inspect service parameters and latency specs.</span>}
              </div>

            </div>
          </div>
        </section>

        {/* ABOUT & SKILLS */}
        <section id="about" className="py-20 border-t border-white/5">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-eco-500/20 bg-eco-500/5 px-3 py-1 font-mono text-xs font-semibold text-eco-400">
                <Code2 className="h-3.5 w-3.5" /> Technical Foundation
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Engineering Stack & Core Competencies
              </h2>
              <p className="text-slate-400 leading-relaxed text-sm">
                Computer Science & Engineering undergraduate at Amity University (CGPA 8.00/10). My engineering and research focus on high-throughput backend services, distributed systems algorithms, and cloud infrastructure on AWS.
              </p>
              
              {/* Timeline widget */}
              <div className="border-l border-white/10 pl-6 space-y-6 py-2 relative">
                <div className="relative">
                  <div className="absolute -left-[30px] top-1 h-3.5 w-3.5 rounded-full bg-eco-500 border border-dark-950" />
                  <div className="text-[10px] font-mono font-bold text-eco-400 uppercase">2024 – 2028</div>
                  <h4 className="text-xs font-bold text-white">B.Tech Computer Science & Engineering</h4>
                  <p className="text-[11px] text-slate-400">Amity University Jharkhand • CGPA: 8.00 / 10.0</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[30px] top-1 h-3.5 w-3.5 rounded-full bg-cyan-400 border border-dark-950" />
                  <div className="text-[10px] font-mono font-bold text-cyan-400 uppercase">June 1 – July 15, 2026</div>
                  <h4 className="text-xs font-bold text-white">Summer Research Intern — NIAMT Ranchi</h4>
                  <p className="text-[11px] text-slate-400">Supervised by Dr. Rahul Mishra. Formulated DVQ Lyapunov cloud routing on AWS with 35.87% carbon savings.</p>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="glass-panel rounded-xl p-6 border border-white/5 space-y-3">
                <h3 className="font-mono text-sm font-bold text-eco-400 flex items-center gap-2">
                  <Code2 className="h-4 w-4" /> Languages & Algorithms
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['Java 17', 'Python 3', 'C/C++', 'JavaScript (ES6+)', 'SQL', 'Data Structures & Algorithms', 'Lyapunov Optimization', 'Combinatorial Graphs'].map(s => (
                    <span key={s} className="rounded-lg bg-eco-500/10 px-3 py-1 text-xs font-semibold text-eco-300 border border-eco-500/20">{s}</span>
                  ))}
                </div>
              </div>

              <div className="glass-panel rounded-xl p-6 border border-white/5 space-y-3">
                <h3 className="font-mono text-sm font-bold text-cyan-400 flex items-center gap-2">
                  <Server className="h-4 w-4" /> Backend & Enterprise
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['Jakarta Servlets 6.0', 'Tomcat 11', 'Node.js', 'Express.js', 'REST APIs', 'JSP / JSTL', 'DAO Pattern', 'Apache PDFBox'].map(s => (
                    <span key={s} className="rounded-lg bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-300 border border-cyan-500/20">{s}</span>
                  ))}
                </div>
              </div>

              <div className="glass-panel rounded-xl p-6 border border-white/5 space-y-3">
                <h3 className="font-mono text-sm font-bold text-emerald-400 flex items-center gap-2">
                  <Database className="h-4 w-4" /> Databases & Storage
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['MySQL (ACID, Foreign Keys)', 'Schema Migrations (10+ Phases)', 'MongoDB', 'Mongoose', 'Database Indexing', 'Oracle SQL Developer'].map(s => (
                    <span key={s} className="rounded-lg bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300 border border-emerald-500/20">{s}</span>
                  ))}
                </div>
              </div>

              <div className="glass-panel rounded-xl p-6 border border-white/5 space-y-3">
                <h3 className="font-mono text-sm font-bold text-white flex items-center gap-2">
                  <Globe2 className="h-4 w-4 text-eco-400" /> Cloud, DevOps & Mobile
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['AWS (EC2, CloudWatch)', 'Multi-Region 7-Node Mesh', 'PM2 Process Supervisor', 'Android Studio (Java)', 'Retrofit 2', 'Git / GitHub', 'Postman'].map(s => (
                    <span key={s} className="rounded-lg bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300 border border-white/10">{s}</span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* FEATURED PROJECTS SECTION */}
        <section id="projects" className="py-20 border-t border-white/5">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-eco-500/20 bg-eco-500/5 px-3 py-1 font-mono text-xs font-semibold text-eco-400 mb-2">
                <Layers className="h-3.5 w-3.5" /> Production & Research Systems
              </div>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">Featured Engineering Projects</h2>
              <p className="text-slate-400 text-sm mt-1">Detailed implementations with verifiable GitHub repositories, system metrics, and architectural trade-offs.</p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 mt-6 md:mt-0 bg-dark-900 rounded-xl p-1.5 border border-white/10">
              {[
                { id: 'all', label: 'All Systems' },
                { id: 'cloud', label: 'Cloud & Distributed' },
                { id: 'enterprise', label: 'Java & Enterprise' },
                { id: 'mobile', label: 'Mobile' },
                { id: 'web', label: 'Full-Stack' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                    activeTab === tab.id 
                      ? 'bg-eco-500 text-dark-950 shadow-md font-bold' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((p) => (
              <div 
                key={p.id} 
                className="glass-panel rounded-2xl p-7 flex flex-col justify-between h-full relative overflow-hidden border border-white/10 hover:border-eco-500/40 transition-all duration-300 hover:shadow-2xl hover:shadow-eco-500/10 group"
              >
                <div>
                  {/* Badge & Title */}
                  <div className="flex justify-between items-start mb-3 gap-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-eco-400 transition-colors leading-snug">
                      {p.title}
                    </h3>
                    {p.badge && (
                      <span className="shrink-0 bg-eco-500/10 border border-eco-500/30 text-[10px] font-bold text-eco-400 px-2.5 py-1 rounded-full uppercase tracking-wider font-mono">
                        {p.badge}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-xs text-cyan-400/90 font-medium mb-4 italic font-sans">
                    {p.tagline}
                  </p>
                  
                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {p.tech.map(t => (
                      <span key={t} className="bg-white/5 px-2.5 py-0.5 rounded text-[10px] font-mono text-slate-300 border border-white/5">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Description */}
                  <p className="text-slate-300 text-xs leading-relaxed mb-5">
                    {p.description}
                  </p>
                  
                  {/* Bullet points */}
                  <div className="space-y-2 mb-6 bg-dark-950/60 p-4 rounded-xl border border-white/5">
                    <div className="text-[10px] uppercase font-mono tracking-widest text-eco-400 font-bold flex items-center gap-1.5">
                      <Zap className="h-3 w-3" /> Key Implementations & Measured Impact:
                    </div>
                    <ul className="text-xs text-slate-300 space-y-1.5 font-sans pl-1">
                      {p.bullets.map((b, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-eco-400 shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="border-t border-white/10 pt-5 flex flex-wrap gap-3 items-center justify-between">
                  <button
                    onClick={() => setSelectedArchProject(p)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold font-mono text-eco-400 hover:text-eco-300 transition-colors"
                  >
                    <Layers className="h-3.5 w-3.5" /> Inspect Architecture & Design <ArrowRight className="h-3.5 w-3.5" />
                  </button>

                  <div className="flex gap-3">
                    {p.github && (
                      <a 
                        href={p.github} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="inline-flex items-center gap-1.5 text-xs font-bold font-mono text-white hover:text-eco-400 transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10"
                      >
                        <Github className="h-3.5 w-3.5" /> Code Repo <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                    {p.githubBackend && (
                      <a 
                        href={p.githubBackend} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="inline-flex items-center gap-1.5 text-xs font-bold font-mono text-slate-300 hover:text-cyan-400 transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10"
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

        {/* AWS DISTRIBUTED WORKLOAD SIMULATOR */}
        <section id="simulator" className="py-20 border-t border-white/5">
          <AWSWorkloadSimulator />
        </section>

        {/* AMAZON LEADERSHIP PRINCIPLES ALIGNMENT */}
        <section id="amazon-alignment" className="py-20 border-t border-white/5">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-eco-500/20 bg-eco-500/5 px-3 py-1 font-mono text-xs font-semibold text-eco-400 mb-2">
              <Flame className="h-3.5 w-3.5" /> Amazon Engineering Standards
            </div>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Amazon Leadership Principles Alignment</h2>
            <p className="text-slate-400 text-sm mt-1">How my academic research and production software embody core Amazon values.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-3">
              <div className="h-10 w-10 rounded-xl bg-eco-500/10 border border-eco-500/20 text-eco-400 flex items-center justify-center font-bold">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-white text-base">Dive Deep</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Measured 61 µs median gateway decision latency. Profiled Linux network buffers, investigated Lyapunov drift queuing bounds, and stress-tested microservices under simulated regional grid outages.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-3">
              <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-white text-base">Customer Obsession</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Maintained a strict 0.0% SLA violation rate across all trials. Even while reducing carbon emissions by up to 35.87%, system response times remained tightly within customer contract thresholds.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-white text-base">Invent and Simplify</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Formulated complex multi-variable grid carbon intensity and network latency into decoupled, single-responsibility microservices. Replaced manual sports scheduling with automated combinatorial algorithms.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-3">
              <div className="h-10 w-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
                <Award className="h-5 w-5" />
              </div>
              <h3 className="font-bold text-white text-base">Deliver Results</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Authored 61 sequential commits delivering a complete Jakarta EE enterprise WAR artifact on Tomcat 11; built mobile and REST APIs serving 100+ athletes; sustained an 8.00/10 CGPA.
              </p>
            </div>

          </div>
        </section>

        {/* ATTENDANCE SYSTEM SHOWCASE */}
        <section id="attendance" className="py-20 border-t border-white/5">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-eco-500/20 bg-eco-500/5 px-3 py-1 font-mono text-xs font-semibold text-eco-400 mb-2">
              <Database className="h-3.5 w-3.5" /> Full-Stack Demo
            </div>
            <h2 className="text-3xl font-bold text-white mb-3 sm:text-4xl">Student Management & Attendance System</h2>
            <p className="mx-auto max-w-2xl text-slate-400 text-sm leading-relaxed">
              An interactive administration dashboard demonstrating relational schema handling, real-time filtering, low attendance detection (&lt;75%), and CSV export capabilities.
            </p>
          </div>
          <AttendanceDashboard />
        </section>

        {/* DEVELOPER TERMINAL / API SANDBOX */}
        <section id="console" className="py-20 border-t border-white/5">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-eco-500/20 bg-eco-500/5 px-3 py-1 font-mono text-xs font-semibold text-eco-400 mb-2">
              <TermIcon className="h-3.5 w-3.5" /> Interactive CLI
            </div>
            <h2 className="text-3xl font-bold text-white mb-2 sm:text-4xl">Systems Terminal & API Console</h2>
            <p className="text-slate-400 text-sm">Query live endpoints via curl, inspect Amazon evaluation summaries ('amazon'), or verify production benchmarks ('metrics').</p>
          </div>
          <DeveloperTerminal />
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="py-20 border-t border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-eco-500/20 bg-eco-500/5 px-3 py-1 font-mono text-xs font-semibold text-eco-400">
                <Mail className="h-3.5 w-3.5" /> Let's Connect
              </div>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">Ready to deliver high impact as an SDE</h2>
              <p className="text-slate-400 leading-relaxed text-sm">
                Actively interviewing for Software Development Engineer (SDE), Cloud Systems, and Backend Engineering roles. If you are a recruiter, hiring manager, or engineer looking for strong technical depth, let's talk.
              </p>
              
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-eco-500/10 p-3 border border-eco-500/20 text-eco-400">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 uppercase font-mono">Direct Email</div>
                    <a href="mailto:rashmipd870@gmail.com" className="text-sm font-semibold text-white hover:text-eco-400 transition-colors">rashmipd870@gmail.com</a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-eco-500/10 p-3 border border-eco-500/20 text-eco-400">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 uppercase font-mono">Direct Phone</div>
                    <a href="tel:+918709368696" className="text-sm font-semibold text-white hover:text-eco-400 transition-colors">+91 87093 68696</a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-cyan-500/10 p-3 border border-cyan-500/20 text-cyan-400">
                    <Linkedin className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 uppercase font-mono">LinkedIn Profile</div>
                    <a href="https://linkedin.com/in/rashmi-pandey-590a22340" target="_blank" rel="noreferrer" className="text-sm font-semibold text-white hover:text-cyan-400 transition-colors">linkedin.com/in/rashmi-pandey-590a22340</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <form 
                action="https://formsubmit.co/rashmipd870@gmail.com" 
                method="POST"
                className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4"
              >
                {/* FormSubmit configurations */}
                <input type="hidden" name="_subject" value="New SDE / Recruiter Portfolio Inquiry for Rashmi!" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_next" value="https://rashmipandey870.github.io/Portfolio/" />
                <input type="hidden" name="_captcha" value="false" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase font-mono mb-2">Your Name / Title</label>
                    <input required type="text" name="name" placeholder="e.g. Amazon Recruiter / Engineering Manager" className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-eco-500 transition-colors" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase font-mono mb-2">Work Email</label>
                    <input required type="email" name="email" placeholder="e.g. recruiter@amazon.com" className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-eco-500 transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase font-mono mb-2">Message or Opportunity Details</label>
                  <textarea 
                    required 
                    rows={5} 
                    name="message" 
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    className="w-full bg-dark-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-eco-500 transition-colors" 
                    placeholder="We'd love to connect with you regarding Software Development Engineer opportunities..."
                  ></textarea>
                </div>
                <button type="submit" className="w-full py-3.5 bg-eco-500 hover:bg-eco-400 transition-colors text-dark-950 font-bold rounded-xl shadow-lg hover:scale-102 font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2">
                  <Mail className="h-4 w-4" /> Send Message Directly
                </button>
              </form>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-dark-900 py-8">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">&copy; {new Date().getFullYear()} Rashmi Pandey • Computer Science & Engineering Undergraduate.</p>
          <div className="flex gap-6 text-xs text-slate-500 font-mono">
            <a href="https://github.com/rashmipandey870" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
            <a href="https://linkedin.com/in/rashmi-pandey-590a22340" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="mailto:rashmipd870@gmail.com" className="hover:text-white transition-colors">Email</a>
          </div>
        </div>
      </footer>

      {/* Modals & Chatbot */}
      <AnimatePresence>
        {resumeOpen && <ResumeModal onClose={() => setResumeOpen(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {selectedArchProject && (
          <ArchitectureModal 
            project={selectedArchProject} 
            onClose={() => setSelectedArchProject(null)} 
          />
        )}
      </AnimatePresence>
      <AICopilot />
    </div>
  );
}

export default App;
