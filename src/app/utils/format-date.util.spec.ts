// src/app/utils/format-date.util.spec.ts

import { formatDate } from './format-date.util';

describe('formatDate util', () => {

  it('should format a Date object to "DD/MM/YYYY"', () => {
    const date = new Date('2025-08-21T10:30:00');
    const formatted = formatDate(date);
    expect(formatted).toBe('21/08/2025');
  });

  it('should format a string date to "DD/MM/YYYY"', () => {
    const dateStr = '2025-08-21T10:30:00';
    const formatted = formatDate(dateStr);
    expect(formatted).toBe('21/08/2025');
  });

  it('should handle a date string with only date (YYYY-MM-DD)', () => {
    const dateStr = '2025-08-21';
    const formatted = formatDate(dateStr);
    expect(formatted).toBe('21/08/2025');
  });

});
