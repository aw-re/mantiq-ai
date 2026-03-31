import { create } from 'zustand';
import { NewsArticle } from '../data/news';

interface NewsState {
  articles: NewsArticle[];
  fetchArticles: () => Promise<void>;
  addArticle: (article: NewsArticle) => Promise<void>;
  updateArticle: (id: string | number, updated: Partial<NewsArticle>) => Promise<void>;
  deleteArticle: (id: string | number) => Promise<void>;
}

export const useNewsStore = create<NewsState>()((set) => ({
  articles: [],
  fetchArticles: async () => {
    try {
      const res = await fetch('/api/articles');
      if (res.ok) {
        const data = await res.json();
        set({ articles: data });
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  },
  addArticle: async (article) => {
    try {
      const res = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(article),
      });
      if (res.ok) {
        const newArticle = await res.json();
        set((state) => ({ articles: [newArticle, ...state.articles] }));
      }
    } catch (error) {
      console.error('Error adding article:', error);
    }
  },
  updateArticle: async (id, updated) => {
    try {
      const res = await fetch(`/api/articles/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
      if (res.ok) {
        set((state) => ({
          articles: state.articles.map((a) => 
            a.id.toString() === id.toString() ? { ...a, ...updated } : a
          )
        }));
      }
    } catch (error) {
      console.error('Error updating article:', error);
    }
  },
  deleteArticle: async (id) => {
    try {
      const res = await fetch(`/api/articles/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        set((state) => ({
          articles: state.articles.filter((a) => a.id.toString() !== id.toString())
        }));
      }
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  }
}));
