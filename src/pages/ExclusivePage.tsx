import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Sparkles, Lock } from 'lucide-react';
import { useNewsStore } from '../store/newsStore';
import { NewsCard } from '../components/NewsCard';

export default function ExclusivePage() {
  const articles = useNewsStore(state => state.articles);
  const exclusiveNews = articles.slice(0, 2); // just picking a couple for mock

  return (
    <div className="container mx-auto px-4 w-full">
      <Helmet>
        <title>مقالات حصرية | منطق</title>
        <meta name="description" content="تحليلات عميقة ومقالات حصرية معدة خصيصاً للمشتركين." />
      </Helmet>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto text-center mb-16"
      >
        <div className="inline-block p-4 rounded-full bg-slate-900 border border-slate-700 mb-6 relative">
          <div className="absolute inset-0 bg-purple-500/20 blur-xl rounded-full" />
          <Sparkles className="w-10 h-10 text-purple-400 relative z-10" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-6 text-glow">محتوى للمحترفين</h1>
        <p className="text-lg text-slate-400 leading-relaxed mb-8">
          تحليلات هندسية ودوثائقيات حصرية خلف الكواليس لأبرز المختبرات لتطوير الذكاء الاصطناعي.
        </p>
        <div className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-800/80 border border-purple-500/30 rounded-full text-purple-300 font-bold backdrop-blur-md">
          <Lock className="w-4 h-4" />
          <span>المحتوى متاح للأعضاء النشطين</span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {exclusiveNews.map((news, idx) => (
          <motion.div
            key={news.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.2 }}
          >
            <NewsCard {...news} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}


