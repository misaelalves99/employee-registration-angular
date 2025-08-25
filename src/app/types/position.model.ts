// src/app/types/position.model.ts

export const POSITIONS = [
  'Desenvolvedor',
  'Analista',
  'Gerente',
  'Estagiário',
  'Outro',
] as const;

export type Position = typeof POSITIONS[number];
export type PositionFormValue = '' | Position;
export const POSITIONS_MUTABLE: Position[] = [...POSITIONS];
