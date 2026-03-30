import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { BrainCircuit, Code, Users } from 'lucide-react';

export default function AboutPage() {
  const features = [
    {
      icon: <BrainCircuit className="w-8 h-8 text-blue-400" />,
      title: 'رؤية مستقبلية',
      desc: 'نسعى دائمًا لنكون حلقة الوصل بين الباحثين والمطورين وعشاق التكنولوجيا لبناء مجتمع عربي ملم بتقنيات الذكاء الاصطناعي.'
    },
    {
      icon: <Code className="w-8 h-8 text-emerald-400" />,
      title: 'موثوقية المحتوى',
      desc: 'فريقنا يجمع البيانات من المصادر الأصلية للمكتبات البرمجية وأوراق البحث المعتمدة (Papers) لضمان أعلى جودة.'
    },
    {
      icon: <Users className="w-8 h-8 text-purple-400" />,
      title: 'مجتمع نشط',
      desc: 'منصة مفتوحة لمشاركة الآراء وطرح التساؤلات وإيجاد الحلول المتعلقة بهندسة البيانات الخوارزمية.'
    }
  ];

  return (
    <div className="container mx-auto px-4 w-full">
      <Helmet>
        <title>من نحن | منطق</title>
        <meta name="description" content="تعرف على رؤيتنا وأهدافنا للارتقاء بالمحتوى التقني العربي." />
      </Helmet>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-black text-white mb-6 text-glow">مهمتنا في عصر الخوارزميات</h1>
        <p className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
          نحن منصة مستقلة أسست بواسطة مهندسين وشغوفين بالتقنية. نؤمن بأن المعرفة قوة، وأن تقنيات الذكاء الاصطناعي يجب أن تكون متاحة ومفهومة للجميع.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
        {features.map((feat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.2 }}
            className="glass-panel p-8 rounded-3xl border border-slate-700/50 flex flex-col items-center text-center"
          >
            <div className="mb-6 p-4 rounded-2xl bg-slate-800/50">
              {feat.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-4">{feat.title}</h3>
            <p className="text-slate-400 leading-relaxed">
              {feat.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}


