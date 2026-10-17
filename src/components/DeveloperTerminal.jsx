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
            content: `Available Commands:
  amazon          - SDE Candidate Evaluation Profile for Amazon Recruiters
  lp              - Alignment with Amazon Leadership Principles
  projects        - Overview of production & research architectures
  metrics         - Production metrics (latency, SLA adherence, carbon delta)
  skills          - CS core competencies & backend technologies
  clear           - Wipe terminal output
  curl <endpoint> - Query live simulated API routes:
                    • curl /api/aws
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
  1. Distributed Systems & AWS: Engineered Lyapunov-optimized multi-region routing across 7 AWS regions with sub-100µs decision latency.
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
   - Maintained 0.0% SLA breach guarantee during simulated AWS us-east-1 outages.
3. Invent and Simplify:
   - Formulated complex carbon-aware workload distribution into decoupled microservices.
   - Replaced manual tournament spreadsheets with automated combinatorial algorithms for 100+ athletes.
4. Deliver Results:
   - Built production-ready Jakarta EE WAR platform with 10+ relational migration stages; completed intensive NIAMT research internship.`
          });
          break;

        case 'skills':
          newHistory.push({
            type: 'output',
            content: `CORE COMPETENCIES:
Languages      : Java 17, Python 3, C/C++, JavaScript (ES6+), SQL
Cloud & DevOps : AWS (EC2, CloudWatch, Multi-Region), PM2, Git/GitHub, Docker Basics
Backend & Web  : Jakarta Servlets 6.0, JSP/JSTL, Node.js, Express.js, REST APIs, Retrofit 2
Databases      : MySQL, MongoDB, Relational Schema Normalization, ACID Transactions
Algorithms     : Lyapunov Optimization, Combinatorial Graphs, Priority Queues, Dynamic Scheduling`
          });
          break;

        case 'projects':
          newHistory.push({
            type: 'output',
            content: `PRODUCTION & RESEARCH WORKLOADS:
[1] DVQ — Carbon-Aware Distributed Cloud Workload Routing System (2026)
    • Tech: AWS (7-Region EC2/CloudWatch), Node.js Microservices, Lyapunov Engine, PM2
    • Impact: 35.87% carbon reduction, 61 µs decision latency, 0.0% SLA violation rate.
[2] EXAMORA — Enterprise Academic Assessment & PDF Parsing Engine
    • Tech: Jakarta Servlets 6.0, Tomcat 11, MySQL, BCrypt, Apache PDFBox, JSTL
    • Impact: 10+ staged database migrations, secure role-based auth, automated PDF question parsing.
[3] Sangathan — Tournament Fixture & Algorithmic Scheduling Platform
    • Tech: Android (Java), Retrofit 2, Node.js, Express, MongoDB
    • Impact: Automated round-robin & knockout bracket generation for 100+ participants, 80% admin overhead cut.`
          });
          break;

        case 'metrics':
          newHistory.push({
            type: 'output',
            content: `TELEMETRY & PRODUCTION BENCHMARKS:
• Median Routing Overhead : 61 microseconds
• Interactive Carbon Delta: -35.87% vs AWS ALB Baseline
• Real-Time Carbon Delta  : -30.28%
• SLA Violation Adherence : 0.00% (Strict target met across all trials)
• Active AWS Regions      : 7 (us-east-1, eu-west-1, us-west-2, ap-south-1, eu-central-1, ap-southeast-1, sa-east-1)
• REST API Response Latency: < 200ms`
          });
          break;

        case 'clear':
          setHistory([]);
          setInput('');
          return;

        case 'curl':
          if (arg === '/api/aws') {
            newHistory.push({
              type: 'output',
              content: JSON.stringify({
                status: 'HEALTHY',
                cluster: 'aws-multi-region-prod',
                regions_deployed: 7,
                routing_engine: 'Lyapunov Drift-Plus-Penalty (DVQ)',
                median_latency_us: 61,
                carbon_reduction_pct: 35.87,
                sla_violation_pct: 0.0
              }, null, 2)
            });
          } else if (arg === '/api/metrics') {
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
