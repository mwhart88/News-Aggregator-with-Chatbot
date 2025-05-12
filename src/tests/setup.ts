import '@testing-library/jest-dom';

// Mock IntersectionObserver
class MockIntersectionObserver {
  readonly root: Element | null;
  readonly rootMargin: string;
  readonly thresholds: ReadonlyArray<number>;
  
  constructor() {
    this.root = null;
    this.rootMargin = '';
    this.thresholds = [];
  }
  
  disconnect() {
    return null;
  }
  
  observe() {
    return null;
  }
  
  takeRecords() {
    return [];
  }
  
  unobserve() {
    return null;
  }
}

global.IntersectionObserver = MockIntersectionObserver;