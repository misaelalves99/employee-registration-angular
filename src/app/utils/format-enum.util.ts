// src/app/utils/format-enum.util.ts

export function formatGender(gender: string): string {
  switch (gender) {
    case 'Male': return 'Masculino';
    case 'Female': return 'Feminino';
    case 'Other': return 'Outro';
    default: return 'Desconhecido';
  }
}

export function formatPosition(position: string): string {
  switch (position) {
    case 'Manager': return 'Gerente';
    case 'Developer': return 'Desenvolvedor';
    default: return 'Outro';
  }
}
