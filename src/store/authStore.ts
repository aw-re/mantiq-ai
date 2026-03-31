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
        try {
          const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
          });
          
          if (res.ok) {
            const data = await res.json();
            if (data.success && data.user) {
              set({ 
                isAuthenticated: true, 
                user: data.user 
              });
              return true;
            }
          }
          return false;
        } catch (error) {
          console.error('Login error:', error);
          return false;
        }
      },
      logout: () => set({ isAuthenticated: false, user: null }),
    }),
    {
      name: 'mantiq-auth',
    }
  )
);
