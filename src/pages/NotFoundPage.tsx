import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="container mx-auto px-4 min-h-[70vh] flex flex-col items-center justify-center text-center w-full">
      <Helmet>
        <title>الصفحة غير موجودة | منطق</title>
      </Helmet>

      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-panel p-10 md:p-16 rounded-[3rem] border border-slate-700/50 max-w-2xl w-full relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 blur-[100px] rounded-full -z-10" />
        
        <AlertTriangle className="w-20 h-20 text-red-500 mx-auto mb-6 opacity-80" />
        <h1 className="text-6xl md:text-8xl font-black text-white mb-4 tracking-tighter">404</h1>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-300 mb-6">المسار غير متوفر في قاعدة البيانات</h2>
        <p className="text-slate-400 text-lg mb-10 max-w-md mx-auto">
          عذراً، الدليل الذي تحاول الوصول إليه غير موجود أو تم نقله في التحديث الأخير لخوارزمياتنا.
        </p>

        <Link 
          to="/" 
          className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]"
        >
          <Home className="w-5 h-5" />
          العودة للمركز الرئيسي
        </Link>
      </motion.div>
    </div>
  );
}


