// src/app/pages/employee-page/edit-page/edit-page.component.spec.ts

import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { EditComponent } from './edit-page.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as employeeMock from '../../../mock/employees.mock';
import * as departmentsMock from '../../../mock/departments.mock';
import { EmployeeForm } from '../../../types/employee-form.model';
import { Department } from '../../../types/department.model';
import { Position, POSITIONS_MUTABLE } from '../../../types/position.model';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockEmployee: EmployeeForm = {
    id: 1,
    name: 'João Silva',
    cpf: '123.456.789-00',
    email: 'joao@example.com',
    phone: '(11) 99999-9999',
    address: 'Rua A, 123',
    position: 'Desenvolvedor',
    departmentId: 1,
    salary: 5500,
    admissionDate: '2022-01-15',
    isActive: true,
  };

  const mockDepartments: Department[] = [{ id: 1, name: 'TI' }];

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    spyOn(employeeMock, 'getEmployeeById').and.returnValue(mockEmployee);
    spyOn(employeeMock, 'updateMockEmployee').and.returnValue(true);
    spyOn(departmentsMock, 'getMockDepartments').and.returnValue(Promise.resolve(mockDepartments));

    await TestBed.configureTestingModule({
      imports: [EditComponent, CommonModule, FormsModule, RouterModule],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit deve carregar employee e departments', fakeAsync(() => {
    component.ngOnInit();
    tick();

    expect(component.employee).toEqual(jasmine.objectContaining(mockEmployee));
    expect(component.departments).toEqual(mockDepartments);
    expect(component.positions).toEqual(POSITIONS_MUTABLE);
    expect(component.loading).toBeFalse();
  }));

  it('ngOnInit deve setar erro se funcionário não encontrado', fakeAsync(() => {
    (employeeMock.getEmployeeById as jasmine.Spy).and.returnValue(null);
    const comp2 = TestBed.createComponent(EditComponent).componentInstance;
    comp2.ngOnInit();
    tick();

    expect(comp2.employee).toBeNull();
    expect(comp2.errors).toContain('Funcionário não encontrado');
    expect(comp2.loading).toBeFalse();
  }));

  it('onSubmit atualiza funcionário e navega em sucesso', () => {
    component.employee = { ...mockEmployee };
    component.onSubmit();

    expect(employeeMock.updateMockEmployee).toHaveBeenCalledWith(
      mockEmployee.id,
      jasmine.objectContaining({
        ...mockEmployee,
        department: mockDepartments[0],
        departmentId: 1,
      })
    );
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/funcionarios']);
  });

  it('onSubmit define erro se atualização falhar', () => {
    (employeeMock.updateMockEmployee as jasmine.Spy).and.returnValue(false);
    component.employee = { ...mockEmployee };
    component.onSubmit();

    expect(component.errors).toContain('Erro ao salvar dados do funcionário.');
  });

  it('isOptional retorna true para phone e address', () => {
    expect(component.isOptional('phone')).toBeTrue();
    expect(component.isOptional('address')).toBeTrue();
    expect(component.isOptional('name')).toBeFalse();
  });

  it('getLabel retorna labels corretos', () => {
    expect(component.getLabel('name')).toBe('Nome');
    expect(component.getLabel('cpf')).toBe('CPF');
    expect(component.getLabel('email')).toBe('Email');
    expect(component.getLabel('phone')).toBe('Telefone');
    expect(component.getLabel('address')).toBe('Endereço');
    expect(component.getLabel('position')).toBe('Cargo');
    expect(component.getLabel('salary')).toBe('Salário');
  });
});
