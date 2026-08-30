import React, { useState, useEffect, useRef } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Play, Pause, Zap, CloudLightning, ShieldAlert, CheckCircle2 } from 'lucide-react';

const regionsData = [
  { id: 'us-east', name: 'US East (N. Virginia)', lat: 'us-east-1', baseCarbon: 380, coord: { x: 120, y: 110 } },
  { id: 'us-west', name: 'US West (Oregon)', lat: 'us-west-2', baseCarbon: 120, coord: { x: 50, y: 100 } },
  { id: 'eu-west', name: 'EU West (Ireland)', lat: 'eu-west-1', baseCarbon: 280, coord: { x: 230, y: 80 } },
  { id: 'eu-central', name: 'EU Central (Frankfurt)', lat: 'eu-central-1', baseCarbon: 410, coord: { x: 260, y: 100 } },
  { id: 'ap-south', name: 'AP South (Mumbai)', lat: 'ap-south-1', baseCarbon: 520, coord: { x: 320, y: 150 } },
  { id: 'ap-east', name: 'AP East (Tokyo)', lat: 'ap-northeast-1', baseCarbon: 340, coord: { x: 380, y: 110 } },
  { id: 'sa-east', name: 'SA East (São Paulo)', lat: 'sa-east-1', baseCarbon: 150, coord: { x: 160, y: 220 } },
];

