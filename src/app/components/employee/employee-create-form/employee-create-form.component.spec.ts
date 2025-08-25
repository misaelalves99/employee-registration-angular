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

  it('deve inicializar o formulário com campos vazios', () => {
    const form = component.form.value;
    expect(form.name).toBe('');
    expect(form.cpf).toBe('');
    expect(form.email).toBe('');
    expect(form.position).toBe('');
    expect(form.departmentId).toBe('');
    expect(form.salary).toBe('');
    expect(form.admissionDate).toBe('');
  });

  it('deve exibir erros ao submeter formulário vazio', async () => {
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

  it('deve chamar onCreate com dados válidos', async () => {
    component.form.setValue({
      name: 'João',
      cpf: '12345678900',
      email: 'joao@email.com',
      phone: '12345678',
      address: 'Rua A',
      position: component.POSITIONS[0],
      departmentId: mockDepartments[0].id, // string
      salary: '2500.50',
      admissionDate: '2025-08-21',
    });

    await component.handleSubmit();

    expect(mockOnCreate).toHaveBeenCalled();
    const formDataArg = mockOnCreate.calls.mostRecent().args[0] as FormData;
    expect(formDataArg.get('name')).toBe('João');
    expect(formDataArg.get('cpf')).toBe('12345678900');
    expect(component.form.value.name).toBe(null); // formulário resetado
  });

  it('deve permitir preenchimento de campos opcionais', async () => {
    component.form.patchValue({
      phone: '99999999',
      address: 'Rua B',
    });
    await component.handleSubmit();
    expect(component.errors['phone']).toBeUndefined();
    expect(component.errors['address']).toBeUndefined();
  });
});
