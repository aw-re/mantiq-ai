import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import { NewsCard } from '../components/NewsCard';
import { CATEGORIES } from '../data/news';
import { useNewsStore } from '../store/newsStore';
import { useTranslation } from 'react-i18next';
import { Search, Mail, Zap, Network } from 'lucide-react';

export default function HomePage() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language.startsWith('ar');
  const CATEGORY_ALL = t('home.allCategories');

  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || CATEGORY_ALL;
  
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  const articles = useNewsStore(state => state.articles);

  const filteredNews = articles.filter(news => {
    const matchesSearch = news.title.includes(searchTerm) || news.excerpt.includes(searchTerm);
    const matchesCategory = activeCategory === CATEGORY_ALL || news.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    if (category === CATEGORY_ALL) {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 70, damping: 15 } }
  };

  return (
    <>
      <Helmet>
        <title>منطق | Mantiq AI</title>
        <meta name="description" content="المصدر الرقمي الأول للمطورين والباحثين لمتابعة نبض الخوارزميات والنماذج اللغوية والثورات التقنية." />
      </Helmet>

      <div className="container mx-auto px-4 w-full">
        {/* Transformative Hero Section */}
        <motion.section 
          initial="hidden"
          animate="show"
          variants={staggerContainer}
          className="text-center mb-24 lg:mb-28 max-w-4xl mx-auto"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-slate-900/80 border border-blue-500/30 text-blue-300 text-xs font-bold mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(59,130,246,0.15)]">
            <motion.div animate={{ opacity: [1, 0.5, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
              <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,1)]" />
            </motion.div>
            <span className="tracking-wide">{t('home.systemActive')}</span>
          </motion.div>
          
          <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 lg:mb-8 leading-[1.2] lg:leading-[1.2] tracking-tight">
            {t('home.heroTitle1')} <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-blue-400 via-cyan-300 to-blue-500 text-glow inline-block mt-2">
              {t('home.heroTitle2')}
            </span>
          </motion.h2>

          <motion.p variants={fadeUp} className="text-base md:text-lg lg:text-xl text-slate-400 mb-10 lg:mb-14 max-w-2xl mx-auto leading-relaxed px-4">
            {t('home.heroSubtitle')}
          </motion.p>
          
          {/* Cyberpunk Search Bar */}
          <motion.div variants={fadeUp} className="max-w-2xl mx-auto relative group z-20 px-4">
            <div className="absolute inset-x-4 -inset-y-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
            <div className="relative flex items-center bg-slate-950/80 rounded-full p-2 border border-slate-700/80 shadow-2xl backdrop-blur-xl">
              <div className="p-2.5 lg:p-3.5 bg-slate-900 rounded-full text-blue-400 border border-slate-800 shrink-0 shadow-inner">
                <Search className="w-4 h-4 lg:w-5 lg:h-5" />
              </div>
              <input 
                type="text" 
                placeholder={t('home.searchNews')}
                className={`w-full ${isRTL ? 'pl-4 pr-3 lg:pr-5' : 'pr-4 pl-3 lg:pl-5'} py-2 lg:py-3 bg-transparent text-slate-200 placeholder-slate-500 text-sm lg:text-base font-medium focus:outline-none`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                data-testid="search-input"
              />
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`shrink-0 bg-gradient-to-l from-blue-600 to-blue-500 hover:from-blue-500 hover:to-cyan-400 text-white px-6 lg:px-8 py-2.5 lg:py-3.5 rounded-full text-sm lg:text-base font-bold shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all flex items-center gap-2 ${isRTL ? 'ml-1' : 'mr-1'}`}
              >
                {t('home.analyze')}
              </motion.button>
            </div>
          </motion.div>
        </motion.section>

        {/* HUD Style Filters */}
        <section className="mb-14">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-nowrap overflow-x-auto pb-4 gap-3 lg:gap-4 scrollbar-hide snap-x justify-start md:justify-center"
          >
            {CATEGORIES.map((category) => (
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`snap-center shrink-0 px-5 lg:px-7 py-2.5 lg:py-3 rounded-xl text-xs lg:text-sm font-bold border transition-all duration-300 relative overflow-hidden ${
                  activeCategory === category 
                    ? 'text-white border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.2)] bg-slate-800/50' 
                    : 'bg-slate-900/40 text-slate-400 border-slate-800 hover:border-slate-600 hover:text-slate-200 backdrop-blur-sm'
                }`}
              >
                {activeCategory === category && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 bg-blue-600/20 -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
                <div className="flex items-center gap-2 relative z-10">
                  {activeCategory === category && <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_5px_#60a5fa]" />}
                  <span>{category === CATEGORY_ALL ? t('home.allCategories') : t(`categories.${category}`, { defaultValue: category })}</span>
                </div>
              </motion.button>
            ))}
          </motion.div>
        </section>

        {/* Dashboard Grid Feed */}
        <section className="mb-24 lg:mb-28">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 lg:mb-10 pb-4 border-b border-slate-800/80">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 lg:h-8 bg-blue-500 rounded-full shadow-[0_0_10px_#3b82f6]" />
              <h3 className="text-2xl lg:text-3xl font-black text-white tracking-tight">
                {activeCategory === CATEGORY_ALL ? t('home.recentDataFlow') : `${t('home.dataLabel')} ${t(`categories.${activeCategory}`, { defaultValue: activeCategory })}`}
              </h3>
            </div>
            <motion.div 
              key={filteredNews.length}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-cyan-400 font-mono text-xs lg:text-sm bg-cyan-950/30 border border-cyan-900 px-4 py-1.5 rounded-lg flex items-center gap-2 self-start md:self-auto"
            >
              <Zap className="w-3 h-3" />
              {filteredNews.length} {t('home.records')}
            </motion.div>
          </div>
          
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <AnimatePresence mode='popLayout'>
              {filteredNews.length > 0 ? (
                filteredNews.map((news) => (
                  <NewsCard key={news.id} {...news} />
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="col-span-full flex flex-col items-center justify-center py-20 lg:py-24 glass-panel rounded-3xl border border-dashed border-slate-700 mx-4"
                >
                  <Network className="w-12 h-12 lg:w-16 lg:h-16 text-slate-600 mb-6" />
                  <h4 className="text-xl lg:text-2xl font-bold text-slate-300 mb-3 text-center">{t('home.noResults')}</h4>
                  <p className="text-sm lg:text-base text-slate-500 max-w-md text-center px-4">
                    {t('home.noResultsDesc')}
                  </p>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => { setSearchTerm(''); handleCategoryChange(CATEGORY_ALL); }}
                    className="mt-8 px-6 lg:px-8 py-2.5 lg:py-3 bg-slate-800 text-blue-400 font-bold rounded-xl border border-slate-700 hover:bg-slate-700 hover:text-blue-300 hover:border-blue-500/50 transition-all shadow-lg text-sm lg:text-base"
                  >
                    {t('home.resetMatrix')}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* Futuristic Newsletter */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="relative rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden glass-panel border-slate-700/60 p-1 mx-4 lg:mx-0"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 via-[#030712] to-cyan-900/40 -z-10" />
          <div className="absolute right-0 top-0 w-64 lg:w-96 h-64 lg:h-96 bg-blue-600/10 rounded-full blur-[80px] lg:blur-[100px] -z-10" />
          <div className="absolute left-0 bottom-0 w-64 lg:w-96 h-64 lg:h-96 bg-purple-600/10 rounded-full blur-[80px] lg:blur-[100px] -z-10" />
          
          <div className="bg-slate-950/40 backdrop-blur-sm rounded-[1.8rem] lg:rounded-[2.2rem] p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-10 lg:gap-12">
            <div className="text-white max-w-xl text-center md:text-right z-10 w-full">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black mb-4 lg:mb-5 flex flex-col md:flex-row items-center gap-3 lg:gap-4 justify-center md:justify-start">
                <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 4 }}>
                  <Mail className="w-8 h-8 lg:w-10 lg:h-10 text-cyan-400" />
                </motion.div>
                {t('home.newsletterTitle')}
              </h2>
              <p className="text-slate-400 leading-relaxed text-sm lg:text-lg font-medium">
                {t('home.newsletterSubtitle')}
              </p>
            </div>
            
            <div className="w-full md:w-auto z-10 shrink-0">
              <form className="flex flex-col sm:flex-row gap-3 bg-slate-900/80 p-2 rounded-2xl border border-slate-700 w-full md:w-[480px] shadow-2xl">
                <input 
                  type="email" 
                  placeholder={t('home.emailPlaceholder')}
                  className={`bg-transparent text-slate-200 placeholder-slate-500 px-4 lg:px-5 py-3 focus:outline-none w-full font-medium text-sm lg:text-base text-center ${isRTL ? 'md:text-right' : 'md:text-left'}`}
                  required
                />
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit" 
                  className="bg-blue-600 hover:bg-blue-500 text-white px-6 lg:px-8 py-3 lg:py-3.5 rounded-xl font-bold transition-all whitespace-nowrap shadow-[0_0_15px_rgba(59,130,246,0.4)] text-sm lg:text-base"
                >
                  {t('home.subscribe')}
                </motion.button>
              </form>
              <p className={`text-xs text-slate-500 mt-4 text-center flex items-center justify-center gap-1 ${isRTL ? 'md:text-right md:justify-start' : 'md:text-left md:justify-start'}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {t('home.secureSystem')}
              </p>
            </div>
          </div>
        </motion.section>
      </div>
    </>
  );
}


