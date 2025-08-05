// src/app/mock/positions.mock.ts

import { Position } from '../types/position.model';

export const mockPositions: Position[] = [
  'Desenvolvedor',
  'Analista',
  'Gerente',
  'Estagiário',
  'Outro',
];

export async function getMockPositions(): Promise<Position[]> {
  return mockPositions;
}
