// src/app/utils/format-enum.util.spec.ts

import { formatGender, formatPosition } from './format-enum.util';

describe('formatGender util', () => {
  
  it('should return "Masculino" for "Male"', () => {
    expect(formatGender('Male')).toBe('Masculino');
  });

  it('should return "Feminino" for "Female"', () => {
    expect(formatGender('Female')).toBe('Feminino');
  });

  it('should return "Outro" for "Other"', () => {
    expect(formatGender('Other')).toBe('Outro');
  });

  it('should return "Desconhecido" for unknown values', () => {
    expect(formatGender('')).toBe('Desconhecido');
    expect(formatGender('Unknown')).toBe('Desconhecido');
  });

});

describe('formatPosition util', () => {

  it('should return "Gerente" for "Manager"', () => {
    expect(formatPosition('Manager')).toBe('Gerente');
  });

  it('should return "Desenvolvedor" for "Developer"', () => {
    expect(formatPosition('Developer')).toBe('Desenvolvedor');
  });

  it('should return "Outro" for unknown values', () => {
    expect(formatPosition('Intern')).toBe('Outro');
    expect(formatPosition('')).toBe('Outro');
  });

});
