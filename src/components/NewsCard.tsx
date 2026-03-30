import { forwardRef } from 'react';
import { Calendar, User, Clock, ArrowLeft, Cpu } from 'lucide-react';
import { NewsArticle } from '../data/news';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const NewsCard = forwardRef<HTMLElement, NewsArticle>(({ id, title, excerpt, author, date, imageUrl, category, readTime }, ref) => {
  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      transition={{ duration: 0.4, type: 'spring', stiffness: 100, damping: 20 }}
      style={{ willChange: 'transform, opacity' }}
      className="group relative flex flex-col glass-panel rounded-3xl overflow-hidden hover:box-glow transition-all duration-300 h-full hover:border-blue-500/50 transform-gpu"
      data-testid="news-card"
    >
      {/* Glow effect that follows the top border on hover */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-30" />

      <div className="relative h-52 overflow-hidden border-b border-slate-700/50">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10" />
        <motion.img 
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover origin-center opacity-80 group-hover:opacity-100 transition-opacity duration-500" 
          loading="lazy"
        />
        
        {/* Category Pill with AI thematic icon */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="absolute top-4 right-4 z-20 bg-slate-950/70 backdrop-blur-md text-blue-400 text-xs font-bold px-4 py-1.5 rounded-full border border-blue-500/30 flex items-center gap-1.5 shadow-lg"
        >
          <Cpu className="w-3 h-3" />
          {category}
        </motion.div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow relative z-20">
        <div className="flex flex-row items-center space-x-4 space-x-reverse text-xs text-slate-400 mb-4">
          <div className="flex items-center space-x-1.5 space-x-reverse bg-slate-800/50 px-3 py-1 rounded-full">
            <Calendar className="w-3.5 h-3.5 text-blue-500" />
            <span>{date}</span>
          </div>
          <div className="flex items-center space-x-1.5 space-x-reverse bg-slate-800/50 px-3 py-1 rounded-full ml-4">
            <Clock className="w-3.5 h-3.5 text-purple-400" />
            <span>{readTime}</span>
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-slate-100 mb-3 leading-snug group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-300 transition-all duration-300">
          {title}
        </h3>
        
        <p className="text-slate-400 text-sm mb-6 flex-grow line-clamp-3 leading-relaxed">
          {excerpt}
        </p>
        
        <div className="flex items-center justify-between pt-5 border-t border-slate-700/50 mt-auto">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400 ml-2 group-hover:border-blue-500/50 transition-colors">
              <User className="w-4 h-4" />
            </div>
            <div>
              <span className="block text-sm font-medium text-slate-200">{author}</span>
              <span className="block text-[10px] text-slate-500">باحث متخصص</span>
            </div>
          </div>
          
          <Link
            to={`/news/${id}`}
            className="text-blue-400 hover:text-blue-300 transition-colors p-2.5 rounded-full cursor-pointer flex items-center group/btn border border-transparent hover:border-blue-500/30"
          >
            <span className="text-xs font-bold opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 ml-2 tracking-wide">اقرأ التفاصيل</span>
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
});

NewsCard.displayName = 'NewsCard';

