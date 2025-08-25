// src/app/components/employee/employee-form/employee-form.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeFormComponent } from './employee-form.component';
import { FormsModule } from '@angular/forms';
import { Department } from '../../../types/department.model';
import { POSITIONS } from '../../../types/position.model';

describe('EmployeeFormComponent', () => {
  let component: EmployeeFormComponent;
  let fixture: ComponentFixture<EmployeeFormComponent>;

  const mockDepartments: Department[] = [
    { id: 1, name: 'RH' },
    { id: 2, name: 'TI' }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, EmployeeFormComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeFormComponent);
    component = fixture.componentInstance;
    component.departments = mockDepartments;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar formData com valores padrão', () => {
    expect(component.formData.isActive).toBeTrue();
    expect(component.formData.name).toBe('');
    expect(component.formData.position).toBe('');
  });

  it('deve alternar isActive ao chamar handleCheckboxChange', () => {
    const original = component.formData.isActive;
    component.handleCheckboxChange();
    expect(component.formData.isActive).toBe(!original);
  });

  it('deve validar campos obrigatórios e retornar falso quando vazio', () => {
    component.formData = {
      name: '',
      cpf: '',
      email: '',
      phone: '',
      address: '',
      position: '' as any,
      departmentId: '',
      salary: '',
      admissionDate: '',
      isActive: true
    };
    const valid = component.validate();
    expect(valid).toBeFalse();
    expect(Object.keys(component.errors).length).toBeGreaterThan(0);
  });

  it('deve validar corretamente e retornar verdadeiro com dados preenchidos', () => {
    component.formData = {
      name: 'João',
      cpf: '123.456.789-00',
      email: 'joao@email.com',
      phone: '123456789',
      address: 'Rua X, 123',
      position: POSITIONS[0] as any,
      departmentId: '1',
      salary: '1000',
      admissionDate: '2025-01-01',
      isActive: true
    };
    const valid = component.validate();
    expect(valid).toBeTrue();
    expect(component.errors).toEqual({});
  });

  it('deve emitir formSubmitted ao enviar formulário válido', () => {
    spyOn(component.formSubmitted, 'emit');

    component.formData = {
      name: 'João',
      cpf: '123.456.789-00',
      email: 'joao@email.com',
      phone: '123456789',
      address: 'Rua X, 123',
      position: POSITIONS[0] as any,
      departmentId: '1',
      salary: '1000',
      admissionDate: '2025-01-01',
      isActive: true
    };

    component.handleSubmit();
    expect(component.formSubmitted.emit).toHaveBeenCalledWith(jasmine.objectContaining({
      name: 'João',
      salary: '1000'
    }));
  });

  it('não deve emitir formSubmitted ao enviar formulário inválido', () => {
    spyOn(component.formSubmitted, 'emit');

    component.formData = {
      name: '',
      cpf: '',
      email: '',
      phone: '',
      address: '',
      position: '' as any,
      departmentId: '',
      salary: '',
      admissionDate: '',
      isActive: true
    };

    component.handleSubmit();
    expect(component.formSubmitted.emit).not.toHaveBeenCalled();
  });
});
