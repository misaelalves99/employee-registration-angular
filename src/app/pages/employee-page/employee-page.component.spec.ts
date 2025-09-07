// src/app/pages/employee-page/employee-page.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeePageComponent } from './employee-page.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EmployeeFilterComponent } from '../../components/employee/employee-filter/employee-filter.component';
import { EmployeeDeleteModalComponent } from '../../components/employee/employee-delete-modal/employee-delete-modal.component';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../types/employee.model';
import { By } from '@angular/platform-browser';

describe('EmployeePageComponent', () => {
  let component: EmployeePageComponent;
  let fixture: ComponentFixture<EmployeePageComponent>;
  let employeeServiceSpy: jasmine.SpyObj<EmployeeService>;

  const mockEmployees: Employee[] = [
    {
      id: 1,
      name: 'João Silva',
      cpf: '123.456.789-00',
      email: 'joao@example.com',
      phone: '(11) 99999-9999',
      address: 'Rua A, 123',
      position: 'Desenvolvedor',
      departmentId: 1,
      department: { id: 1, name: 'TI' },
      salary: 5500,
      admissionDate: '2022-01-15',
      isActive: true,
    },
    {
      id: 2,
      name: 'Maria Oliveira',
      cpf: '987.654.321-00',
      email: 'maria@example.com',
      phone: '(11) 98888-8888',
      address: 'Rua B, 456',
      position: 'Analista',
      departmentId: 2,
      department: { id: 2, name: 'RH' },
      salary: 4700,
      admissionDate: '2021-10-20',
      isActive: false,
    },
  ];

  beforeEach(async () => {
    employeeServiceSpy = jasmine.createSpyObj('EmployeeService', ['getAllEmployees', 'deleteEmployee', 'updateEmployee']);
    employeeServiceSpy.getAllEmployees.and.returnValue([...mockEmployees]);
    employeeServiceSpy.deleteEmployee.and.callFake((id: number) => {
      const index = mockEmployees.findIndex(e => e.id === id);
      if (index > -1) {
        mockEmployees.splice(index, 1);
        return true;
      }
      return false;
    });
    employeeServiceSpy.updateEmployee.and.callFake((id: number, data: Partial<Employee>) => {
      const emp = mockEmployees.find(e => e.id === id);
      if (!emp) return false;
      Object.assign(emp, data);
      return true;
    });

    await TestBed.configureTestingModule({
      imports: [
        EmployeePageComponent,
        CommonModule,
        FormsModule,
        RouterModule,
        EmployeeFilterComponent,
        EmployeeDeleteModalComponent
      ],
      providers: [{ provide: EmployeeService, useValue: employeeServiceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should populate employees', () => {
    component.ngOnInit();
    expect(component.employees.length).toBe(mockEmployees.length);
  });

  it('onQueryChange filters employees by query', () => {
    const inputEvent = { target: { value: 'joao' } } as unknown as Event;
    component.onQueryChange(inputEvent);
    expect(component.employees.every(emp =>
      emp.name.toLowerCase().includes('joao') ||
      emp.email.toLowerCase().includes('joao') ||
      emp.cpf.includes('joao') ||
      (emp.phone?.includes('joao') ?? false)
    )).toBeTrue();
  });

  it('onFilterChange applies filters correctly', () => {
    component.onFilterChange({ isActive: true });
    expect(component.employees.every(emp => emp.isActive)).toBeTrue();

    component.onFilterChange({ departmentId: 2 });
    expect(component.employees.every(emp => emp.departmentId === 2)).toBeTrue();

    component.onFilterChange({ position: 'Desenvolvedor' });
    expect(component.employees.every(emp => emp.position === 'Desenvolvedor')).toBeTrue();
  });

  it('openDeleteModal sets selectedEmployeeToDelete', () => {
    component.openDeleteModal(mockEmployees[0]);
    expect(component.selectedEmployeeToDelete).toEqual(mockEmployees[0]);
  });

  it('closeDeleteModal resets selectedEmployeeToDelete', () => {
    component.selectedEmployeeToDelete = mockEmployees[0];
    component.closeDeleteModal();
    expect(component.selectedEmployeeToDelete).toBeNull();
  });

  it('confirmDelete removes employee and alerts', () => {
    spyOn(window, 'alert');
    const emp = mockEmployees[0];
    component.openDeleteModal(emp);
    component.confirmDelete();
    expect(mockEmployees.find(e => e.id === emp.id)).toBeUndefined();
    expect(component.selectedEmployeeToDelete).toBeNull();
    expect(window.alert).toHaveBeenCalledWith('Funcionário deletado com sucesso!');
  });

  it('toggleActiveStatus changes status and alerts', () => {
    spyOn(window, 'alert');
    const emp = mockEmployees[0];
    const initialStatus = emp.isActive;
    component.toggleActiveStatus(emp);
    expect(emp.isActive).toBe(!initialStatus);
    expect(window.alert).toHaveBeenCalledWith(`Status do funcionário ${emp.name} alterado para ${emp.isActive ? 'Ativo' : 'Inativo'}.`);
  });

  it('should render table rows for employees', () => {
    fixture.detectChanges();
    const rows = fixture.debugElement.queryAll(By.css('table tbody tr'));
    expect(rows.length).toBe(component.employees.length);
  });

  it('should show "Nenhum funcionário encontrado" when no employees', () => {
    component.employees = [];
    fixture.detectChanges();
    const msg = fixture.debugElement.query(By.css('.noResults')).nativeElement;
    expect(msg.textContent).toContain('Nenhum funcionário encontrado.');
  });
});
