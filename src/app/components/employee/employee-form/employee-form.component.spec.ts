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
    expect(component.errors.name).toBe('Nome é obrigatório.');
    expect(component.errors.salary).toBe('Salário é obrigatório.');
  });

  it('deve validar salary inválido negativo ou não numérico', () => {
    component.formData.salary = '-100';
    component.formData.name = 'Teste';
    component.formData.cpf = '123';
    component.formData.email = 'teste@email.com';
    component.formData.phone = '123';
    component.formData.address = 'Rua';
    component.formData.position = POSITIONS[0] as any;
    component.formData.departmentId = '1';
    component.formData.admissionDate = '2025-01-01';
    
    let valid = component.validate();
    expect(valid).toBeFalse();
    expect(component.errors.salary).toBe('Salário deve ser um número positivo.');

    component.formData.salary = 'abc';
    valid = component.validate();
    expect(valid).toBeFalse();
    expect(component.errors.salary).toBe('Salário deve ser um número positivo.');
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
      salary: '1000',
      isActive: true
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

  it('deve atualizar corretamente formData via ngModel (simulação)', () => {
    const inputName = fixture.nativeElement.querySelector('input[name="name"]') as HTMLInputElement;
    inputName.value = 'Maria';
    inputName.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.formData.name).toBe('Maria');

    const selectPosition = fixture.nativeElement.querySelector('select[name="position"]') as HTMLSelectElement;
    selectPosition.value = POSITIONS[1];
    selectPosition.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(component.formData.position).toBe(POSITIONS[1]);
  });
});
