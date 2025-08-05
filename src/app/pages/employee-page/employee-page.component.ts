// app/pages/employee-page/employee-page.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importar CommonModule para *ngIf, *ngFor, DatePipe, ngClass
import { RouterModule } from '@angular/router'; // Importar RouterModule para routerLink
import { FormsModule } from '@angular/forms'; // Importar FormsModule para (input) e [value]
import { Employee } from '../../types/employee.model';
import { mockEmployees } from '../../mock/employees.mock';
// Importar os componentes filhos standalone
import { EmployeeFilterComponent } from '../../components/employee/employee-filter/employee-filter.component';
import { EmployeeDeleteModalComponent } from '../../components/employee/employee-delete-modal/employee-delete-modal.component';


interface EmployeeFilters {
  search?: string;
  departmentId?: number;
  position?: string;
  isActive?: boolean;
  admissionDateFrom?: string;
  admissionDateTo?: string;
}

@Component({
  selector: 'app-employee-page',
  standalone: true, // Confirmado como standalone
  imports: [
    CommonModule, // Fornece *ngIf, *ngFor, DatePipe, ngClass
    RouterModule, // Fornece routerLink
    FormsModule, // Para (input) e [value]
    EmployeeFilterComponent, // Componente filho standalone
    EmployeeDeleteModalComponent // Componente filho standalone
  ],
  templateUrl: './employee-page.component.html',
  styleUrls: ['./employee-page.component.css'] // Certifique-se de que o arquivo é .css
})
export class EmployeePageComponent implements OnInit {
  employees: Employee[] = [];
  query = '';
  filters: EmployeeFilters = {};
  selectedEmployeeToDelete: Employee | null = null;

  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees(): void {
    let filtered = [...mockEmployees];

    const q = this.query.toLowerCase();
    if (this.query) {
      filtered = filtered.filter(emp =>
        emp.name.toLowerCase().includes(q) ||
        emp.email.toLowerCase().includes(q) ||
        emp.cpf.includes(q) ||
        emp.phone?.includes(q)
      );
    }

    Object.entries(this.filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (key === 'isActive') {
          filtered = filtered.filter(emp => emp.isActive === value);
        } else if (key === 'departmentId') {
          filtered = filtered.filter(emp => emp.department?.id === value);
        } else if (key === 'position') {
          filtered = filtered.filter(emp => emp.position === value);
        } else if (key === 'admissionDateFrom') {
          filtered = filtered.filter(emp => new Date(emp.admissionDate) >= new Date(value));
        } else if (key === 'admissionDateTo') {
          filtered = filtered.filter(emp => new Date(emp.admissionDate) <= new Date(value));
        } else if (key === 'search') {
          const qFilter = (value as string).toLowerCase();
          filtered = filtered.filter(emp =>
            emp.name.toLowerCase().includes(qFilter) ||
            emp.email.toLowerCase().includes(qFilter) ||
            emp.cpf.includes(qFilter) ||
            emp.phone?.includes(qFilter)
          );
        }
      }
    });

    this.employees = filtered;
  }

  onQueryChange(event: Event) {
    this.query = (event.target as HTMLInputElement).value;
    this.fetchEmployees();
  }

  onFilterChange(filters: EmployeeFilters) {
    this.filters = filters;
    this.fetchEmployees();
  }

  openDeleteModal(emp: Employee) {
    this.selectedEmployeeToDelete = emp;
  }

  closeDeleteModal() {
    this.selectedEmployeeToDelete = null;
  }

  confirmDelete() {
    if (!this.selectedEmployeeToDelete) return;
    const index = mockEmployees.findIndex(e => e.id === this.selectedEmployeeToDelete!.id);
    if (index !== -1) {
      mockEmployees.splice(index, 1);
      alert('Funcionário deletado com sucesso!');
      this.fetchEmployees();
    }
    this.closeDeleteModal();
  }

  toggleActiveStatus(emp: Employee) {
    const index = mockEmployees.findIndex(e => e.id === emp.id);
    if (index !== -1) {
      mockEmployees[index].isActive = !mockEmployees[index].isActive;
      alert(`Status do funcionário ${emp.name} alterado para ${mockEmployees[index].isActive ? 'Ativo' : 'Inativo'}.`);
      this.fetchEmployees();
    }
  }
}
