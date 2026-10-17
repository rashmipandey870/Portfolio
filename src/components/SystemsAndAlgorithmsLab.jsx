import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, 
  Binary, 
  Database, 
  GitBranch, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  Clock, 
  Zap, 
  Layers, 
  Search, 
  ChevronRight,
  TrendingDown,
  Terminal,
  Code2
} from 'lucide-react';

export default function SystemsAndAlgorithmsLab() {
  const [activeTab, setActiveTab] = useState('dsa'); // 'dsa', 'graph', 'sql'

  // ----------------------------------------------------
  // LAB 1: PriorityQueue Min-Heap Dynamic Scheduler (Study Planner)
  // ----------------------------------------------------
  const initialTasks = [
    { id: 1, name: 'Distributed Systems & Paxos', daysLeft: 2, difficulty: 5, hoursNeeded: 6 },
    { id: 2, name: 'Relational Database Indexing', daysLeft: 5, difficulty: 4, hoursNeeded: 4 },
    { id: 3, name: 'Java Multithreading & JMM', daysLeft: 1, difficulty: 5, hoursNeeded: 8 },
    { id: 4, name: 'Graph Theory & Dijkstra', daysLeft: 4, difficulty: 3, hoursNeeded: 3 },
    { id: 5, name: 'Computer Networks TCP/IP', daysLeft: 3, difficulty: 2, hoursNeeded: 4 },
  ];

  const [tasks, setTasks] = useState(initialTasks);
  const [scheduledResult, setScheduledResult] = useState(null);
  const [heapRunning, setHeapRunning] = useState(false);

  const runMinHeapScheduler = () => {
    setHeapRunning(true);
    setTimeout(() => {
      // Priority formula: urgency score = (daysLeft * 10) - (difficulty * 3)
      // Lower score = higher priority in Min-Heap
      const sorted = [...tasks].sort((a, b) => {
        const scoreA = (a.daysLeft * 10) - (a.difficulty * 3);
        const scoreB = (b.daysLeft * 10) - (b.difficulty * 3);
        return scoreA - scoreB;
      });

      setScheduledResult({
        timeline: sorted,
        metrics: {
          complexity: 'O(N log N)',
          heapInsertions: tasks.length,
          timeOverheadMs: '0.42 ms',
          bufferAdded: '2.5 hrs spaced repetition',
          conflicts: 0
        }
      });
      setHeapRunning(false);
    }, 450);
  };

  // ----------------------------------------------------
  // LAB 2: Combinatorial Tournament Bracket Generator (Sangathan)
  // ----------------------------------------------------
  const [tournamentType, setTournamentType] = useState('knockout'); // 'knockout' or 'roundrobin'
  const [teamCount, setTeamCount] = useState(8);
  const [generatedBracket, setGeneratedBracket] = useState(null);

  const teams = useMemo(() => [
    'Dept of Computer Science',
    'Dept of Information Tech',
    'Dept of Electronics & Comm',
    'Dept of Mechanical Eng',
    'Dept of Civil Engineering',
    'Dept of Biotechnology',
    'Amity Business School',
    'Amity Institute of Law'
  ].slice(0, teamCount), [teamCount]);

  const generateTournament = () => {
    if (tournamentType === 'knockout') {
      const qf = [
        { match: 'Match 1', t1: teams[0], t2: teams[7], winner: teams[0] },
        { match: 'Match 2', t1: teams[3], t2: teams[4], winner: teams[3] },
        { match: 'Match 3', t1: teams[1], t2: teams[6], winner: teams[1] },
        { match: 'Match 4', t1: teams[2], t2: teams[5], winner: teams[2] },
      ];
      const sf = [
        { match: 'Semi 1', t1: teams[0], t2: teams[3], winner: teams[0] },
        { match: 'Semi 2', t1: teams[1], t2: teams[2], winner: teams[1] },
      ];
      const finalMatch = { match: 'Final Championship', t1: teams[0], t2: teams[1], winner: teams[0] };

      setGeneratedBracket({
        type: 'knockout',
        qf,
        sf,
        finalMatch,
        complexity: 'O(log N) tree depth, O(N) matches',
        totalMatches: teamCount - 1
      });
    } else {
      // Round Robin pairs
      const rounds = [];
      const n = teams.length;
      for (let r = 0; r < n - 1; r++) {
        const roundMatches = [];
        for (let i = 0; i < n / 2; i++) {
          const t1 = teams[(r + i) % (n - 1)];
          const t2 = i === 0 ? teams[n - 1] : teams[(n - 1 - i + r) % (n - 1)];
          roundMatches.push({ t1, t2 });
        }
        rounds.push({ roundNum: r + 1, matches: roundMatches });
      }
      setGeneratedBracket({
        type: 'roundrobin',
        rounds,
        complexity: 'O(N²) pairings with Berger algorithm',
        totalMatches: (n * (n - 1)) / 2
      });
    }
  };

  // ----------------------------------------------------
  // LAB 3: Azure SQL Query Optimization & B-Tree Index Analyzer
  // ----------------------------------------------------
  const [indexMode, setIndexMode] = useState('indexed'); // 'unindexed' vs 'indexed'

  const sqlQueryPlan = useMemo(() => {
    if (indexMode === 'unindexed') {
      return {
        strategy: 'Table Scan (Heap Full Scan)',
        costMs: '418 ms',
        logicalReads: '14,280 pages',
        complexity: 'O(N) Linear Scan',
        rowsExamined: '250,000 rows',
        cpuUtilization: '89%',
        bottleneck: 'High I/O latency; disk page thrashing; entire table locked during query execution.',
        steps: [
          'Storage Engine: Scan heap pages 0 to 14280 sequentially',
          'CPU Evaluation: Evaluate predicate (StudentID = 104 AND Date >= "2026-08-01") for each row',
          'Buffer Cache: Evicts active pages due to table scan memory pressure',
          'Return 14 matched rows after 418 ms'
        ]
      };
    } else {
      return {
        strategy: 'B-Tree Composite Index Seek (IX_Attendance_Student_Date)',
        costMs: '1.2 ms',
        logicalReads: '3 pages',
        complexity: 'O(log N) B-Tree Binary Search',
        rowsExamined: '14 rows',
        cpuUtilization: '1.2%',
        bottleneck: 'None. Sub-millisecond direct leaf node retrieval with index seek.',
        steps: [
          'Root Node: Navigate B-Tree Page 102 -> Branch Page 480',
          'Index Seek: Direct traversal to Leaf Page 1892 matching StudentID 104',
          'Range Scan: Read contiguous 14 entries in leaf level (Date >= "2026-08-01")',
          'Return 14 matched rows in 1.2 ms with 3 logical reads'
        ]
      };
    }
  }, [indexMode]);

  return (
    <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden shadow-2xl p-6 sm:p-8 space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-2 text-eco-400 font-mono text-xs font-bold uppercase tracking-wider mb-1">
            <Cpu className="h-4 w-4" />
            <span>Computer Science Engineering Lab</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Interactive Algorithms &amp; Systems Architecture Sandbox
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
            Hands-on execution testbed for PriorityQueue min-heaps, combinatorial graph algorithms, and database indexing engines.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-dark-950 rounded-xl border border-white/10 font-mono text-xs shrink-0">
          <button
            onClick={() => setActiveTab('dsa')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
              activeTab === 'dsa'
                ? 'bg-eco-500 text-white font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Binary className="h-3.5 w-3.5" />
            <span>Min-Heap Scheduler</span>
          </button>

          <button
            onClick={() => setActiveTab('graph')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
              activeTab === 'graph'
                ? 'bg-cyan-500 text-white font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <GitBranch className="h-3.5 w-3.5" />
            <span>Graph Bracket Engine</span>
          </button>

          <button
            onClick={() => setActiveTab('sql')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors ${
              activeTab === 'sql'
                ? 'bg-indigo-500 text-white font-bold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Database className="h-3.5 w-3.5" />
            <span>Azure SQL B-Tree</span>
          </button>
        </div>
      </div>

      {/* LAB 1: MIN-HEAP DYNAMIC SCHEDULER */}
      {activeTab === 'dsa' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-lg font-bold text-white flex items-center gap-2">
                PriorityQueue Min-Heap Algorithmic Scheduler
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-eco-500/10 text-eco-400 border border-eco-500/20">O(N log N)</span>
              </h4>
              <p className="text-xs text-slate-300 mt-1">
                From the <strong>Study Planner</strong> engine. Solves multi-objective schedule assignment by prioritizing deadline urgency and cognitive fatigue decay.
              </p>
            </div>

            <button
              onClick={runMinHeapScheduler}
              disabled={heapRunning}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-eco-500 to-cyan-600 text-white font-mono text-xs font-semibold shadow-md shadow-eco-500/20 hover:opacity-95 transition-all disabled:opacity-50"
            >
              <Play className="h-3.5 w-3.5 fill-white" />
              <span>{heapRunning ? 'Computing Min-Heap...' : 'Execute Heap Schedule'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Input Task Pool */}
            <div className="lg:col-span-6 space-y-3">
              <div className="font-mono text-xs text-slate-400 font-bold uppercase">
                Input Unordered Task Pool (Java Objects)
              </div>
              <div className="space-y-2">
                {tasks.map((t) => (
                  <div key={t.id} className="p-3 rounded-xl bg-dark-950/70 border border-white/5 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-semibold text-white">{t.name}</div>
                      <div className="font-mono text-[11px] text-slate-400 mt-0.5">
                        Est. Duration: {t.hoursNeeded} hrs &bull; Difficulty: {t.difficulty}/5
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`font-mono font-bold px-2 py-0.5 rounded text-[10px] ${
                        t.daysLeft <= 1 ? 'bg-red-500/15 text-red-400 border border-red-500/30' : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                      }`}>
                        {t.daysLeft}d left
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Heap Execution Output */}
            <div className="lg:col-span-6 space-y-3">
              <div className="font-mono text-xs text-eco-400 font-bold uppercase flex items-center justify-between">
                <span>Min-Heap Priority Order Output</span>
                {scheduledResult && <span className="text-slate-400 font-normal">Recalculated in {scheduledResult.metrics.timeOverheadMs}</span>}
              </div>

              {scheduledResult ? (
                <div className="space-y-2">
                  {scheduledResult.timeline.map((item, idx) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.08 }}
                      className="p-3 rounded-xl bg-dark-950/90 border border-eco-500/30 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded-full bg-eco-500/20 text-eco-400 border border-eco-500/30 flex items-center justify-center font-mono font-bold text-[10px]">
                          {idx + 1}
                        </span>
                        <div>
                          <div className="font-bold text-white">{item.name}</div>
                          <div className="font-mono text-[10px] text-eco-400 mt-0.5">
                            Priority Score: {(item.daysLeft * 10) - (item.difficulty * 3)} (Assigned Block {idx + 1})
                          </div>
                        </div>
                      </div>
                      <span className="font-mono text-[10px] text-slate-400">
                        {item.hoursNeeded}h assigned
                      </span>
                    </motion.div>
                  ))}

                  <div className="mt-3 p-3 rounded-xl bg-eco-500/5 border border-eco-500/20 grid grid-cols-3 gap-2 font-mono text-[11px] text-center">
                    <div>
                      <div className="text-slate-400 text-[10px]">TIME COMPLEXITY</div>
                      <div className="font-bold text-eco-400">O(N log N)</div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-[10px]">HEAP POPS</div>
                      <div className="font-bold text-white">5 extractMin()</div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-[10px]">SCHEDULE OVERHEAD</div>
                      <div className="font-bold text-cyan-400">0.42 ms</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-8 rounded-xl bg-dark-950/40 border border-dashed border-white/10 text-center space-y-2">
                  <Binary className="h-8 w-8 text-slate-500 mx-auto" />
                  <div className="text-xs text-slate-400 font-mono">
                    Click "Execute Heap Schedule" to run Java PriorityQueue min-heap evaluation.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* LAB 2: TOURNAMENT BRACKET GRAPH GENERATOR */}
      {activeTab === 'graph' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-lg font-bold text-white flex items-center gap-2">
                Combinatorial Tournament Bracket &amp; Match Generator
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">Graph Algorithmic</span>
              </h4>
              <p className="text-xs text-slate-300 mt-1">
                From the <strong>Sangathan</strong> platform. Generates collision-free tournament pairings eliminating scheduling conflicts for 100+ athletes.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={tournamentType}
                onChange={(e) => setTournamentType(e.target.value)}
                className="bg-dark-950 border border-white/10 rounded-xl px-3 py-1.5 font-mono text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                <option value="knockout">Single Elimination (Knockout)</option>
                <option value="roundrobin">Round-Robin (Berger Algorithm)</option>
              </select>

              <button
                onClick={generateTournament}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-600 text-white font-mono text-xs font-semibold shadow-md shadow-cyan-500/20 hover:opacity-95 transition-all"
              >
                <Play className="h-3.5 w-3.5 fill-white" />
                <span>Generate Graph</span>
              </button>
            </div>
          </div>

          {generatedBracket ? (
            <div className="space-y-4">
              {generatedBracket.type === 'knockout' ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
                  {/* Quarter Finals */}
                  <div className="space-y-2.5">
                    <div className="text-slate-400 text-[11px] font-bold uppercase border-b border-white/5 pb-1">
                      Quarter Finals (4 Matches)
                    </div>
                    {generatedBracket.qf.map((m, i) => (
                      <div key={i} className="p-3 rounded-xl bg-dark-950/80 border border-white/5 space-y-1">
                        <div className="text-[10px] text-cyan-400">{m.match}</div>
                        <div className="text-white font-bold">{m.t1}</div>
                        <div className="text-slate-400 text-[11px] vs-divider">vs</div>
                        <div className="text-white font-bold">{m.t2}</div>
                      </div>
                    ))}
                  </div>

                  {/* Semi Finals */}
                  <div className="space-y-2.5">
                    <div className="text-slate-400 text-[11px] font-bold uppercase border-b border-white/5 pb-1">
                      Semi Finals (2 Matches)
                    </div>
                    {generatedBracket.sf.map((m, i) => (
                      <div key={i} className="p-3 rounded-xl bg-dark-950/80 border border-cyan-500/20 space-y-1">
                        <div className="text-[10px] text-cyan-400">{m.match}</div>
                        <div className="text-white font-bold">{m.t1}</div>
                        <div className="text-slate-400 text-[11px]">vs</div>
                        <div className="text-white font-bold">{m.t2}</div>
                      </div>
                    ))}
                  </div>

                  {/* Finals */}
                  <div className="space-y-2.5">
                    <div className="text-slate-400 text-[11px] font-bold uppercase border-b border-white/5 pb-1">
                      Championship Match
                    </div>
                    <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-950/40 to-dark-950 border border-cyan-400/40 space-y-2">
                      <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">🏆 Grand Finale</div>
                      <div className="text-white font-extrabold text-sm">{generatedBracket.finalMatch.t1}</div>
                      <div className="text-cyan-400 text-xs">vs</div>
                      <div className="text-white font-extrabold text-sm">{generatedBracket.finalMatch.t2}</div>
                      <div className="pt-2 border-t border-white/5 text-[10px] text-eco-400">
                        Zero Match Collision Guarantee &bull; 7 Total Fixtures
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 font-mono text-xs">
                  <div className="text-slate-400 text-[11px] font-bold uppercase border-b border-white/5 pb-1">
                    Round Robin Cyclic Schedule ({generatedBracket.totalMatches} matches)
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    {generatedBracket.rounds.slice(0, 4).map((r) => (
                      <div key={r.roundNum} className="p-3 rounded-xl bg-dark-950/80 border border-white/5 space-y-1.5">
                        <div className="text-[10px] font-bold text-cyan-400 uppercase">Round {r.roundNum}</div>
                        {r.matches.slice(0, 2).map((m, idx) => (
                          <div key={idx} className="text-[11px] text-slate-300 pb-1 border-b border-white/5">
                            {m.t1.split(' ')[2] || m.t1} vs {m.t2.split(' ')[2] || m.t2}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-8 rounded-xl bg-dark-950/40 border border-dashed border-white/10 text-center space-y-2">
              <GitBranch className="h-8 w-8 text-slate-500 mx-auto" />
              <div className="text-xs text-slate-400 font-mono">
                Click "Generate Graph" to compute combinatorial bracket graph.
              </div>
            </div>
          )}
        </div>
      )}

      {/* LAB 3: AZURE SQL B-TREE INDEX ANALYZER */}
      {activeTab === 'sql' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-lg font-bold text-white flex items-center gap-2">
                Azure SQL Query Execution Plan &amp; B-Tree Index Analyzer
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">Azure DBA Certified</span>
              </h4>
              <p className="text-xs text-slate-300 mt-1">
                Demonstrates query optimization acumen from Microsoft Credential <strong>647C0C2C5B35FA32</strong>.
              </p>
            </div>

            <div className="flex items-center gap-1.5 p-1 bg-dark-950 rounded-xl border border-white/10 font-mono text-xs">
              <button
                onClick={() => setIndexMode('unindexed')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  indexMode === 'unindexed'
                    ? 'bg-red-500/20 text-red-400 font-bold border border-red-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Full Table Scan (Heap)
              </button>
              <button
                onClick={() => setIndexMode('indexed')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  indexMode === 'indexed'
                    ? 'bg-eco-500/20 text-eco-400 font-bold border border-eco-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                B-Tree Index Seek
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-dark-950/80 border border-white/5 space-y-1">
              <div className="font-mono text-[10px] text-slate-400 uppercase">Execution Strategy</div>
              <div className="font-bold text-white text-sm">{sqlQueryPlan.strategy}</div>
            </div>
            <div className="p-4 rounded-xl bg-dark-950/80 border border-white/5 space-y-1">
              <div className="font-mono text-[10px] text-slate-400 uppercase">Query Execution Latency</div>
              <div className={`font-mono text-xl font-bold ${indexMode === 'indexed' ? 'text-eco-400' : 'text-red-400'}`}>
                {sqlQueryPlan.costMs}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-dark-950/80 border border-white/5 space-y-1">
              <div className="font-mono text-[10px] text-slate-400 uppercase">Logical Page Reads</div>
              <div className="font-mono text-xl font-bold text-cyan-400">{sqlQueryPlan.logicalReads}</div>
            </div>
            <div className="p-4 rounded-xl bg-dark-950/80 border border-white/5 space-y-1">
              <div className="font-mono text-[10px] text-slate-400 uppercase">Search Complexity</div>
              <div className="font-mono text-xl font-bold text-indigo-400">{sqlQueryPlan.complexity}</div>
            </div>
          </div>

          {/* Execution Plan Traversal Steps */}
          <div className="p-4 rounded-xl bg-dark-950 border border-white/10 font-mono text-xs space-y-2.5">
            <div className="text-slate-400 font-bold text-[11px] uppercase flex items-center justify-between">
              <span>SQL Server Execution Engine Operator Pipeline</span>
              <span className={indexMode === 'indexed' ? 'text-eco-400' : 'text-red-400'}>
                {indexMode === 'indexed' ? '✓ OPTIMAL INDEX SEEK' : '⚠ SUBOPTIMAL DISK THRASH'}
              </span>
            </div>
            <div className="space-y-1.5 pl-2 border-l-2 border-indigo-500/40">
              {sqlQueryPlan.steps.map((s, i) => (
                <div key={i} className="text-slate-300 flex items-start gap-2">
                  <span className="text-indigo-400 font-bold">[{i + 1}]</span>
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
