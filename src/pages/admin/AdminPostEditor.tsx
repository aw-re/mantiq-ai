import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowRight, Save, Image as ImageIcon, LayoutTemplate, 
  Tag, Globe, Eye, UploadCloud, Bold, Italic, 
  List, Link as LinkIcon, Quote, Code
} from 'lucide-react';
import { useNewsStore } from '../../store/newsStore';
import { toast } from 'sonner';

export default function AdminPostEditor() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

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
      toast.error('أدخل العنوان أولاً');
      return;
    }
    
    if (isEditing && articleToEdit) {
      updateArticle(articleToEdit.id, { title, category });
      toast.success('تم تحديث المحتوى بنجاح');
    } else {
      addArticle({
        id: Date.now(),
        title,
        excerpt: content.substring(0, 100) || 'محتوى تجريبي مقطع..',
        content: content || 'محتوى تجريبي كامل..',
        category,
        date: new Date().toISOString().split('T')[0],
        readTime: '5 د',
        author: 'مدير النظام',
        imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800'
      });
      toast.success('تمت إضافة المحتوى بنجاح');
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
            <ArrowRight size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-black text-white">
              {isEditing ? 'تعديل المقال' : 'إنشاء مقال جديد'}
            </h1>
            <p className="text-sm text-slate-400 mt-1">نظام تحرير وإدارة المحتوى المتقدم</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 text-white rounded-xl border border-slate-700 hover:bg-slate-700 transition-colors text-sm font-bold">
            <Eye size={18} />
            معاينة
          </button>
          <button 
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)] text-white rounded-xl transition-colors text-sm font-bold"
          >
            <Save size={18} />
            {status === 'draft' ? 'حفظ كمسودة' : 'نشر التحديث'}
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
              placeholder="عنوان المقال الرئيسي (يفضل أن يكون جذاباً وضع فيه الكلمات المفتاحية)..."
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
              <button className="p-2 text-slate-400 hover:bg-slate-800 hover:text-white rounded flex items-center gap-1"><ImageIcon size={16} /> <span className="text-[10px]">إدراج وسائط</span></button>
            </div>

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="ابدأ بكتابة المحتوى هنا، يمكنك استخدام لغة Markdown للتنسيق..."
              className="w-full h-[500px] bg-transparent text-slate-300 placeholder-slate-600 focus:outline-none leading-loose resize-none"
            />
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-700">
             <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
                <Globe className="text-emerald-400 w-5 h-5" />
                <h3 className="text-lg font-bold text-white">إعدادات محركات البحث (SEO)</h3>
             </div>
             <div className="space-y-4">
               <div>
                 <label className="block text-sm text-slate-400 mb-2">الوصف التعريفي (Meta Description)</label>
                 <textarea className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-slate-300 focus:border-emerald-500 focus:outline-none" rows={3}></textarea>
               </div>
               <div>
                 <label className="block text-sm text-slate-400 mb-2">الكلمات الدلالية المفتاحية (Keywords)</label>
                 <input type="text" placeholder="الذكاء الاصطناعي, نماذج اللغة, تقنيات..." className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-slate-300 focus:border-emerald-500 focus:outline-none" />
               </div>
             </div>
          </div>
        </div>

        {/* Sidebar Status & Settings */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-slate-700">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-6">
              <LayoutTemplate className="w-5 h-5 text-blue-400" />
              معلومات النشر
            </h3>
            
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-2">حالة المقال</label>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setStatus('draft')}
                    className={`py-2 rounded-lg border text-sm font-bold transition-colors ${status === 'draft' ? 'bg-slate-800 border-blue-500/50 text-blue-400' : 'border-slate-800 text-slate-500 hover:border-slate-600'}`}
                  >
                    مسودة
                  </button>
                  <button 
                    onClick={() => setStatus('published')}
                    className={`py-2 rounded-lg border text-sm font-bold transition-colors ${status === 'published' ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' : 'border-slate-800 text-slate-500 hover:border-slate-600'}`}
                  >
                    منشور
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-2">التصنيف</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 text-slate-200 rounded-xl p-3 focus:outline-none focus:border-blue-500"
                >
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-2">الرابط المخصص (Slug)</label>
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
              صورة الغلاف
            </h3>
            
            <div className="w-full aspect-video bg-slate-900 border-2 border-dashed border-slate-700 rounded-xl flex flex-col items-center justify-center text-slate-500 hover:border-purple-500/50 hover:bg-slate-800/50 hover:text-purple-400 transition-all cursor-pointer group group-hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] relative overflow-hidden">
               <UploadCloud size={32} className="mb-3 group-hover:scale-110 transition-transform" />
               <span className="text-sm font-medium">اسحب الصورة أو انقر للرفع</span>
               <span className="text-xs mt-1 text-slate-600">SVG, PNG, JPG (Max 2MB)</span>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-700">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-6">
              <Tag className="w-5 h-5 text-orange-400" />
              الوسوم
            </h3>
            <input type="text" placeholder="أضف وسماً واضغط Enter..." className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-slate-300 mb-3 focus:outline-none focus:border-orange-500" />
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



