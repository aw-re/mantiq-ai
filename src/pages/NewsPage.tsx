import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useNewsStore } from '../store/newsStore';
import { ArrowRight, ArrowLeft, Calendar, Clock, Share2, Bookmark, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function NewsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const articles = useNewsStore(state => state.articles);
  const newsItem = articles.find(n => n.id.toString() === id);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language.startsWith('ar');

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
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto px-4 w-full max-w-4xl"
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
          {newsItem.title}
        </h1>

        <p className="text-xl text-slate-300 leading-relaxed mb-8">
          {newsItem.excerpt}
        </p>

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
      </div>

      <div className="flex justify-center mb-24">
         <button className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold rounded-xl hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all">
           قراءة المصدر الأصلي للمقال
           <ExternalLink className="w-5 h-5" />
         </button>
      </div>

    </motion.article>
  );
}


