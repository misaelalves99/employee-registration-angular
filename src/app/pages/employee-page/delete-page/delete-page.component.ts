// src/app/pages/employee-page/delete-page/delete-page.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Employee } from '../../../types/employee.model';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-employee-delete',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './delete-page.component.html',
  styleUrls: ['./delete-page.component.css']
})
export class DeleteComponent implements OnInit {
  employee: Employee | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const found = this.employeeService.getEmployeeById(id);

    if (!found) {
      this.error = 'Funcionário não encontrado.';
    } else {
      this.employee = found;
    }

    this.loading = false;
  }

  handleDelete(): void {
    if (!this.employee) return;

    const confirmed = confirm(`Tem certeza que deseja deletar o funcionário ${this.employee.name}?`);
    if (!confirmed) return;

    const success = this.employeeService.deleteEmployee(this.employee.id);
    if (success) {
      alert('Funcionário deletado com sucesso!');
      this.router.navigate(['/funcionarios']);
    } else {
      console.error('Erro ao deletar funcionário');
      this.error = 'Erro ao deletar funcionário. Tente novamente.';
    }
  }

  handleCancel(): void {
    this.router.navigate(['/funcionarios']);
  }
}
