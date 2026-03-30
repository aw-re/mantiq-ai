import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Network, Sparkles, ArrowRight, Cpu } from 'lucide-react';

export default function RootLayout() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Handle scroll for header blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on path change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLinks = [
    { name: 'الرئيسية', path: '/' },
    { name: 'النماذج الجديدة', path: '/models' },
    { name: 'مقالات حصرية', path: '/exclusive', icon: <Sparkles className="w-3.5 h-3.5 text-blue-400" /> },
    { name: 'من نحن', path: '/about' },
    { name: 'لوحة الإدارة', path: '/admin', icon: <Cpu className="w-3.5 h-3.5 text-red-400" /> }
  ];

  return (
    <div className="min-h-screen font-sans overflow-x-hidden flex flex-col" dir="rtl">
      {/* Background Layers */}
      <div className="fixed inset-0 bg-[#030712] -z-20" />
      <div className="fixed top-0 inset-x-0 h-[800px] overflow-hidden -z-10 bg-grid-white pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px] top-[-300px] right-[-200px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], rotate: [0, -30, 0], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute w-[900px] h-[900px] bg-cyan-600/10 rounded-full blur-[150px] bottom-[-400px] left-[-200px]" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030712]/80 to-[#030712]" />
      </div>

      {/* Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-[#030712]/80 backdrop-blur-2xl border-b border-white/5 py-4 shadow-[0_0_30px_rgba(0,0,0,0.8)]' 
            : 'bg-transparent py-6 lg:py-8'
        }`}
      >
        <div className="container mx-auto px-4 lg:px-6 flex justify-between items-center text-slate-200">
          <Link to="/" className="flex items-center space-x-3 space-x-reverse cursor-pointer group outline-none">
            <div className="p-2.5 bg-slate-900/80 rounded-xl backdrop-blur-md border border-slate-700/50 shadow-[0_0_15px_rgba(59,130,246,0.2)] group-hover:border-blue-500/50 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-300">
              <Network className="w-6 h-6 lg:w-7 lg:h-7 text-blue-400 group-hover:text-cyan-300 transition-colors" />
            </div>
            <div>
              <h1 className="text-lg lg:text-2xl font-black tracking-tight leading-none text-white text-glow">
                منطق
              </h1>
            </div>
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8 space-x-reverse font-semibold text-sm">
            {navLinks.map((item) => (
              <Link 
                key={item.name}
                to={item.path} 
                className="text-slate-400 hover:text-white transition-colors relative group py-1 flex items-center gap-1.5"
              >
                {item.name}
                {item.icon}
                <span className="absolute -bottom-1 right-0 w-0 h-[2px] bg-gradient-to-l from-blue-500 to-cyan-400 group-hover:w-full transition-all duration-300 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center gap-4 text-white font-medium">
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:block py-2.5 px-6 lg:px-7 rounded-full border border-slate-700 hover:border-blue-500/50 transition-all text-xs lg:text-sm font-bold bg-slate-900/50 backdrop-blur-sm"
            >
              تسجيل الدخول
            </motion.button>
            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 hover:text-white hover:border-blue-500/50 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden fixed top-[72px] inset-x-0 bg-[#030712]/95 backdrop-blur-3xl border-b border-slate-800/80 z-40 overflow-hidden"
          >
            <nav className="container mx-auto px-4 py-6 flex flex-col space-y-4">
              {navLinks.map((item) => (
                <Link 
                  key={item.name}
                  to={item.path} 
                  className="text-slate-300 font-semibold text-lg py-2 border-b border-slate-800 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    {item.name}
                    {item.icon}
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-600" />
                </Link>
              ))}
              <button className="mt-4 w-full py-3 rounded-xl border border-blue-500/50 bg-blue-500/10 text-blue-400 font-bold transition-all hover:bg-blue-500/20">
                تسجيل الدخول
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Outlet */}
      <main className="flex-grow flex flex-col items-center w-full pt-32 lg:pt-48 pb-24 relative z-10">
        <div className="w-full">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#020408] text-slate-400 py-12 lg:py-16 border-t border-slate-800/80 relative z-10 w-full overflow-hidden mt-auto">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-900/50 to-transparent" />
        
        <div className="container mx-auto px-4 lg:px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 space-x-reverse mb-6">
              <Network className="w-8 h-8 text-blue-500" />
              <h2 className="text-2xl font-black text-white">منطق</h2>
            </div>
            <p className="mb-8 leading-relaxed max-w-sm text-sm text-slate-500">
              واجهتك الرقمية لتجاوز حدود المعرفة. نغوص في أعماق الخوارزميات لنقدم لك الحقيقة وراء كل سطر برمجي.
            </p>
            <div className="flex gap-4 text-slate-300">
              {['X', 'In', 'Gh'].map((social) => (
                <motion.a 
                  key={social}
                  whileHover={{ y: -5, backgroundColor: 'rgba(59,130,246,0.1)', borderColor: 'rgba(59,130,246,0.5)', color: '#60a5fa' }}
                  href="#" 
                  className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center transition-all font-mono text-sm"
                >
                  {social}
                </motion.a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 text-lg tracking-wide">البروتوكولات</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/#about" className="hover:text-blue-400 transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3" />مركز المنصة</Link></li>
              <li><Link to="/#terms" className="hover:text-blue-400 transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3" />شروط الاتصال</Link></li>
              <li><Link to="/#privacy" className="hover:text-blue-400 transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3" />تشفير الخصوصية</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 text-lg tracking-wide">التصنيفات</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/?category=نماذج اللغات" className="hover:text-cyan-400 transition-colors">نماذج اللغات التوليدية</Link></li>
              <li><Link to="/?category=رعاية صحية" className="hover:text-cyan-400 transition-colors">الحوسبة الطبية</Link></li>
              <li><Link to="/?category=روبوتات" className="hover:text-cyan-400 transition-colors">تطور الروبوتات</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="container mx-auto px-4 lg:px-6 mt-16 pt-8 border-t border-slate-800/80 text-center flex flex-col md:flex-row justify-between items-center text-xs text-slate-600">
          <p>بنية النظام الإصدار 3.0 - © {new Date().getFullYear()} AI News Portal. جميع الحقوق محفوظة.</p>
          <p className="mt-4 md:mt-0 flex items-center">
            توليد واجهة المستخدم بواسطة الخوارزميات
            <Cpu className="w-4 h-4 mr-2 text-cyan-500/50" />
          </p>
        </div>
      </footer>
    </div>
  );
}


