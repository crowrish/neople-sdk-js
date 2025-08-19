// Jest setup file
import { TextEncoder, TextDecoder } from 'util';

// Polyfill for Node.js environment
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as any;

// Mock fetch for older Node.js versions if needed
if (!global.fetch) {
  global.fetch = jest.fn();
}

// Global test timeout
jest.setTimeout(10000);

// Comprehensive cleanup after each test
afterEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
  jest.clearAllTimers();
  jest.useRealTimers();
  jest.resetModules();
});

// Final cleanup after all tests
afterAll(async () => {
  // Clear all mocks and timers
  jest.clearAllMocks();
  jest.restoreAllMocks();
  jest.clearAllTimers();
  jest.useRealTimers();
  
  // Allow any remaining async operations to complete
  await new Promise(resolve => {
    setImmediate(resolve);
  });
  
  // Additional cleanup for Node.js environment
  await new Promise(resolve => setTimeout(resolve, 10));
});