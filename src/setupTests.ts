import '@testing-library/jest-dom';

// Mock IntersectionObserver for testing Framer Motion's whileInView
const IntersectionObserverMock = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: IntersectionObserverMock,
});
