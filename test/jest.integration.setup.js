// Integration test setup
// This file runs before all integration tests

// Ensure we're running against sandbox
if (!process.env.NEXT_PUBLIC_LOCATION) {
  process.env.NEXT_PUBLIC_LOCATION = 'gray';
}

// Suppress console logs unless there's an error
const originalConsoleLog = console.log;
const originalConsoleError = console.error;

global.console = {
  ...console,
  log: (...args) => {
    if (process.env.VERBOSE_TESTS === 'true') {
      originalConsoleLog(...args);
    }
  },
  error: (...args) => {
    originalConsoleError(...args);
  },
};

// Log test environment info
beforeAll(() => {
  console.error('\n🧪 Running Integration Tests');
  console.error(`📍 Location: ${process.env.NEXT_PUBLIC_LOCATION}`);
  console.error(`🔧 Make sure Amplify sandbox is running: npm run sandbox\n`);
});
