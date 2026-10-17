import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, ChevronRight } from 'lucide-react';

function DeveloperTerminal() {
  const [history, setHistory] = useState([
    { type: 'system', content: 'Rashmi Pandey Systems Terminal v2.4.0-aws (Type "help" to explore endpoints)' },
    { type: 'system', content: 'Connected to AWS PM2 Microservices Cluster | Region: multi-region (7 nodes)' }
  ]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalEndRef = useRef(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cleanInput = input.trim();
      if (!cleanInput) return;

      const newHistory = [...history, { type: 'input', content: cleanInput }];
      const cmdParts = cleanInput.toLowerCase().split(' ');
      const mainCmd = cmdParts[0];
      const arg = cmdParts[1];

      setCmdHistory(prev => [cleanInput, ...prev]);
      setHistoryIndex(-1);

      switch (mainCmd) {
        case 'help':
          newHistory.push({
            type: 'output',
            content: `Available Developer Commands:
  amazon          - SDE Candidate Evaluation Profile for Amazon Recruiters
  lp              - Alignment with Amazon Leadership Principles
  projects        - Overview of 4 verified engineering systems & confidential research
  dsa             - Algorithmic architectures (Min-Heap, Graph Pairing, Complexity)
  jvm             - Java 17 & JVM Internals (Memory Model, JIT, Concurrency, GC)
  sql             - Azure SQL & Relational Database Engineering (B-Tree, ACID, Tuning)
  certs           - Verified Credentials (NPTEL Top 2%, Silver Badge, Azure DBA)
  metrics         - Benchmarks (sub-100µs decision latency, SLA adherence)
  skills          - CS core competencies & backend technologies
  clear           - Wipe terminal output
  curl <endpoint> - Query live simulated API routes:
                    • curl /api/metrics
                    • curl /api/projects
                    • curl /api/skills`
          });
          break;

        case 'amazon':
          newHistory.push({
            type: 'output',
            content: `[AMAZON SDE CANDIDATE HIGHLIGHTS]
• Candidate: Rashmi Pandey (B.Tech CSE @ Amity University, CGPA 8.00/10)
• Target: Software Development Engineer (SDE / SDE Intern)
• Core Strengths:
  1. Distributed Systems & AWS: Researched multi-region routing across 7 AWS regions with sub-100µs decision latency & 0.0% SLA breach.
  2. Systems Programming & Java: Deep OOP, Jakarta Servlet 6.0, Tomcat 11, multi-threading, connection pooling, ACID transaction isolation.
  3. Algorithmic Rigor: Combinatorial tournament scheduling (round-robin + knockout graph generation) & constraint satisfaction.
  4. Operational Ownership: Zero SLA violation rate under regional grid chaos tests.`
          });
          break;

        case 'lp':
          newHistory.push({
            type: 'output',
            content: `[AMAZON LEADERSHIP PRINCIPLES ALIGNMENT]
1. Dive Deep:
   - Measured median routing overhead at 61µs; profiled microservice bottlenecks and network round-trip time.
2. Customer Obsession & Operational Excellence:
   - Maintained 0.0% SLA breach guarantee during simulated AWS regional failovers.
3. Invent and Simplify:
   - Formulated decoupled edge routing microservices; replaced manual tournament spreadsheets with automated graph algorithms for 100+ athletes.
4. Deliver Results:
   - Built production-ready Jakarta EE WAR platform with 10+ relational migration stages; completed intensive NIAMT research internship.`
          });
          break;

        case 'dsa':
          newHistory.push({
            type: 'output',
            content: `[DATA STRUCTURES & ALGORITHMS IMPLEMENTATION]
1. PriorityQueue Min-Heap (Study Planner):
   - Custom Comparator prioritizing deadline urgency and cognitive decay.
   - Time Complexity: O(N log N) for N task block allocations; O(1) peekMin().
2. Combinatorial Graph Match Generator (Sangathan):
   - Cyclic graph pairing (Berger algorithm) for round-robin tournaments.
   - Full binary tree generation for single-elimination knockout brackets (O(log N) depth).
3. Greedy Constraint Satisfaction:
   - Dynamic time-block assignment with spaced repetition buffers.`
          });
          break;

        case 'jvm':
          newHistory.push({
            type: 'output',
            content: `[JAVA 17 & JVM RUNTIME ARCHITECTURE]
• Memory Model (JMM): Eden, Survivor (S0/S1), Tenured (Old Gen), Metaspace.
• Garbage Collection: Tuned for low-pause G1GC; optimized heap allocation rates.
• Concurrency: Thread pools (ExecutorService), ReentrantLock, volatile memory fences.
• Enterprise: Native Jakarta Servlets 6.0, Apache Tomcat 11, HikariCP JDBC connection pooling, BCrypt salting.`
          });
          break;

        case 'sql':
          newHistory.push({
            type: 'output',
            content: `[DATABASE ENGINEERING & AZURE DBA SPECIALIZATION]
• Credential: Microsoft Certified: Azure Database Administrator Associate (ID: 647C0C2C5B35FA32)
• Indexing: B-Tree Clustered vs Non-Clustered Composite Indexes (IX_Student_Date).
• Query Execution: Replaced 418ms O(N) Table Scans with 1.2ms O(log N) Index Seeks (3 logical reads).
• Integrity: 3NF Relational normalization, foreign key cascade constraints, ACID transaction isolation (Read Committed, Repeatable Read).`
          });
          break;

        case 'certs':
          newHistory.push({
            type: 'output',
            content: `[VERIFIED CREDENTIALS VAULT]
1. NPTEL Python for Data Science (IIT Madras)
   • Score: 84% • TOPPER 2% NATIONWIDE (Elite + Silver Medal)
2. NPTEL The Joy of Computing using Python (IIT Ropar - Prof. Sudarshan Iyengar)
   • Score: 87% • Silver Badge (Elite + Silver Medal)
3. Microsoft Certified: Azure Database Administrator Associate
   • Credential ID: 647C0C2C5B35FA32
4. Microsoft Certified: Implement SQL Solutions Using AI-Assisted Tools
5. Infosys Springboard: Java Programming Fundamentals`
          });
          break;

        case 'skills':
          newHistory.push({
            type: 'output',
            content: `CORE COMPETENCIES:
Languages      : Java 17, Python 3, C, JavaScript (ES6+), SQL, Bash
Cloud & DevOps : AWS (EC2, CloudWatch, Multi-Region), Microsoft Azure, PM2, Git/GitHub, Docker Basics
Backend & Web  : Jakarta Servlets 6.0, Tomcat 11, Node.js, Express.js, REST APIs, Retrofit 2
Databases      : Azure SQL, MySQL (ACID, Normalized Schemas), MongoDB Atlas, Mongoose
Algorithms     : PriorityQueue Min-Heaps, Combinatorial Graph Pairing, Greedy Scheduling`
          });
          break;

        case 'projects':
          newHistory.push({
            type: 'output',
            content: `VERIFIED CODEBASES & CONFIDENTIAL RESEARCH:
[1] DVQ — Cloud Workload Routing Optimization (NIAMT Summer Research)
    • Tech: AWS (7-Region EC2/CloudWatch), Node.js Microservices, PM2
    • Status: [🔒 Confidential Academic Research - Under Peer Review / Source Protected]
    • Metrics: Sub-100µs decision latency, 0.0% SLA breach guarantee across all trials.
[2] EXAMORA — Enterprise Academic Assessment & PDF Parsing Engine
    • Tech: Java 17, Jakarta Servlets 6.0, Tomcat 11, MySQL ACID, Apache PDFBox
    • Status: Active GitHub Repository (61 commits) • github.com/rashmipandey870/EXAMORA
[3] Sangathan — Tournament Fixture & Algorithmic Scheduling Platform
    • Tech: Android Java, Retrofit 2, Node.js REST, MongoDB Atlas
    • Status: Active Repositories • Mobile & Backend
[4] Study Planner — Dynamic Constraint-Based Scheduling Algorithm
    • Tech: Java 17, PriorityQueue Min-Heap, Greedy Heuristics
    • Status: Active Repository • github.com/rashmipandey870/Study-Planner-Scheduling-Algorithm-`
          });
          break;

        case 'metrics':
          newHistory.push({
            type: 'output',
            content: `PRODUCTION & ALGORITHMIC BENCHMARKS:
• Median Routing Overhead : 61 microseconds (AWS Multi-Region)
• SLA Violation Adherence : 0.00% (Strict target met across all trials)
• Min-Heap Schedule Time : 0.42 milliseconds (O(N log N))
• B-Tree Index Seek Time  : 1.2 milliseconds (99.6% speedup vs Table Scan)
• Total GitHub Commits    : 1,200+ verified contributions`
          });
          break;

        case 'clear':
          setHistory([]);
          setInput('');
          return;

        case 'curl':
          if (arg === '/api/metrics') {
            newHistory.push({
              type: 'output',
              content: JSON.stringify({
                interactive_workload_reduction: '35.87%',
                realtime_workload_reduction: '30.28%',
                batch_workload_reduction: '16.58%',
                decision_latency_overhead: '61 µs',
                sla_violation_rate: '0.00%',
                uptime: '99.98%'
              }, null, 2)
            });
          } else if (arg === '/api/projects') {
            newHistory.push({
              type: 'output',
              content: JSON.stringify([
                {
                  id: 'dvq',
                  title: 'DVQ Cloud Workload Routing System',
                  stack: ['AWS', 'Node.js Microservices', 'Lyapunov Engine', 'PM2'],
                  metrics: '35.87% Carbon Reduction | 61µs Latency'
                },
                {
                  id: 'examora',
                  title: 'EXAMORA Enterprise Academic Engine',
                  stack: ['Jakarta Servlets', 'Tomcat 11', 'MySQL', 'Apache PDFBox'],
                  metrics: '10+ Schema Migrations | BCrypt Auth'
                },
                {
                  id: 'sangathan',
                  title: 'Sports Tournament Management Platform',
                  stack: ['Android Java', 'Node.js', 'MongoDB', 'Retrofit'],
                  metrics: '100+ Participants | 80% Admin Overhead Cut'
                }
              ], null, 2)
            });
          } else if (arg === '/api/skills') {
            newHistory.push({
              type: 'output',
              content: JSON.stringify({
                languages: ['Java', 'Python', 'C/C++', 'JavaScript', 'SQL'],
                backend: ['Jakarta Servlets 6.0', 'Tomcat', 'Node.js', 'Express.js', 'REST APIs'],
                databases: ['MySQL (ACID, Normalization)', 'MongoDB'],
                cloud_devops: ['AWS EC2', 'AWS CloudWatch', 'PM2', 'Git/GitHub']
              }, null, 2)
            });
          } else {
            newHistory.push({
              type: 'output',
              content: `curl: endpoint "${arg || ''}" not found. Try 'curl /api/aws' or 'curl /api/metrics'`
            });
          }
          break;

        default:
          newHistory.push({
            type: 'output',
            content: `shell: command not found: "${mainCmd}". Type "help" for valid commands or "amazon" for recruiter overview.`
          });
      }

      setHistory(newHistory);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < cmdHistory.length - 1) {
        const nextIdx = historyIndex + 1;
        setHistoryIndex(nextIdx);
        setInput(cmdHistory[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInput(cmdHistory[nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-white/10 bg-dark-900 shadow-2xl">
      {/* Window Header */}
      <div className="flex items-center justify-between bg-dark-950 px-4 py-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <TerminalIcon className="h-4 w-4 text-eco-400" />
          <span className="font-mono text-xs text-slate-300 font-semibold">
            developer@rashmi-pandey:~/systems-console
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] text-slate-500 mr-2 hidden sm:inline">bash (x86_64-pc-linux-gnu)</span>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-eco-500/80" />
          </div>
        </div>
      </div>

      {/* Terminal Screen */}
      <div className="h-[320px] overflow-y-auto p-6 font-mono text-xs leading-relaxed space-y-3 bg-dark-950/90 scroll-smooth">
        {history.map((line, idx) => (
          <div key={idx} className="whitespace-pre-wrap">
            {line.type === 'input' && (
              <div className="flex items-center text-eco-400 font-semibold">
                <ChevronRight className="h-3.5 w-3.5 mr-1" />
                <span>{line.content}</span>
              </div>
            )}
            {line.type === 'output' && (
              <div className="text-slate-300 pl-4 border-l-2 border-white/10 py-0.5">{line.content}</div>
            )}
            {line.type === 'system' && (
              <div className="text-slate-500 italic">{line.content}</div>
            )}
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Input Line */}
      <div className="flex items-center bg-dark-950 px-6 py-3 border-t border-white/5 font-mono text-xs text-eco-400">
        <ChevronRight className="h-4 w-4 mr-2 text-cyan-400" />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleCommand}
          className="w-full bg-transparent text-slate-100 focus:outline-none placeholder-slate-600 border-none p-0 focus:ring-0"
          placeholder="Type command: 'amazon', 'lp', 'metrics', 'projects' or 'curl /api/aws'..."
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
      </div>
    </div>
  );
}

export default DeveloperTerminal;
