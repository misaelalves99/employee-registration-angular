// src/app/pages/employee-page/edit-page/edit-page.component.spec.ts

import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { EditComponent } from './edit-page.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as employeeMock from '../../../mock/employees.mock';
import * as departmentsMock from '../../../mock/departments.mock';
import { EmployeeForm } from '../../../types/employee-form.model';

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

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    spyOn(employeeMock, 'getEmployeeById').and.returnValue(mockEmployee);
    spyOn(employeeMock, 'updateMockEmployee').and.returnValue(true);
    spyOn(departmentsMock, 'getMockDepartments').and.returnValue(Promise.resolve([{ id: 1, name: 'TI' }]));

    await TestBed.configureTestingModule({
      imports: [EditComponent, CommonModule, FormsModule, RouterModule],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should load employee and departments', fakeAsync(() => {
    tick(); // simula a resolução da promise de departamentos

    expect(component.employee).toEqual(mockEmployee);
    expect(component.departments.length).toBe(1);
    expect(component.loading).toBeFalse();
  }));

  it('ngOnInit should set error if employee not found', fakeAsync(() => {
    (employeeMock.getEmployeeById as jasmine.Spy).and.returnValue(null);
    const comp2 = TestBed.createComponent(EditComponent).componentInstance;
    comp2.ngOnInit();
    tick();

    expect(comp2.employee).toBeNull();
    expect(comp2.errors).toContain('Funcionário não encontrado');
    expect(comp2.loading).toBeFalse();
  }));

  it('onSubmit should update employee and navigate on success', () => {
    component.employee = { ...mockEmployee };
    component.onSubmit();

    expect(employeeMock.updateMockEmployee).toHaveBeenCalledWith(mockEmployee.id, mockEmployee);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/funcionarios']);
  });

  it('onSubmit should set error if update fails', () => {
    (employeeMock.updateMockEmployee as jasmine.Spy).and.returnValue(false);
    component.employee = { ...mockEmployee };
    component.onSubmit();

    expect(component.errors).toContain('Erro ao salvar dados do funcionário.');
  });

  it('isOptional should return true for phone and address', () => {
    expect(component.isOptional('phone')).toBeTrue();
    expect(component.isOptional('address')).toBeTrue();
    expect(component.isOptional('name')).toBeFalse();
  });

  it('getLabel should return correct label for fields', () => {
    expect(component.getLabel('name')).toBe('Nome');
    expect(component.getLabel('cpf')).toBe('CPF');
    expect(component.getLabel('email')).toBe('Email');
    expect(component.getLabel('phone')).toBe('Telefone');
    expect(component.getLabel('address')).toBe('Endereço');
    expect(component.getLabel('position')).toBe('Cargo');
  });
});
