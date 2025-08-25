// src/app/mock/positions.mock.spec.ts

import { mockPositions, getMockPositions } from './positions.mock';

describe('positions.mock', () => {
  it('mockPositions deve conter posições esperadas', () => {
    expect(mockPositions).toContain('Desenvolvedor');
    expect(mockPositions).toContain('Analista');
    expect(mockPositions.length).toBe(5);
  });

  it('getMockPositions deve retornar array de posições', async () => {
    const positions = await getMockPositions();
    expect(positions).toEqual(mockPositions);
    expect(positions.length).toBe(5);
  });
});
