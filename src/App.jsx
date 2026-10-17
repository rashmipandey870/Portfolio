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
  ChevronDown,
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
  Play,
  Binary,
  GitCommit,
  Lock
} from 'lucide-react';
import DeveloperTerminal from './components/DeveloperTerminal';
import AICopilot from './components/AICopilot';
import ResumeModal from './components/ResumeModal';
import SystemsAndAlgorithmsLab from './components/SystemsAndAlgorithmsLab';
import ArchitectureModal from './components/ArchitectureModal';

function App() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [selectedArchProject, setSelectedArchProject] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [expandedStar, setExpandedStar] = useState({}); // { [projectId]: boolean }
  const [copiedKey, setCopiedKey] = useState(null);
  const [activeSection, setActiveSection] = useState('hero');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorHovered, setCursorHovered] = useState(false);
  const [isAmazonView, setIsAmazonView] = useState(false);
  const canvasRef = useRef(null);

  const baseUrl = import.meta.env.BASE_URL || '/';
  const photoUrl = `${baseUrl}rashmi-photo.jpg`;
  const resumeUrl = `${baseUrl}Rashmi_Pandey_Resume.pdf`;

  // Detect ?company=amazon query parameter
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('company') === 'amazon') {
        setIsAmazonView(true);
      }
    } catch(e) {}
  }, []);

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

    const particleCount = 36;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.6 + 1,
        color: i % 3 === 0 ? 'rgba(16, 185, 129, 0.5)' : i % 3 === 1 ? 'rgba(6, 182, 212, 0.5)' : 'rgba(139, 92, 246, 0.35)'
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

          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${0.15 * (1 - dist / 100)})`;
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
      const sections = ['hero', 'dsa', 'projects', 'lab', 'how-i-work', 'skills', 'credentials', 'contact'];
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

  const toggleStarDetails = (id) => {
    setExpandedStar(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // The 4 authentic engineering projects
  const projects = [
    {
      id: 'examora',
      title: 'EXAMORA — Enterprise Academic Assessment Platform',
      oneLineProblem: 'Academic institutions struggle with slow legacy examination portals, insecure student data, and laborious manual exam paper transcription.',
      oneLineResult: 'Achieved sub-100ms response times with near-zero memory footprint on Tomcat 11; maintained 100% ACID consistency across 10+ staged relational migrations.',
      category: 'java',
      tech: ['Java 17', 'Jakarta Servlets 6.0', 'Apache Tomcat 11', 'MySQL ACID', 'Apache PDFBox', 'BCrypt', 'JSP / JSTL'],
      github: 'https://github.com/rashmipandey870/EXAMORA',
      metricPrimary: '61 Commits',
      metricLabel: 'Zero Framework Bloat',
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
      title: 'Sangathan — Sports Tournament Fixture & Scheduling Platform',
      oneLineProblem: 'Managing athletic events manually with spreadsheets leads to schedule clashes, delayed score reporting, and high administrative chaos.',
      oneLineResult: 'Automated round-robin and knockout tournament brackets for 100+ athletes across 6 simultaneous sports, reducing coordination overhead by 80%.',
      category: 'mobile',
      tech: ['Android (Java)', 'Node.js', 'Express.js', 'MongoDB Atlas', 'Retrofit 2', 'Graph Algorithms'],
      github: 'https://github.com/rashmipandey870/Sangathan-sports-management-Android-application-',
      githubBackend: 'https://github.com/rashmipandey870/Sangathan-Backend',
      metricPrimary: '80% Less',
      metricLabel: 'Coordination Overhead',
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
      id: 'dvq',
      title: 'DVQ — Cloud Workload Routing Optimization System',
      oneLineProblem: 'Multi-region cloud workloads face erratic network latency and regional performance variance under bursty traffic.',
      oneLineResult: 'Evaluated decoupled edge dispatchers on AWS; sustained sub-100µs decision latency with 0.0% SLA breach across synthetic evaluation trials.',
      category: 'cloud',
      isConfidential: true,
      peerReviewNotice: 'Under Academic Peer Review • Details Available on Request (Advisor: Dr. Rahul Mishra, NIAMT Ranchi)',
      tech: ['AWS (7 Regions)', 'Node.js', 'Express.js', 'PM2', 'CloudWatch API', 'REST APIs'],
      github: null,
      metricPrimary: 'Sub-100µs',
      metricLabel: 'Decision Latency (Synthetic)',
      starProblem: 'Global cloud workloads experience unpredictable multi-region network latency and regional infrastructure variance under bursty loads.',
      starSolution: 'Evaluated a decoupled edge dispatch and telemetry architecture across 7 AWS geographic regions during research at NIAMT Ranchi under Dr. Rahul Mishra.',
      starImpact: 'Sustained sub-100µs decision latency with a verified 0.0% SLA breach guarantee across extensive multi-region synthetic evaluation trials.',
      highlights: [
        'Decoupled microservice architecture: Routing Gateway, Telemetry Ingestion, State Prober, CloudWatch Metrics Collector.',
        'Sustained 0.0% SLA breach guarantee across extensive synthetic traffic bursts and chaos experiments.',
        'Proprietary academic research currently under peer review; source code and mathematical formulation protected.'
      ]
    },
    {
      id: 'planner',
      title: 'Study Planner — Dynamic Constraint-Based Scheduling Algorithm',
      oneLineProblem: 'Students struggle to balance conflicting exam deadlines, subject difficulty, and cognitive burnout when creating revision timetables.',
      oneLineResult: 'Formulated an O(N log N) greedy scheduling engine in Java utilizing PriorityQueue min-heaps to dynamically assign study blocks with spaced repetition buffers.',
      category: 'java',
      tech: ['Java 17', 'Object-Oriented Design', 'Priority Queues', 'Greedy Heuristics', 'Algorithmic Optimization'],
      github: 'https://github.com/rashmipandey870/Study-Planner-Scheduling-Algorithm-',
      metricPrimary: 'O(N log N)',
      metricLabel: 'Heap Efficiency',
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

  // DSA Topic Spread
  const dsaTopics = [
    { name: 'Arrays & Two-Pointers', count: 35, difficulty: 'Easy/Med', color: 'text-eco-400' },
    { name: 'Sliding Window & Prefix Sums', count: 20, difficulty: 'Medium', color: 'text-cyan-400' },
    { name: 'Binary Search & Sorting', count: 25, difficulty: 'Medium', color: 'text-indigo-400' },
    { name: 'Stacks, Queues & Monotonic', count: 20, difficulty: 'Medium', color: 'text-amber-400' },
    { name: 'Trees & Binary Search Trees', count: 25, difficulty: 'Med/Hard', color: 'text-emerald-400' },
    { name: 'Graphs & BFS/DFS/TopoSort', count: 25, difficulty: 'Med/Hard', color: 'text-sky-400' },
    { name: 'Dynamic Programming & Heaps', count: 25, difficulty: 'Medium', color: 'text-purple-400' },
  ];

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

      {/* TOP CREDIBLE STATUS BAR (NO FAKE TELEMETRY) */}
      <div className="bg-dark-950/95 border-b border-white/5 px-4 py-1.5 font-mono text-[11px] text-slate-400 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-40 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-eco-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-eco-500"></span>
          </span>
          <span className="text-white font-semibold">~/rashmi-pandey</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300">Amity Univ Jharkhand (CGPA 8.00)</span>
          <span className="text-slate-600">|</span>
          <span className="text-eco-400">Open to SDE Roles</span>
        </div>
        <div className="flex items-center gap-4 text-[10px]">
          <a 
            href="https://github.com/rashmipandey870" 
            target="_blank" 
            rel="noreferrer" 
            className="text-slate-400 hover:text-white transition-colors"
          >
            github.com/rashmipandey870
          </a>
          <button 
            onClick={() => setResumeOpen(true)}
            className="text-eco-400 hover:text-eco-300 font-semibold underline decoration-eco-500/40"
          >
            [Resume_ATS.pdf]
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
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-eco-500/10 text-eco-400 font-mono border border-eco-500/20">SDE Candidate</span>
              </div>
              <div className="text-[11px] text-slate-400 font-mono">Java, AWS &amp; Distributed Systems</div>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-1 font-mono text-xs">
            {[
              { id: 'hero', label: '// 01.root' },
              { id: 'dsa', label: '// 02.dsa' },
              { id: 'projects', label: '// 03.projects' },
              { id: 'lab', label: '// 04.systems_lab' },
              { id: 'how-i-work', label: isAmazonView ? '// 05.amazon_lp' : '// 05.principles' },
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
              <span className="hidden sm:inline">CLI (⌘K)</span>
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

      <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 space-y-24 py-8">
        
        {/* 1. HERO SECTION (10-SECOND RECRUITER FIRST SCREEN) */}
        <section id="hero" className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center min-h-[540px] relative pt-2">
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

          {/* Left Column: 10-Second Pitch */}
          <div className="lg:col-span-7 space-y-6 z-10 relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-eco-500/30 bg-eco-500/10 px-3.5 py-1 font-mono text-xs font-semibold text-eco-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-eco-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-eco-500"></span>
              </span>
              <span>SDE CANDIDATE: JAVA &bull; AWS &bull; DISTRIBUTED SYSTEMS</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
                Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-400">Rashmi Pandey</span>
              </h1>
              <p className="text-xl sm:text-2xl font-semibold text-slate-200">
                I build <span className="text-eco-400">resilient, low-latency cloud systems</span> and enterprise Java software.
              </p>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              Computer Science undergraduate (CGPA: 8.00/10) at Amity University Jharkhand with verified research internship experience in multi-region cloud systems at <strong>NIAMT Ranchi</strong>. Experienced in Java 17, Jakarta EE, and relational databases.
            </p>

            {/* TWO PRIMARY CTAS (Resume & GitHub) */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => setResumeOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-eco-500 to-cyan-600 text-white font-semibold text-sm shadow-lg shadow-eco-500/25 hover:opacity-95 transition-all"
              >
                <Download className="h-4 w-4" />
                <span>View ATS Resume PDF</span>
              </button>

              <a
                href="https://github.com/rashmipandey870"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-dark-900 border border-white/10 hover:border-eco-500/40 text-slate-200 hover:text-white font-semibold text-sm transition-all"
              >
                <Github className="h-4 w-4 text-slate-400" />
                <span>GitHub Profile (1,200+ Commits)</span>
              </a>

              <a
                href="#dsa"
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-dark-900 border border-white/10 hover:border-cyan-500/40 text-slate-300 hover:text-white font-mono text-xs transition-all"
              >
                <Binary className="h-4 w-4 text-cyan-400" />
                <span>DSA (175+ Solved)</span>
              </a>
            </div>

            {/* PROOF STRIP: 4 REAL CHIPS LINKING TO REAL SOURCES */}
            <div className="pt-2">
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-2 font-bold">
                Verified Academic &amp; Professional Proof Points
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                
                {/* Chip 1: NPTEL IIT-M */}
                <a 
                  href="#credentials"
                  className="glass-panel p-3 rounded-xl border border-white/5 hover:border-cyan-500/30 transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 font-bold text-xs">
                      🏆
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                        NPTEL — Python for Data Science
                      </div>
                      <div className="text-[11px] text-cyan-400 font-mono">
                        IIT Madras &bull; Score: 84% (Top 2% Nationwide)
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                </a>

                {/* Chip 2: NPTEL IIT-R */}
                <a 
                  href="#credentials"
                  className="glass-panel p-3 rounded-xl border border-white/5 hover:border-indigo-500/30 transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 font-bold text-xs">
                      🥈
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">
                        NPTEL — Joy of Computing in Python
                      </div>
                      <div className="text-[11px] text-indigo-400 font-mono">
                        IIT Ropar &bull; Score: 87% (Silver Medal)
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                </a>

                {/* Chip 3: Microsoft Azure DBA */}
                <a 
                  href="#credentials"
                  className="glass-panel p-3 rounded-xl border border-white/5 hover:border-eco-500/30 transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-eco-500/10 text-eco-400 font-bold text-xs">
                      ☁️
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-eco-300 transition-colors">
                        Azure Database Administrator Associate
                      </div>
                      <div className="text-[11px] text-eco-400 font-mono">
                        Microsoft Certified (ID: 647C0C2C5B35FA32)
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-500 group-hover:text-eco-400 transition-colors" />
                </a>

                {/* Chip 4: NIAMT Summer Research Intern */}
                <a 
                  href="#experience"
                  className="glass-panel p-3 rounded-xl border border-white/5 hover:border-amber-500/30 transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 font-bold text-xs">
                      🔬
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                        Summer Research Intern — Cloud Systems
                      </div>
                      <div className="text-[11px] text-amber-400 font-mono">
                        NIAMT Ranchi &bull; Under Dr. Rahul Mishra
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
                </a>

              </div>
            </div>

          </div>

          {/* Right Column: Profile & Quick Credential Card */}
          <div className="lg:col-span-5 space-y-4 z-10 relative">
            <div className="glass-panel rounded-2xl border border-white/10 p-5 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-eco-500/10 rounded-full blur-2xl pointer-events-none" />

              {/* Headshot & Identity */}
              <div className="flex items-center gap-4 pb-4 border-b border-white/10">
                <div className="relative">
                  <img
                    src={photoUrl}
                    alt="Rashmi Pandey"
                    className="w-16 h-16 rounded-xl object-cover object-top border-2 border-eco-500/40 shadow-lg"
                  />
                  <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-eco-500 border-2 border-dark-950 items-center justify-center text-[9px] text-white">✓</span>
                  </span>
                </div>
                <div>
                  <div className="text-white font-bold text-base">Rashmi Pandey</div>
                  <div className="text-xs text-eco-400 font-mono">Computer Science Undergraduate</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Amity Univ Jharkhand &bull; CGPA: 8.00 / 10</div>
                </div>
              </div>

              {/* Quick Summary Grid */}
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-dark-950/80 border border-white/5">
                  <div className="text-[10px] text-slate-500 uppercase">Target Role</div>
                  <div className="text-white font-bold mt-0.5">SDE / Backend</div>
                </div>
                <div className="p-2.5 rounded-lg bg-dark-950/80 border border-white/5">
                  <div className="text-[10px] text-slate-500 uppercase">Primary Stack</div>
                  <div className="text-eco-400 font-bold mt-0.5">Java 17 &bull; AWS</div>
                </div>
                <div className="p-2.5 rounded-lg bg-dark-950/80 border border-white/5">
                  <div className="text-[10px] text-slate-500 uppercase">DSA Challenge</div>
                  <div className="text-cyan-400 font-bold mt-0.5">175+ Problems</div>
                </div>
                <div className="p-2.5 rounded-lg bg-dark-950/80 border border-white/5">
                  <div className="text-[10px] text-slate-500 uppercase">GitHub Commits</div>
                  <div className="text-amber-400 font-bold mt-0.5">1,200+ Verified</div>
                </div>
              </div>

              {/* External Profile Links */}
              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                <a 
                  href="https://github.com/rashmipandey870" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
                >
                  <Github className="h-4 w-4" /> GitHub Repos
                </a>
                <a 
                  href="https://www.linkedin.com/in/rashmi-pandey-590a22340" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  <Linkedin className="h-4 w-4" /> LinkedIn Profile
                </a>
                <a 
                  href="mailto:rashmipd870@gmail.com"
                  className="flex items-center gap-1.5 text-slate-400 hover:text-eco-400 transition-colors"
                >
                  <Mail className="h-4 w-4" /> Email
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 2. DEDICATED DSA SECTION */}
        <section id="dsa" className="space-y-6 pt-10 border-t border-white/5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-3 py-1 font-mono text-xs font-semibold text-cyan-400 mb-2">
                <Binary className="h-3.5 w-3.5 text-cyan-400" />
                <span>PROBLEM SOLVING CONSISTENCY</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Data Structures &amp; Algorithms (DSA)
              </h2>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl">
                100-Day problem-solving challenge with 175+ solved questions across core topics in Java 17.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="https://github.com/rashmipandey870?tab=repositories"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-dark-900 border border-white/10 hover:border-cyan-500/30 text-xs font-mono text-slate-300 hover:text-white transition-colors"
              >
                <Github className="h-3.5 w-3.5 text-slate-400" />
                <span>DSA Solutions Repo</span>
              </a>

              <a
                href="#lab"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-600 text-white text-xs font-mono font-semibold shadow-md shadow-cyan-500/20 hover:opacity-95 transition-opacity"
              >
                <Play className="h-3.5 w-3.5 fill-white" />
                <span>Min-Heap Interactive Demo</span>
              </a>
            </div>
          </div>

          {/* DSA Metrics & Topic Spread Grid */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-6 border-b border-white/5">
              <div>
                <div className="text-[11px] font-mono text-slate-400 uppercase">Total Problems</div>
                <div className="text-2xl font-bold font-mono text-white mt-0.5">175+</div>
                <div className="text-[10px] text-slate-500">LeetCode &amp; GFG</div>
              </div>
              <div>
                <div className="text-[11px] font-mono text-slate-400 uppercase">Consistency</div>
                <div className="text-2xl font-bold font-mono text-eco-400 mt-0.5">100 Days</div>
                <div className="text-[10px] text-slate-500">Daily Practice</div>
              </div>
              <div>
                <div className="text-[11px] font-mono text-slate-400 uppercase">Primary Language</div>
                <div className="text-2xl font-bold font-mono text-cyan-400 mt-0.5">Java 17</div>
                <div className="text-[10px] text-slate-500">Standard Library &amp; Collections</div>
              </div>
              <div>
                <div className="text-[11px] font-mono text-slate-400 uppercase">Goal Completion</div>
                <div className="text-2xl font-bold font-mono text-indigo-400 mt-0.5">100%</div>
                <div className="text-[10px] text-slate-500">Tracked in GitHub</div>
              </div>
            </div>

            {/* Topic Breakdown Chips */}
            <div className="space-y-3">
              <div className="text-xs font-mono text-slate-400 uppercase font-bold">
                Topic Breakdown &amp; Problem Distribution
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {dsaTopics.map((topic) => (
                  <div key={topic.name} className="p-3 rounded-xl bg-dark-950/80 border border-white/5 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-white">{topic.name}</span>
                      <span className={`font-mono text-xs font-bold ${topic.color}`}>{topic.count}</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                      <span>Level: {topic.difficulty}</span>
                      <span>Solved in Java</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 3. FEATURED 4 PROJECTS MATRIX (COLLAPSIBLE DETAILS) */}
        <section id="projects" className="space-y-8 pt-10 border-t border-white/5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-eco-500/20 bg-eco-500/5 px-3 py-1 font-mono text-xs font-semibold text-eco-400 mb-2">
                <Layers className="h-3.5 w-3.5 text-eco-400" />
                <span>SELECTED ENGINEERING REPOSITORIES</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Featured Projects (4 Selected)
              </h2>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl">
                4 core projects showcasing enterprise Java, Android systems, cloud optimization, and algorithms.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-dark-950 rounded-xl border border-white/10 font-mono text-xs">
              {[
                { id: 'all', label: 'All (4)' },
                { id: 'java', label: 'Java / Backend' },
                { id: 'mobile', label: 'Android' },
                { id: 'cloud', label: 'Cloud' },
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

          <div className="grid grid-cols-1 gap-6">
            {filteredProjects.map((project) => {
              const isExpanded = !!expandedStar[project.id];

              return (
                <div
                  key={project.id}
                  className="glass-panel rounded-2xl border border-white/10 overflow-hidden p-6 sm:p-7 space-y-5"
                >
                  {/* Card Top Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="font-mono text-xs px-2 py-0.5 rounded bg-eco-500/10 text-eco-400 border border-eco-500/20 uppercase font-semibold">
                          {project.category}
                        </span>
                        {project.isConfidential && (
                          <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold flex items-center gap-1">
                            <Lock className="h-3 w-3" /> Peer Review Pending
                          </span>
                        )}
                        <h3 className="text-xl sm:text-2xl font-bold text-white">
                          {project.title}
                        </h3>
                      </div>

                      {project.peerReviewNotice && (
                        <div className="text-xs text-amber-300 font-mono pt-0.5">
                          {project.peerReviewNotice}
                        </div>
                      )}
                    </div>

                    <div className="p-3 rounded-xl bg-dark-950/80 border border-white/5 text-right shrink-0">
                      <div className="font-mono text-lg font-bold text-eco-400">{project.metricPrimary}</div>
                      <div className="text-[10px] uppercase font-mono text-slate-400">{project.metricLabel}</div>
                    </div>
                  </div>

                  {/* Clean 1-Line Problem & 1-Line Result */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-3.5 rounded-xl bg-dark-950/60 border border-white/5 space-y-1">
                      <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">The Problem</span>
                      <p className="text-slate-300 leading-relaxed">{project.oneLineProblem}</p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-dark-950/60 border border-white/5 space-y-1">
                      <span className="text-[10px] font-mono text-eco-400 uppercase font-bold">Quantified Result</span>
                      <p className="text-slate-300 leading-relaxed">{project.oneLineResult}</p>
                    </div>
                  </div>

                  {/* Collapsible STAR Details Toggle */}
                  <div>
                    <button
                      onClick={() => toggleStarDetails(project.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors py-1"
                    >
                      <ChevronDown className={`h-4 w-4 text-cyan-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      <span>{isExpanded ? 'Hide Architecture & STAR Details' : 'Show Architecture & STAR Details'}</span>
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pt-3 space-y-3 overflow-hidden text-xs"
                        >
                          <div className="p-4 rounded-xl bg-dark-950/80 border border-cyan-500/20 space-y-2">
                            <div className="font-mono text-[10px] text-cyan-400 font-bold uppercase">
                              Architecture &amp; Technical Solution:
                            </div>
                            <p className="text-slate-300 leading-relaxed">{project.starSolution}</p>
                          </div>

                          <div className="space-y-1.5 pt-1">
                            <div className="font-mono text-[10px] text-slate-400 uppercase font-bold">
                              Key Implementation Highlights:
                            </div>
                            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                              {project.highlights.map((h, i) => (
                                <li key={i} className="flex items-start gap-2 p-2 rounded-lg bg-dark-950/40 border border-white/5">
                                  <CheckCircle2 className="h-3.5 w-3.5 text-eco-400 shrink-0 mt-0.5" />
                                  <span className="text-slate-300 text-[11px]">{h}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Card Footer: Tech Stack Pills & Repo Links */}
                  <div className="pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[11px] px-2.5 py-1 rounded-lg bg-dark-950 text-slate-300 border border-white/5"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3">
                      {project.isConfidential ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-950 border border-amber-500/30 text-amber-300 text-xs font-mono">
                          <Lock className="h-3.5 w-3.5 text-amber-400" />
                          <span>Code Protected (Under Review)</span>
                        </span>
                      ) : (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-900 border border-white/10 hover:border-eco-500/40 text-slate-200 hover:text-white text-xs font-mono transition-colors"
                        >
                          <Github className="h-3.5 w-3.5 text-slate-400" />
                          <span>View Repository</span>
                        </a>
                      )}

                      {project.githubBackend && (
                        <a
                          href={project.githubBackend}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-900 border border-white/10 hover:border-cyan-500/40 text-slate-300 hover:text-white text-xs font-mono transition-colors"
                        >
                          <Server className="h-3.5 w-3.5 text-cyan-400" />
                          <span>Backend Repo</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* More on GitHub Link */}
          <div className="text-center pt-2">
            <a
              href="https://github.com/rashmipandey870?tab=repositories"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-dark-900 border border-white/10 hover:border-cyan-500/40 text-slate-300 hover:text-white text-xs font-mono transition-colors"
            >
              <span>Explore All Repositories on GitHub (1,200+ commits)</span>
              <ExternalLink className="h-3.5 w-3.5 text-cyan-400" />
            </a>
          </div>
        </section>

        {/* 4. SYSTEMS & ALGORITHMS LAB (Min-Heap Primary) */}
        <section id="lab" className="space-y-6 pt-10 border-t border-white/5">
          <SystemsAndAlgorithmsLab />
        </section>

        {/* 5. HOW I WORK / ENGINEERING PRINCIPLES (NEUTRAL WITH ?company=amazon TOGGLE) */}
        <section id="how-i-work" className="space-y-6 pt-10 border-t border-white/5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/5 px-3 py-1 font-mono text-xs font-semibold text-amber-400 mb-2">
                <Flame className="h-3.5 w-3.5 text-amber-400" />
                <span>ENGINEERING EXCELLENCE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {isAmazonView ? 'Amazon Leadership Principles Alignment' : 'Engineering Principles & How I Work'}
              </h2>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl">
                {isAmazonView 
                  ? 'Demonstrated alignment with Amazon Leadership Principles through research, systems, and code.' 
                  : 'Core engineering standards guiding my software design, distributed architectures, and delivery.'}
              </p>
            </div>

            {/* Switcher Pill */}
            <div className="flex items-center gap-1.5 p-1 bg-dark-950 rounded-xl border border-white/10 font-mono text-xs">
              <button
                onClick={() => setIsAmazonView(false)}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  !isAmazonView
                    ? 'bg-eco-500 text-white font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Standard View
              </button>
              <button
                onClick={() => setIsAmazonView(true)}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  isAmazonView
                    ? 'bg-amber-500 text-dark-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Amazon LP (?company=amazon)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="glass-panel p-5 rounded-xl border border-white/5 space-y-2.5">
              <div className="w-8 h-8 rounded-lg bg-eco-500/10 border border-eco-500/20 text-eco-400 flex items-center justify-center font-mono font-bold text-sm">
                01
              </div>
              <h3 className="text-base font-bold text-white">
                {isAmazonView ? 'Dive Deep' : 'Deep Systems Analysis'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Profiled Linux process schedulers under PM2 and examined microservice network round-trip bottlenecks down to a <strong>61 µs median decision latency</strong> in multi-region routing evaluation.
              </p>
            </div>

            <div className="glass-panel p-5 rounded-xl border border-white/5 space-y-2.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center font-mono font-bold text-sm">
                02
              </div>
              <h3 className="text-base font-bold text-white">
                {isAmazonView ? 'Customer Obsession' : 'Reliability & SLA Adherence'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Guaranteed a verified <strong>0.0% SLA breach rate</strong> across evaluation trials, ensuring users experience zero downtime or latency violations even during simulated regional grid outages.
              </p>
            </div>

            <div className="glass-panel p-5 rounded-xl border border-white/5 space-y-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-mono font-bold text-sm">
                03
              </div>
              <h3 className="text-base font-bold text-white">
                {isAmazonView ? 'Invent & Simplify' : 'Simplification & Decoupling'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Formulated decoupled edge microservices with clear API contracts and replaced manual tournament spreadsheets with automated combinatorial graph algorithms for 100+ athletes.
              </p>
            </div>

            <div className="glass-panel p-5 rounded-xl border border-white/5 space-y-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-mono font-bold text-sm">
                04
              </div>
              <h3 className="text-base font-bold text-white">
                {isAmazonView ? 'Deliver Results' : 'High Ownership & Delivery'}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Shipped 61 sequential production commits in EXAMORA with zero framework bloat; earned <strong>NPTEL Topper (Top 2% Nationwide)</strong> honors; completed rigorous research internship at NIAMT Ranchi.
              </p>
            </div>
          </div>
        </section>

        {/* 6. TECHNICAL ARSENAL */}
        <section id="skills" className="space-y-6 pt-10 border-t border-white/5">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-eco-500/20 bg-eco-500/5 px-3 py-1 font-mono text-xs font-semibold text-eco-400 mb-2">
              <Cpu className="h-3.5 w-3.5 text-eco-400" />
              <span>CORE TECHNICAL STACK</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Technical Arsenal &amp; Systems Architecture
            </h2>
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
                {['AWS (EC2, CloudWatch API, S3, IAM)', 'Microsoft Azure', 'Multi-Region Concepts', 'PM2 Process Supervisor', 'Linux / Unix CLI', 'Docker Basics'].map((s) => (
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
                {['Jakarta Servlets 6.0', 'Apache Tomcat 11', 'Node.js & Express.js', 'RESTful API Design', 'Microservices', 'Retrofit 2', 'Apache PDFBox'].map((s) => (
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
                {['Azure SQL', 'MySQL (ACID Transactions)', 'MongoDB Atlas', 'Relational Schema Normalization', 'Database Indexing & Tuning'].map((s) => (
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
                {['Python for Data Science (IIT-M Topper)', 'Joy of Computing (IIT-R)', 'Pandas & NumPy', 'Statistical EDA', 'Scikit-learn'].map((s) => (
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
                <h3 className="font-bold text-white text-base">DevOps &amp; Tools</h3>
              </div>
              <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                {['Git & GitHub (1,200+ commits)', 'Postman API Testing', 'Maven', 'Android Studio', 'JWT Authentication', 'MVC Pattern'].map((s) => (
                  <span key={s} className="px-2.5 py-1 rounded-lg bg-dark-950 text-slate-300 border border-white/5">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 7. VERIFIED CREDENTIALS VAULT */}
        <section id="credentials" className="space-y-6 pt-10 border-t border-white/5">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-eco-500/20 bg-eco-500/5 px-3 py-1 font-mono text-xs font-semibold text-eco-400 mb-2">
              <Award className="h-3.5 w-3.5 text-eco-400" />
              <span>OFFICIAL CREDENTIALS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Accredited Certifications &amp; Honors
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Cert 1: NPTEL IIT Madras */}
            <div className="glass-panel p-6 rounded-xl border-l-4 border-l-cyan-400 border-white/5 space-y-3">
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
                Awarded <strong>Elite + Silver Medal</strong> and recognized as a <strong>Nationwide Topper in the Top 2%</strong> of all candidates. Statistical EDA, Pandas, NumPy data processing, and Scikit-learn pipelines.
              </p>
            </div>

            {/* Cert 2: NPTEL IIT Ropar */}
            <div className="glass-panel p-6 rounded-xl border-l-4 border-l-indigo-400 border-white/5 space-y-3">
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
                Taught by <strong>Prof. Sudarshan Iyengar</strong>. Achieved an <strong>87% Score (Elite + Silver Medal / Silver Badge)</strong> demonstrating advanced algorithmic thinking, recursion, and computational problem-solving.
              </p>
            </div>

            {/* Cert 3: Microsoft Azure DBA */}
            <div className="glass-panel p-6 rounded-xl border-l-4 border-l-eco-400 border-white/5 space-y-3">
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
                Validates enterprise cloud database management, security governance, query optimization, and performance tuning on Microsoft Azure SQL infrastructure.
              </p>
            </div>

            {/* Cert 4: Microsoft SQL AI Tools & Infosys */}
            <div className="glass-panel p-6 rounded-xl border-l-4 border-l-amber-400 border-white/5 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold uppercase">
                      DATABASE &amp; JAVA
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    Implement SQL Solutions Using AI-Assisted Tools
                  </h3>
                  <div className="text-xs font-mono text-slate-400">Microsoft &bull; Additional: <strong>Infosys Springboard (Java Fundamentals)</strong></div>
                </div>
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
                  <Sparkles className="h-6 w-6" />
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Database schema design, indexing strategies, and query profiling. Combined with Infosys Java Fundamentals (OOP, concurrency, and collections).
              </p>
            </div>
          </div>
        </section>

        {/* 8. RESEARCH & EDUCATION TIMELINE */}
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
                Researched multi-region routing optimization across AWS infrastructure. Evaluated decoupled edge dispatchers and telemetry services; sustained sub-100µs decision latency with a verified 0.0% SLA breach guarantee across synthetic evaluation trials. Research paper currently under peer review.
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
                Core Coursework: Data Structures &amp; Algorithms, Object-Oriented Programming, Database Management Systems, Operating Systems, Computer Networks, Cloud Computing. Secondary: CBSE Class XII PCM 88.2% | Class X 85.0%.
              </p>
            </div>
          </div>
        </section>

        {/* 9. TERMINAL SECTION */}
        <section id="terminal" className="space-y-6 pt-10 border-t border-white/5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-eco-500/20 bg-eco-500/5 px-3 py-1 font-mono text-xs font-semibold text-eco-400 mb-2">
                <Terminal className="h-3.5 w-3.5 text-eco-400" />
                <span>DEVELOPER COMMAND LINE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Interactive Developer CLI
              </h2>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl">
                Explore technical depth via CLI commands: <code className="text-eco-400 bg-dark-950 px-1 py-0.5 rounded">dsa</code>, <code className="text-cyan-400 bg-dark-950 px-1 py-0.5 rounded">jvm</code>, <code className="text-indigo-400 bg-dark-950 px-1 py-0.5 rounded">sql</code>, <code className="text-amber-400 bg-dark-950 px-1 py-0.5 rounded">certs</code>, <code className="text-slate-300 bg-dark-950 px-1 py-0.5 rounded">help</code>.
              </p>
            </div>
          </div>

          <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
            <DeveloperTerminal />
          </div>
        </section>

        {/* 10. CONTACT SECTION */}
        <section id="contact" className="pt-10 border-t border-white/5 pb-16">
          <div className="glass-panel rounded-2xl border border-white/10 p-8 sm:p-12 text-center space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-eco-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="inline-flex items-center gap-2 rounded-full border border-eco-500/20 bg-eco-500/10 px-4 py-1.5 font-mono text-xs font-semibold text-eco-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-eco-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-eco-500"></span>
              </span>
              <span>AVAILABLE FOR SDE INTERNSHIPS &amp; GRADUATE ROLES</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Let's Connect &amp; Build
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Targeting Software Development Engineer (SDE) opportunities. Let's discuss how my distributed systems research, Java engineering, and problem-solving consistency can add value to your engineering team.
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
                <span>GitHub (1,200+ Commits)</span>
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
            &copy; 2026 Rashmi Pandey. Fast, accessible &amp; recruiter-grounded developer portfolio.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Amity Univ Jharkhand</span>
            <span>&bull;</span>
            <span className="text-eco-400">CGPA: 8.00</span>
            <span>&bull;</span>
            <span className="text-cyan-400">NPTEL Top 2%</span>
          </div>
        </div>
      </footer>

      {/* FLOATING SDE CANDIDATE AI COPILOT */}
      <AICopilot />

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
