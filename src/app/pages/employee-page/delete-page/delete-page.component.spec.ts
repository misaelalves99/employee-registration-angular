// src/app/pages/employee-page/delete-page/delete-page.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteComponent } from './delete-page.component';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { EmployeeService } from '../../../services/employee.service';
import type { Employee } from '../../../types/employee.model';

describe('DeleteComponent', () => {
  let component: DeleteComponent;
  let fixture: ComponentFixture<DeleteComponent>;
  let router: Router;
  let employeeService: EmployeeService;

  const mockEmployee: Employee = {
    id: 1,
    name: 'João Silva',
    cpf: '123.456.789-00',
    email: 'joao@example.com',
    phone: '(11) 99999-9999',
    address: 'Rua A, 123',
    position: 'Desenvolvedor',
    department: { id: 1, name: 'TI' },
    departmentId: 1,
    salary: 5500,
    admissionDate: '2022-01-15',
    isActive: true
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteComponent, CommonModule, RouterModule],
      providers: [
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } },
        {
          provide: EmployeeService,
          useValue: {
            getEmployeeById: jasmine.createSpy('getEmployeeById').and.returnValue(mockEmployee),
            deleteEmployee: jasmine.createSpy('deleteEmployee').and.returnValue(true)
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    employeeService = TestBed.inject(EmployeeService);
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit deve carregar funcionário pelo id', () => {
    component.ngOnInit();
    expect(employeeService.getEmployeeById).toHaveBeenCalledWith(1);
    expect(component.employee).toEqual(mockEmployee);
    expect(component.loading).toBeFalse();
    expect(component.error).toBeNull();
  });

  it('ngOnInit define erro se funcionário não encontrado', () => {
    (employeeService.getEmployeeById as jasmine.Spy).and.returnValue(null);
    component.ngOnInit();
    expect(component.employee).toBeNull();
    expect(component.error).toBe('Funcionário não encontrado.');
  });

  it('handleDelete confirma e deleta funcionário com sucesso', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(window, 'alert');
    component.employee = mockEmployee;

    component.handleDelete();

    expect(employeeService.deleteEmployee).toHaveBeenCalledWith(mockEmployee.id);
    expect(window.alert).toHaveBeenCalledWith('Funcionário deletado com sucesso!');
    expect(router.navigate).toHaveBeenCalledWith(['/funcionarios']);
  });

  it('handleDelete cancela se confirm retornar false', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    spyOn(window, 'alert');
    component.employee = mockEmployee;

    component.handleDelete();

    expect(employeeService.deleteEmployee).not.toHaveBeenCalled();
    expect(window.alert).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('handleDelete trata erro ao deletar funcionário', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(window, 'alert');
    component.employee = mockEmployee;
    (employeeService.deleteEmployee as jasmine.Spy).and.throwError('Falha');

    component.handleDelete();

    expect(component.error).toBe('Erro ao deletar funcionário. Tente novamente.');
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('handleCancel navega para /funcionarios', () => {
    component.handleCancel();
    expect(router.navigate).toHaveBeenCalledWith(['/funcionarios']);
  });
});
