// src/app/components/employee/employee-create-form/employee-create-form.component.spec.ts

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeCreateFormComponent } from './employee-create-form.component';
import { Department } from '../../../types/department.model';

describe('EmployeeCreateFormComponent', () => {
  let component: EmployeeCreateFormComponent;
  let fixture: ComponentFixture<EmployeeCreateFormComponent>;

  const mockDepartments: Department[] = [
    { id: 1, name: 'RH' },
    { id: 2, name: 'TI' },
  ];

  const mockOnCreate = jasmine.createSpy('onCreate').and.returnValue(Promise.resolve());

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, EmployeeCreateFormComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeCreateFormComponent);
    component = fixture.componentInstance;
    component.departments = mockDepartments;
    component.onCreate = mockOnCreate;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('inicializa o formulário com campos vazios', () => {
    const form = component.form.value;
    expect(form.name).toBe('');
    expect(form.cpf).toBe('');
    expect(form.email).toBe('');
    expect(form.position).toBe('');
    expect(form.departmentId).toBeNull();
    expect(form.salary).toBe('');
    expect(form.admissionDate).toBe('');
    expect(form.phone).toBe('');
    expect(form.address).toBe('');
  });

  it('exibe erros quando submetido vazio', async () => {
    await component.handleSubmit();
    expect(component.errors['name']).toBe('Nome é obrigatório.');
    expect(component.errors['cpf']).toBe('CPF é obrigatório.');
    expect(component.errors['email']).toBe('Email é obrigatório.');
    expect(component.errors['position']).toBe('Cargo é obrigatório.');
    expect(component.errors['departmentId']).toBe('Departamento é obrigatório.');
    expect(component.errors['salary']).toBe('Salário inválido.');
    expect(component.errors['admissionDate']).toBe('Data de admissão é obrigatória.');
    expect(mockOnCreate).not.toHaveBeenCalled();
  });

  it('chama onCreate com dados válidos e reseta o formulário', async () => {
    component.form.setValue({
      name: 'João',
      cpf: '12345678900',
      email: 'joao@email.com',
      phone: '12345678',
      address: 'Rua A',
      position: component.POSITIONS[0],
      departmentId: mockDepartments[0].id,
      salary: '2500.50',
      admissionDate: '2025-08-21',
    });

    await component.handleSubmit();

    expect(mockOnCreate).toHaveBeenCalled();
    const formDataArg = mockOnCreate.calls.mostRecent().args[0] as FormData;
    expect(formDataArg.get('name')).toBe('João');
    expect(formDataArg.get('cpf')).toBe('12345678900');
    expect(formDataArg.get('departmentId')).toBe(String(mockDepartments[0].id));
    expect(formDataArg.get('salary')).toBe('2500.50');

    const resetForm = component.form.value;
    expect(resetForm.name).toBe('');
    expect(resetForm.cpf).toBe('');
    expect(resetForm.email).toBe('');
    expect(resetForm.position).toBe('');
    expect(resetForm.departmentId).toBeNull();
    expect(resetForm.salary).toBe('');
    expect(resetForm.admissionDate).toBe('');
    expect(resetForm.phone).toBe('');
    expect(resetForm.address).toBe('');
  });

  it('permite preenchimento de campos opcionais sem erro', async () => {
    component.form.patchValue({
      phone: '99999999',
      address: 'Rua B',
    });
    await component.handleSubmit();
    expect(component.errors['phone']).toBeUndefined();
    expect(component.errors['address']).toBeUndefined();
  });

  it('não permite salary inválido', async () => {
    component.form.patchValue({ salary: 'abc' });
    await component.handleSubmit();
    expect(component.errors['salary']).toBe('Salário inválido.');
  });

  it('não permite departmentId inválido', async () => {
    component.form.patchValue({ departmentId: null });
    await component.handleSubmit();
    expect(component.errors['departmentId']).toBe('Departamento é obrigatório.');
  });
});
