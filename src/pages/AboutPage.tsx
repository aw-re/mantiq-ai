import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { BrainCircuit, Code, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function AboutPage() {
  const { t } = useTranslation();

  const features = [
    {
      icon: <BrainCircuit className="w-8 h-8 text-blue-400" />,
      title: t('about.f1Title'),
      desc: t('about.f1Desc')
    },
    {
      icon: <Code className="w-8 h-8 text-emerald-400" />,
      title: t('about.f2Title'),
      desc: t('about.f2Desc')
    },
    {
      icon: <Users className="w-8 h-8 text-purple-400" />,
      title: t('about.f3Title'),
      desc: t('about.f3Desc')
    }
  ];

  return (
    <div className="container mx-auto px-4 w-full">
      <Helmet>
        <title>{t('about.title')} | {t('header.logo')}</title>
        <meta name="description" content={t('about.metaDesc')} />
      </Helmet>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-black text-white mb-6 text-glow">{t('about.h1')}</h1>
        <p className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
          {t('about.p')}
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


