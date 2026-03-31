import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const { t, i18n } = useTranslation();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isRTL = i18n.language.startsWith('ar');

  const [messages, setMessages] = useState<{ id: number; text: string; sender: 'ai' | 'user' }[]>([
    { id: 1, text: t('chatbot.greeting'), sender: 'ai' }
  ]);

  useEffect(() => {
    // Update greeting if language changes
    setMessages((prev) => {
      const newMessages = [...prev];
      if (newMessages[0]?.sender === 'ai' && newMessages.length === 1) {
        newMessages[0].text = t('chatbot.greeting');
      }
      return newMessages;
    });
  }, [i18n.language, t]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!message.trim()) return;

    setMessages([...messages, { id: Date.now(), text: message, sender: 'user' }]);
    setMessage('');

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), text: "هذا مجرد نص تجريبي لتوضيح استجابة الروبوت." , sender: 'ai' }
      ]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className={`fixed bottom-6 z-50 ${isRTL ? 'left-6' : 'right-6'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className={`absolute bottom-16 bg-[#030712]/95 backdrop-blur-xl border border-slate-700 w-80 sm:w-96 h-[450px] rounded-2xl flex flex-col shadow-[0_0_40px_rgba(59,130,246,0.15)] overflow-hidden ${isRTL ? 'origin-bottom-left left-0' : 'origin-bottom-right right-0'}`}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-slate-700/50 bg-slate-900/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                  <Bot className="w-4 h-4 text-blue-400" />
                </div>
                <h3 className="font-bold text-slate-200">{t('chatbot.title')}</h3>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={msg.id} 
                  className={`flex ${msg.sender === 'user' ? (isRTL ? 'justify-end' : 'justify-end') : 'justify-start'}`}
                >
                  <div className={`flex max-w-[85%] gap-2 ${msg.sender === 'user' ? (isRTL ? 'flex-row-reverse' : 'flex-row-reverse') : ''}`}>
                    <div className={`w-6 h-6 shrink-0 rounded-full flex items-center justify-center border ${
                      msg.sender === 'user' 
                        ? 'bg-slate-800 border-slate-600 text-slate-300' 
                        : 'bg-blue-500/20 border-blue-500/30 text-blue-400'
                    }`}>
                      {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                    </div>
                    <div className={`p-3 rounded-2xl text-sm ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-tr-none'
                        : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-none'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-slate-700/50 bg-slate-900/50">
              <div className="flex relative">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={t('chatbot.placeholder')}
                  className={`w-full bg-slate-800 border border-slate-700 text-slate-200 text-sm rounded-xl py-3 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all ${isRTL ? 'pr-4 pl-12' : 'pl-4 pr-12'}`}
                />
                <button 
                  onClick={handleSend}
                  disabled={!message.trim()}
                  className={`absolute top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-lg bg-blue-600 hover:bg-blue-500 text-white transition-colors disabled:opacity-50 disabled:hover:bg-blue-600 ${isRTL ? 'left-2' : 'right-2'}`}
                >
                  <Send className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full relative bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-colors"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div
              key="bot"
              initial={{ opacity: 0, rotate: 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
              transition={{ duration: 0.2 }}
            >
              <Bot className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}