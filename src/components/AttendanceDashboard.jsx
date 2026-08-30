import React, { useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { UserCheck, Users, BarChart3, Search, AlertTriangle, CheckCircle, Save } from 'lucide-react';
import confetti from 'canvas-confetti';

const mockStudents = [
  { rollNo: '101', name: 'Bhavya Gupta', status: 'Present', history: [
    { date: '2026-08-25', status: 'Present' },
    { date: '2026-08-26', status: 'Present' },
    { date: '2026-08-27', status: 'Absent' },
    { date: '2026-08-28', status: 'Present' },
    { date: '2026-08-31', status: 'Present' },
  ], percentage: 92 },
  { rollNo: '102', name: 'Devansh Dixit', status: 'Absent', history: [
    { date: '2026-08-25', status: 'Absent' },
    { date: '2026-08-26', status: 'Present' },
    { date: '2026-08-27', status: 'Absent' },
    { date: '2026-08-28', status: 'Present' },
    { date: '2026-08-31', status: 'Absent' },
  ], percentage: 65 }, // Under 75% -> At Risk!
  { rollNo: '103', name: 'Rashmi Pandey', status: 'Present', history: [
    { date: '2026-08-25', status: 'Present' },
    { date: '2026-08-26', status: 'Present' },
    { date: '2026-08-27', status: 'Present' },
    { date: '2026-08-28', status: 'Present' },
    { date: '2026-08-31', status: 'Present' },
  ], percentage: 98 },
  { rollNo: '104', name: 'Anjali Singh', status: 'Present', history: [
    { date: '2026-08-25', status: 'Present' },
    { date: '2026-08-26', status: 'Absent' },
    { date: '2026-08-27', status: 'Present' },
    { date: '2026-08-28', status: 'Present' },
    { date: '2026-08-31', status: 'Present' },
  ], percentage: 84 },
];

function AttendanceDashboard() {
  const [activeTab, setActiveTab] = useState('mark');
  const [className, setClassName] = useState('Class 10');
  const [section, setSection] = useState('A');
  const [date, setDate] = useState('2026-08-31');
  const [students, setStudents] = useState(mockStudents);
  const [lookupRoll, setLookupRoll] = useState('');
  const [searchedStudent, setSearchedStudent] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleStatusChange = (rollNo, newStatus) => {
    setStudents(prev => prev.map(s => s.rollNo === rollNo ? { ...s, status: newStatus } : s));
  };

  const handleSaveAttendance = (e) => {
    e.preventDefault();
    setSaveSuccess(true);
    confetti({
      particleCount: 100,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#10b981', '#06b6d4']
    });
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleLookup = (e) => {
    e.preventDefault();
    const found = students.find(s => s.rollNo === lookupRoll.trim());
    setSearchedStudent(found || 'not_found');
  };

  // Compute analytics stats
  const totalStudents = students.length;
  const presentCount = students.filter(s => s.status === 'Present').length;
  const avgAttendanceRate = Math.round((presentCount / totalStudents) * 100);
  const lowAttendanceList = students.filter(s => s.percentage < 75);

  const chartData = [
    { name: 'Present', value: presentCount },
    { name: 'Absent', value: totalStudents - presentCount },
  ];

  return (
    <div className="w-full glass-panel rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
      
      {/* Top Banner tabs */}
      <div className="flex border-b border-white/5 bg-dark-950 px-6 py-3 justify-between items-center flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <UserCheck className="h-5 w-5 text-eco-500" />
          <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">Attendance Management Dashboard</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('mark')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold font-mono uppercase transition-all flex items-center gap-1.5 ${
              activeTab === 'mark' ? 'bg-eco-500 text-dark-950 shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <UserCheck className="h-3.5 w-3.5" /> Register
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold font-mono uppercase transition-all flex items-center gap-1.5 ${
              activeTab === 'analytics' ? 'bg-eco-500 text-dark-950 shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <BarChart3 className="h-3.5 w-3.5" /> Analytics
          </button>
          <button
            onClick={() => setActiveTab('lookup')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold font-mono uppercase transition-all flex items-center gap-1.5 ${
              activeTab === 'lookup' ? 'bg-eco-500 text-dark-950 shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Search className="h-3.5 w-3.5" /> Student Lookup
          </button>
        </div>
      </div>

      <div className="p-6 sm:p-8">
        {/* TAB 1: MARK ATTENDANCE */}
        {activeTab === 'mark' && (
          <form onSubmit={handleSaveAttendance} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-dark-950/40 p-4 rounded-xl border border-white/5">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 font-mono">Class</label>
                <select 
                  value={className} 
                  onChange={(e) => setClassName(e.target.value)}
                  className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-eco-500"
                >
                  <option>Class 10</option>
                  <option>Class 11</option>
                  <option>Class 12</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 font-mono">Section</label>
                <select 
                  value={section} 
                  onChange={(e) => setSection(e.target.value)}
                  className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-eco-500"
                >
                  <option>A</option>
                  <option>B</option>
                  <option>C</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 font-mono">Date</label>
                <input 
                  type="date" 
                  value={date} 
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-eco-500"
                />
              </div>
            </div>

            {/* Student Table */}
            <div className="overflow-x-auto rounded-xl border border-white/5">
              <table className="w-full text-left font-mono text-xs border-collapse">
                <thead>
                  <tr className="bg-dark-950/60 text-slate-400 border-b border-white/5">
                    <th className="px-6 py-4 font-bold">Roll No</th>
                    <th className="px-6 py-4 font-bold">Student Name</th>
                    <th className="px-6 py-4 font-bold text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {students.map((s) => (
                    <tr key={s.rollNo} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-400">{s.rollNo}</td>
                      <td className="px-6 py-4 font-bold text-white">{s.name}</td>
                      <td className="px-6 py-4 text-center">
                        <div className="inline-flex rounded-lg p-1 bg-dark-900 border border-white/5">
                          <button
                            type="button"
                            onClick={() => handleStatusChange(s.rollNo, 'Present')}
                            className={`px-3 py-1 rounded text-[10px] font-bold uppercase transition-all ${
                              s.status === 'Present' 
                                ? 'bg-eco-500 text-dark-950 font-bold' 
                                : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            Present
                          </button>
                          <button
                            type="button"
                            onClick={() => handleStatusChange(s.rollNo, 'Absent')}
                            className={`px-3 py-1 rounded text-[10px] font-bold uppercase transition-all ${
                              s.status === 'Absent' 
                                ? 'bg-red-500 text-dark-950 font-bold' 
                                : 'text-slate-400 hover:text-white'
                            }`}
                          >
                            Absent
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center flex-wrap gap-4">
              {saveSuccess ? (
                <div className="text-xs font-bold text-eco-400 flex items-center gap-1.5 animate-pulse">
                  <CheckCircle className="h-4 w-4 text-eco-500" /> Attendance saved to MongoDB database!
                </div>
              ) : (
                <div className="text-[10px] text-slate-500 font-mono italic">
                  * Attendance indices enforce className-section-date schema restrictions.
                </div>
              )}
              <button 
                type="submit" 
                className="inline-flex items-center gap-2 rounded-lg bg-eco-500 hover:bg-eco-400 px-6 py-3 font-bold text-dark-950 shadow-md transition-all font-mono text-xs uppercase"
              >
                <Save className="h-4 w-4" /> Save Attendance
              </button>
            </div>
          </form>
        )}

        {/* TAB 2: CLASS ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="glass-panel p-5 rounded-xl border border-white/5 space-y-2">
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500">Average Attendance</span>
                <div className="text-3xl font-extrabold text-eco-400">{avgAttendanceRate}%</div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                  <div className="bg-eco-500 h-full rounded-full" style={{ width: `${avgAttendanceRate}%` }} />
                </div>
              </div>

              <div className="glass-panel p-5 rounded-xl border border-white/5 space-y-2">
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500">Total Conducted Days</span>
                <div className="text-3xl font-extrabold text-white">5 Days</div>
                <p className="text-[10px] text-slate-500 font-mono">Conducted dates loaded from index query</p>
              </div>

              <div className="glass-panel p-5 rounded-xl border border-white/5 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500">Daily Ratios</span>
                  <div className="text-xs font-bold text-white/90 mt-1">Present: {presentCount} | Absent: {totalStudents - presentCount}</div>
                </div>
                <div className="h-6 w-full mt-3 rounded overflow-hidden flex">
                  <div className="bg-eco-500 h-full" style={{ width: `${(presentCount/totalStudents)*100}%` }} />
                  <div className="bg-red-500 h-full" style={{ width: `${((totalStudents - presentCount)/totalStudents)*100}%` }} />
                </div>
              </div>

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Risk Alert Widget */}
              <div className="lg:col-span-5 glass-panel p-5 rounded-xl border border-red-500/10 space-y-4">
                <h4 className="font-mono text-xs font-bold text-red-400 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" /> At Risk Students (&lt; 75%)
                </h4>
                {lowAttendanceList.length > 0 ? (
                  <div className="space-y-3">
                    {lowAttendanceList.map(s => (
                      <div key={s.rollNo} className="flex justify-between items-center bg-red-500/5 border border-red-500/10 rounded px-3 py-2 text-xs font-mono">
                        <div>
                          <span className="text-slate-400">Roll {s.rollNo}:</span> <span className="font-bold text-white">{s.name}</span>
                        </div>
                        <span className="font-bold text-red-400">{s.percentage}%</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 font-mono">All student ratios are within safe boundaries.</p>
                )}
              </div>

              {/* Class Chart */}
              <div className="lg:col-span-7 glass-panel p-5 rounded-xl border border-white/5">
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 block mb-4">Registration Distribution</span>
                <div className="h-[180px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                      <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" fontSize={9} fontClassName="font-mono" />
                      <YAxis stroke="rgba(255,255,255,0.2)" fontSize={9} fontClassName="font-mono" />
                      <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ background: '#090d16', border: '1px solid rgba(255,255,255,0.1)', fontSize: '11px', color: '#fff' }} />
                      <Bar dataKey="value" name="Students" radius={[4, 4, 0, 0]}>
                        <Cell fill="#10b981" />
                        <Cell fill="#ef4444" />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 3: STUDENT LOOKUP */}
        {activeTab === 'lookup' && (
          <div className="space-y-6">
            <form onSubmit={handleLookup} className="flex items-center bg-dark-900 border border-white/10 rounded-lg p-1.5 max-w-md">
              <Search className="h-4 w-4 text-slate-500 ml-3" />
              <input
                type="text"
                value={lookupRoll}
                onChange={(e) => setLookupRoll(e.target.value)}
                placeholder="Enter Student Roll Number (e.g. 103)"
                className="flex-1 bg-transparent border-none text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-0 px-3 py-1.5"
              />
              <button
                type="submit"
                className="px-4 py-1.5 bg-eco-500 text-dark-950 font-bold rounded text-xs font-mono uppercase"
              >
                Search
              </button>
            </form>

            <AnimatePresence mode="wait">
              {searchedStudent && searchedStudent !== 'not_found' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start"
                >
                  {/* Stats card */}
                  <div className="md:col-span-4 glass-panel p-5 rounded-xl border border-white/5 text-center space-y-4">
                    <div className="inline-flex rounded-full bg-eco-500/10 p-4 border border-eco-500/20 text-eco-400">
                      <Users className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">{searchedStudent.name}</h4>
                      <p className="font-mono text-[10px] text-slate-500">Roll No: {searchedStudent.rollNo}</p>
                    </div>
                    <div className="border-t border-white/5 pt-4">
                      <div className="text-[10px] uppercase font-mono tracking-widest text-slate-500 mb-1">Percentage</div>
                      <div className="text-3xl font-extrabold text-eco-400">{searchedStudent.percentage}%</div>
                      <span className={`inline-block rounded-full px-2 py-0.5 text-[9px] font-semibold tracking-wide mt-2 ${
                        searchedStudent.percentage >= 75 
                          ? 'bg-eco-500/10 text-eco-400 border border-eco-500/20' 
                          : 'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}>
                        {searchedStudent.percentage >= 75 ? 'Safe Standings' : 'At Risk'}
                      </span>
                    </div>
                  </div>

                  {/* History Logs */}
                  <div className="md:col-span-8 glass-panel p-5 rounded-xl border border-white/5 space-y-4">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-slate-500 block">Chronological Records</span>
                    <div className="space-y-2 max-h-[220px] overflow-y-auto pr-2">
                      {searchedStudent.history.map((h, hIdx) => (
                        <div key={hIdx} className="flex justify-between items-center bg-dark-900 border border-white/5 rounded px-4 py-2.5 text-xs font-mono">
                          <span className="text-slate-400">{h.date}</span>
                          <span className={`font-bold uppercase tracking-wider text-[10px] px-2.5 py-0.5 rounded ${
                            h.status === 'Present' 
                              ? 'bg-eco-500/10 text-eco-400 border border-eco-500/20' 
                              : 'bg-red-500/10 text-red-400 border border-red-500/20'
                          }`}>
                            {h.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {searchedStudent === 'not_found' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-red-400 font-mono bg-red-500/5 border border-red-500/10 rounded px-4 py-3 max-w-md"
                >
                  Student query returned 0 results. Try searching for roll "103" or "102".
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

    </div>
  );
}

export default AttendanceDashboard;
