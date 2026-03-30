import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit2, Trash2, Search, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNewsStore } from '../../store/newsStore';
import { toast } from 'sonner';

export default function AdminPosts() {
  const articles = useNewsStore(state => state.articles);
  const deleteArticle = useNewsStore(state => state.deleteArticle);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = articles.filter(post => 
    post.title.includes(searchTerm) || post.category.includes(searchTerm)
  );

  const handleDelete = (id: string | number) => {
    if (confirm('تأكيد الحذف؟')) {
      deleteArticle(id);
      toast.success('تم حذف الصفحة/المقال بنجاح');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black text-white">إدارة المقالات والصفحات</h1>
        <Link to="/admin/posts/new" className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-colors shadow-[0_0_15px_rgba(59,130,246,0.3)]">
          <Plus size={20} />
          إنشاء صفحة جديدة
        </Link>
      </div>

      <div className="glass-panel rounded-2xl border border-slate-700 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-700 bg-slate-900/50 flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
            <input 
              type="text" 
              placeholder="ابحث عن مقال أو صفحة..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 text-white rounded-lg pl-4 pr-10 py-2 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Table representation */}
        <div className="overflow-x-auto">
          <table className="w-full text-right text-slate-300">
            <thead className="bg-slate-900 text-slate-400 text-sm">
              <tr>
                <th className="px-6 py-4 font-semibold">العنوان</th>
                <th className="px-6 py-4 font-semibold">التصنيف</th>
                <th className="px-6 py-4 font-semibold">تاريخ النشر</th>
                <th className="px-6 py-4 font-semibold">الحالة</th>
                <th className="px-6 py-4 font-semibold">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-sm">
              {filteredPosts.map((post) => (
                <motion.tr 
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  key={post.id} 
                  className="hover:bg-slate-800/30 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-white max-w-xs truncate">{post.title}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-slate-800 rounded-full text-xs text-blue-400 border border-slate-700">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400 whitespace-nowrap">{post.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-emerald-400">
                      <CheckCircle size={16} />
                      <span>منشور</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Link to={`/admin/posts/${post.id}`} className="text-slate-400 hover:text-blue-400 transition-colors">
                        <Edit2 size={18} />
                      </Link>
                      <button 
                        onClick={() => handleDelete(post.id)}
                        className="text-slate-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          {filteredPosts.length === 0 && (
            <div className="p-8 text-center text-slate-500">
              لا توجد صفحات مطابقة لبحثك.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