function DVQSimulator() {
  const [isRunning, setIsRunning] = useState(true);
  const [workload, setWorkload] = useState(450); // req/s
  const [vParam, setVParam] = useState(5); // Lyapunov control parameter V
  const [gridCarbon, setGridCarbon] = useState(420); // g CO2/kWh
  const [outages, setOutages] = useState({
    'us-east': false,
    'us-west': false,
    'eu-west': false,
    'eu-central': false,
    'ap-south': false,
    'ap-east': false,
    'sa-east': false,
  });

  const [simMetrics, setSimMetrics] = useState({
    carbonSaved: 30.2,
    avgLatency: 48,
    slaViolations: 0,
    decisionTime: 61,
  });

  const [chartData, setChartData] = useState([]);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  // Recalculate metrics based on slider states
  useEffect(() => {
    // Math modeling of Lyapunov optimization:
    // - Larger V means we prioritize carbon savings at the cost of queuing latency.
    // - Larger grid carbon intensity means there is more potential to save carbon by shifting away.
    // - Higher workload increases queuing delay.
    // - Outages force traffic to remaining regions, increasing their load and latency.
    
    const activeCount = Object.values(outages).filter(v => !v).length;
    if (activeCount === 0) {
      setSimMetrics({ carbonSaved: 0, avgLatency: 999, slaViolations: 100, decisionTime: 12 });
      return;
    }

    const outageMultiplier = 7 / activeCount;
    
    // Carbon saved model: increases with V (up to a limit), varies with grid carbon
    const maxCarbonSavings = 35.87; // From resume
    const baseSavings = (vParam / 10) * maxCarbonSavings * (gridCarbon / 500);
    const carbonSaved = Math.max(5, Math.min(maxCarbonSavings, baseSavings * (1 - (workload / 2500))));
    
    // Latency model: base network RTT + queuing delay. Queuing delay decreases with smaller V, increases with workload & outages
    const baseRtt = 42; 
    const queueDelay = (workload * 0.05 * outageMultiplier) / (11 - vParam);
    const avgLatency = Math.round(baseRtt + queueDelay);

    // SLA violation model: occurs if latency exceeds 150ms limit
    const slaViolations = avgLatency > 150 ? Math.round(((avgLatency - 150) / 100) * 100) : 0;
    
    // Decision time in micro-seconds (varies slightly around the 61us benchmark from the resume)
    const decisionTime = Math.round(58 + Math.random() * 6);

    setSimMetrics({
      carbonSaved: parseFloat(carbonSaved.toFixed(2)),
      avgLatency,
      slaViolations,
      decisionTime,
    });
  }, [workload, vParam, gridCarbon, outages]);

  // Feed real-time simulation data into Recharts
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setChartData(prev => {
        const newData = [...prev, {
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          carbonSaved: simMetrics.carbonSaved,
          latency: simMetrics.avgLatency,
        }];
        if (newData.length > 15) newData.shift();
        return newData;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, simMetrics]);

  // Canvas packet animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    const handleResize = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = 300;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const gatewayCoord = { x: canvas.width / 2, y: canvas.height / 2 + 30 };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw Gateway
      ctx.beginPath();
      ctx.arc(gatewayCoord.x, gatewayCoord.y, 8, 0, Math.PI * 2);
      ctx.fillStyle = '#10b981';
      ctx.fill();
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#10b981';
      ctx.font = '10px monospace';
      ctx.fillStyle = '#ffffff';
      ctx.fillText('DVQ Gateway', gatewayCoord.x - 32, gatewayCoord.y - 12);
      ctx.shadowBlur = 0;

      // Draw Region Nodes
      regionsData.forEach(r => {
        const active = !outages[r.id];
        const destX = (r.coord.x / 450) * canvas.width;
        const destY = (r.coord.y / 250) * canvas.height;

        // Draw node circle
        ctx.beginPath();
        ctx.arc(destX, destY, 6, 0, Math.PI * 2);
        ctx.fillStyle = active ? '#38bdf8' : '#ef4444';
        ctx.fill();

        // Node label
        ctx.font = '9px monospace';
        ctx.fillStyle = active ? '#cbd5e1' : '#f87171';
        ctx.fillText(r.lat, destX - 25, destY - 10);

        if (active) {
          // Draw connection path (dashed line)
          ctx.beginPath();
          ctx.setLineDash([3, 5]);
          ctx.moveTo(gatewayCoord.x, gatewayCoord.y);
          ctx.lineTo(destX, destY);
          ctx.strokeStyle = 'rgba(255,255,255,0.06)';
          ctx.stroke();
          ctx.setLineDash([]);
        }
      });

      // Spawn packets based on workload and state
      if (isRunning && Math.random() < workload / 1000) {
        // Choose target based on lowest carbon intensity (simplistic demo representation of Lyapunov routing)
        const activeRegions = regionsData.filter(r => !outages[r.id]);
        if (activeRegions.length > 0) {
          // Sort by base carbon intensity as a demo
          const sorted = [...activeRegions].sort((a, b) => a.baseCarbon - b.baseCarbon);
          const target = sorted[0]; // Greedily choose best for carbon
          
          const destX = (target.coord.x / 450) * canvas.width;
          const destY = (target.coord.y / 250) * canvas.height;

          particles.push({
            x: gatewayCoord.x,
            y: gatewayCoord.y,
            tx: destX,
            ty: destY,
            progress: 0,
            speed: 0.02 + Math.random() * 0.02,
          });
        }
      }

      // Update & Draw packets
      particles.forEach((p, idx) => {
        p.progress += p.speed;
        if (p.progress >= 1) {
          particles.splice(idx, 1);
          return;
        }

        const currentX = p.x + (p.tx - p.x) * p.progress;
        const currentY = p.y + (p.ty - p.y) * p.progress;

        ctx.beginPath();
        ctx.arc(currentX, currentY, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#34d399';
        ctx.fill();
        ctx.shadowBlur = 6;
        ctx.shadowColor = '#34d399';
        ctx.shadowBlur = 0;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    if (isRunning) {
      animate();
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = '14px monospace';
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      ctx.fillText('Simulation Paused', canvas.width / 2 - 60, canvas.height / 2);
    }

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [isRunning, workload, outages]);

  const toggleOutage = (id) => {
    setOutages(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      {/* Parameters Panel */}
      <div className="lg:col-span-4 glass-panel rounded-xl p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <h3 className="font-mono text-sm font-bold text-white uppercase tracking-wider">Parameters</h3>
          <button 
            onClick={() => setIsRunning(!isRunning)}
            className={`p-2 rounded-full border transition-all ${
              isRunning 
                ? 'border-red-500/20 bg-red-500/5 text-red-400 hover:bg-red-500/10' 
                : 'border-eco-500/20 bg-eco-500/5 text-eco-400 hover:bg-eco-500/10'
            }`}
          >
            {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
        </div>

        {/* Sliders */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs font-mono text-slate-400 mb-2">
              <span>Workload Traffic</span>
              <span className="text-white font-bold">{workload} Req/s</span>
            </div>
            <input 
              type="range" min="50" max="1500" value={workload} 
              onChange={(e) => setWorkload(parseInt(e.target.value))}
              className="w-full accent-eco-500 bg-white/5 h-1.5 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono text-slate-400 mb-2">
              <span>Grid Carbon Intensity</span>
              <span className="text-white font-bold">{gridCarbon} g/kWh</span>
            </div>
            <input 
              type="range" min="100" max="750" value={gridCarbon} 
              onChange={(e) => setGridCarbon(parseInt(e.target.value))}
              className="w-full accent-eco-500 bg-white/5 h-1.5 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono text-slate-400 mb-2">
              <span>Lyapunov Control (V)</span>
              <span className="text-white font-bold">V = {vParam}</span>
            </div>
            <input 
              type="range" min="1" max="10" value={vParam} 
              onChange={(e) => setVParam(parseInt(e.target.value))}
              className="w-full accent-eco-500 bg-white/5 h-1.5 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[9px] text-slate-500 font-mono mt-1">
              <span>Prioritize SLA</span>
              <span>Prioritize Carbon</span>
            </div>
          </div>
        </div>

        {/* Outages Panel */}
        <div className="space-y-3">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-widest">Active Regions (Click to kill)</div>
          <div className="grid grid-cols-2 gap-2">
            {regionsData.map(r => (
              <button
                key={r.id}
                onClick={() => toggleOutage(r.id)}
                className={`px-3 py-1.5 rounded border text-left font-mono text-[10px] transition-all flex items-center justify-between ${
                  !outages[r.id]
                    ? 'border-eco-500/20 bg-eco-500/5 text-eco-400 hover:border-red-500/30 hover:bg-red-500/5'
                    : 'border-red-500/20 bg-red-500/5 text-red-400 hover:border-eco-500/30 hover:bg-eco-500/5'
                }`}
              >
                <span>{r.lat}</span>
                <span className={`h-1.5 w-1.5 rounded-full ${!outages[r.id] ? 'bg-eco-500' : 'bg-red-500'}`} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Simulator Display & Output */}
      <div className="lg:col-span-8 space-y-6">
        
        {/* Core Metrics Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass-panel rounded-xl p-4 border border-eco-500/10">
            <div className="text-[10px] uppercase font-mono tracking-widest text-slate-500">Carbon Reduction</div>
            <div className="text-2xl font-bold text-eco-400 flex items-center gap-1.5 mt-1">
              <CheckCircle2 className="h-5 w-5 text-eco-500" />
              {simMetrics.carbonSaved}%
            </div>
          </div>

          <div className="glass-panel rounded-xl p-4">
            <div className="text-[10px] uppercase font-mono tracking-widest text-slate-500">Avg Queue Latency</div>
            <div className="text-2xl font-bold text-white flex items-center gap-1.5 mt-1">
              <Zap className="h-5 w-5 text-yellow-500" />
              {simMetrics.avgLatency}ms
            </div>
          </div>

          <div className="glass-panel rounded-xl p-4">
            <div className="text-[10px] uppercase font-mono tracking-widest text-slate-500">SLA Violation Rate</div>
            <div className="text-2xl font-bold text-white flex items-center gap-1.5 mt-1">
              {simMetrics.slaViolations > 0 ? (
                <>
                  <ShieldAlert className="h-5 w-5 text-red-500" />
                  <span className="text-red-400">{simMetrics.slaViolations}%</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-5 w-5 text-eco-500" />
                  <span className="text-eco-400">0.0%</span>
                </>
              )}
            </div>
          </div>

          <div className="glass-panel rounded-xl p-4">
            <div className="text-[10px] uppercase font-mono tracking-widest text-slate-500">Decision Overhead</div>
            <div className="text-2xl font-bold text-cyan-400 flex items-center gap-1.5 mt-1">
              <CloudLightning className="h-5 w-5 text-cyan-500" />
              {simMetrics.decisionTime}µs
            </div>
          </div>
        </div>

        {/* Live Canvas Map */}
        <div className="glass-panel rounded-xl overflow-hidden relative">
          <div className="absolute top-4 left-6 font-mono text-[10px] text-white/30 uppercase tracking-widest z-10">Real-Time Routing Canvas</div>
          <canvas ref={canvasRef} className="w-full block bg-dark-900/60" />
        </div>

        {/* Recharts Analytics */}
        <div className="glass-panel rounded-xl p-6">
          <div className="font-mono text-[10px] text-white/30 uppercase tracking-widest mb-6">Optimization History</div>
          <div className="h-[180px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 0, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCarbon" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.02)" />
                <XAxis dataKey="time" stroke="rgba(255,255,255,0.2)" fontSize={9} />
                <YAxis stroke="rgba(255,255,255,0.2)" fontSize={9} />
                <Tooltip contentStyle={{ background: '#090d16', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '11px', color: '#fff' }} />
                <Area type="monotone" dataKey="carbonSaved" name="Carbon Saved %" stroke="#10b981" fillOpacity={1} fill="url(#colorCarbon)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
}

export default DVQSimulator;
