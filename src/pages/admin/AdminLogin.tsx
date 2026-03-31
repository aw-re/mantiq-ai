import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { toast } from 'sonner';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  
  const isRTL = i18n.language === 'ar';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error(isRTL ? 'الرجاء إدخال البريد الإلكتروني وكلمة المرور' : 'Please enter email and password');
      return;
    }

    setIsLoading(true);
    const success = await login(email, password);
    setIsLoading(false);

    if (success) {
      toast.success(isRTL ? 'مرحباً بعودتك للوحة التحكم' : 'Welcome back to Dashboard');
      navigate('/admin');
    } else {
      toast.error(isRTL ? 'بيانات الدخول غير صحيحة' : 'Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center font-sans p-4 relative overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      <Helmet>
        <title>{t('admin.login', 'تسجيل الدخول | الإدارة')}</title>
      </Helmet>

      {/* Decorative Background */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-md"
      >
        <div className="glass-panel p-8 md:p-10 rounded-3xl border border-slate-800 shadow-2xl relative z-10">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-blue-600/10 border border-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-500">
               <ShieldCheck size={32} />
            </div>
            <h1 className="text-2xl font-black text-white">{isRTL ? 'النظام المركزي' : 'Central System'}</h1>
            <p className="text-slate-400 mt-2 text-sm">{isRTL ? 'الرجاء تسجيل الدخول للمتابعة إلى الإدارة الخفية.' : 'Please sign in to access the secure admin area.'}</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                {isRTL ? 'البريد الإلكتروني' : 'Email Address'}
              </label>
              <div className="relative">
                <Mail className={`absolute top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5 ${isRTL ? 'right-3' : 'left-3'}`} />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@mantiq.ai" 
                  className={`w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl py-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors ${isRTL ? 'pr-11 pl-4' : 'pl-11 pr-4'}`}
                  dir="ltr"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                {isRTL ? 'كلمة المرور' : 'Password'}
              </label>
              <div className="relative">
                <Lock className={`absolute top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5 ${isRTL ? 'right-3' : 'left-3'}`} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className={`w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl py-3 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors ${isRTL ? 'pr-11 pl-4' : 'pl-11 pr-4'}`}
                  dir="ltr"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(59,130,246,0.2)] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  {isRTL ? 'تسجيل الدخول' : 'Sign In'}
                  <ArrowRight size={18} className={isRTL ? 'rotate-180' : ''} />
                </>
              )}
            </button>
          </form>

          {/* Helper Hint Only During Dev */}
           <div className="mt-8 p-4 bg-slate-900/50 border border-slate-800 rounded-xl flex flex-col items-center justify-center text-xs text-slate-500 gap-1 font-mono">
              <span>Admin: admin@mantiq.ai</span>
              <span>Pass: admin123</span>
           </div>
        </div>
      </motion.div>
    </div>
  );
}