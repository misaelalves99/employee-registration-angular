// src/app/pages/employee-page/create-page/create-page.component.spec.ts

import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CreatePageComponent } from './create-page.component';
import * as deptMock from '../../../mock/departments.mock';
import * as empMock from '../../../mock/employees.mock';
import { Router } from '@angular/router';
import { Department } from '../../../types/department.model';
import { POSITIONS_MUTABLE } from '../../../types/position.model';

describe('CreatePageComponent', () => {
  let component: CreatePageComponent;
  let fixture: ComponentFixture<CreatePageComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePageComponent, FormsModule],
      providers: [
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreatePageComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit deve carregar departamentos e posições', fakeAsync(() => {
    const mockDeps: Department[] = [{ id: 1, name: 'TI' }];
    spyOn(deptMock, 'getMockDepartments').and.returnValue(Promise.resolve(mockDeps));

    component.ngOnInit();
    tick();

    expect(component.departments).toEqual(mockDeps);
    expect(component.positions).toEqual(POSITIONS_MUTABLE);
    expect(component.loading).toBeFalse();
  }));

  it('handleSubmit deve registrar erro se campos obrigatórios vazios', async () => {
    spyOn(console, 'error');
    component.formData = {
      id: 0,
      name: '',
      cpf: '',
      email: '',
      phone: '',
      address: '',
      position: '' as any,
      departmentId: undefined,
      salary: 0,
      admissionDate: new Date().toISOString().slice(0, 10),
      isActive: true
    };

    await component.handleSubmit();

    expect(console.error).toHaveBeenCalledWith('Por favor, preencha todos os campos obrigatórios.');
    expect(component.errors).toContain('Por favor, preencha todos os campos obrigatórios.');
  });

  it('handleSubmit cria funcionário e navega quando campos preenchidos', async () => {
    spyOn(console, 'log');
    spyOn(empMock, 'createMockEmployee').and.returnValue(Promise.resolve());

    const mockDept: Department = { id: 1, name: 'TI' };
    component.departments = [mockDept];
    component.formData = {
      id: 0,
      name: 'João',
      cpf: '123',
      email: 'joao@email.com',
      phone: '99999-9999',
      address: 'Rua X',
      departmentId: 1,
      position: 'Desenvolvedor',
      salary: 1000,
      admissionDate: '2025-01-01',
      isActive: true,
    };

    await component.handleSubmit();

    expect(empMock.createMockEmployee).toHaveBeenCalledWith(jasmine.objectContaining({
      name: 'João',
      cpf: '123',
      email: 'joao@email.com',
      salary: 1000,
      departmentId: 1,
      department: mockDept,
      position: 'Desenvolvedor'
    }));
    expect(console.log).toHaveBeenCalledWith('Funcionário criado com sucesso!');
    expect(router.navigate).toHaveBeenCalledWith(['/funcionarios']);
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
    expect(component.getLabel('departmentId')).toBe('Departamento');
    expect(component.getLabel('salary')).toBe('Salário');
    expect(component.getLabel('admissionDate')).toBe('Data de Admissão');
    expect(component.getLabel('isActive')).toBe('Status');
    expect(component.getLabel('id')).toBe('ID');
  });
});
