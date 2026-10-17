import React, { useState, useEffect } from 'react';
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
  TrendingDown,
  Clock,
  Cloud,
  Check,
  Copy,
  Download,
  Terminal,
  Activity,
  Network,
  Command,
  CornerDownLeft,
  X,
  Play
} from 'lucide-react';
import ResumeModal from './components/ResumeModal';

function App() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalOutput, setTerminalOutput] = useState([
    'Antigravity Dev Console v2.6.4 — Rashmi Pandey [SDE Candidate]',
    'Type "help" to view available diagnostic commands or click quick actions below.'
  ]);
  const [activeTab, setActiveTab] = useState('all');
  const [projectTab, setProjectTab] = useState({}); // { [projectId]: 'summary' | 'arch' | 'curl' }
  const [copiedKey, setCopiedKey] = useState(null);
  const [activeSection, setActiveSection] = useState('hero');

  const baseUrl = import.meta.env.BASE_URL || '/';
  const photoUrl = `${baseUrl}rashmi-photo.jpg`;
  const resumeUrl = `${baseUrl}Rashmi_Pandey_Resume.pdf`;

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2200);
  };

  const handleCommand = (cmd) => {
    const cleanCmd = (cmd || terminalInput).trim().toLowerCase();
    let response = '';

    switch (cleanCmd) {
      case 'help':
        response = 'Commands: "certs", "metrics", "projects", "resume", "contact", "clear"';
        break;
      case 'certs':
        response = '1. NPTEL Python for Data Science (IIT Madras) [84% • TOPPER 2%]\n2. NPTEL Joy of Computing (IIT Ropar - Prof. Sudarshan) [87% • Silver Badge]\n3. Microsoft Azure DBA Associate [ID: 647C0C2C5B35FA32]\n4. Microsoft SQL AI Tools\n5. Infosys Java Fundamentals';
        break;
      case 'metrics':
        response = 'System Telemetry: 61µs Gateway Decision Latency • 35.8% Carbon Reduction • 0.0% SLA Breach • 1,200+ GitHub Commits';
        break;
      case 'projects':
        response = 'Active Repos: 1. DVQ (AWS Multi-Region) | 2. EXAMORA (Jakarta EE) | 3. Sangathan (Android/Node) | 4. Paper-Tracker | 5. Study-Planner';
        break;
      case 'resume':
        window.open(resumeUrl, '_blank');
        response = 'Downloading ATS Resume PDF...';
        break;
      case 'contact':
        response = 'Email: rashmipd870@gmail.com | Phone: +91 87093 68696 | LinkedIn: linkedin.com/in/rashmi-pandey-590a22340';
        break;
      case 'clear':
        setTerminalOutput(['Terminal console cleared. Type "help" for options.']);
        setTerminalInput('');
        return;
      default:
        response = `Command not recognized: "${cleanCmd}". Type "help" for list of commands.`;
    }

    setTerminalOutput(prev => [...prev, `> ${cleanCmd}`, response]);
    setTerminalInput('');
  };

  // Keyboard shortcut (⌘K or Ctrl+K) for Dev Terminal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setTerminalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'tech-hud', 'about', 'skills', 'projects', 'experience', 'contact'];
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
      curlExample: 'curl -X POST https://dvq-gateway.aws/v1/route \\\n  -H "Content-Type: application/json" \\\n  -d \'{"slaLatencyMs": 120, "tier": "interactive"}\' \\\n  # Returns optimal region in 61 µs with 0% SLA breach',
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
      id: 'papertracker',
      title: 'Faculty Research Paper Tracker — Publication & Metrics System',
      tagline: 'Academic publication management platform featuring two-factor OTP verification and automated Google Forms webhook ingestion.',
      category: 'cloud',
      tech: ['Node.js', 'Express.js', 'MongoDB Atlas', 'Mongoose', 'JWT Auth', 'Nodemailer OTP', 'REST APIs'],
      github: 'https://github.com/rashmipandey870',
      demo: 'https://github.com/rashmipandey870',
      metricPrimary: '75%',
      metricLabel: 'Turnaround Reduction',
      architectureFlow: 'Google Forms Paper Submissions ➔ Ingestion Webhook Handler ➔ Nodemailer OTP Faculty Authentication ➔ Indexed MongoDB Query Engine ➔ Citation Metrics Dashboard',
      curlExample: 'curl -X POST https://research-tracker.org/api/auth/verify-otp \\\n  -d \'{"email":"faculty@amity.edu", "otp":"489120"}\' \\\n  # Stateless JWT session minted with RBAC permissions',
      starProblem: 'University departments lose publication records and struggle during accreditation audits due to fragmented paper submissions.',
      starSolution: 'Built a centralized publication analytics repository with automated Google Forms intake, Nodemailer OTP verification, and indexed MongoDB querying.',
      starImpact: 'Eliminated publication submission lag by 75%; ensured zero unauthorized modifications using stateless JWT authentication.',
      highlights: [
        'Automated paper intake via Google Forms ingestion webhooks, reducing manual clerical work.',
        'Implemented two-factor authentication via Nodemailer OTP and stateless JWT token authorization.',
        'Designed indexed MongoDB schemas supporting multi-attribute querying across ISSN and DOI records.'
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
    <div className="min-h-screen bg-[#FAFAF7] text-[#334155] font-sans selection:bg-indigo-100 selection:text-indigo-800 bg-light-pattern">
      
      {/* Background Radial Glows (Zero Black) */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-indigo-100/50 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="fixed bottom-1/4 right-1/4 w-[500px] h-[500px] bg-sky-100/50 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Sticky Minimal Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-[#E2E8F0] bg-[#FAFAF7]/92 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
          <a href="#hero" className="flex items-center gap-2 font-mono text-base font-bold tracking-tight text-[#1E293B] group">
            <span className="text-[#4F46E5] group-hover:text-[#0D9488] transition-colors">&lt;</span>
            <span>Rashmi Pandey</span>
            <span className="text-[#0EA5E9] group-hover:text-[#4F46E5] transition-colors">/&gt;</span>
          </a>
          
          <nav className="hidden items-center gap-6 md:flex">
            <a 
              href="#about" 
              className={`text-sm font-medium transition-colors ${activeSection === 'about' ? 'text-[#4F46E5] font-semibold' : 'text-[#64748B] hover:text-[#1E293B]'}`}
            >
              About
            </a>
            <a 
              href="#skills" 
              className={`text-sm font-medium transition-colors ${activeSection === 'skills' ? 'text-[#4F46E5] font-semibold' : 'text-[#64748B] hover:text-[#1E293B]'}`}
            >
              Skills
            </a>
            <a 
              href="#projects" 
              className={`text-sm font-medium transition-colors ${activeSection === 'projects' ? 'text-[#4F46E5] font-semibold' : 'text-[#64748B] hover:text-[#1E293B]'}`}
            >
              Projects
            </a>
            <a 
              href="#experience" 
              className={`text-sm font-medium transition-colors ${activeSection === 'experience' ? 'text-[#4F46E5] font-semibold' : 'text-[#64748B] hover:text-[#1E293B]'}`}
            >
              Experience
            </a>
            <a 
              href="#contact" 
              className={`text-sm font-medium transition-colors ${activeSection === 'contact' ? 'text-[#4F46E5] font-semibold' : 'text-[#64748B] hover:text-[#1E293B]'}`}
            >
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-2.5">
            {/* Dev Console Hack Pill */}
            <button 
              onClick={() => setTerminalOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#CBD5E1] bg-white hover:bg-[#F4F6FB] px-2.5 py-1.5 text-xs font-mono font-medium text-[#1E293B] shadow-sm transition-all"
              title="Open Developer Console (Ctrl+K / ⌘K)"
            >
              <Terminal className="h-3.5 w-3.5 text-[#4F46E5]" />
              <span className="hidden sm:inline">⌘K</span>
            </button>

            <a 
              href={resumeUrl}
              download="Rashmi_Pandey_Resume.pdf"
              className="inline-flex items-center justify-center rounded-lg bg-[#4F46E5] hover:bg-[#4338CA] px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm transition-all hover:shadow-indigo-500/20 active:scale-95"
            >
              <Download className="h-3.5 w-3.5 mr-1" />
              Resume (PDF)
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-24 pt-8 space-y-16">
        
        {/* 1. HERO SECTION WITH PROFESSIONAL HEADSHOT */}
        <section id="hero" className="py-4 md:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Recruiter Ready Pill with Live Health Indicator */}
              <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50/90 px-4 py-1.5 text-xs font-semibold text-[#4F46E5] shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4F46E5]"></span>
                </span>
                <span>Targeting SDE &amp; Cloud Systems Roles</span>
                <span className="text-slate-300">•</span>
                <span className="text-[#0D9488] font-mono">AWS 7-Region Active</span>
              </div>
              
              <h1 className="text-4xl font-extrabold tracking-tight text-[#1E293B] sm:text-5xl md:text-6xl leading-[1.12]">
                Hi, I'm <span className="bg-gradient-to-r from-[#4F46E5] via-[#0EA5E9] to-[#0D9488] bg-clip-text text-transparent">Rashmi Pandey</span>.
              </h1>
              
              <p className="text-xl sm:text-2xl text-[#1E293B] font-semibold leading-relaxed">
                I build resilient, low-latency cloud systems on AWS with sub-100µs decision latency and Jakarta EE enterprise backends.
              </p>

              <p className="text-base text-[#64748B] leading-relaxed">
                Computer Science &amp; Engineering undergraduate at <strong>Amity University (CGPA 8.00 / 10.0)</strong> with hands-on research in distributed systems at NIAMT Ranchi, Lyapunov workload optimization, and production Java backends.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3.5 pt-1">
                <a 
                  href="#projects" 
                  className="inline-flex items-center gap-2 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-500/25 transition-all hover:-translate-y-0.5 active:scale-95"
                >
                  View Featured Projects <ChevronRight className="h-4 w-4" />
                </a>
                <a 
                  href={resumeUrl}
                  download="Rashmi_Pandey_Resume.pdf"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#FFFFFF] hover:bg-[#F4F6FB] border border-[#CBD5E1] px-5 py-3 text-sm font-semibold text-[#1E293B] shadow-sm transition-all hover:-translate-y-0.5"
                >
                  <Download className="h-4 w-4 text-[#4F46E5]" /> Download Resume
                </a>
                <button 
                  onClick={() => setTerminalOpen(true)}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#F4F6FB] hover:bg-[#E2E8F0] border border-[#E2E8F0] px-4 py-3 text-sm font-mono text-[#334155] transition-all"
                >
                  <Terminal className="h-4 w-4 text-[#0EA5E9]" /> Dev Console
                </button>
              </div>

              {/* Quick Contact & Social Icons */}
              <div className="flex flex-wrap items-center gap-5 pt-2 text-[#64748B]">
                <a 
                  href="https://github.com/rashmipandey870" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-[#4F46E5] transition-colors flex items-center gap-1.5 text-xs font-semibold"
                >
                  <Github className="h-4 w-4" /> GitHub (1,200+ Contributions)
                </a>
                <a 
                  href="https://linkedin.com/in/rashmi-pandey-590a22340" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="hover:text-[#4F46E5] transition-colors flex items-center gap-1.5 text-xs font-semibold"
                >
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </a>
                <button 
                  onClick={() => copyToClipboard('rashmipd870@gmail.com', 'email')}
                  className="hover:text-[#4F46E5] transition-colors flex items-center gap-1.5 text-xs font-semibold focus:outline-none"
                >
                  {copiedKey === 'email' ? <Check className="h-4 w-4 text-[#0D9488]" /> : <Mail className="h-4 w-4" />}
                  <span>{copiedKey === 'email' ? 'Email Copied!' : 'rashmipd870@gmail.com'}</span>
                </button>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="portfolio-card p-3.5">
                  <div className="font-mono text-2xl font-bold text-[#4F46E5]">61 µs</div>
                  <div className="text-[11px] text-[#64748B] mt-1 font-medium">Gateway Decision Latency</div>
                </div>
                <div className="portfolio-card p-3.5">
                  <div className="font-mono text-2xl font-bold text-[#0D9488]">35.8%</div>
                  <div className="text-[11px] text-[#64748B] mt-1 font-medium">Cloud Carbon Cut</div>
                </div>
                <div className="portfolio-card p-3.5">
                  <div className="font-mono text-2xl font-bold text-[#0EA5E9]">0.0%</div>
                  <div className="text-[11px] text-[#64748B] mt-1 font-medium">SLA Violation Rate</div>
                </div>
                <div className="portfolio-card p-3.5">
                  <div className="font-mono text-2xl font-bold text-[#F97316]">Top 2%</div>
                  <div className="text-[11px] text-[#64748B] mt-1 font-medium">NPTEL Topper Tag</div>
                </div>
              </div>

            </div>

            {/* Right Headshot & Executive Badge Column */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="relative w-full max-w-[340px]">
                
                {/* Decorative Soft Glow Behind Card */}
                <div className="absolute -inset-2 bg-gradient-to-r from-indigo-200 via-sky-200 to-teal-100 rounded-3xl blur-xl opacity-60 pointer-events-none" />

                {/* Profile Container Card */}
                <div className="relative portfolio-card p-4 sm:p-5 bg-white border border-[#CBD5E1] shadow-xl text-center space-y-4">
                  
                  {/* Photo Frame */}
                  <div className="relative mx-auto w-48 h-56 sm:w-56 sm:h-64 rounded-2xl overflow-hidden border-2 border-indigo-100 shadow-md bg-[#F4F6FB]">
                    <img 
                      src={photoUrl} 
                      alt="Rashmi Pandey — Software Development Engineer Candidate" 
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    
                    {/* Verified Candidate Overlay Tag */}
                    <div className="absolute bottom-2 left-2 right-2 rounded-lg bg-white/95 backdrop-blur-sm border border-slate-200 px-2 py-1 text-[11px] font-bold text-[#1E293B] shadow-sm flex items-center justify-center gap-1.5">
                      <ShieldCheck className="h-3.5 w-3.5 text-[#0D9488]" />
                      <span>Verified SDE Candidate</span>
                    </div>
                  </div>

                  {/* Profile Header Details */}
                  <div className="space-y-1">
                    <h2 className="text-xl font-bold text-[#1E293B]">Rashmi Pandey</h2>
                    <p className="text-xs font-semibold text-[#4F46E5]">B.Tech CSE • Amity University Jharkhand</p>
                    <p className="text-[11px] text-[#64748B]">Bokaro Steel City / Ranchi, India</p>
                  </div>

                  {/* Floating Badges inside card */}
                  <div className="grid grid-cols-2 gap-2 text-left pt-1 border-t border-[#E2E8F0]">
                    <div className="p-2 rounded-lg bg-[#F4F6FB] border border-[#E2E8F0]">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#4F46E5] block">Certification</span>
                      <span className="text-[11px] font-bold text-[#1E293B] line-clamp-1">Azure Database Admin</span>
                    </div>
                    <div className="p-2 rounded-lg bg-[#F4F6FB] border border-[#E2E8F0]">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#0D9488] block">NPTEL Ranking</span>
                      <span className="text-[11px] font-bold text-[#1E293B] line-clamp-1">IIT Madras Topper 2%</span>
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </section>

        {/* LIVE SYSTEM HUD & RECRUITER QUICK-SCAN STRIP */}
        <section id="tech-hud" className="portfolio-card p-5 sm:p-6 bg-gradient-to-r from-indigo-50/60 via-white to-sky-50/60 border border-indigo-200/80">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-200">
            
            <div className="space-y-1 md:pr-4">
              <span className="text-[10px] font-mono font-bold text-[#4F46E5] uppercase tracking-wider block">Target Role</span>
              <p className="text-sm font-bold text-[#1E293B]">SDE &amp; Cloud Systems Engineer</p>
              <p className="text-xs text-[#64748B]">Internship &amp; Full-Time (Immediate / 2026-28)</p>
            </div>

            <div className="space-y-1 pt-3 md:pt-0 md:px-4">
              <span className="text-[10px] font-mono font-bold text-[#0D9488] uppercase tracking-wider block">Primary Competencies</span>
              <p className="text-sm font-bold text-[#1E293B]">Java 17, AWS, Distributed Systems</p>
              <p className="text-xs text-[#64748B]">Jakarta EE, Tomcat 11, MySQL ACID, Node.js</p>
            </div>

            <div className="space-y-1 pt-3 md:pt-0 md:px-4">
              <span className="text-[10px] font-mono font-bold text-[#0EA5E9] uppercase tracking-wider block">Verified Credentials</span>
              <p className="text-sm font-bold text-[#1E293B]">Microsoft Azure DBA Associate</p>
              <p className="text-xs text-[#64748B]">NPTEL IIT Madras (Topper 2%) • NPTEL IIT Ropar (87%)</p>
            </div>

            <div className="space-y-1 pt-3 md:pt-0 md:pl-4">
              <span className="text-[10px] font-mono font-bold text-[#F97316] uppercase tracking-wider block">Location &amp; Work Auth</span>
              <p className="text-sm font-bold text-[#1E293B]">India (Open to Relocation / Remote)</p>
              <p className="text-xs text-[#64748B]">Indian Citizen • rashmipd870@gmail.com</p>
            </div>

          </div>
        </section>

        {/* 2. ABOUT SECTION */}
        <section id="about" className="space-y-6 pt-4 border-t border-[#E2E8F0]">
          <div className="flex items-center gap-2 text-[#4F46E5] text-xs font-mono uppercase tracking-wider font-semibold">
            <BookOpen className="h-4 w-4" /> About Me
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-8 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1E293B]">
                Engineered for High-Scale, Low-Latency Problem Solving
              </h2>
              <div className="space-y-3 text-base text-[#334155] leading-relaxed">
                <p>
                  I am a Computer Science undergraduate focused on distributed systems, cloud computing, and backend performance engineering. During my Summer Research Internship at NIAMT Ranchi under Dr. Rahul Mishra, I engineered <strong>DVQ</strong>, an intelligent multi-region cloud router that achieved <strong>61 µs decision latency</strong> and slashed carbon emissions by <strong>35.8%</strong> across 7 live AWS regions with a verified 0.0% SLA breach rate.
                </p>
                <p>
                  My engineering philosophy focuses on building from fundamental principles: I write clean, raw Jakarta Servlets on Apache Tomcat 11 with ACID relational databases rather than relying on heavy abstractions, and design combinatorial graph algorithms to eliminate scheduling bottlenecks.
                </p>
                <p>
                  As a Microsoft Certified Azure Database Administrator with over 1,200 GitHub contributions and <strong>NPTEL Topper (Top 2% Nationwide)</strong> recognition, I combine rigorous systems thinking with practical delivery across Java, Python, AWS, and modern data architectures.
                </p>
              </div>
            </div>

            <div className="md:col-span-4 portfolio-card p-6 space-y-4 bg-[#F4F6FB]/70">
              <h3 className="text-xs font-bold text-[#1E293B] uppercase tracking-wider font-mono">
                Amazon Leadership Principles
              </h3>
              <div className="space-y-3 text-xs text-[#334155]">
                <div className="border-l-2 border-[#4F46E5] pl-3 py-0.5">
                  <span className="font-bold text-[#1E293B] block">Dive Deep</span>
                  Profiled microsecond-level gateway latency in Node.js event loops and formulated Lyapunov drift-plus-penalty queue bounds.
                </div>
                <div className="border-l-2 border-[#0D9488] pl-3 py-0.5">
                  <span className="font-bold text-[#1E293B] block">Invent &amp; Simplify</span>
                  Constructed lightweight native Jakarta Servlets on Tomcat 11 with zero framework bloat, accelerating cold start throughput.
                </div>
                <div className="border-l-2 border-[#0EA5E9] pl-3 py-0.5">
                  <span className="font-bold text-[#1E293B] block">Deliver Results</span>
                  Sustained 0.0% SLA breaches under synthetic traffic surges while publishing reproducible open-source research and tools.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. SKILLS SECTION */}
        <section id="skills" className="space-y-6 pt-4 border-t border-[#E2E8F0]">
          <div className="flex items-center gap-2 text-[#4F46E5] text-xs font-mono uppercase tracking-wider font-semibold">
            <Code2 className="h-4 w-4" /> Technical Competencies
          </div>
          
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1E293B]">
              Grouped Technical Skills
            </h2>
            <p className="text-sm text-[#64748B] mt-1">
              Curated capabilities verified across production repositories, research benchmarks, and professional certifications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            
            {/* Languages */}
            <div className="portfolio-card p-5 space-y-3">
              <div className="flex items-center gap-2 text-[#4F46E5]">
                <Code2 className="h-5 w-5" />
                <h3 className="text-base font-bold text-[#1E293B]">Languages</h3>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {['Java 17', 'Python 3', 'C / C++', 'JavaScript (ES6+)', 'TypeScript', 'SQL (DDL/DML)'].map((skill) => (
                  <span key={skill} className="badge-indigo rounded-lg px-2.5 py-1 text-xs font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Cloud & Systems */}
            <div className="portfolio-card p-5 space-y-3">
              <div className="flex items-center gap-2 text-[#0EA5E9]">
                <Cloud className="h-5 w-5" />
                <h3 className="text-base font-bold text-[#1E293B]">Cloud &amp; Infrastructure</h3>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {['AWS (EC2, CloudWatch, S3, IAM)', 'Multi-Region Architecture', 'Microsoft Azure', 'Linux / Unix CLI', 'Bash Scripting', 'PM2 Process Supervisor'].map((skill) => (
                  <span key={skill} className="badge-sky rounded-lg px-2.5 py-1 text-xs font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Backend & Distributed Systems */}
            <div className="portfolio-card p-5 space-y-3">
              <div className="flex items-center gap-2 text-[#0D9488]">
                <Server className="h-5 w-5" />
                <h3 className="text-base font-bold text-[#1E293B]">Backend &amp; Systems</h3>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {['Jakarta Servlets 6.0', 'Apache Tomcat 11', 'Node.js & Express.js', 'RESTful API Design', 'Microservices', 'Lyapunov Optimization'].map((skill) => (
                  <span key={skill} className="badge-teal rounded-lg px-2.5 py-1 text-xs font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Databases & Storage */}
            <div className="portfolio-card p-5 space-y-3">
              <div className="flex items-center gap-2 text-[#F97316]">
                <Database className="h-5 w-5" />
                <h3 className="text-base font-bold text-[#1E293B]">Databases &amp; Storage</h3>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {['Azure SQL', 'MySQL (ACID, Migrations)', 'MongoDB (Aggregations)', 'Relational Schema Normalization', 'Database Indexing & Tuning'].map((skill) => (
                  <span key={skill} className="badge-coral rounded-lg px-2.5 py-1 text-xs font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Data Science & Python Specialization */}
            <div className="portfolio-card p-5 space-y-3">
              <div className="flex items-center gap-2 text-[#4F46E5]">
                <Sparkles className="h-5 w-5" />
                <h3 className="text-base font-bold text-[#1E293B]">Data Science &amp; Python</h3>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {['Python for Data Science (IIT-M Topper)', 'Joy of Computing (IIT-R)', 'Pandas & NumPy', 'Statistical EDA', 'Scikit-learn', 'Algorithmic Optimization'].map((skill) => (
                  <span key={skill} className="badge-indigo rounded-lg px-2.5 py-1 text-xs font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Tools & Practices */}
            <div className="portfolio-card p-5 space-y-3">
              <div className="flex items-center gap-2 text-[#0D9488]">
                <ShieldCheck className="h-5 w-5" />
                <h3 className="text-base font-bold text-[#1E293B]">Tools &amp; Practices</h3>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {['Git & GitHub', 'Docker Basics', 'Maven', 'Postman', 'Retrofit 2', 'Apache PDFBox', 'Object-Oriented Design (OOP)'].map((skill) => (
                  <span key={skill} className="badge-teal rounded-lg px-2.5 py-1 text-xs font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* 4. PROJECTS SECTION WITH TECH TABS & API cURL HACKS */}
        <section id="projects" className="space-y-6 pt-4 border-t border-[#E2E8F0]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-[#4F46E5] text-xs font-mono uppercase tracking-wider font-semibold">
                <Cpu className="h-4 w-4" /> Engineering Showcase
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1E293B] mt-1">
                Featured Projects
              </h2>
              <p className="text-sm text-[#64748B] mt-0.5">
                Engineered in STAR format with verified production metrics and interactive architecture views.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-1.5 p-1 bg-[#F4F6FB] rounded-xl border border-[#E2E8F0] self-start sm:self-auto">
              {[
                { id: 'all', label: 'All Projects' },
                { id: 'cloud', label: 'Cloud & Distributed' },
                { id: 'java', label: 'Java Enterprise' },
                { id: 'mobile', label: 'Mobile & Systems' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                    activeTab === tab.id 
                      ? 'bg-[#FFFFFF] text-[#4F46E5] font-semibold shadow-sm' 
                      : 'text-[#64748B] hover:text-[#1E293B]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            {filteredProjects.map((p) => {
              const currentTab = projectTab[p.id] || 'summary';

              return (
                <div key={p.id} className="portfolio-card p-6 md:p-8 space-y-6">
                  
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-[#E2E8F0] pb-5">
                    <div className="space-y-1.5 max-w-2xl">
                      <h3 className="text-xl md:text-2xl font-bold text-[#1E293B]">
                        {p.title}
                      </h3>
                      <p className="text-sm text-[#64748B] leading-relaxed">
                        {p.tagline}
                      </p>
                    </div>

                    {/* Metric Pill */}
                    <div className="flex items-center md:flex-col items-end justify-between md:justify-center p-3 rounded-xl bg-indigo-50/80 border border-indigo-200/80 shrink-0">
                      <span className="font-mono text-xl md:text-2xl font-extrabold text-[#4F46E5]">
                        {p.metricPrimary}
                      </span>
                      <span className="text-[11px] font-semibold text-[#64748B] tracking-tight">
                        {p.metricLabel}
                      </span>
                    </div>
                  </div>

                  {/* Tech Explorer Sub-Tabs */}
                  <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                    <button 
                      onClick={() => setProjectTab(prev => ({ ...prev, [p.id]: 'summary' }))}
                      className={`text-xs font-semibold px-3 py-1 rounded-md transition-all ${currentTab === 'summary' ? 'bg-[#4F46E5] text-white shadow-sm' : 'text-[#64748B] hover:text-[#1E293B]'}`}
                    >
                      STAR Impact
                    </button>
                    <button 
                      onClick={() => setProjectTab(prev => ({ ...prev, [p.id]: 'arch' }))}
                      className={`text-xs font-semibold px-3 py-1 rounded-md transition-all ${currentTab === 'arch' ? 'bg-[#4F46E5] text-white shadow-sm' : 'text-[#64748B] hover:text-[#1E293B]'}`}
                    >
                      Architecture Pipeline
                    </button>
                    <button 
                      onClick={() => setProjectTab(prev => ({ ...prev, [p.id]: 'curl' }))}
                      className={`text-xs font-semibold px-3 py-1 rounded-md transition-all ${currentTab === 'curl' ? 'bg-[#4F46E5] text-white shadow-sm' : 'text-[#64748B] hover:text-[#1E293B]'}`}
                    >
                      CLI / cURL Spec
                    </button>
                  </div>

                  {/* Tab Content 1: STAR Grid */}
                  {currentTab === 'summary' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      <div className="p-4 rounded-xl bg-[#F4F6FB] border border-[#E2E8F0] space-y-1">
                        <span className="font-mono font-bold text-[#F97316] uppercase tracking-wider block">
                          The Problem
                        </span>
                        <p className="text-[#334155] leading-relaxed">
                          {p.starProblem}
                        </p>
                      </div>
                      <div className="p-4 rounded-xl bg-[#F4F6FB] border border-[#E2E8F0] space-y-1">
                        <span className="font-mono font-bold text-[#0D9488] uppercase tracking-wider block">
                          The Architecture / Solution
                        </span>
                        <p className="text-[#334155] leading-relaxed">
                          {p.starSolution}
                        </p>
                      </div>
                      <div className="p-4 rounded-xl bg-[#F4F6FB] border border-[#E2E8F0] space-y-1">
                        <span className="font-mono font-bold text-[#4F46E5] uppercase tracking-wider block">
                          Quantified Impact
                        </span>
                        <p className="text-[#334155] leading-relaxed">
                          {p.starImpact}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Tab Content 2: Architecture Pipeline */}
                  {currentTab === 'arch' && (
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                      <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-[#4F46E5] uppercase tracking-wider">
                        <Network className="h-4 w-4" />
                        <span>System Architecture Blueprint</span>
                      </div>
                      <div className="font-mono text-xs text-[#1E293B] bg-white p-3 rounded-lg border border-slate-200 leading-relaxed overflow-x-auto">
                        {p.architectureFlow}
                      </div>
                    </div>
                  )}

                  {/* Tab Content 3: cURL / CLI Spec */}
                  {currentTab === 'curl' && (
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                      <div className="flex items-center justify-between font-mono text-[11px] font-bold text-[#4F46E5] uppercase tracking-wider">
                        <span className="flex items-center gap-1.5">
                          <Terminal className="h-4 w-4" />
                          <span>Terminal API Call Snippet</span>
                        </span>
                        <button 
                          onClick={() => copyToClipboard(p.curlExample, `curl-${p.id}`)}
                          className="flex items-center gap-1 text-[#4F46E5] hover:underline normal-case font-sans font-medium"
                        >
                          {copiedKey === `curl-${p.id}` ? <Check className="h-3.5 w-3.5 text-[#0D9488]" /> : <Copy className="h-3.5 w-3.5" />}
                          <span>{copiedKey === `curl-${p.id}` ? 'Copied!' : 'Copy cURL'}</span>
                        </button>
                      </div>
                      <pre className="font-mono text-[11px] text-[#1E293B] bg-white p-3 rounded-lg border border-slate-200 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                        {p.curlExample}
                      </pre>
                    </div>
                  )}

                  {/* Highlights List */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-[#1E293B] uppercase tracking-wider font-mono">
                      Key Technical Highlights
                    </span>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-[#334155]">
                      {p.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Tags & Links Footer */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#E2E8F0]">
                    <div className="flex flex-wrap gap-1.5">
                      {p.tech.map((t) => (
                        <span key={t} className="badge-sky rounded-md px-2 py-0.5 text-[11px] font-medium">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3">
                      <a 
                        href={p.github} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="inline-flex items-center gap-1.5 rounded-lg border border-[#CBD5E1] bg-[#FFFFFF] hover:bg-[#F4F6FB] px-3.5 py-1.5 text-xs font-semibold text-[#1E293B] shadow-sm transition-all"
                      >
                        <Github className="h-3.5 w-3.5" /> Repository
                      </a>
                      {p.demo && (
                        <a 
                          href={p.demo} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="inline-flex items-center gap-1.5 rounded-lg bg-[#4F46E5] hover:bg-[#4338CA] px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm transition-all"
                        >
                          <ExternalLink className="h-3.5 w-3.5" /> Live Demo / Docs
                        </a>
                      )}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </section>

        {/* 5. EXPERIENCE, EDUCATION & CERTIFICATIONS (TIMELINE) */}
        <section id="experience" className="space-y-8 pt-4 border-t border-[#E2E8F0]">
          <div className="flex items-center gap-2 text-[#4F46E5] text-xs font-mono uppercase tracking-wider font-semibold">
            <Briefcase className="h-4 w-4" /> Career Journey
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Research Experience & Education Timeline */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-2xl font-bold text-[#1E293B]">
                Experience &amp; Education
              </h2>

              <div className="relative pl-6 border-l-2 border-[#CBD5E1] space-y-8">
                
                {/* NIAMT Research Internship */}
                <div className="relative space-y-2">
                  <div className="absolute -left-[31px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-[#FFFFFF] bg-[#4F46E5]" />
                  <div className="flex flex-wrap items-baseline justify-between gap-1">
                    <h3 className="text-base font-bold text-[#1E293B]">
                      Summer Research Intern — Distributed Systems &amp; Cloud Infrastructure
                    </h3>
                    <span className="text-xs font-semibold text-[#4F46E5] font-mono">
                      Jun 2026 – Jul 2026
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-[#64748B]">
                    National Institute of Advanced Manufacturing Technology (NIAMT), Ranchi • Guided by Dr. Rahul Mishra
                  </div>
                  <p className="text-xs text-[#334155] leading-relaxed pt-1">
                    Architected and evaluated <strong>DVQ</strong>, an intelligent carbon-aware edge routing platform deployed across 7 AWS geographic regions. Formulated request routing via Lyapunov drift-plus-penalty optimization, achieving 35.87% carbon reduction with 0.0% SLA breach across all trials.
                  </p>
                </div>

                {/* University Education */}
                <div className="relative space-y-2">
                  <div className="absolute -left-[31px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-[#FFFFFF] bg-[#0D9488]" />
                  <div className="flex flex-wrap items-baseline justify-between gap-1">
                    <h3 className="text-base font-bold text-[#1E293B]">
                      B.Tech in Computer Science &amp; Engineering
                    </h3>
                    <span className="text-xs font-semibold text-[#0D9488] font-mono">
                      2024 – 2028 (Currently Pursuing)
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-[#64748B]">
                    Amity University Jharkhand • Ranchi, India
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-md bg-teal-50 border border-teal-200 px-2.5 py-1 text-xs font-bold text-[#0D9488]">
                    CGPA: 8.00 / 10.0
                  </div>
                  <p className="text-xs text-[#334155] leading-relaxed">
                    Core Coursework: Data Structures &amp; Algorithms, Object-Oriented Programming, Database Management Systems, Operating Systems, Computer Networks, Cloud Computing.
                  </p>
                </div>

                {/* High School */}
                <div className="relative space-y-2">
                  <div className="absolute -left-[31px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-[#FFFFFF] bg-[#64748B]" />
                  <div className="flex flex-wrap items-baseline justify-between gap-1">
                    <h3 className="text-sm font-bold text-[#1E293B]">
                      Senior Secondary (Class XII — PCM) &amp; Secondary (Class X)
                    </h3>
                    <span className="text-xs font-medium text-[#64748B] font-mono">
                      2020 – 2023
                    </span>
                  </div>
                  <div className="text-xs text-[#64748B]">
                    Sri Gurunanak Public School (CBSE)
                  </div>
                  <div className="flex gap-2 pt-0.5 text-xs">
                    <span className="font-semibold text-[#1E293B]">Class XII: 88.2%</span>
                    <span className="text-[#64748B]">•</span>
                    <span className="font-semibold text-[#1E293B]">Class X: 85.0%</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column: Verified Certifications */}
            <div className="lg:col-span-5 space-y-6">
              <h2 className="text-2xl font-bold text-[#1E293B]">
                Verified Certifications
              </h2>

              <div className="space-y-4">
                
                {/* 1. NPTEL Python for Data Science (IIT Madras - Topper 2%) */}
                <div className="portfolio-card p-4 space-y-2 border-l-4 border-l-[#4F46E5]">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 text-[#4F46E5]">
                      <Award className="h-5 w-5 shrink-0" />
                      <h3 className="text-sm font-bold text-[#1E293B]">
                        NPTEL — Python for Data Science
                      </h3>
                    </div>
                  </div>
                  <p className="text-xs text-[#64748B]">
                    Conducted by <strong>IIT Madras</strong>. Achieved <strong>84% Score</strong> with prestigious <strong>Top 2% (Topper Tag)</strong> &amp; Elite + Silver Medal distinction.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <span className="font-mono text-[10px] font-bold text-[#4F46E5] bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                      🏆 TOPPER 2% NATIONWIDE
                    </span>
                    <span className="font-mono text-[10px] font-bold text-[#0D9488] bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                      Score: 84% • Elite + Silver
                    </span>
                  </div>
                </div>

                {/* 2. NPTEL The Joy of Computing using Python (IIT Ropar - Prof. Sudarshan) */}
                <div className="portfolio-card p-4 space-y-2 border-l-4 border-l-[#0EA5E9]">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 text-[#0EA5E9]">
                      <Award className="h-5 w-5 shrink-0" />
                      <h3 className="text-sm font-bold text-[#1E293B]">
                        NPTEL — The Joy of Computing using Python
                      </h3>
                    </div>
                  </div>
                  <p className="text-xs text-[#64748B]">
                    Conducted by <strong>IIT Ropar (Prof. Sudarshan Iyengar)</strong>. Scored <strong>87% (Elite + Silver Medal / Silver Badge)</strong>. Rigorous algorithmic computation and Python foundations.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <span className="font-mono text-[10px] font-bold text-[#0EA5E9] bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                      Score: 87% • Silver Medal
                    </span>
                    <span className="font-mono text-[10px] font-medium text-[#64748B] bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                      IIT Ropar (Prof. Sudarshan)
                    </span>
                  </div>
                </div>

                {/* 3. Microsoft Azure DBA */}
                <div className="portfolio-card p-4 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 text-[#4F46E5]">
                      <Award className="h-5 w-5 shrink-0" />
                      <h3 className="text-sm font-bold text-[#1E293B]">
                        Microsoft Certified: Azure Database Administrator Associate
                      </h3>
                    </div>
                  </div>
                  <p className="text-xs text-[#64748B]">
                    Validates core cloud database administration, Azure SQL architecture, query optimization, security, and performance tuning.
                  </p>
                  <div className="font-mono text-[10px] font-semibold text-[#4F46E5] bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200 inline-block">
                    Credential ID: 647C0C2C5B35FA32
                  </div>
                </div>

                {/* 4. Microsoft AI SQL */}
                <div className="portfolio-card p-4 space-y-2">
                  <div className="flex items-center gap-2 text-[#0D9488]">
                    <Award className="h-5 w-5 shrink-0" />
                    <h3 className="text-sm font-bold text-[#1E293B]">
                      Microsoft Certified: Implement SQL Solutions Using AI Tools
                    </h3>
                  </div>
                  <p className="text-xs text-[#64748B]">
                    Advanced automated database design, intelligent query optimization, and AI-driven data modeling on Azure SQL.
                  </p>
                </div>

                {/* 5. Infosys Springboard */}
                <div className="portfolio-card p-4 space-y-2">
                  <div className="flex items-center gap-2 text-[#F97316]">
                    <Award className="h-5 w-5 shrink-0" />
                    <h3 className="text-sm font-bold text-[#1E293B]">
                      Infosys Springboard — Java Programming Fundamentals
                    </h3>
                  </div>
                  <p className="text-xs text-[#64748B]">
                    Comprehensive object-oriented programming, exception handling, data structures, and multithreading fundamentals.
                  </p>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* 6. CONTACT SECTION (NO HEAVY FORM - DIRECT CHANNELS) */}
        <section id="contact" className="space-y-6 pt-4 border-t border-[#E2E8F0]">
          <div className="flex items-center gap-2 text-[#4F46E5] text-xs font-mono uppercase tracking-wider font-semibold">
            <Mail className="h-4 w-4" /> Get In Touch
          </div>

          <div className="portfolio-card p-8 md:p-10 text-center max-w-3xl mx-auto space-y-6 bg-[#FFFFFF]">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B]">
                Let's Build Something Exceptional Together
              </h2>
              <p className="text-sm text-[#64748B] max-w-xl mx-auto">
                I am actively seeking Software Development Engineer (SDE) and Cloud Systems internship &amp; full-time opportunities. Reach out directly via email or LinkedIn.
              </p>
            </div>

            {/* Direct Channels */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a 
                href="mailto:rashmipd870@gmail.com" 
                className="inline-flex items-center gap-2 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-500/20 transition-all hover:-translate-y-0.5"
              >
                <Mail className="h-4 w-4" /> Email: rashmipd870@gmail.com
              </a>
              <a 
                href="https://linkedin.com/in/rashmi-pandey-590a22340" 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center gap-2 rounded-xl bg-[#0EA5E9] hover:bg-[#0284C7] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-sky-500/20 transition-all hover:-translate-y-0.5"
              >
                <Linkedin className="h-4 w-4" /> Connect on LinkedIn
              </a>
              <a 
                href="https://github.com/rashmipandey870" 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center gap-2 rounded-xl bg-[#FFFFFF] hover:bg-[#F4F6FB] border border-[#CBD5E1] px-6 py-3 text-sm font-semibold text-[#1E293B] shadow-sm transition-all hover:-translate-y-0.5"
              >
                <Github className="h-4 w-4" /> GitHub Profile
              </a>
            </div>

            <div className="pt-4 border-t border-[#E2E8F0] flex flex-wrap items-center justify-center gap-6 text-xs text-[#64748B]">
              <span>📍 Bokaro Steel City / Ranchi, Jharkhand, India</span>
              <span>•</span>
              <span>📞 +91 87093 68696</span>
              <span>•</span>
              <a 
                href={resumeUrl}
                download="Rashmi_Pandey_Resume.pdf"
                className="font-semibold text-[#4F46E5] hover:underline"
              >
                Download ATS Resume (PDF)
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* Footer (Zero Black - Soft Slate) */}
      <footer className="border-t border-[#E2E8F0] bg-[#F4F6FB] py-8 text-center text-xs text-[#64748B]">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Rashmi Pandey. Designed with semantic HTML5 &amp; zero-black architecture.</p>
          <div className="flex items-center gap-4 font-mono text-[11px]">
            <button onClick={() => setTerminalOpen(true)} className="hover:text-[#4F46E5] transition-colors">
              Open Dev Console (⌘K)
            </button>
            <span>•</span>
            <a href="#hero" className="hover:text-[#4F46E5] transition-colors">Back to Top ↑</a>
          </div>
        </div>
      </footer>

      {/* Resume Modal */}
      {resumeOpen && <ResumeModal onClose={() => setResumeOpen(false)} />}

      {/* ADVANCED TECH HACK: Dev Console / Terminal Modal */}
      {terminalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-[#FAFAF7] border border-slate-300 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            
            {/* Terminal Topbar */}
            <div className="bg-[#1E293B] px-4 py-3 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400 inline-block" />
                <span className="h-3 w-3 rounded-full bg-yellow-400 inline-block" />
                <span className="h-3 w-3 rounded-full bg-green-400 inline-block" />
                <span className="font-mono text-xs font-semibold ml-2 text-slate-200">
                  rashmi@cloud-systems-terminal:~ (DVQ v2.6.4)
                </span>
              </div>
              <button 
                onClick={() => setTerminalOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Terminal Body */}
            <div className="p-4 bg-[#0F172A] text-emerald-400 font-mono text-xs space-y-2 h-72 overflow-y-auto">
              {terminalOutput.map((line, i) => (
                <div key={i} className="whitespace-pre-wrap leading-relaxed">
                  {line}
                </div>
              ))}
            </div>

            {/* Quick Command Pills */}
            <div className="bg-[#1E293B]/90 p-2.5 flex flex-wrap gap-1.5 border-t border-slate-700">
              {['certs', 'metrics', 'projects', 'resume', 'contact', 'clear'].map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => handleCommand(cmd)}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-[#4F46E5] text-slate-300 hover:text-white text-[11px] font-mono transition-colors"
                >
                  ${cmd}
                </button>
              ))}
            </div>

            {/* Terminal Input Bar */}
            <form 
              onSubmit={(e) => { e.preventDefault(); handleCommand(); }}
              className="bg-[#1E293B] px-4 py-3 flex items-center gap-2 border-t border-slate-800 text-white"
            >
              <span className="text-[#0EA5E9] font-mono text-xs font-bold">$</span>
              <input 
                type="text" 
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                placeholder="type command (e.g. certs, metrics, resume)..."
                className="flex-1 bg-transparent border-none outline-none text-white font-mono text-xs placeholder:text-slate-500"
                autoFocus
              />
              <button type="submit" className="text-slate-400 hover:text-white">
                <CornerDownLeft className="h-4 w-4" />
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}

export default App;
