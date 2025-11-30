import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles } from 'lucide-react';
import { generateArtCritique } from '../services/geminiService';
import { ChatMessage } from '../types';

interface ChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Je suis le curateur. Interrogez-moi sur la composition, la lumière ou le sens des ombres.', timestamp: Date.now() }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: query, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setQuery('');
    setIsLoading(true);

    try {
      const responseText = await generateArtCritique(query);
      const modelMsg: ChatMessage = { role: 'model', text: responseText, timestamp: Date.now() };
      setMessages(prev => [...prev, modelMsg]);
    } catch (error) {
      // Error handled in service, simplified here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="fixed top-0 right-0 h-full w-full md:w-[400px] bg-white border-l border-gray-100 z-[70] shadow-2xl flex flex-col"
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-black" />
              <span className="font-sans text-xs tracking-widest font-bold">IA CURATEUR</span>
            </div>
            <button onClick={onClose} className="hover:rotate-90 transition-transform duration-300">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div 
                  className={`max-w-[85%] p-4 text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-black text-white font-sans' 
                      : 'bg-white border border-gray-200 text-black font-serif italic shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-gray-400 mt-2 font-sans tracking-widest uppercase">
                  {msg.role === 'model' ? 'Le Curateur' : 'Visiteur'}
                </span>
              </div>
            ))}
            {isLoading && (
               <div className="flex items-start">
                 <div className="bg-white border border-gray-200 p-4 shadow-sm">
                   <div className="flex gap-1">
                     <span className="w-1.5 h-1.5 bg-black rounded-full animate-bounce" style={{ animationDelay: '0s' }}/>
                     <span className="w-1.5 h-1.5 bg-black rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}/>
                     <span className="w-1.5 h-1.5 bg-black rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}/>
                   </div>
                 </div>
               </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-6 bg-white border-t border-gray-100">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Parlez-moi d'art..."
                className="w-full bg-gray-50 border-none p-4 pr-12 text-sm font-sans focus:ring-1 focus:ring-black outline-none transition-all"
              />
              <button 
                type="submit" 
                disabled={!query.trim() || isLoading}
                className="absolute right-4 top-1/2 -translate-y-1/2 disabled:opacity-30 hover:scale-110 transition-transform"
              >
                <Send size={16} />
              </button>
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatInterface;