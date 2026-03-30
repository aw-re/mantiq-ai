import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowRight, Save, Image as ImageIcon, LayoutTemplate, 
  Tag, Globe, Eye, UploadCloud, Bold, Italic, 
  List, Link as LinkIcon, Quote, Code
} from 'lucide-react';
import { useNewsStore } from '../../store/newsStore';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

export default function AdminPostEditor() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;
  const { t, i18n } = useTranslation();

  const { articles, addArticle, updateArticle } = useNewsStore();
  const articleToEdit = isEditing ? articles.find(a => a.id.toString() === id?.toString()) : null;

  const [title, setTitle] = useState(articleToEdit?.title || '');
  const [content, setContent] = useState(''); // Simulated rich text
  const [category, setCategory] = useState(articleToEdit?.category || 'نماذج اللغات');
  const [status, setStatus] = useState(articleToEdit ? 'published' : 'draft');

  useEffect(() => {
    if (articleToEdit) {
      setTitle(articleToEdit.title);
      setCategory(articleToEdit.category);
    }
  }, [articleToEdit]);

  const categories = ['الكل', 'نماذج اللغات', 'رؤية حاسوبية', 'توليد الصور', 'أتمتة الأعمال'];

  const handleSave = () => {
    if (!title.trim()) {
      toast.error(t('admin.enterTitleFirst'));
      return;
    }
    
    if (isEditing && articleToEdit) {
      updateArticle(articleToEdit.id, { title, category });
      toast.success(t('admin.updateSuccess'));
    } else {
      addArticle({
        id: Date.now(),
        title,
        excerpt: content.substring(0, 100) || t('admin.simulatedExcerpt'),
        content: content || t('admin.simulatedContent'),
        category,
        date: new Date().toISOString().split('T')[0],
        readTime: '5 د',
        author: t('admin.systemAdmin'),
        imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800'
      });
      toast.success(t('admin.addSuccess'));
    }
    navigate('/admin/posts');
  };

  return (
    <div className="max-w-6xl mx-auto pb-12">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/admin/posts')}
            className="p-2 bg-slate-900 text-slate-400 hover:text-white rounded-lg border border-slate-700 hover:border-slate-500 transition-colors"
          >
            <ArrowRight size={20} className={i18n.language === 'ar' ? '' : 'rotate-180'} />
          </button>
          <div>
            <h1 className="text-2xl font-black text-white">
              {isEditing ? t('admin.editArticle') : t('admin.createArticle')}
            </h1>
            <p className="text-sm text-slate-400 mt-1">{t('admin.systemDesc')}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 text-white rounded-xl border border-slate-700 hover:bg-slate-700 transition-colors text-sm font-bold">
            <Eye size={18} />
            {t('admin.preview')}
          </button>
          <button 
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)] text-white rounded-xl transition-colors text-sm font-bold"
          >
            <Save size={18} />
            {status === 'draft' ? t('admin.saveDraft') : t('admin.publishUpdate')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Editor Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-slate-700">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t('admin.titlePlaceholder')}
              className="w-full bg-transparent text-2xl md:text-3xl font-black text-white placeholder-slate-600 focus:outline-none border-b border-transparent focus:border-blue-500/50 pb-4 transition-colors mb-6"
            />

            {/* Simulated Rich Text Toolbar */}
            <div className="flex items-center gap-1 p-2 bg-slate-900 border border-slate-800 rounded-lg mb-4 flex-wrap">
              <button className="p-2 text-slate-400 hover:bg-slate-800 hover:text-white rounded"><Bold size={16} /></button>
              <button className="p-2 text-slate-400 hover:bg-slate-800 hover:text-white rounded"><Italic size={16} /></button>
              <div className="w-px h-5 bg-slate-700 mx-1" />
              <button className="p-2 text-slate-400 hover:bg-slate-800 hover:text-white rounded"><List size={16} /></button>
              <button className="p-2 text-slate-400 hover:bg-slate-800 hover:text-white rounded"><Quote size={16} /></button>
              <button className="p-2 text-slate-400 hover:bg-slate-800 hover:text-white rounded"><Code size={16} /></button>
              <div className="w-px h-5 bg-slate-700 mx-1" />
              <button className="p-2 text-slate-400 hover:bg-slate-800 hover:text-white rounded"><LinkIcon size={16} /></button>
              <button className="p-2 text-slate-400 hover:bg-slate-800 hover:text-white rounded flex items-center gap-1"><ImageIcon size={16} /> <span className="text-[10px]">{t('admin.insertMedia')}</span></button>
            </div>

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={t('admin.contentPlaceholder')}
              className="w-full h-[500px] bg-transparent text-slate-300 placeholder-slate-600 focus:outline-none leading-loose resize-none"
            />
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-700">
             <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
                <Globe className="text-emerald-400 w-5 h-5" />
                <h3 className="text-lg font-bold text-white">{t('admin.seoSettings')}</h3>
             </div>
             <div className="space-y-4">
               <div>
                 <label className="block text-sm text-slate-400 mb-2">{t('admin.metaDesc')}</label>
                 <textarea className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-slate-300 focus:border-emerald-500 focus:outline-none" rows={3}></textarea>
               </div>
               <div>
                 <label className="block text-sm text-slate-400 mb-2">{t('admin.keywords')}</label>
                 <input type="text" placeholder={t('admin.keywordsPlaceholder')} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-slate-300 focus:border-emerald-500 focus:outline-none" />
               </div>
             </div>
          </div>
        </div>

        {/* Sidebar Status & Settings */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-slate-700">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-6">
              <LayoutTemplate className="w-5 h-5 text-blue-400" />
              {t('admin.publishInfo')}
            </h3>
            
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-2">{t('admin.articleStatus')}</label>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setStatus('draft')}
                    className={`py-2 rounded-lg border text-sm font-bold transition-colors ${status === 'draft' ? 'bg-slate-800 border-blue-500/50 text-blue-400' : 'border-slate-800 text-slate-500 hover:border-slate-600'}`}
                  >
                    {t('admin.draft')}
                  </button>
                  <button 
                    onClick={() => setStatus('published')}
                    className={`py-2 rounded-lg border text-sm font-bold transition-colors ${status === 'published' ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' : 'border-slate-800 text-slate-500 hover:border-slate-600'}`}
                  >
                    {t('admin.published')}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-2">{t('admin.category')}</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 text-slate-200 rounded-xl p-3 focus:outline-none focus:border-blue-500"
                >
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-2">{t('admin.customUrl')}</label>
                <div className="flex bg-slate-900 border border-slate-800 rounded-xl overflow-hidden focus-within:border-blue-500">
                  <span className="bg-slate-800 px-3 py-3 text-slate-500 text-sm border-l border-slate-700" dir="ltr">/news/</span>
                  <input type="text" placeholder="custom-article-url" className="w-full bg-transparent px-3 text-sm text-slate-300 focus:outline-none" dir="ltr" />
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-700">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-6">
              <ImageIcon className="w-5 h-5 text-purple-400" />
              {t('admin.coverImage')}
            </h3>
            
            <div className="w-full aspect-video bg-slate-900 border-2 border-dashed border-slate-700 rounded-xl flex flex-col items-center justify-center text-slate-500 hover:border-purple-500/50 hover:bg-slate-800/50 hover:text-purple-400 transition-all cursor-pointer group group-hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] relative overflow-hidden">
               <UploadCloud size={32} className="mb-3 group-hover:scale-110 transition-transform" />
               <span className="text-sm font-medium">{t('admin.dragImage')}</span>
               <span className="text-xs mt-1 text-slate-600">SVG, PNG, JPG (Max 2MB)</span>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-700">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-6">
              <Tag className="w-5 h-5 text-orange-400" />
              {t('admin.tags')}
            </h3>
            <input type="text" placeholder={t('admin.addTag')} className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-slate-300 mb-3 focus:outline-none focus:border-orange-500" />
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-full text-xs text-slate-300 flex items-center gap-1 cursor-pointer hover:border-red-500">
                مفتوح_المصدر &times;
              </span>
              <span className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-full text-xs text-slate-300 flex items-center gap-1 cursor-pointer hover:border-red-500">
                GPT-4 &times;
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



