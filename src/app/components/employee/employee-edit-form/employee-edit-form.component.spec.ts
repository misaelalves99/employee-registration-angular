// src/app/components/employee/employee-edit-form/employee-edit-form.component.spec.ts

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { EmployeeEditFormComponent } from './employee-edit-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import type { Department } from '../../../types/department.model';
import type { Position } from '../../../types/position.model';

describe('EmployeeEditFormComponent', () => {
  let component: EmployeeEditFormComponent;
  let fixture: ComponentFixture<EmployeeEditFormComponent>;

  const mockEmployee = {
    id: 1,
    name: 'João',
    cpf: '12345678900',
    email: 'joao@email.com',
    phone: '12345678',
    address: 'Rua A',
    position: 'Desenvolvedor' as Position,
    departmentId: 1,
    salary: 2500.5,
    admissionDate: '2025-08-21',
  };

  const mockDepartments: Department[] = [
    { id: 1, name: 'TI' },
    { id: 2, name: 'RH' },
  ];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, EmployeeEditFormComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeEditFormComponent);
    component = fixture.componentInstance;
    component.employee = mockEmployee;
    component.departments = mockDepartments;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar o formulário com os dados do funcionário', () => {
    const formValue = component.form.value;
    expect(formValue.name).toBe(mockEmployee.name);
    expect(formValue.cpf).toBe(mockEmployee.cpf);
    expect(formValue.email).toBe(mockEmployee.email);
    expect(formValue.position).toBe(mockEmployee.position);
    expect(Number(formValue.departmentId)).toBe(mockEmployee.departmentId);
    expect(Number(formValue.salary)).toBe(mockEmployee.salary);
  });

  it('deve retornar erro ao deixar campos obrigatórios vazios', () => {
    ['name','email','position','departmentId','salary','admissionDate'].forEach(field => {
      component.form.get(field)?.setValue('');
      component.form.get(field)?.markAsTouched();
    });

    expect(component.getError('name')).toBe('Campo obrigatório.');
    expect(component.getError('email')).toBe('Campo obrigatório.');
    expect(component.getError('position')).toBe('Campo obrigatório.');
    expect(component.getError('departmentId')).toBe('Campo obrigatório.');
    expect(component.getError('salary')).toBe('Campo obrigatório.');
    expect(component.getError('admissionDate')).toBe('Campo obrigatório.');
  });

  it('deve retornar erro de email inválido', () => {
    component.form.get('email')?.setValue('email-invalido');
    component.form.get('email')?.markAsTouched();
    expect(component.getError('email')).toBe('Email inválido.');
  });

  it('deve retornar erro de padrão inválido para salary', () => {
    component.form.get('salary')?.setValue('abc');
    component.form.get('salary')?.markAsTouched();
    expect(component.getError('salary')).toBe('Valor inválido.');
  });

  it('deve permitir preenchimento de campos opcionais sem erros', () => {
    component.form.patchValue({
      phone: '99999999',
      address: 'Rua B',
    });
    expect(component.getError('phone')).toBeNull();
    expect(component.getError('address')).toBeNull();
  });

  it('deve emitir update com FormData ao submeter formulário válido', () => {
    const emitSpy = spyOn(component.update, 'emit');
    component.onSubmit();

    expect(emitSpy).toHaveBeenCalled();

    const formDataArg = emitSpy.calls.mostRecent().args[0] as FormData;
    expect(formDataArg.get('name')).toBe(component.employee.name);
    expect(formDataArg.get('cpf')).toBe(component.employee.cpf);
    expect(formDataArg.get('email')).toBe(component.employee.email);
    expect(formDataArg.get('departmentId')).toBe(String(component.employee.departmentId));
  });

  it('não deve emitir update se formulário for inválido', () => {
    spyOn(component.update, 'emit');
    component.form.get('name')?.setValue('');
    component.onSubmit();
    expect(component.update.emit).not.toHaveBeenCalled();
  });

  it('deve permitir submeter após corrigir erros', () => {
    spyOn(component.update, 'emit');

    // Deixa campos obrigatórios vazios para gerar erro
    component.form.get('name')?.setValue('');
    component.onSubmit();
    expect(component.update.emit).not.toHaveBeenCalled();

    // Corrige o valor
    component.form.get('name')?.setValue('João Corrigido');
    component.onSubmit();
    expect(component.update.emit).toHaveBeenCalled();
  });
});
