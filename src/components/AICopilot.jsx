import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, User, Bot, Sparkles, Flame, CheckCircle2 } from 'lucide-react';

const presetQueries = [
  { 
    title: 'Why Amazon SDE fit?', 
    text: 'Why would Rashmi be a strong Software Development Engineer at Amazon?', 
    reply: 'Rashmi is an exceptional fit for Amazon SDE roles because of: 1) Proven Cloud & Distributed Systems acumen (engineered Lyapunov-optimized workload routing across 7 AWS regions with 61µs decision latency); 2) Deep Java & Object-Oriented Engineering (built production-grade Jakarta Servlets 6.0 enterprise apps on Tomcat with ACID relational schemas); 3) High Ownership & Bias for Action (shipped 5+ full-stack systems, 8.00 CGPA, and completed an intensive NIAMT research internship).' 
  },
  { 
    title: 'DVQ Cloud Architecture', 
    text: 'Explain the DVQ distributed routing system and its algorithms.', 
    reply: 'DVQ is a carbon-aware edge routing framework engineered for AWS cloud deployments. Formulated as a Lyapunov drift-plus-penalty optimization problem, it dynamically routes workloads across a 7-region AWS deployment (us-east-1, eu-west-1, ap-south-1, etc.). It achieved 35.87% carbon reduction while strictly maintaining a 0.0% SLA violation rate under simulated traffic spikes and regional grid failures, with a median decision overhead of just 61 µs.' 
  },
  { 
    title: 'Java & Systems Skills', 
    text: 'What is Rashmi\'s experience with Java and backend systems?', 
    reply: 'Rashmi has deep experience with Java (JDK 17), including raw Jakarta Servlets 6.0, Tomcat 11, JSP/JSTL, DAO architecture patterns, BCrypt hashing, Apache PDFBox, and MySQL connection pooling (in EXAMORA). She has also developed native Android applications in Java (Sangathan) using Retrofit 2 for reactive background synchronization, alongside Node.js microservices.' 
  },
  { 
    title: 'EXAMORA Enterprise App', 
    text: 'Tell me about the EXAMORA enterprise application.', 
    reply: 'EXAMORA is a Jakarta EE web application built with raw Jakarta Servlets 6.0 and JSP on Apache Tomcat 11. It features an ACID-compliant relational MySQL database across 10+ staged migrations, secure BCrypt password hashing, and an Apache PDFBox text extraction pipeline that automatically parses question papers and study materials. It is one of her most active repositories with 61 commits.' 
  }
];

