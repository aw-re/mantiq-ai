import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useNewsStore } from '../store/newsStore';
import { ArrowRight, ArrowLeft, Calendar, Clock, Share2, Bookmark, ExternalLink, Heart, MessageSquare } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import DecodeText from '../components/DecodeText';

export default function NewsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const articles = useNewsStore(state => state.articles);
  const newsItem = articles.find(n => n.id.toString() === id);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language.startsWith('ar');

  const heroImage = newsItem?.imageUrl || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2000';

  if (!newsItem) {
    return (
      <div className="container mx-auto px-4 w-full h-[60vh] flex flex-col items-center justify-center">
        <Helmet><title>{t('article.notFoundTitle')}</title></Helmet>
        <h1 className="text-4xl text-white font-bold mb-4">{t('article.notFoundCode')}</h1>
        <p className="text-slate-400 mb-8">{t('article.notFoundDesc')}</p>
        <button onClick={() => navigate('/')} className="px-6 py-3 bg-blue-600 text-white rounded-xl">
          {t('article.backToHome')}
        </button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{newsItem.title} | منطق</title>
      </Helmet>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 w-full max-w-4xl pt-6 relative"
      >
      <Helmet>
        <title>{newsItem.title} | {t('header.logo')}</title>
        <meta name="description" content={newsItem.excerpt} />
      </Helmet>

      <button 
        onClick={() => navigate(-1)} 
        className={`flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors group ${isRTL ? 'flex-row' : 'flex-row-reverse self-start w-fit'}`}
      >
        <span>{t('article.goBack')}</span>
        {isRTL ? (
          <ArrowRight className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        ) : (
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        )}
      </button>

      <header className="mb-10">
        <div className={`flex items-center gap-3 mb-6 ${isRTL ? '' : 'flex-row'}`}>
          <span className="px-4 py-1.5 bg-blue-500/10 text-cyan-400 text-sm font-bold border border-blue-500/20 rounded-lg">
            {t(`categories.${newsItem.category}`, { defaultValue: newsItem.category })}
          </span>
          <div className="flex items-center gap-1.5 text-slate-400 font-mono text-sm border-r border-slate-700 mx-2 px-2">
            <Clock className="w-4 h-4" />
            {newsItem.date}
          </div>
          <div className="flex items-center gap-1.5 text-slate-400 text-sm">
            <Calendar className="w-4 h-4" />
            <span>{t('article.today')}</span>
          </div>
        </div>

        <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-6 text-glow">
          <DecodeText text={newsItem.title} speed={25} />
        </h1>

        <p className="text-xl md:text-2xl text-slate-300 leading-relaxed mb-8">
          {newsItem.excerpt}
        </p>

        <div className="relative w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-10 group">
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent z-10" />
          <img 
            src={heroImage} 
            alt={newsItem.title} 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
        </div>

        <div className="flex items-center justify-between py-6 border-y border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-slate-800 border-2 border-slate-700 overflow-hidden relative">
               <div className="absolute inset-0 bg-blue-500/20" />
            </div>
            <div>
              <p className="text-white font-bold">{t('article.authorSystem')}</p>
              <p className="text-slate-500 text-sm">{t('article.authorTeam')}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="p-3 bg-slate-900 rounded-full text-slate-400 hover:text-white hover:bg-blue-600/20 transition-all">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-3 bg-slate-900 rounded-full text-slate-400 hover:text-white hover:bg-blue-600/20 transition-all">
              <Bookmark className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Floating Action Bar */}
      <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 md:translate-x-0 md:bottom-auto md:top-[40vh] ${isRTL ? 'md:left-8 lg:left-24' : 'md:right-8 lg:right-24'} z-40`}>
        <div className="flex md:flex-col gap-3 p-3 bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl">
          <button className="p-3 bg-slate-800/50 rounded-xl text-slate-400 hover:text-pink-500 hover:bg-pink-500/10 transition-all flex flex-col items-center gap-1 group">
            <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold">24</span>
          </button>
          <button className="p-3 bg-slate-800/50 rounded-xl text-slate-400 hover:text-blue-500 hover:bg-blue-500/10 transition-all flex flex-col items-center gap-1 group">
            <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-semibold">12</span>
          </button>
          <button className="p-3 bg-slate-800/50 rounded-xl text-slate-400 hover:text-cyan-500 hover:bg-cyan-500/10 transition-all group">
            <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
          <button className="p-3 bg-slate-800/50 rounded-xl text-slate-400 hover:text-yellow-500 hover:bg-yellow-500/10 transition-all group">
            <Bookmark className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>

      {newsItem.content ? (
        <div 
          className="prose prose-invert prose-blue max-w-none text-slate-300 text-lg md:text-xl leading-loose mb-16
          [&>p]:mb-6 [&>h2]:text-3xl [&>h2]:font-bold [&>h2]:mb-6 [&>h2]:mt-10 [&>h2]:text-white 
          [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:mb-4 [&>h3]:mt-8 [&>h3]:text-slate-200
          [&>ul]:list-disc [&>ul]:pl-6 [&>ol]:list-decimal [&>ol]:pl-6
          [&>blockquote]:border-l-4 [&>blockquote]:border-blue-500 [&>blockquote]:pl-6 [&>blockquote]:italic [&>blockquote]:text-slate-400"
          dangerouslySetInnerHTML={{ __html: newsItem.content }}
        />
      ) : (
      <div className="prose prose-invert prose-blue max-w-none text-slate-300 text-lg leading-loose mb-16">
        <p>
          شهدت أسواق التكنولوجيا وتطوير البرمجيات ثورة جديدة اليوم حيث أعلنت كبرى الشركات عن نماذج لغوية متقدمة. تفاصيل هذا التحديث تشير إلى أن التطوير لم يعد مقتصراً على الشركات الكبرى بل أصبح متاحاً للمطورين المستقلين عبر واجهات برمجية محسنة...
        </p>
        <p>
          يعد {newsItem.category} من أكثر المجالات التي ستتأثر إيجاباً بهذه التغييرات الجذرية، ويتوقع محللو البيانات أن يكون هناك زيادة ملحوظة في سرعة الإنتاجية وتقليل في معدل الأخطاء البرمجية.
        </p>
        <div className="my-10 p-8 glass-panel rounded-2xl border-l-4 border-blue-500 bg-blue-950/20 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-32 h-32 bg-blue-500/10 blur-[40px] rounded-full" />
          <p className="text-xl font-medium text-white m-0 relative z-10">
            "نحن لا نبني فقط أدوات متقدمة، بل نساهم في إنشاء بيئات تطوير تعتمد بشكل مباشر على إمكانيات الذكاء الاصطناعي لتقليل الفجوة التقنية."
          </p>
        </div>
        <p>
          ختاماً، يمكننا القول أن المستقبل القريب سيشهد اعتماداً أوسع وأكثر تخصيصاً للذكاء الاصطناعي لحل المشكلات المعقدة بكفاءة غير مسبوقة.
        </p>
      </div>      )}

      {/* Fake Author Bio */}
      <div className="bg-slate-800/30 border border-slate-700/50 rounded-3xl p-8 mb-16 flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-start">
        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 border-4 border-slate-800 overflow-hidden shrink-0 flex items-center justify-center text-3xl font-bold text-white shadow-xl">
          AI
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">{t('article.authorSystem', 'Mantiq AI Team')}</h3>
          <p className="text-slate-400 mb-4 leading-relaxed">
            {t('article.authorBio', 'We are a group of AI enthusiasts and developers dedicated to bringing the latest news, models, and tools to the AI community.')}
          </p>
          <button className="px-5 py-2 bg-slate-800 hover:bg-blue-600 border border-slate-700 transition-all text-white rounded-lg text-sm font-semibold">
            {t('article.viewAllArticles', 'View All Articles')}
          </button>
        </div>
      </div>
      <div className="flex justify-center mb-24">
         <button className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-xl hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all">
           قراءة المصدر الأصلي للمقال
           <ExternalLink className="w-5 h-5" />
         </button>
      </div>

    </motion.article>
    </>
  );
}


