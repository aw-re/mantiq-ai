import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  isAuthenticated: boolean;
  user: { name: string; email: string; role: string } | null;
  login: (email: string, pass: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      login: async (email, password) => {
        // يتم محاكاة اتصال بالخادم (سيتم استبداله بـ API لاحقاً)
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // بيانات تجريبية (Admin)
        if (email === 'admin@mantiq.ai' && password === 'admin123') {
          set({ 
            isAuthenticated: true, 
            user: { name: 'المدير العام', email, role: 'admin' } 
          });
          return true;
        }
        return false;
      },
      logout: () => set({ isAuthenticated: false, user: null }),
    }),
    {
      name: 'mantiq-auth',
    }
  )
);
