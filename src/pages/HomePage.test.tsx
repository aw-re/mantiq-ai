import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import HomePage from './HomePage';
import { CATEGORIES } from '../data/news';

const renderWithProviders = (component: React.ReactNode) => {
  return render(
    <HelmetProvider>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </HelmetProvider>
  );
};

describe('HomePage', () => {
  it('renders all main elements', () => {
    renderWithProviders(<HomePage />);
    expect(screen.getByText(/اكتشف أبعاد/i)).toBeDefined();
    expect(screen.getByTestId('search-input')).toBeDefined();
  });

  it('renders all category filters', () => {
    renderWithProviders(<HomePage />);
    CATEGORIES.forEach(category => {
      expect(screen.getAllByText(category).length).toBeGreaterThan(0);
    });
  });

  it('filters news by category', () => {
    renderWithProviders(<HomePage />);
    const buttons = screen.getAllByRole('button');
    const specificCategory = CATEGORIES[1]; // First actual category after 'الكل'
    
    const categoryButton = buttons.find(b => b.textContent?.includes(specificCategory));
    if (categoryButton) {
      fireEvent.click(categoryButton);
      expect(screen.getByText(`بيانات: ${specificCategory}`)).toBeDefined();
    }
  });

  it('shows no results message when search fails', () => {
    renderWithProviders(<HomePage />);
    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'xxyyzz_no_match' } });
    
    expect(screen.getByText('لا توجد نتائج مطابقة')).toBeDefined();
  });
});


