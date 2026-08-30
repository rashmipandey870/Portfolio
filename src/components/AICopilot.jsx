import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, User, Bot, Sparkles } from 'lucide-react';

const presetQueries = [
  { text: 'Are you available for freelance work?', reply: 'Yes, absolutely! I am currently accepting freelance and contract projects. My areas of focus include backend system design (Node.js/Express), React frontends, API integrations, and cloud infrastructure setup (AWS). Let me know what you are building!' },
  { text: 'Tell me about the DVQ routing system.', reply: 'DVQ is a carbon-aware edge routing framework I engineered for AWS cloud deployments. It uses Lyapunov drift-plus-penalty optimization to route workloads. By dynamically monitoring grid carbon intensity and network latency, it achieved a 35.87% carbon reduction while keeping SLA violations at 0% with only a 61µs decision overhead.' },
  { text: 'What is your technical stack?', reply: 'My primary stack consists of Java, Node.js (Express), React, and MongoDB. I also write Python and C/C++, design REST APIs, use Retrofit for Android integrations, and deploy to AWS infrastructure. I am highly comfortable with full-stack and systems engineering.' },
  { text: 'Tell me about your NIAMT internship.', reply: 'From June 1 to July 15, 2026, I worked as a Summer Research Intern at NIAMT, Ranchi, under the guidance of Dr. Rahul Mishra. During this internship, I designed the Lyapunov-optimized DVQ carbon-aware routing algorithms and ran multi-region evaluation trials on AWS.' },
];

function AICopilot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hi! I\'m Rashmi\'s portfolio copilot. Ask me anything about her projects, experience, or availability!' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (text) => {
    if (!text.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { role: 'user', text }]);
    setInput('');
    setIsTyping(true);

    // Generate reply with delay simulating AI reasoning
    setTimeout(() => {
      let replyText = 'I\'m sorry, I don\'t have a pre-configured response for that query. You can email Rashmi directly at rashmipd870@gmail.com, or type "help" in the console to inspect her API endpoints!';
      
      const lowerText = text.toLowerCase();
      
      // Match query words
      if (lowerText.includes('freelance') || lowerText.includes('hire') || lowerText.includes('work') || lowerText.includes('available')) {
        replyText = presetQueries[0].reply;
      } else if (lowerText.includes('dvq') || lowerText.includes('carbon') || lowerText.includes('lyapunov') || lowerText.includes('routing')) {
        replyText = presetQueries[1].reply;
      } else if (lowerText.includes('stack') || lowerText.includes('skills') || lowerText.includes('language') || lowerText.includes('database')) {
        replyText = presetQueries[2].reply;
      } else if (lowerText.includes('niamt') || lowerText.includes('intern') || lowerText.includes('june') || lowerText.includes('july') || lowerText.includes('research')) {
        replyText = presetQueries[3].reply;
      } else if (lowerText.includes('contact') || lowerText.includes('email') || lowerText.includes('phone') || lowerText.includes('reach')) {
        replyText = 'You can reach Rashmi directly via email at rashmipd870@gmail.com or by calling her at +91 87093 68696. She is also active on LinkedIn: linkedin.com/in/rashmi-pandey-590a22340';
      }

      setMessages(prev => [...prev, { role: 'assistant', text: replyText }]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* Floating Action Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="rounded-full bg-gradient-to-r from-eco-500 to-cyan-500 p-4 text-dark-950 shadow-2xl hover:shadow-eco-500/20 flex items-center justify-center border border-white/10"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </motion.button>

      {/* Chat Pane */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="absolute bottom-16 right-0 w-[350px] sm:w-[400px] h-[500px] rounded-2xl border border-white/10 bg-dark-900 shadow-2xl flex flex-col justify-between overflow-hidden"
          >
            {/* Header */}
            <div className="bg-dark-950 px-5 py-4 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-eco-500 ring-2 ring-dark-950" />
                  <div className="rounded-full bg-eco-500/10 p-1.5 border border-eco-500/20 text-eco-400">
                    <Sparkles className="h-4 w-4" />
                  </div>
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">System Copilot</div>
                  <div className="text-[10px] text-slate-500 font-mono">rashmi-assistant-v1.0</div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-dark-900/40">
              {messages.map((m, idx) => (
                <div key={idx} className={`flex items-start gap-3 ${m.role === 'user' ? 'justify-end' : ''}`}>
                  {m.role === 'assistant' && (
                    <div className="rounded-full bg-white/5 p-1 text-eco-400 border border-white/5 mt-0.5">
                      <Bot className="h-3.5 w-3.5" />
                    </div>
                  )}
                  <div className={`rounded-xl p-3 text-xs leading-relaxed max-w-[80%] ${
                    m.role === 'user'
                      ? 'bg-eco-500 text-dark-950 font-medium'
                      : 'bg-white/5 text-slate-200 border border-white/5'
                  }`}>
                    {m.text}
                  </div>
                  {m.role === 'user' && (
                    <div className="rounded-full bg-eco-500/10 p-1 text-eco-400 border border-eco-500/20 mt-0.5">
                      <User className="h-3.5 w-3.5" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-white/5 p-1 text-eco-400 border border-white/5 mt-0.5">
                    <Bot className="h-3.5 w-3.5" />
                  </div>
                  <div className="rounded-xl p-3 bg-white/5 text-slate-400 border border-white/5 flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts & Input Area */}
            <div className="p-4 border-t border-white/5 bg-dark-950/60 space-y-3">
              
              {/* Presets */}
              {messages.length === 1 && (
                <div className="flex flex-wrap gap-1.5 max-h-[100px] overflow-y-auto">
                  {presetQueries.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(q.text)}
                      className="text-[10px] text-slate-400 hover:text-white hover:bg-white/5 border border-white/10 rounded-full px-2.5 py-1 text-left transition-all"
                    >
                      {q.text}
                    </button>
                  ))}
                </div>
              )}

              {/* TextInput */}
              <div className="flex items-center bg-dark-900 border border-white/10 rounded-lg px-3 py-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(input)}
                  className="flex-1 bg-transparent border-none text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-0 p-0"
                  placeholder="Ask a question..."
                />
                <button
                  onClick={() => handleSendMessage(input)}
                  className="text-eco-400 hover:text-eco-300 transition-colors p-1"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default AICopilot;
