// src/app/utils/format-status.util.spec.ts

import { formatStatus } from './format-status.util';

describe('formatStatus util', () => {

  it('should return "Ativo" when true is passed', () => {
    expect(formatStatus(true)).toBe('Ativo');
  });

  it('should return "Inativo" when false is passed', () => {
    expect(formatStatus(false)).toBe('Inativo');
  });

});
