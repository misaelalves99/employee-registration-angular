// src/app/components/employee/employee-list/employee-list.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeListComponent } from './employee-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Employee } from '../../../types/employee.model';

describe('EmployeeListComponent', () => {
  let component: EmployeeListComponent;
  let fixture: ComponentFixture<EmployeeListComponent>;

  const mockEmployees: Employee[] = [
    {
      id: 1,
      name: 'João',
      cpf: '123.456.789-00',
      email: 'joao@email.com',
      phone: '11111111',
      position: 'Desenvolvedor',
      department: { id: 1, name: 'TI' },
      departmentId: 1,
      salary: 2000,
      admissionDate: '2025-01-01',
      isActive: true,
    },
    {
      id: 2,
      name: 'Maria',
      cpf: '987.654.321-00',
      email: 'maria@email.com',
      phone: '22222222',
      position: 'Analista',
      department: undefined, // department agora undefined
      departmentId: null,
      salary: 1500,
      admissionDate: '2024-12-01',
      isActive: false,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, EmployeeListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeListComponent);
    component = fixture.componentInstance;
    component.employees = mockEmployees;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve formatar salário corretamente', () => {
    expect(component.formatCurrency(1234.56)).toBe('R$ 1.234,56');
  });

  it('deve formatar datas corretamente', () => {
    expect(component.formatDate('2025-08-21')).toBe(new Date('2025-08-21').toLocaleDateString('pt-BR'));
  });

  it('deve emitir evento deleteEmployee ao clicar no botão de deletar', () => {
    spyOn(component.deleteEmployee, 'emit');
    const emp = mockEmployees[0];
    component.onDelete(emp);
    expect(component.deleteEmployee.emit).toHaveBeenCalledWith(emp);
  });

  it('deve renderizar a tabela com funcionários', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const rows = compiled.querySelectorAll('tbody tr');
    expect(rows.length).toBe(mockEmployees.length);
    const firstRowCells = rows[0].querySelectorAll('td');
    expect(firstRowCells[0].textContent).toContain('João');
    expect(firstRowCells[1].textContent).toContain('123.456.789-00');
    expect(firstRowCells[6].textContent).toContain(component.formatCurrency(2000));
  });

  it('deve mostrar "—" quando o departamento não existe', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const secondRowCells = compiled.querySelectorAll('tbody tr')[1].querySelectorAll('td');
    expect(secondRowCells[5].textContent).toContain('—');
  });
});
