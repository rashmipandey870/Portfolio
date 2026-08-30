import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon, ChevronRight } from 'lucide-react';

function DeveloperTerminal() {
  const [history, setHistory] = useState([
    { type: 'system', content: 'Rashmi Pandey API Shell v1.0.0 (Type "help" for a list of endpoints)' },
    { type: 'system', content: 'System connection: SECURE. Node location: localhost:5000' }
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
            content: `Available commands:
  about           - Short background profile
  skills          - Retrieve core technical skills
  projects        - Overview of production work
  clear           - Wipe terminal logs
  curl <endpoint> - Fetch REST API datasets:
                    • curl /api/skills
                    • curl /api/projects
                    • curl /api/resume`
          });
          break;
        case 'about':
          newHistory.push({
            type: 'output',
            content: `Profile: RASHMI PANDEY
Objective: CSE undergraduate with production-grade experience in distributed systems, cloud infrastructure, and full-stack development. Seeking InStep projects in cloud computing or AI/ML.`
          });
          break;
        case 'skills':
          newHistory.push({
            type: 'output',
            content: `Languages      : Java, Python, C/C++, JavaScript, SQL
Frameworks     : Node.js, Express.js, React.js, REST APIs, XML
Databases      : MongoDB, MySQL, Oracle Developer
DevOps & Cloud : AWS (EC2, CloudWatch), Git, Android Studio`
          });
          break;
        case 'projects':
          newHistory.push({
            type: 'output',
            content: `[1] DVQ — Carbon-Aware Edge Routing System (2026)
    • Tech: Node.js, Express.js, MongoDB, AWS (7-region)
    • Impact: Balanced SLAs & real-time carbon intensity (up to 35% saved).
[2] Sports Fixture Management System (2025)
    • Tech: Android, Java, Node.js, Express.js, MongoDB
    • Impact: Round-robin/knockout bracket automation for 100+ participants.`
          });
          break;
        case 'clear':
          setHistory([]);
          setInput('');
          return;
        case 'curl':
          if (arg === '/api/skills') {
            newHistory.push({
              type: 'output',
              content: JSON.stringify({
                languages: ['Java', 'Python', 'C/C++', 'JavaScript', 'SQL'],
                backend: ['Node.js', 'Express.js', 'React.js', 'REST APIs'],
                databases: ['MongoDB', 'MySQL', 'Oracle Developer'],
                cloud: ['AWS EC2', 'AWS CloudWatch']
              }, null, 2)
            });
          } else if (arg === '/api/projects') {
            newHistory.push({
              type: 'output',
              content: JSON.stringify([
                {
                  id: 'dvq',
                  name: 'DVQ Routing Engine',
                  optimization: 'Lyapunov Drift-Plus-Penalty',
                  efficiency: '35.87% Carbon Saved',
                  decision_overhead: '61 microseconds'
                },
                {
                  id: 'sports-fixture',
                  name: 'Sports Fixture Manager',
                  stack: 'Android + Node.js + Express',
                  latency: 'sub-200ms'
                }
              ], null, 2)
            });
          } else if (arg === '/api/resume') {
            newHistory.push({
              type: 'output',
              content: JSON.stringify({
                name: 'Rashmi Pandey',
                education: 'Amity University Jharkhand (B.Tech CSE)',
                gpa: '8.00 / 10',
                recent_internship: 'Summer Research Intern at NIAMT (Completed Jun 1 - Jul 15, 2026)'
              }, null, 2)
            });
          } else {
            newHistory.push({
              type: 'output',
              content: `curl: URL ${arg || ''} not found. Try 'curl /api/skills'`
            });
          }
          break;
        default:
          newHistory.push({
            type: 'output',
            content: `shell: command not found: ${mainCmd}. Type "help" for active endpoints.`
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
    <div className="w-full rounded-xl overflow-hidden border border-white/10 bg-dark-900 shadow-2xl">
      {/* Window Header */}
      <div className="flex items-center justify-between bg-dark-950 px-4 py-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <TerminalIcon className="h-4 w-4 text-eco-500" />
          <span className="font-mono text-xs text-slate-400">developer@rashmi-pandey:~</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-eco-500/80" />
        </div>
      </div>

      {/* Terminal Screen */}
      <div className="h-[300px] overflow-y-auto p-6 font-mono text-xs leading-relaxed space-y-3 bg-dark-900/90 scroll-smooth">
        {history.map((line, idx) => (
          <div key={idx} className="whitespace-pre-wrap">
            {line.type === 'input' && (
              <div className="flex items-center text-eco-400">
                <ChevronRight className="h-3 w-3 mr-1" />
                <span>{line.content}</span>
              </div>
            )}
            {line.type === 'output' && (
              <div className="text-slate-300 pl-4">{line.content}</div>
            )}
            {line.type === 'system' && (
              <div className="text-white/40">{line.content}</div>
            )}
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Input Line */}
      <div className="flex items-center bg-dark-950/40 px-6 py-3 border-t border-white/5 font-mono text-xs text-eco-400">
        <ChevronRight className="h-4 w-4 mr-2" />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleCommand}
          className="w-full bg-transparent text-slate-100 focus:outline-none placeholder-slate-600 border-none p-0 focus:ring-0"
          placeholder="Query API or type command (e.g. 'help')"
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
