// src/app/pages/employee-page/edit-page/edit-page.component.spec.ts

import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { EditPageComponent } from './edit-page.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../../services/employee.service';
import { EmployeeForm } from '../../../types/employee-form.model';
import { Department } from '../../../types/department.model';
import { Position, POSITIONS_MUTABLE } from '../../../types/position.model';
import { Employee } from '../../../types/employee.model';

describe('EditPageComponent', () => {
  let component: EditPageComponent;
  let fixture: ComponentFixture<EditPageComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let serviceSpy: jasmine.SpyObj<EmployeeService>;

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
    // Criar spies
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    serviceSpy = jasmine.createSpyObj('EmployeeService', [
      'getEmployeeById',
      'updateEmployee',
      'getAllDepartments',
    ]);

    // Mock Employee compatível com Employee (departmentId nunca null)
    const mockEmployeeAsEmployee: Employee = {
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
    };

    const mockDepartments: Department[] = [{ id: 1, name: 'TI' }];

    // Configurar retorno dos spies
    serviceSpy.getEmployeeById.and.returnValue(mockEmployeeAsEmployee);
    serviceSpy.updateEmployee.and.returnValue(true);
    serviceSpy.getAllDepartments.and.returnValue(mockDepartments);

    // Configurar TestBed
    await TestBed.configureTestingModule({
      imports: [EditPageComponent, CommonModule, FormsModule, RouterModule],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } },
        { provide: EmployeeService, useValue: serviceSpy },
      ],
    }).compileComponents();

    // Criar componente
    fixture = TestBed.createComponent(EditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit deve carregar employee, departments e positions', fakeAsync(() => {
    component.ngOnInit();
    tick();

    expect(component.employee).toEqual(jasmine.objectContaining(mockEmployee));
    expect(component.departments).toEqual(mockDepartments);
    expect(component.positions).toEqual(POSITIONS_MUTABLE);
    expect(component.loading).toBeFalse();
  }));

  it('ngOnInit define erro se funcionário não encontrado', fakeAsync(() => {
    serviceSpy.getEmployeeById.and.returnValue(null);
    const comp2 = TestBed.createComponent(EditPageComponent).componentInstance;
    comp2.ngOnInit();
    tick();

    expect(comp2.employee).toBeNull();
    expect(comp2.errors).toContain('Funcionário não encontrado');
    expect(comp2.loading).toBeFalse();
  }));

  it('onSubmit atualiza funcionário e navega em sucesso', () => {
    component.employee = { ...mockEmployee };
    component.onSubmit();

    expect(serviceSpy.updateEmployee).toHaveBeenCalledWith(
      mockEmployee.id,
      jasmine.objectContaining({
        ...mockEmployee,
        departmentId: mockEmployee.departmentId ?? undefined, // normaliza null
      })
    );
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/funcionarios']);
  });

  it('onSubmit define erro se atualização falhar', () => {
    serviceSpy.updateEmployee.and.returnValue(false);
    component.employee = { ...mockEmployee };
    component.onSubmit();

    expect(component.errors).toContain('Erro ao salvar dados do funcionário.');
  });

  it('onSubmit define erro se campos obrigatórios estiverem vazios', () => {
    component.employee = { ...mockEmployee, name: '', cpf: '', email: '', position: '' as any };
    component.onSubmit();

    expect(component.errors).toContain('Por favor, preencha todos os campos obrigatórios.');
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
  });

  it('deve renderizar campos do formulário corretamente', fakeAsync(() => {
    component.ngOnInit();
    tick();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const inputs = compiled.querySelectorAll('input');
    const selects = compiled.querySelectorAll('select');

    expect(inputs.length).toBeGreaterThan(0);
    expect(selects.length).toBeGreaterThan(0);
    expect(compiled.querySelector('.title')?.textContent).toContain('Editar Funcionário');
  }));

  it('deve mostrar mensagem de funcionário não encontrado', fakeAsync(() => {
    serviceSpy.getEmployeeById.and.returnValue(null);
    const comp2 = TestBed.createComponent(EditPageComponent).componentInstance;
    comp2.ngOnInit();
    tick();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(comp2.errors).toContain('Funcionário não encontrado');
    expect(compiled.textContent).toContain('Funcionário não encontrado');
  }));
});
