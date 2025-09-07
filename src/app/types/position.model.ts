// src/app/types/position.model.ts

// Cargos fixos iniciais
export const POSITIONS = [
  'Desenvolvedor',
  'Analista',
  'Gerente',
  'Estagiário',
  'Outro',
] as const;

// Tipo para cargos (string literal para os fixos)
export type FixedPosition = typeof POSITIONS[number];

// Tipo geral de posição (permite cargos adicionais)
export type Position = string;

// Tipo de valor de formulário (permite vazio)
export type PositionFormValue = '' | Position;

// Lista mutável de posições para adicionar novos cargos
export const POSITIONS_MUTABLE: Position[] = [...POSITIONS];
