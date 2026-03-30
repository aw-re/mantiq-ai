import { Activity, FileText, TrendingUp, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const stats = [
    { title: 'إجمالي المقالات', value: '142', icon: <FileText size={24} className="text-blue-400" /> },
    { title: 'الزيارات اليومية', value: '3,842', icon: <Activity size={24} className="text-emerald-400" /> },
    { title: 'معدل التفاعل', value: '+24%', icon: <TrendingUp size={24} className="text-purple-400" /> },
    { title: 'الأعضاء', value: '891', icon: <Users size={24} className="text-orange-400" /> }
  ];

  return (
    <div>
      <h1 className="text-3xl font-black text-white mb-8">نظرة عامة</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, idx) => (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            key={idx} 
            className="glass-panel p-6 rounded-2xl border border-slate-700 hover:border-slate-500 transition-colors"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-slate-800 rounded-xl">
                {stat.icon}
              </div>
            </div>
            <h3 className="text-slate-400 font-medium mb-1">{stat.title}</h3>
            <p className="text-3xl font-black text-white">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="glass-panel p-8 rounded-2xl border border-slate-700">
        <h2 className="text-xl font-bold text-white mb-6">النشاط الأخير</h2>
        <div className="space-y-4 text-slate-300">
          <p className="py-3 border-b border-slate-800">تم نشر مقال جديد: "نموذج GPT-5 ومستقبل البرمجة"</p>
          <p className="py-3 border-b border-slate-800">تم تعديل قسم: "النماذج اللغوية"</p>
          <p className="py-3">انضمام عضو جديد للنظام الأساسي</p>
        </div>
      </div>
    </div>
  );
}


