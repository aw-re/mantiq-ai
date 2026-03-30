import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, FileText, Settings, Users, LogOut, ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function AdminLayout() {
  const location = useLocation();

  const menuItems = [
    { name: 'لوحة التحكم', path: '/admin', icon: <LayoutDashboard size={20} /> },
    { name: 'إدارة المقالات', path: '/admin/posts', icon: <FileText size={20} /> },
    { name: 'الأعضاء', path: '/admin/users', icon: <Users size={20} /> },
    { name: 'الإعدادات', path: '/admin/settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-[#030712] flex font-sans" dir="rtl">
      <Helmet>
        <title>لوحة الإدارة | النظام المركزي</title>
      </Helmet>

      {/* Sidebar */}
      <aside className="w-64 glass-panel border-l border-slate-800 flex flex-col fixed inset-y-0 right-0 z-20">
        <div className="p-6 border-b border-slate-800">
          <Link to="/" className="flex items-center gap-3 text-white hover:text-blue-400 transition-colors">
            <ArrowRight size={20} />
            <span className="font-bold text-lg">العودة للموقع</span>
          </Link>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-blue-600 text-white font-bold shadow-[0_0_15px_rgba(59,130,246,0.3)]' 
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors">
            <LogOut size={20} />
            <span className="font-bold">تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 mr-64">
        <header className="h-20 glass-panel border-b border-slate-800 flex items-center justify-between px-8 sticky top-0 z-10">
          <h2 className="text-xl font-black text-white">النظام المركزي للبيانات</h2>
          <div className="flex items-center gap-4 text-slate-300">
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-600"></div>
            <span>المدير العام</span>
          </div>
        </header>

        <motion.div 
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8"
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
}

