import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Network, Cpu, Database } from 'lucide-react';

export default function ModelsPage() {
  return (
    <div className="container mx-auto px-4 w-full">
      <Helmet>
        <title>النماذج الجديدة | منطق</title>
        <meta name="description" content="تعرف على أحدث النماذج اللغوية وهندسة الذكاء الاصطناعي التي تم إطلاقها مؤخراً." />
      </Helmet>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto text-center mb-16"
      >
        <div className="inline-block p-4 rounded-full bg-slate-900 border border-slate-700 mb-6 relative">
          <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full" />
          <Network className="w-10 h-10 text-blue-400 relative z-10" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-6 text-glow">مكتبة النماذج الذكية</h1>
        <p className="text-lg text-slate-400 leading-relaxed">
          قاعدة بيانات حية لأحدث ما توصلت إليه مختبرات الذكاء الاصطناعي حول العالم. نقوم بتحديث هذه القائمة فور الإعلان عن تقنيات ونماذج لغوية جديدة (LLMs).
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {[1, 2, 3, 4].map((item) => (
          <motion.div 
            key={item}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: item * 0.1 }}
            className="glass-panel p-6 rounded-2xl border border-slate-700/50 hover:border-blue-500/50 transition-colors group cursor-pointer"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="bg-slate-900 p-3 rounded-lg text-cyan-400 border border-slate-800">
                <Cpu className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold px-3 py-1 bg-slate-800 text-slate-300 rounded-full border border-slate-700">جاري التقييم</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">نموذج لغوي {item}.0</h3>
            <p className="text-sm text-slate-400 mb-4 line-clamp-2">
              نسخة مطورة من النماذج مفتوحة المصدر تتميز بقدرة عالية على الاستنتاج المنطقي وتوليد الأكواد البرمجية بسرعة مضاعفة.
            </p>
            <div className="flex gap-4 text-xs font-mono text-slate-500">
              <span className="flex items-center gap-1.5"><Database className="w-3 h-3" /> مٌعلمات: 70B</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}


