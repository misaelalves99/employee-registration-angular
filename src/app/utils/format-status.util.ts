// src/app/utils/format-status.util.ts

export function formatStatus(isActive: boolean): string {
  return isActive ? 'Ativo' : 'Inativo';
}
