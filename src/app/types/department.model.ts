// src/app/types/department.model.ts

export interface Department {
  id: number;
  name: string;
}

// Para formulários, permitir valor vazio (seleção "Nenhum")
export type DepartmentFormValue = Department | undefined;
