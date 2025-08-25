// src/app/utils/formatters.util.spec.ts

import { formatDate, formatCurrency, formatEnum } from './formatters.util';

describe('formatters.util', () => {

  describe('formatDate', () => {
    it('should format a Date object correctly', () => {
      const date = new Date('2025-08-21');
      expect(formatDate(date)).toBe('21/08/2025');
    });

    it('should format a date string correctly', () => {
      const dateStr = '2025-12-31';
      expect(formatDate(dateStr)).toBe('31/12/2025');
    });
  });

  describe('formatCurrency', () => {
    it('should format a number as BRL currency', () => {
      expect(formatCurrency(1234.56)).toBe('R$ 1.234,56');
    });

    it('should format zero correctly', () => {
      expect(formatCurrency(0)).toBe('R$ 0,00');
    });
  });

  describe('formatEnum', () => {
    it('should format camelCase or PascalCase to spaced capitalized words', () => {
      expect(formatEnum('Manager')).toBe('Manager');
      expect(formatEnum('SeniorDeveloper')).toBe('Senior Developer');
      expect(formatEnum('veryComplexEnumValue')).toBe('Very Complex Enum Value');
    });

    it('should handle single letter enums', () => {
      expect(formatEnum('X')).toBe('X');
    });

    it('should trim leading/trailing spaces', () => {
      expect(formatEnum('  LeadingSpace')).toBe('Leading Space');
    });
  });

});
