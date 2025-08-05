// src/app/pages/employee-page/reactivate-page/reactivate-page.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Employee } from '../../../types/employee.model';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-reactivate-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './reactivate-page.component.html',
  styleUrls: ['./reactivate-page.component.css'], // ALTERADO: de .scss para .css
})
export class ReactivateComponent implements OnInit {
  employee: Employee | null = null;
  loading = true;
  error: string | null = null;
  reactivating = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? +idParam : null;

    if (id === null || isNaN(id)) {
      this.error = 'ID inválido.';
      this.loading = false;
      return;
    }

    const found = this.employeeService.getEmployeeById(id);

    if (!found) {
      this.error = 'Funcionário não encontrado.';
    } else {
      this.employee = found;
    }

    this.loading = false;
  }

  handleReactivate(): void {
    if (!this.employee) return;

    this.reactivating = true;
    this.error = null;

    setTimeout(() => {
      const success = this.employeeService.updateEmployee(this.employee!.id, {
        isActive: true,
      });

      if (success) {
        alert('Funcionário reativado com sucesso!');
        this.router.navigate(['/funcionarios']);
      } else {
        this.error = 'Erro ao reativar funcionário.';
        this.reactivating = false;
      }
    }, 1000);
  }

  cancel(): void {
    this.router.navigate(['/funcionarios']);
  }
}
