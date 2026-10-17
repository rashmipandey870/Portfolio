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
  GraduationCap,
  Calendar,
  MapPin,
  TrendingDown,
  Clock,
  Cloud,
  Check,
  Copy,
  Download,
  Terminal,
  Activity,
  Command,
  CornerDownLeft,
  X,
  Play
} from 'lucide-react';
import DeveloperTerminal from './components/DeveloperTerminal';
import AICopilot from './components/AICopilot';
import ResumeModal from './components/ResumeModal';
import AWSWorkloadSimulator from './components/AWSWorkloadSimulator';
import ArchitectureModal from './components/ArchitectureModal';

function App() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [selectedArchProject, setSelectedArchProject] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [projectTab, setProjectTab] = useState({}); // { [projectId]: 'star' | 'arch' | 'curl' }
  const [copiedKey, setCopiedKey] = useState(null);
  const [activeSection, setActiveSection] = useState('hero');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorHovered, setCursorHovered] = useState(false);
  const canvasRef = useRef(null);

  const baseUrl = import.meta.env.BASE_URL || '/';
  const photoUrl = `${baseUrl}rashmi-photo.jpg`;
  const resumeUrl = `${baseUrl}Rashmi_Pandey_Resume.pdf`;

  // Custom Cursor tracking
  useEffect(() => {
    const updateMouse = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMouse);
    return () => window.removeEventListener('mousemove', updateMouse);
  }, []);

  useEffect(() => {
    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('a') || 
        target.closest('button');
      setCursorHovered(!!isInteractive);
    };
    window.addEventListener('mouseover', handleMouseOver);
    return () => window.removeEventListener('mouseover', handleMouseOver);
  }, []);

  // Hero Canvas Particle Animation (Distributed Cloud Mesh Nodes)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;

    const handleResize = () => {
      if (!canvas.parentElement) return;
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight || 580;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const particleCount = 42;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.8 + 1,
        color: i % 3 === 0 ? 'rgba(16, 185, 129, 0.6)' : i % 3 === 1 ? 'rgba(6, 182, 212, 0.6)' : 'rgba(139, 92, 246, 0.4)'
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${0.18 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Active section tracking on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'simulator', 'projects', 'terminal', 'amazon-standards', 'skills', 'credentials', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const triggerCelebration = () => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#10B981', '#06B6D4', '#8B5CF6']
    });
  };

  // The 4 authentic engineering projects
  const projects = [
    {
      id: 'dvq',
      title: 'DVQ — Carbon-Aware Cloud Workload Routing System',
      tagline: 'Multi-region intelligent workload router balancing real-time grid carbon intensity against strict SLA constraints across 7 AWS regions.',
      category: 'cloud',
      tech: ['AWS (7 Regions)', 'Node.js', 'Express.js', 'PM2', 'MongoDB', 'CloudWatch API', 'Electricity Maps API'],
      github: 'https://github.com/rashmipandey870',
      demo: 'https://github.com/rashmipandey870',
      metricPrimary: '61 µs',
      metricLabel: 'Decision Latency',
      architectureFlow: 'Ingress Traffic ➔ PM2 Decision Gateway (61 µs) ➔ Lyapunov Drift-Plus-Penalty Engine ➔ Live Carbon & RTT Telemetry (7 AWS Regions) ➔ Optimal Workload Dispatch (0% SLA Breach)',
      curlExample: 'curl -X POST https://dvq-gateway.aws.mesh/v1/route \\\n  -H "Content-Type: application/json" \\\n  -d \'{"slaLatencyMs": 120, "tier": "interactive"}\' \\\n  # Returns optimal region in 61 µs with 0% SLA breach',
      starProblem: 'Global multi-region cloud workloads face erratic regional carbon emissions and unpredictable network latency under varying traffic bursts.',
      starSolution: 'Architected a decoupled 6-microservice architecture on AWS formulated via Lyapunov drift-plus-penalty optimization to route requests dynamically across 7 AWS regions.',
      starImpact: 'Cut workload carbon footprint by 35.87% (Interactive) and 30.28% (Realtime) with a 0.0% SLA violation rate and 61 µs median routing decision latency.',
      highlights: [
        'Decoupled 6 microservices: Routing Gateway, Telemetry Ingestion, Carbon Matrix Prober, State Vector Store, CloudWatch Metrics Collector, Dispatcher.',
        'Sustained 0.0% SLA violation rate across extensive synthetic traffic bursts and chaos experiments.',
        'Validated automated failover resilience under simulated AWS regional grid outages.'
      ]
    },
    {
      id: 'examora',
      title: 'EXAMORA — Enterprise Academic Assessment & PDF Parsing Engine',
      tagline: 'High-throughput Java enterprise web platform on Apache Tomcat 11 with ACID relational schema and streaming document extraction.',
      category: 'java',
      tech: ['Java 17', 'Jakarta Servlets 6.0', 'Apache Tomcat 11', 'MySQL ACID', 'Apache PDFBox', 'BCrypt', 'JSP / JSTL'],
      github: 'https://github.com/rashmipandey870/EXAMORA',
      demo: 'https://github.com/rashmipandey870/EXAMORA',
      metricPrimary: '61 Commits',
      metricLabel: 'Zero Framework Bloat',
      architectureFlow: 'Exam Paper Upload (PDF) ➔ Apache PDFBox Streaming Text Extraction ➔ Jakarta Servlet 6.0 Controller ➔ Data Access Object (DAO) Layer ➔ ACID-Compliant MySQL Relational Storage',
      curlExample: 'curl -F "file=@cs101_final.pdf" https://examora.internal/api/ingest \\\n  -H "Authorization: Bearer <JWT>" \\\n  # Parses question banks via Apache PDFBox directly into normalized MySQL tables',
      starProblem: 'Academic institutions struggle with slow legacy examination portals, insecure student data, and laborious manual exam paper transcription.',
      starSolution: 'Built a lightweight Jakarta Servlets 6.0 enterprise engine on Tomcat 11 with the DAO pattern, BCrypt salted authentication, and Apache PDFBox streaming document extraction.',
      starImpact: 'Achieved sub-100ms response times with near-zero memory footprint; maintained 100% ACID consistency across 10+ staged relational migrations.',
      highlights: [
        'Constructed 61 sequential production commits adhering to clean MVC and DAO design patterns.',
        'Engineered an ACID-compliant MySQL relational database with staged schema migration scripts.',
        'Streamlined academic paper ingestion via Apache PDFBox streaming text extractors into structured question banks.'
      ]
    },
    {
      id: 'sangathan',
      title: 'Sangathan — Sports Tournament Fixture & Algorithmic Scheduling Platform',
      tagline: 'Full-stack mobile tournament platform featuring combinatorial round-robin and single-elimination bracket generation algorithms.',
      category: 'mobile',
      tech: ['Android (Java)', 'Node.js', 'Express.js', 'MongoDB', 'Retrofit 2', 'REST APIs', 'Graph Algorithms'],
      github: 'https://github.com/rashmipandey870/Sangathan-sports-management-Android-application-',
      demo: 'https://github.com/rashmipandey870/Sangathan-Backend',
      metricPrimary: '80% Less',
      metricLabel: 'Admin Overhead',
      architectureFlow: 'Android Mobile Client ➔ Retrofit 2 OkHttp Interceptor ➔ Node.js REST API & JWT Auth ➔ Combinatorial Bracket Generator ➔ MongoDB Atlas Document Store',
      curlExample: 'curl -X POST https://sangathan-api.net/tournament/generate-brackets \\\n  -H "Content-Type: application/json" \\\n  -d \'{"teams": 16, "format": "single_elimination"}\' \\\n  # Executes combinatorial graph pairing with zero collisions',
      starProblem: 'Managing athletic events manually with spreadsheets leads to schedule clashes, delayed score reporting, and high administrative chaos.',
      starSolution: 'Developed an Android client and Node.js REST backend executing combinatorial pairing algorithms for automated round-robin and knockout tournament brackets.',
      starImpact: 'Orchestrated schedules and live scores for 100+ athletes across 6 sports; sustained sub-150ms API latency with Retrofit 2 reactive syncing.',
      highlights: [
        'Automated tournament bracket math eliminating manual pairing collisions for 100+ participants.',
        'Architected 10+ RESTful backend endpoints in Node.js/Express with sub-150ms response times.',
        'Implemented Retrofit 2 with OkHttp interceptors for rock-solid mobile client synchronization.'
      ]
    },
    {
      id: 'planner',
      title: 'Study Planner — Dynamic Constraint-Based Scheduling Algorithm',
      tagline: 'Algorithmic Java tool solving multi-factor time-block assignment with deadline urgency and cognitive fatigue mitigation.',
      category: 'java',
      tech: ['Java 17', 'Object-Oriented Design', 'Priority Queues', 'Greedy Heuristics', 'Algorithmic Optimization'],
      github: 'https://github.com/rashmipandey870/Study-Planner-Scheduling-Algorithm-',
      demo: 'https://github.com/rashmipandey870/Study-Planner-Scheduling-Algorithm-',
      metricPrimary: 'O(N log N)',
      metricLabel: 'Algorithmic Efficiency',
      architectureFlow: 'Exam Deadlines & Subject Weight ➔ Java PriorityQueue Min-Heap Sorting ➔ Cognitive Fatigue Buffer Calculation ➔ Greedy Time-Block Assignment ➔ Conflict-Free Revision Schedule',
      curlExample: 'java -jar study-planner.jar --tasks=exams.json --daily-capacity=6 \\\n  # O(N log N) greedy min-heap optimization outputting weekly conflict-free schedule',
      starProblem: 'Students struggle to balance conflicting exam deadlines, subject difficulty, and cognitive burnout when creating revision timetables.',
      starSolution: 'Formulated a multi-objective greedy scheduling engine in Java utilizing PriorityQueue min-heaps to dynamically assign study blocks.',
      starImpact: 'Recalculates conflict-free timetables in O(N log N) time while automatically reserving spaced repetition buffers before major exam dates.',
      highlights: [
        'Priority queue min-heap implementation for sub-millisecond timetable recalculation.',
        'Spaced repetition buffers automatically scheduled ahead of major deadlines.',
        'Clean Object-Oriented principles in native Java 17 with zero external library overhead.'
      ]
    }
  ];

  const filteredProjects = activeTab === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeTab);

  return (
    <div className="relative min-h-screen bg-dark-950 text-slate-300 font-sans selection:bg-eco-500/20 selection:text-eco-400 bg-grid-pattern">
      
      {/* Custom Glowing Cyber Cursor Ring */}
      <div 
        className="hidden md:block fixed pointer-events-none z-50 rounded-full border border-eco-500/50 -translate-x-1/2 -translate-y-1/2 transition-all duration-75"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          width: cursorHovered ? '48px' : '22px',
          height: cursorHovered ? '48px' : '22px',
          backgroundColor: cursorHovered ? 'rgba(16, 185, 129, 0.08)' : 'transparent',
          boxShadow: cursorHovered ? '0 0 16px rgba(16, 185, 129, 0.35)' : 'none',
        }}
      />

      {/* Background Decorative Gradient Orbs */}
      <div className="absolute top-0 left-0 w-full h-[650px] bg-gradient-to-b from-eco-500/5 to-transparent pointer-events-none" />
      <div className="absolute top-[18%] right-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[130px] pointer-events-none" />
      <div className="absolute top-[50%] left-[-10%] w-[550px] h-[550px] rounded-full bg-eco-500/5 blur-[140px] pointer-events-none" />

      {/* TOP HACKER HUD STATUS BAR */}
      <div className="bg-dark-950/90 border-b border-white/5 px-4 py-1.5 font-mono text-[11px] text-slate-400 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-40 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-eco-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-eco-500"></span>
          </span>
          <span className="text-white font-semibold">~/rashmi-pandey</span>
          <span className="text-slate-600">|</span>
          <span className="text-eco-400">AWS-MESH::ACTIVE</span>
          <span className="text-slate-600">|</span>
          <span className="text-cyan-400">7 REGIONS MONITORED</span>
        </div>
        <div className="flex items-center gap-4 text-[10px]">
          <span className="hidden sm:inline text-slate-400">PING: <strong className="text-white">18ms</strong></span>
          <span className="hidden sm:inline text-slate-400">SLA: <strong className="text-eco-400">0.0% BREACH</strong></span>
          <span className="text-slate-400">LATENCY: <strong className="text-cyan-400">61µs</strong></span>
          <button 
            onClick={() => setResumeOpen(true)}
            className="text-eco-400 hover:text-eco-300 font-semibold underline decoration-eco-500/40"
          >
            [RESUME_ATS.PDF]
          </button>
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <header className="sticky top-[31px] z-30 bg-dark-900/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-eco-500 to-cyan-600 flex items-center justify-center font-mono font-extrabold text-white text-sm shadow-md shadow-eco-500/20 group-hover:scale-105 transition-transform">
              RP
            </div>
            <div>
              <div className="font-bold text-white text-sm tracking-tight flex items-center gap-2">
                Rashmi Pandey
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-eco-500/10 text-eco-400 font-mono border border-eco-500/20">SDE</span>
              </div>
              <div className="text-[11px] text-slate-400 font-mono">Distributed Systems &amp; AWS</div>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-1 font-mono text-xs">
            {[
              { id: 'hero', label: '// 01.root' },
              { id: 'simulator', label: '// 02.aws_lab' },
              { id: 'projects', label: '// 03.projects' },
              { id: 'terminal', label: '// 04.terminal' },
              { id: 'amazon-standards', label: '// 05.amazon_lp' },
              { id: 'skills', label: '// 06.stack' },
              { id: 'credentials', label: '// 07.certs' },
              { id: 'contact', label: '// 08.contact' },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  activeSection === item.id
                    ? 'text-eco-400 bg-eco-500/10 font-bold border border-eco-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => {
                const el = document.getElementById('terminal');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-800 text-slate-300 hover:text-white border border-white/10 text-xs font-mono transition-colors"
              title="Jump to Interactive Terminal"
            >
              <Terminal className="h-3.5 w-3.5 text-eco-400" />
              <span className="hidden sm:inline">Terminal</span>
            </button>

            <button
              onClick={() => setResumeOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-eco-500 to-cyan-600 text-white font-medium text-xs shadow-md shadow-eco-500/20 hover:opacity-95 transition-opacity"
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Resume</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 space-y-24 py-8">
        
        {/* HERO SECTION */}
        <section id="hero" className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center min-h-[580px] relative pt-4">
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

          {/* Left Column: Hacker Pitch */}
          <div className="lg:col-span-7 space-y-6 z-10 relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-eco-500/30 bg-eco-500/10 px-4 py-1.5 font-mono text-xs font-semibold text-eco-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-eco-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-eco-500"></span>
              </span>
              <span>&gt;_ ROOT ACCESS // SDE &amp; DISTRIBUTED SYSTEMS</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
                Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-400">Rashmi Pandey</span>
              </h1>
              <p className="text-xl sm:text-2xl font-semibold text-slate-200">
                I engineer <span className="text-eco-400">resilient, sub-100µs cloud distributed systems</span> and enterprise software.
              </p>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              Computer Science undergraduate (CGPA: 8.00/10) specializing in distributed algorithms, Java enterprise applications, and carbon-aware cloud routing. Researched Lyapunov optimization across 7 AWS regions during a research internship at <strong>NIAMT Ranchi</strong> under <strong>Dr. Rahul Mishra</strong>. <strong>NPTEL IIT Madras Topper (Top 2% Nationwide)</strong> and <strong>Microsoft Certified Azure Database Administrator</strong>.
            </p>

            {/* Quick Hacker Telemetry Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              <div className="glass-panel p-3 rounded-xl border border-white/5">
                <div className="text-[10px] font-mono uppercase text-slate-400">Decision Latency</div>
                <div className="text-xl font-bold font-mono text-eco-400">61 µs</div>
                <div className="text-[10px] text-slate-500">AWS Multi-Region</div>
              </div>
              <div className="glass-panel p-3 rounded-xl border border-white/5">
                <div className="text-[10px] font-mono uppercase text-slate-400">NPTEL Ranking</div>
                <div className="text-xl font-bold font-mono text-cyan-400">TOP 2%</div>
                <div className="text-[10px] text-slate-500">IIT Madras (84%)</div>
              </div>
              <div className="glass-panel p-3 rounded-xl border border-white/5">
                <div className="text-[10px] font-mono uppercase text-slate-400">Joy of Computing</div>
                <div className="text-xl font-bold font-mono text-indigo-400">87%</div>
                <div className="text-[10px] text-slate-500">IIT Ropar (Silver)</div>
              </div>
              <div className="glass-panel p-3 rounded-xl border border-white/5">
                <div className="text-[10px] font-mono uppercase text-slate-400">SLA Adherence</div>
                <div className="text-xl font-bold font-mono text-emerald-400">100.0%</div>
                <div className="text-[10px] text-slate-500">0.0% SLA Breach</div>
              </div>
            </div>

            {/* Action CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#simulator"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-eco-500 to-cyan-600 text-white font-semibold text-sm shadow-lg shadow-eco-500/25 hover:opacity-95 transition-all"
              >
                <Play className="h-4 w-4 fill-white" />
                <span>Launch AWS Simulator</span>
              </a>

              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-dark-900 border border-white/10 hover:border-eco-500/40 text-slate-200 hover:text-white font-semibold text-sm transition-all"
              >
                <Code2 className="h-4 w-4 text-cyan-400" />
                <span>View Engineering Projects</span>
              </a>

              <button
                onClick={() => setResumeOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-dark-900 border border-white/10 hover:border-cyan-500/40 text-slate-300 hover:text-white font-mono text-xs transition-all"
              >
                <Download className="h-4 w-4 text-slate-400" />
                <span>Download Resume</span>
              </button>
            </div>
          </div>

          {/* Right Column: Holographic Terminal & Headshot */}
          <div className="lg:col-span-5 space-y-4 z-10 relative">
            <div className="glass-panel rounded-2xl border border-white/10 p-5 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-eco-500/10 rounded-full blur-2xl pointer-events-none" />

              {/* Headshot & Verification Badge */}
              <div className="flex items-center gap-4 pb-4 border-b border-white/10">
                <div className="relative">
                  <img
                    src={photoUrl}
                    alt="Rashmi Pandey"
                    className="w-16 h-16 rounded-xl object-cover object-top border-2 border-eco-500/40 shadow-lg"
                  />
                  <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-eco-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-eco-500 border-2 border-dark-950 items-center justify-center text-[9px] text-white">✓</span>
                  </span>
                </div>
                <div>
                  <div className="text-white font-bold text-base">Rashmi Pandey</div>
                  <div className="text-xs text-eco-400 font-mono flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Verified SDE Candidate
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Amity Univ Jharkhand &bull; CGPA: 8.00</div>
                </div>
              </div>

              {/* Interactive Micro-Terminal Display */}
              <div className="mt-4 bg-dark-950/90 rounded-xl p-3.5 border border-white/5 font-mono text-[11px] space-y-2">
                <div className="flex items-center justify-between text-slate-500 pb-2 border-b border-white/5 text-[10px]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                    <span className="ml-1 text-slate-400">runtime_telemetry.sh</span>
                  </div>
                  <span className="text-eco-400">AWS EC2 (Linux)</span>
                </div>

                <div className="text-slate-400">
                  <span className="text-eco-400">rashmi@aws-mesh</span>:<span className="text-cyan-400">~</span>$ ./benchmark_dvq.sh
                </div>
                <div className="text-slate-300 pl-2 border-l border-eco-500/30 space-y-1">
                  <div>[OK] Region probe: <strong className="text-white">7 nodes active</strong></div>
                  <div>[OK] Lyapunov optimal: <strong className="text-eco-400">eu-west-1 (142 gCO2/kWh)</strong></div>
                  <div>[OK] Gateway overhead: <strong className="text-cyan-400">61 µs</strong></div>
                  <div>[OK] SLA violation: <strong className="text-emerald-400">0.00% (0 / 50k req)</strong></div>
                </div>

                <div className="text-slate-400 pt-1">
                  <span className="text-eco-400">rashmi@aws-mesh</span>:<span className="text-cyan-400">~</span>$ cat /etc/credentials
                </div>
                <div className="text-slate-300 pl-2 border-l border-cyan-500/30 space-y-0.5 text-[10.5px]">
                  <div>• NPTEL Python Data Science: <strong className="text-cyan-400">84% [TOPPER 2%]</strong></div>
                  <div>• NPTEL Joy of Computing: <strong className="text-indigo-400">87% [Silver Badge]</strong></div>
                  <div>• Azure DBA Associate: <strong className="text-amber-400">ID: 647C0C2C5B35FA32</strong></div>
                </div>
              </div>

              {/* Social Quick-Links */}
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                <a 
                  href="https://github.com/rashmipandey870" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
                >
                  <Github className="h-4 w-4" /> github.com/rashmipandey870
                </a>
                <a 
                  href="https://www.linkedin.com/in/rashmi-pandey-590a22340" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 1: AWS DISTRIBUTED WORKLOAD & LYAPUNOV SIMULATOR */}
        <section id="simulator" className="space-y-6 pt-10 border-t border-white/5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-eco-500/20 bg-eco-500/5 px-3 py-1 font-mono text-xs font-semibold text-eco-400 mb-2">
                <Activity className="h-3.5 w-3.5 text-eco-400" />
                <span>INTERACTIVE ENGINEERING LAB</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Live AWS Multi-Region Lyapunov Workload Simulator
              </h2>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl">
                Test the Lyapunov drift-plus-penalty algorithm across 7 AWS geographic regions. Inject regional grid outages, scale traffic, and observe sub-100µs decision telemetry.
              </p>
            </div>
            <div className="font-mono text-xs text-slate-400 bg-dark-900 border border-white/10 px-3 py-2 rounded-lg">
              Telemetry Status: <span className="text-eco-400 font-bold">ONLINE (61µs)</span>
            </div>
          </div>

          {/* Embedded Full Interactive Simulator Component */}
          <AWSWorkloadSimulator />
        </section>

        {/* SECTION 2: THE 4 AUTHENTIC PROJECTS MATRIX */}
        <section id="projects" className="space-y-8 pt-10 border-t border-white/5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-3 py-1 font-mono text-xs font-semibold text-cyan-400 mb-2">
                <Layers className="h-3.5 w-3.5 text-cyan-400" />
                <span>VERIFIED PRODUCTION CODEBASES</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Featured Engineering Systems
              </h2>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl">
                Engineered using clean architecture patterns, measured with production benchmarks, and ready for deep code inspection.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-dark-900 rounded-xl border border-white/10 font-mono text-xs">
              {[
                { id: 'all', label: 'All (4)' },
                { id: 'cloud', label: 'Cloud / AWS' },
                { id: 'java', label: 'Java EE' },
                { id: 'mobile', label: 'Android / Algorithms' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-eco-500 text-white font-bold shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8">
            {filteredProjects.map((project) => {
              const currentTab = projectTab[project.id] || 'star';

              return (
                <div
                  key={project.id}
                  className="glass-panel glass-panel-hover rounded-2xl border border-white/10 overflow-hidden p-6 sm:p-8 space-y-6"
                >
                  {/* Project Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs px-2 py-0.5 rounded bg-eco-500/10 text-eco-400 border border-eco-500/20 uppercase">
                          {project.category}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold text-white">
                          {project.title}
                        </h3>
                      </div>
                      <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
                        {project.tagline}
                      </p>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-1 p-3 rounded-xl bg-dark-950/80 border border-white/5 shrink-0">
                      <span className="font-mono text-xl font-extrabold text-eco-400">{project.metricPrimary}</span>
                      <span className="text-[10px] uppercase font-mono text-slate-400">{project.metricLabel}</span>
                    </div>
                  </div>

                  {/* Sub-Tab Navigation Switcher */}
                  <div className="flex items-center gap-2 border-b border-white/5 pb-2 text-xs font-mono">
                    <button
                      onClick={() => setProjectTab(prev => ({ ...prev, [project.id]: 'star' }))}
                      className={`px-3 py-1.5 rounded-lg transition-colors ${
                        currentTab === 'star'
                          ? 'bg-eco-500/15 text-eco-400 font-bold border border-eco-500/30'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      ⭐ STAR Impact Breakdown
                    </button>
                    <button
                      onClick={() => setProjectTab(prev => ({ ...prev, [project.id]: 'arch' }))}
                      className={`px-3 py-1.5 rounded-lg transition-colors ${
                        currentTab === 'arch'
                          ? 'bg-cyan-500/15 text-cyan-400 font-bold border border-cyan-500/30'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      📐 Architecture Pipeline Flow
                    </button>
                    <button
                      onClick={() => setProjectTab(prev => ({ ...prev, [project.id]: 'curl' }))}
                      className={`px-3 py-1.5 rounded-lg transition-colors ${
                        currentTab === 'curl'
                          ? 'bg-indigo-500/15 text-indigo-400 font-bold border border-indigo-500/30'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      ⚡ CLI / cURL Spec
                    </button>
                  </div>

                  {/* Tab 1: STAR Impact */}
                  {currentTab === 'star' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 rounded-xl bg-dark-950/60 border border-white/5 space-y-1.5">
                          <span className="font-mono text-[10px] font-bold text-amber-400 uppercase tracking-wider block">The Challenge / Problem</span>
                          <p className="text-xs text-slate-300 leading-relaxed">{project.starProblem}</p>
                        </div>
                        <div className="p-4 rounded-xl bg-dark-950/60 border border-white/5 space-y-1.5">
                          <span className="font-mono text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">Architecture / Solution</span>
                          <p className="text-xs text-slate-300 leading-relaxed">{project.starSolution}</p>
                        </div>
                        <div className="p-4 rounded-xl bg-dark-950/60 border border-white/5 space-y-1.5">
                          <span className="font-mono text-[10px] font-bold text-eco-400 uppercase tracking-wider block">Quantified Impact</span>
                          <p className="text-xs text-slate-300 leading-relaxed">{project.starImpact}</p>
                        </div>
                      </div>

                      <div className="space-y-2 pt-1">
                        <div className="text-xs font-mono text-slate-400 font-bold">Key Technical Implementation Details:</div>
                        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-300">
                          {project.highlights.map((h, i) => (
                            <li key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-dark-950/40 border border-white/5">
                              <CheckCircle2 className="h-4 w-4 text-eco-400 shrink-0 mt-0.5" />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Tab 2: Architecture Pipeline */}
                  {currentTab === 'arch' && (
                    <div className="space-y-3">
                      <div className="p-4 rounded-xl bg-dark-950/80 border border-cyan-500/20 font-mono text-xs text-cyan-300 flex items-center gap-3">
                        <Network className="h-5 w-5 text-cyan-400 shrink-0" />
                        <div className="leading-relaxed">
                          {project.architectureFlow}
                        </div>
                      </div>
                      <div className="text-[11px] text-slate-400 italic">
                        * End-to-end distributed data pipeline verified with synthetic load generators and zero dropped frames.
                      </div>
                    </div>
                  )}

                  {/* Tab 3: CLI / cURL Spec */}
                  {currentTab === 'curl' && (
                    <div className="space-y-3">
                      <div className="relative bg-dark-950 rounded-xl p-4 border border-white/10 font-mono text-xs text-slate-200 overflow-x-auto">
                        <button
                          onClick={() => copyToClipboard(project.curlExample, project.id)}
                          className="absolute top-3 right-3 p-1.5 rounded-lg bg-dark-800 text-slate-400 hover:text-white border border-white/10 text-xs flex items-center gap-1 transition-colors"
                        >
                          {copiedKey === project.id ? <Check className="h-3.5 w-3.5 text-eco-400" /> : <Copy className="h-3.5 w-3.5" />}
                          <span>{copiedKey === project.id ? 'Copied' : 'Copy'}</span>
                        </button>
                        <pre className="pr-16">{project.curlExample}</pre>
                      </div>
                    </div>
                  )}

                  {/* Tech Stack Pills & Action Buttons */}
                  <div className="pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="font-mono text-xs px-2.5 py-1 rounded-lg bg-dark-950 text-slate-300 border border-white/5"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setSelectedArchProject(project)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-900 border border-cyan-500/30 text-cyan-300 hover:text-white hover:bg-cyan-500/10 text-xs font-mono transition-colors"
                      >
                        <Layers className="h-3.5 w-3.5 text-cyan-400" />
                        <span>Inspect Architecture</span>
                      </button>

                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-900 border border-white/10 text-slate-300 hover:text-white hover:bg-white/5 text-xs font-mono transition-colors"
                      >
                        <Github className="h-3.5 w-3.5 text-slate-400" />
                        <span>Repository</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 3: INTERACTIVE DEVELOPER TERMINAL */}
        <section id="terminal" className="space-y-6 pt-10 border-t border-white/5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-eco-500/20 bg-eco-500/5 px-3 py-1 font-mono text-xs font-semibold text-eco-400 mb-2">
                <Terminal className="h-3.5 w-3.5 text-eco-400" />
                <span>COMMAND LINE DIAGNOSTICS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Developer CLI &amp; System Terminal
              </h2>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl">
                Type live diagnostic commands: <code className="text-eco-400 bg-dark-950 px-1 py-0.5 rounded">amazon</code>, <code className="text-cyan-400 bg-dark-950 px-1 py-0.5 rounded">lp</code>, <code className="text-indigo-400 bg-dark-950 px-1 py-0.5 rounded">metrics</code>, <code className="text-amber-400 bg-dark-950 px-1 py-0.5 rounded">curl /api/aws</code>, <code className="text-slate-400 bg-dark-950 px-1 py-0.5 rounded">skills</code>.
              </p>
            </div>
            <div className="font-mono text-xs text-slate-500">
              Shortcut: Press <kbd className="px-1.5 py-0.5 bg-dark-900 border border-white/10 rounded text-slate-300">⌘K</kbd> / <kbd className="px-1.5 py-0.5 bg-dark-900 border border-white/10 rounded text-slate-300">Ctrl+K</kbd>
            </div>
          </div>

          {/* Embedded Full Interactive Terminal */}
          <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
            <DeveloperTerminal />
          </div>
        </section>

        {/* SECTION 4: AMAZON LEADERSHIP PRINCIPLES ALIGNMENT */}
        <section id="amazon-standards" className="space-y-6 pt-10 border-t border-white/5">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/5 px-3 py-1 font-mono text-xs font-semibold text-amber-400 mb-2">
              <Flame className="h-3.5 w-3.5 text-amber-400" />
              <span>BIG TECH ENGINEERING EXCELLENCE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Amazon Leadership Principles Alignment
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Concrete evidence demonstrating how my engineering research and production systems align directly with Amazon LP standards.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="glass-panel p-5 rounded-xl border border-white/5 space-y-2.5">
              <div className="w-8 h-8 rounded-lg bg-eco-500/10 border border-eco-500/20 text-eco-400 flex items-center justify-center font-mono font-bold text-sm">
                01
              </div>
              <h3 className="text-base font-bold text-white">Dive Deep</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Profiled Linux process schedulers under PM2, isolating microservice network round-trip bottlenecks down to a <strong>61 µs median routing decision latency</strong> across 7 AWS geographic regions.
              </p>
            </div>

            <div className="glass-panel p-5 rounded-xl border border-white/5 space-y-2.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center font-mono font-bold text-sm">
                02
              </div>
              <h3 className="text-base font-bold text-white">Customer Obsession</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Guaranteed a verified <strong>0.0% SLA breach rate</strong> across all evaluation trials, ensuring enterprise customers experience zero downtime or latency violations even during simulated regional grid outages.
              </p>
            </div>

            <div className="glass-panel p-5 rounded-xl border border-white/5 space-y-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-mono font-bold text-sm">
                03
              </div>
              <h3 className="text-base font-bold text-white">Invent &amp; Simplify</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Formulated complex carbon-aware workload distribution into decoupled microservices and replaced manual tournament spreadsheets with automated combinatorial graph algorithms for 100+ athletes.
              </p>
            </div>

            <div className="glass-panel p-5 rounded-xl border border-white/5 space-y-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-mono font-bold text-sm">
                04
              </div>
              <h3 className="text-base font-bold text-white">Deliver Results</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Constructed 61 sequential production commits in EXAMORA with zero framework bloat; earned <strong>NPTEL Topper (Top 2% Nationwide)</strong> honors; completed intensive research internship at NIAMT Ranchi.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5: TECHNICAL SKILLS MATRIX */}
        <section id="skills" className="space-y-6 pt-10 border-t border-white/5">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-eco-500/20 bg-eco-500/5 px-3 py-1 font-mono text-xs font-semibold text-eco-400 mb-2">
              <Cpu className="h-3.5 w-3.5 text-eco-400" />
              <span>CORE COMPETENCIES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Technical Arsenal &amp; Systems Architecture
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Grouped by systems domain with zero vague percentage bars.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Languages */}
            <div className="glass-panel p-5 rounded-xl border border-white/5 space-y-3">
              <div className="flex items-center gap-2 text-eco-400">
                <Code2 className="h-5 w-5" />
                <h3 className="font-bold text-white text-base">Languages &amp; Core CS</h3>
              </div>
              <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                {['Java 17 (JDK)', 'Python 3', 'C', 'SQL', 'JavaScript (ES6+)', 'Bash Scripting', 'Data Structures & Algorithms', 'OOP Design'].map((s) => (
                  <span key={s} className="px-2.5 py-1 rounded-lg bg-dark-950 text-slate-300 border border-white/5">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Cloud & AWS */}
            <div className="glass-panel p-5 rounded-xl border border-white/5 space-y-3">
              <div className="flex items-center gap-2 text-cyan-400">
                <Cloud className="h-5 w-5" />
                <h3 className="font-bold text-white text-base">Cloud &amp; Infrastructure</h3>
              </div>
              <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                {['AWS (7 Geographic Regions)', 'AWS EC2', 'AWS CloudWatch API', 'AWS S3 & IAM', 'Microsoft Azure', 'PM2 Process Supervisor', 'Linux / Unix CLI', 'Docker Basics'].map((s) => (
                  <span key={s} className="px-2.5 py-1 rounded-lg bg-dark-950 text-cyan-300 border border-cyan-500/20">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Backend & Systems */}
            <div className="glass-panel p-5 rounded-xl border border-white/5 space-y-3">
              <div className="flex items-center gap-2 text-indigo-400">
                <Server className="h-5 w-5" />
                <h3 className="font-bold text-white text-base">Backend &amp; Distributed Systems</h3>
              </div>
              <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                {['Jakarta Servlets 6.0', 'Apache Tomcat 11', 'Node.js & Express.js', 'RESTful API Design', 'Microservices', 'Lyapunov Optimization', 'Retrofit 2', 'Apache PDFBox'].map((s) => (
                  <span key={s} className="px-2.5 py-1 rounded-lg bg-dark-950 text-slate-300 border border-white/5">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Databases */}
            <div className="glass-panel p-5 rounded-xl border border-white/5 space-y-3">
              <div className="flex items-center gap-2 text-amber-400">
                <Database className="h-5 w-5" />
                <h3 className="font-bold text-white text-base">Databases &amp; Storage</h3>
              </div>
              <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                {['Azure SQL', 'MySQL (ACID Transactions)', 'MongoDB Atlas', 'Relational Schema Normalization', 'Database Indexing & Tuning', 'Mongoose ODM'].map((s) => (
                  <span key={s} className="px-2.5 py-1 rounded-lg bg-dark-950 text-slate-300 border border-white/5">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Data Science & Python */}
            <div className="glass-panel p-5 rounded-xl border border-white/5 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400">
                <Sparkles className="h-5 w-5" />
                <h3 className="font-bold text-white text-base">Data Science &amp; Python</h3>
              </div>
              <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                {['Python for Data Science (IIT-M Topper)', 'Joy of Computing (IIT-R)', 'Pandas & NumPy', 'Statistical EDA', 'Scikit-learn', 'Algorithmic Optimization'].map((s) => (
                  <span key={s} className="px-2.5 py-1 rounded-lg bg-dark-950 text-emerald-300 border border-emerald-500/20">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Tools & Practices */}
            <div className="glass-panel p-5 rounded-xl border border-white/5 space-y-3">
              <div className="flex items-center gap-2 text-slate-400">
                <ShieldCheck className="h-5 w-5" />
                <h3 className="font-bold text-white text-base">DevOps &amp; Practices</h3>
              </div>
              <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                {['Git & GitHub (1,200+ commits)', 'Postman API Testing', 'Maven', 'Android Studio', 'Chaos Engineering', 'Zero-Trust Architecture', 'JWT Authentication'].map((s) => (
                  <span key={s} className="px-2.5 py-1 rounded-lg bg-dark-950 text-slate-300 border border-white/5">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: HOLOGRAPHIC VERIFIED CREDENTIALS VAULT */}
        <section id="credentials" className="space-y-6 pt-10 border-t border-white/5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-eco-500/20 bg-eco-500/5 px-3 py-1 font-mono text-xs font-semibold text-eco-400 mb-2">
                <Award className="h-3.5 w-3.5 text-eco-400" />
                <span>OFFICIAL VERIFIED BADGES</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Verified Credentials &amp; Certifications
              </h2>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl">
                Officially accredited certifications with verifiable scores, IDs, and topper recognitions.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Cert 1: NPTEL IIT Madras */}
            <div className="glass-panel p-6 rounded-xl border-l-4 border-l-cyan-400 border-white/5 space-y-3 relative overflow-hidden">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold uppercase">
                      🏆 TOPPER 2% NATIONWIDE
                    </span>
                    <span className="font-mono text-[10px] text-slate-400">Score: 84%</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    NPTEL — Python for Data Science
                  </h3>
                  <div className="text-xs font-mono text-cyan-300">Indian Institute of Technology Madras (IIT Madras)</div>
                </div>
                <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0">
                  <Award className="h-6 w-6" />
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Awarded <strong>Elite + Silver Medal</strong> and recognized as a <strong>Nationwide Topper in the Top 2%</strong> of all candidates. Comprehensive coverage of statistical EDA, Pandas, NumPy data processing, regression, and Scikit-learn pipelines.
              </p>
            </div>

            {/* Cert 2: NPTEL IIT Ropar */}
            <div className="glass-panel p-6 rounded-xl border-l-4 border-l-indigo-400 border-white/5 space-y-3 relative overflow-hidden">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-bold uppercase">
                      🥈 ELITE + SILVER BADGE
                    </span>
                    <span className="font-mono text-[10px] text-slate-400">Score: 87%</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    NPTEL — The Joy of Computing using Python
                  </h3>
                  <div className="text-xs font-mono text-indigo-300">Indian Institute of Technology Ropar (Prof. Sudarshan Iyengar)</div>
                </div>
                <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 shrink-0">
                  <Award className="h-6 w-6" />
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Taught by <strong>Prof. Sudarshan Iyengar</strong>. Achieved an <strong>87% Score (Elite + Silver Medal / Silver Badge)</strong> demonstrating advanced algorithmic thinking, recursion, combinatorial logic, and computational problem-solving.
              </p>
            </div>

            {/* Cert 3: Microsoft Azure DBA */}
            <div className="glass-panel p-6 rounded-xl border-l-4 border-l-eco-400 border-white/5 space-y-3 relative overflow-hidden">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-eco-500/10 text-eco-400 border border-eco-500/20 font-bold uppercase">
                      MICROSOFT CERTIFIED
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    Azure Database Administrator Associate
                  </h3>
                  <div className="text-xs font-mono text-slate-400">Credential ID: <strong className="text-white">647C0C2C5B35FA32</strong></div>
                </div>
                <div className="p-2 rounded-xl bg-eco-500/10 text-eco-400 shrink-0">
                  <Database className="h-6 w-6" />
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Validates enterprise cloud database management, high-availability architecture, security governance, query plan optimization, and performance tuning on Microsoft Azure SQL infrastructure.
              </p>
            </div>

            {/* Cert 4: Microsoft SQL AI Tools & Infosys */}
            <div className="glass-panel p-6 rounded-xl border-l-4 border-l-amber-400 border-white/5 space-y-3 relative overflow-hidden">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold uppercase">
                      ENTERPRISE SOFTWARE
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    Implement SQL Solutions Using AI-Assisted Tools
                  </h3>
                  <div className="text-xs font-mono text-slate-400">Microsoft &bull; AI-Assisted Query Optimization</div>
                </div>
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
                  <Sparkles className="h-6 w-6" />
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Automated database schema design, indexing strategies, and AI-assisted SQL query profiling. Additional credential: <strong>Infosys Springboard — Java Programming Fundamentals</strong> (OOP, multithreading, and collections).
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 7: RESEARCH & EDUCATION TIMELINE */}
        <section id="experience" className="space-y-6 pt-10 border-t border-white/5">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-eco-500/20 bg-eco-500/5 px-3 py-1 font-mono text-xs font-semibold text-eco-400 mb-2">
              <Briefcase className="h-3.5 w-3.5 text-eco-400" />
              <span>CAREER &amp; ACADEMIC TRACK</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Research Internship &amp; Education
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* NIAMT Internship */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-eco-400 font-bold uppercase">Summer Research Internship</span>
                <span className="font-mono text-xs text-slate-500">Jun 2026 – Jul 2026</span>
              </div>
              <h3 className="text-lg font-bold text-white">
                Distributed Systems &amp; Cloud Infrastructure Intern
              </h3>
              <div className="text-xs font-mono text-cyan-300">
                National Institute of Advanced Manufacturing Technology (NIAMT), Ranchi &bull; Under Dr. Rahul Mishra
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Formulated and benchmarked <strong>DVQ</strong> across 7 AWS geographic regions. Modeled workload placement as a Lyapunov drift-plus-penalty optimization problem to balance strict latency SLAs against dynamic regional carbon emissions. Achieved a 35.87% carbon reduction with zero SLA breaches across all synthetic trials.
              </p>
            </div>

            {/* Amity Education */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-cyan-400 font-bold uppercase">Undergraduate Degree</span>
                <span className="font-mono text-xs text-slate-500">2024 – 2028</span>
              </div>
              <h3 className="text-lg font-bold text-white">
                B.Tech in Computer Science &amp; Engineering
              </h3>
              <div className="text-xs font-mono text-emerald-300">
                Amity University Jharkhand, Ranchi &bull; <strong>CGPA: 8.00 / 10.0</strong>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Core Coursework: Data Structures &amp; Algorithms, Object-Oriented Programming, Database Management Systems, Operating Systems, Computer Networks, Cloud Computing. Secondary (CBSE Class XII PCM: 88.2% | Class X: 85.0%).
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 8: CONTACT & RECRUITER ACTION */}
        <section id="contact" className="pt-10 border-t border-white/5 pb-16">
          <div className="glass-panel rounded-2xl border border-white/10 p-8 sm:p-12 text-center space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-eco-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="inline-flex items-center gap-2 rounded-full border border-eco-500/20 bg-eco-500/10 px-4 py-1.5 font-mono text-xs font-semibold text-eco-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-eco-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-eco-500"></span>
              </span>
              <span>AVAILABLE FOR SDE / CLOUD INTERNSHIPS &amp; ROLES</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Ready to Dive Deep &amp; Build Resilient Systems
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Targeting Software Development Engineer (SDE) and Cloud Systems Engineer opportunities. Let's discuss how my distributed systems and Java backend acumen can add immediate value to your team.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a
                href="mailto:rashmipd870@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-eco-500 to-cyan-600 text-white font-semibold text-sm shadow-lg shadow-eco-500/25 hover:opacity-95 transition-opacity"
              >
                <Mail className="h-4 w-4" />
                <span>rashmipd870@gmail.com</span>
              </a>

              <a
                href="https://www.linkedin.com/in/rashmi-pandey-590a22340"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-dark-900 border border-white/10 hover:border-cyan-500/40 text-slate-200 hover:text-white font-semibold text-sm transition-colors"
              >
                <Linkedin className="h-4 w-4 text-cyan-400" />
                <span>LinkedIn Profile</span>
              </a>

              <a
                href="https://github.com/rashmipandey870"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-dark-900 border border-white/10 hover:border-eco-500/40 text-slate-200 hover:text-white font-semibold text-sm transition-colors"
              >
                <Github className="h-4 w-4 text-slate-400" />
                <span>GitHub Repositories</span>
              </a>

              <button
                onClick={() => setResumeOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-dark-900 border border-white/10 hover:border-amber-500/40 text-slate-200 hover:text-white font-semibold text-sm transition-colors"
              >
                <Download className="h-4 w-4 text-amber-400" />
                <span>ATS Resume PDF</span>
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-8 bg-dark-950 font-mono text-xs text-slate-500 text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            &copy; 2026 Rashmi Pandey. Engineered with React, Tailwind CSS &amp; Framer Motion.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Kernel: AWS-v5.19</span>
            <span>&bull;</span>
            <span className="text-eco-400">SLA: 0.0% Breach</span>
            <span>&bull;</span>
            <span className="text-cyan-400">Top 2% NPTEL</span>
          </div>
        </div>
      </footer>

      {/* FLOATING SDE CANDIDATE AI COPILOT */}
      <AICopilot />

      {/* SYSTEM ARCHITECTURE MODAL */}
      <AnimatePresence>
        {selectedArchProject && (
          <ArchitectureModal 
            project={selectedArchProject} 
            onClose={() => setSelectedArchProject(null)} 
          />
        )}
      </AnimatePresence>

      {/* ATS RESUME MODAL */}
      <AnimatePresence>
        {resumeOpen && (
          <ResumeModal 
            onClose={() => setResumeOpen(false)} 
          />
        )}
      </AnimatePresence>

    </div>
  );
}

export default App;
