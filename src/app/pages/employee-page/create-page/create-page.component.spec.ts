// src/app/pages/employee-page/create-page/create-page.component.spec.ts

import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CreatePageComponent } from './create-page.component';
import { EmployeeService } from '../../../services/employee.service';
import { Router } from '@angular/router';
import { Department } from '../../../types/department.model';
import { POSITIONS_MUTABLE } from '../../../types/position.model';

describe('CreatePageComponent', () => {
  let component: CreatePageComponent;
  let fixture: ComponentFixture<CreatePageComponent>;
  let employeeService: EmployeeService;
  let router: Router;

  const mockDepartments: Department[] = [{ id: 1, name: 'TI' }];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePageComponent, FormsModule],
      providers: [
        {
          provide: EmployeeService,
          useValue: {
            getAllDepartments: () => mockDepartments,
            getAllPositions: () => POSITIONS_MUTABLE,
            createEmployee: jasmine.createSpy('createEmployee').and.callFake(emp => ({ ...emp, id: 123, department: mockDepartments[0] })),
          }
        },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreatePageComponent);
    component = fixture.componentInstance;
    employeeService = TestBed.inject(EmployeeService);
    router = TestBed.inject(Router);
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit deve carregar departamentos e posições', () => {
    component.ngOnInit();

    expect(component.departments).toEqual(mockDepartments);
    expect(component.positions).toEqual(POSITIONS_MUTABLE);
    expect(component.loading).toBeFalse();
  });

  it('handleSubmit registra erro se campos obrigatórios vazios', () => {
    spyOn(console, 'error');

    component.formData = { ...component.formData, name: '', cpf: '', email: '', salary: 0, position: '' as any };
    component.handleSubmit();

    expect(component.errors).toContain('Por favor, preencha todos os campos obrigatórios.');
    expect(console.error).toHaveBeenCalledWith('Por favor, preencha todos os campos obrigatórios.');
  });

  it('handleSubmit cria funcionário e navega quando campos preenchidos', () => {
    spyOn(console, 'log');

    component.formData = {
      id: 0,
      name: 'João',
      cpf: '123',
      email: 'joao@email.com',
      phone: '99999-9999',
      address: 'Rua X',
      position: 'Desenvolvedor',
      departmentId: 1,
      salary: 1000,
      admissionDate: '2025-01-01',
      isActive: true,
    };

    component.handleSubmit();

    expect(employeeService.createEmployee).toHaveBeenCalledWith(jasmine.objectContaining({
      name: 'João',
      cpf: '123',
      email: 'joao@email.com',
      salary: 1000,
      departmentId: 1,
      department: mockDepartments[0],
      position: 'Desenvolvedor'
    }));

    expect(console.log).toHaveBeenCalledWith('Funcionário criado com sucesso!', jasmine.objectContaining({ name: 'João' }));
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

  it('deve mostrar template de loading quando loading = true', () => {
    component.loading = true;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.loading')?.textContent).toContain('Carregando...');
  });
});
