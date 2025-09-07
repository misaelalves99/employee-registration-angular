// src/app/pages/employee-page/details-page/details-page.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeDetailsComponent } from './details-page.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../../services/employee.service';
import { Employee } from '../../../types/employee.model';
import { By } from '@angular/platform-browser';

describe('EmployeeDetailsComponent', () => {
  let component: EmployeeDetailsComponent;
  let fixture: ComponentFixture<EmployeeDetailsComponent>;
  let employeeServiceSpy: jasmine.SpyObj<EmployeeService>;
  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>;

  const mockEmployee: Employee = {
    id: 1,
    name: 'João Silva',
    cpf: '123.456.789-00',
    email: 'joao@example.com',
    phone: '(11) 99999-9999',
    address: 'Rua A, 123',
    position: 'Desenvolvedor',
    department: { id: 1, name: 'TI' },
    departmentId: 1,
    salary: 5500,
    admissionDate: '2022-01-15',
    isActive: true,
  };

  beforeEach(async () => {
    const spyEmployee = jasmine.createSpyObj('EmployeeService', ['getEmployeeById']);
    const spyRoute = jasmine.createSpyObj('ActivatedRoute', [], { snapshot: { paramMap: { get: () => '1' } } });

    await TestBed.configureTestingModule({
      imports: [EmployeeDetailsComponent, CommonModule, RouterModule],
      providers: [
        { provide: EmployeeService, useValue: spyEmployee },
        { provide: ActivatedRoute, useValue: spyRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeDetailsComponent);
    component = fixture.componentInstance;
    employeeServiceSpy = TestBed.inject(EmployeeService) as jasmine.SpyObj<EmployeeService>;
    activatedRouteSpy = TestBed.inject(ActivatedRoute) as jasmine.SpyObj<ActivatedRoute>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit deve carregar funcionário quando id é válido', () => {
    employeeServiceSpy.getEmployeeById.and.returnValue(mockEmployee);

    component.ngOnInit();

    expect(component.employee).toEqual(mockEmployee);
    expect(component.notFound).toBeFalse();
  });

  it('ngOnInit deve setar notFound quando funcionário não encontrado', () => {
    employeeServiceSpy.getEmployeeById.and.returnValue(null);

    component.ngOnInit();

    expect(component.employee).toBeNull();
    expect(component.notFound).toBeTrue();
  });

  it('ngOnInit deve setar notFound quando id é inválido (NaN)', () => {
    spyOn(activatedRouteSpy.snapshot.paramMap, 'get').and.returnValue('invalid');

    component.ngOnInit();

    expect(component.employee).toBeNull();
    expect(component.notFound).toBeTrue();
  });

  it('formatSalary deve formatar número como moeda BRL', () => {
    const formatted = component.formatSalary(5500);
    expect(formatted).toBe('R$ 5.500,00');
  });

  it('formatDate deve formatar string de data para pt-BR', () => {
    const formatted = component.formatDate('2022-01-15');
    expect(formatted).toBe(new Date('2022-01-15').toLocaleDateString('pt-BR'));
  });

  it('deve renderizar detalhes do funcionário no template', () => {
    employeeServiceSpy.getEmployeeById.and.returnValue(mockEmployee);
    component.ngOnInit();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('.title')?.textContent).toContain('Detalhes do Funcionário');
    expect(compiled.querySelector('.card')?.textContent).toContain(mockEmployee.name);
    expect(compiled.querySelector('.card')?.textContent).toContain(mockEmployee.cpf);
    expect(compiled.querySelector('.card')?.textContent).toContain(mockEmployee.email);
    expect(compiled.querySelector('.card')?.textContent).toContain(mockEmployee.position);
    expect(compiled.querySelector('.card')?.textContent).toContain(mockEmployee.department?.name || '');
  });

  it('deve renderizar mensagem de não encontrado no template', () => {
    employeeServiceSpy.getEmployeeById.and.returnValue(null);
    component.ngOnInit();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.notFoundTitle')?.textContent).toContain('Funcionário não encontrado');
    expect(compiled.querySelector('a')?.getAttribute('routerLink')).toBe('/funcionarios');
  });
});
