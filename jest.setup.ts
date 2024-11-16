import '@testing-library/jest-dom';
import 'whatwg-fetch';
import { TextEncoder, TextDecoder } from 'util';
import { useRouter } from 'next/router';

// Extend Jest matchers
declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveBeenCalledExactlyOnceWith(...args: any[]): R;
    }
  }
}

// Setup global mocks
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock next/router
jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

// Setup default router mock implementation
const mockUseRouter = useRouter as jest.Mock;
mockUseRouter.mockImplementation(() => ({
  push: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
  back: jest.fn(),
  pathname: '/',
  query: {},
  asPath: '/',
  route: '/',
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt || ''} />;
  },
}));

// Mock next-auth
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(() => ({ data: null, status: 'unauthenticated' })),
  signIn: jest.fn(),
  signOut: jest.fn(),
  getSession: jest.fn(),
}));

// Mock redux (since you're using @reduxjs/toolkit)
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

// Mock mongoose (optional - uncomment if you need it)
/*
jest.mock('mongoose', () => ({
  connect: jest.fn(),
  connection: {
    on: jest.fn(),
    once: jest.fn(),
  },
}));
*/

// Suppress specific console messages
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;
console.error = (...args: any[]) => {
  if (
    typeof args[0] === 'string' &&
    (args[0].includes('Warning: ReactDOM.render is no longer supported') ||
     args[0].includes('Error: Uncaught [Error: expected]'))
  ) {
    return;
  }
  originalConsoleError.call(console, ...args);
};

console.warn = (...args: any[]) => {
  if (
    typeof args[0] === 'string' &&
    args[0].includes('React.createFactory()')
  ) {
    return;
  }
  originalConsoleWarn.call(console, ...args);
};

// Clean up after each test
afterEach(() => {
  jest.clearAllMocks();
});

// Reset all mocks before each test
beforeEach(() => {
  // Reset router mock
  mockUseRouter.mockImplementation(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    pathname: '/',
    query: {},
    asPath: '/',
    route: '/',
    events: {
      on: jest.fn(),
      off: jest.fn(),
      emit: jest.fn(),
    },
  }));
});

// Add custom matcher
expect.extend({
  toHaveBeenCalledExactlyOnceWith(received: jest.Mock, ...expectedArgs: any[]) {
    const pass = received.mock.calls.length === 1 &&
      JSON.stringify(received.mock.calls[0]) === JSON.stringify(expectedArgs);
    
    return {
      pass,
      message: () => pass
        ? `Expected ${received.getMockName()} not to have been called exactly once with ${expectedArgs}`
        : `Expected ${received.getMockName()} to have been called exactly once with ${expectedArgs}`,
    };
  },
});