// src/tests/unit/dummy.test.ts
describe('Dummy Test Suite', () => {
    it('should pass', () => {
      expect(true).toBe(true);
    });
    
    it('runs the test', () => {
      const result = 1 + 1;
      expect(result).toBe(2);
    });
  
    it('checks for number type', () => {
      const value = 123;
      expect(typeof value).toBe('number');
    });
  });