function AICopilot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      text: 'Hello! I\'m Rashmi\'s SDE Candidate Copilot. Ask me anything about her AWS cloud architectures, Java enterprise projects, algorithms, or Amazon Leadership Principles alignment.' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (text) => {
    if (!text.trim()) return;

    setMessages(prev => [...prev, { role: 'user', text }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let replyText = 'Rashmi is a Computer Science undergraduate (CGPA 8.0/10) specializing in distributed systems, Java backend architectures, and cloud engineering on AWS. You can review her code on GitHub (github.com/rashmipandey870) or reach out directly at rashmipd870@gmail.com.';
      
      const lowerText = text.toLowerCase();
      
      if (lowerText.includes('amazon') || lowerText.includes('hire') || lowerText.includes('sde') || lowerText.includes('fit') || lowerText.includes('why')) {
        replyText = presetQueries[0].reply;
      } else if (lowerText.includes('dvq') || lowerText.includes('carbon') || lowerText.includes('lyapunov') || lowerText.includes('routing') || lowerText.includes('aws')) {
        replyText = presetQueries[1].reply;
      } else if (lowerText.includes('java') || lowerText.includes('oop') || lowerText.includes('backend') || lowerText.includes('servlet') || lowerText.includes('tomcat')) {
        replyText = presetQueries[2].reply;
      } else if (lowerText.includes('examora') || lowerText.includes('exam') || lowerText.includes('pdf') || lowerText.includes('mysql')) {
        replyText = presetQueries[3].reply;
      } else if (lowerText.includes('sports') || lowerText.includes('sangathan') || lowerText.includes('mobile') || lowerText.includes('android')) {
        replyText = 'Sangathan is a full-stack Android tournament platform built in Java with Node.js/Express REST APIs and MongoDB. It features automated combinatorial bracket generation (round-robin and knockout trees) and real-time score updates via Retrofit 2 for 100+ active participants, cutting tournament coordination overhead by 80%.';
      } else if (lowerText.includes('contact') || lowerText.includes('email') || lowerText.includes('phone') || lowerText.includes('reach')) {
        replyText = 'You can reach Rashmi directly via email at rashmipd870@gmail.com or by phone at +91 87093 68696. She is also active on LinkedIn: linkedin.com/in/rashmi-pandey-590a22340';
      } else if (lowerText.includes('education') || lowerText.includes('cgpa') || lowerText.includes('gpa') || lowerText.includes('college')) {
        replyText = 'Rashmi is pursuing her B.Tech in Computer Science & Engineering at Amity University Jharkhand (2024–2028) with a strong CGPA of 8.00 / 10.0. Prior to that, she achieved 88.2% in Class XII and 85.0% in Class X.';
      }

      setMessages(prev => [...prev, { role: 'assistant', text: replyText }]);
      setIsTyping(false);
    }, 700);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 no-print">
      
      {/* Floating Action Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="rounded-full bg-gradient-to-r from-eco-500 to-cyan-500 p-3.5 sm:p-4 text-dark-950 shadow-2xl hover:shadow-eco-500/20 flex items-center justify-center border border-white/10"
        title="Open SDE Recruiter Copilot"
      >
        {isOpen ? <X className="h-6 w-6" /> : (
          <div className="relative">
            <MessageSquare className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400"></span>
            </span>
          </div>
        )}
      </motion.button>

      {/* Chat Pane */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="absolute bottom-16 right-0 w-[340px] sm:w-[420px] h-[520px] rounded-2xl border border-white/10 bg-dark-900 shadow-2xl flex flex-col justify-between overflow-hidden"
          >
            {/* Header */}
            <div className="bg-dark-950 px-5 py-4 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <span className="absolute bottom-0 right-0 block h-2 w-2 rounded-full bg-eco-500 ring-2 ring-dark-950" />
                  <div className="rounded-full bg-eco-500/10 p-1.5 border border-eco-500/20 text-eco-400">
                    <Sparkles className="h-4 w-4" />
                  </div>
                </div>
                <div>
                  <div className="font-bold text-white text-sm flex items-center gap-1.5">
                    SDE Candidate Copilot
                    <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-eco-500/20 text-eco-400 border border-eco-500/30">
                      FAANG Ready
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">rashmi-ai-agent-v2.5</div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors p-1">
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Quick Pills */}
            <div className="bg-dark-950/60 px-4 py-2 border-b border-white/5 flex gap-1.5 overflow-x-auto no-scrollbar">
              {presetQueries.map((pq, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(pq.text)}
                  className="whitespace-nowrap px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold bg-white/5 hover:bg-eco-500/20 hover:text-eco-300 text-slate-300 border border-white/5 transition-all"
                >
                  {pq.title}
                </button>
              ))}
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-dark-900/40 text-xs">
              {messages.map((m, idx) => (
                <div 
                  key={idx} 
                  className={`flex gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {m.role === 'assistant' && (
                    <div className="h-6 w-6 rounded-full bg-eco-500/20 border border-eco-500/30 text-eco-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="h-3.5 w-3.5" />
                    </div>
                  )}
                  <div className={`p-3 rounded-xl max-w-[82%] leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-eco-500 text-dark-950 font-semibold rounded-tr-none'
                      : 'bg-dark-950 border border-white/10 text-slate-200 rounded-tl-none font-normal'
                  }`}>
                    {m.text}
                  </div>
                  {m.role === 'user' && (
                    <div className="h-6 w-6 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center shrink-0 mt-0.5">
                      <User className="h-3.5 w-3.5" />
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-2 text-slate-500 text-xs items-center pl-2 font-mono">
                  <span className="h-1.5 w-1.5 rounded-full bg-eco-400 animate-bounce" />
                  <span className="h-1.5 w-1.5 rounded-full bg-eco-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-eco-400 animate-bounce [animation-delay:0.4s]" />
                  <span>Synthesizing engineering context...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSendMessage(input); }}
              className="bg-dark-950 p-3 border-t border-white/5 flex gap-2 items-center"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about systems, Java, AWS, or algorithms..."
                className="flex-1 bg-dark-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-eco-500"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="p-2 rounded-lg bg-eco-500 disabled:opacity-40 text-dark-950 hover:bg-eco-400 transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AICopilot;
