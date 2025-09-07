// app/pages/employee-page/employee-page.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../types/employee.model';
import { EmployeeService } from '../../services/employee.service';
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
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    EmployeeFilterComponent,
    EmployeeDeleteModalComponent
  ],
  templateUrl: './employee-page.component.html',
  styleUrls: ['./employee-page.component.css']
})
export class EmployeePageComponent implements OnInit {
  employees: Employee[] = [];
  query = '';
  filters: EmployeeFilters = {};
  selectedEmployeeToDelete: Employee | null = null;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees(): void {
    let filtered = [...this.employeeService.getAllEmployees()];

    // Filtro de busca
    if (this.query) {
      const q = this.query.toLowerCase();
      filtered = filtered.filter(emp =>
        emp.name.toLowerCase().includes(q) ||
        emp.email.toLowerCase().includes(q) ||
        emp.cpf.includes(q) ||
        emp.phone?.includes(q)
      );
    }

    // Filtros avançados
    Object.entries(this.filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (key === 'isActive') {
          filtered = filtered.filter(emp => emp.isActive === value);
        } else if (key === 'departmentId') {
          filtered = filtered.filter(emp => emp.departmentId === value);
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

    // Ordenar por ID crescente
    this.employees = filtered.sort((a, b) => a.id - b.id);
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

    const confirmed = confirm(`Tem certeza que deseja deletar o funcionário ${this.selectedEmployeeToDelete.name}?`);
    if (!confirmed) return;

    const deleted = this.employeeService.deleteEmployee(this.selectedEmployeeToDelete.id);
    if (deleted) {
      alert('Funcionário deletado com sucesso!');
      this.fetchEmployees();
    } else {
      alert('Erro ao deletar funcionário.');
    }

    this.closeDeleteModal();
  }

  toggleActiveStatus(emp: Employee) {
    const updated = this.employeeService.updateEmployee(emp.id, { isActive: !emp.isActive });
    if (updated) {
      alert(`Status do funcionário ${emp.name} alterado para ${!emp.isActive ? 'Ativo' : 'Inativo'}.`);
      this.fetchEmployees();
    } else {
      alert('Erro ao alterar status do funcionário.');
    }
  }
}
