import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MOCK_NEWS, NewsArticle } from '../data/news';

interface NewsState {
  articles: NewsArticle[];
  addArticle: (article: NewsArticle) => void;
  updateArticle: (id: string | number, updated: Partial<NewsArticle>) => void;
  deleteArticle: (id: string | number) => void;
}

export const useNewsStore = create<NewsState>()(
  persist(
    (set) => ({
      articles: MOCK_NEWS,
      addArticle: (article) => set((state) => ({ articles: [article, ...state.articles] })),
      updateArticle: (id, updated) => set((state) => ({
        articles: state.articles.map((a) => 
          a.id.toString() === id.toString() ? { ...a, ...updated } : a
        )
      })),
      deleteArticle: (id) => set((state) => ({
        articles: state.articles.filter((a) => a.id.toString() !== id.toString())
      }))
    }),
    { name: 'ai-news-storage' }
  )
);
