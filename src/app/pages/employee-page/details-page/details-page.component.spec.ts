// src/app/pages/employee-page/details-page/details-page.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeDetailsComponent } from './details-page.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../../services/employee.service';
import { Employee } from '../../../types/employee.model';

describe('EmployeeDetailsComponent', () => {
  let component: EmployeeDetailsComponent;
  let fixture: ComponentFixture<EmployeeDetailsComponent>;
  let employeeServiceSpy: jasmine.SpyObj<EmployeeService>;

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
    const spy = jasmine.createSpyObj('EmployeeService', ['getEmployeeById']);

    await TestBed.configureTestingModule({
      imports: [EmployeeDetailsComponent, CommonModule, RouterModule],
      providers: [
        { provide: EmployeeService, useValue: spy },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeDetailsComponent);
    component = fixture.componentInstance;
    employeeServiceSpy = TestBed.inject(EmployeeService) as jasmine.SpyObj<EmployeeService>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should load employee when id is valid', () => {
    employeeServiceSpy.getEmployeeById.and.returnValue(mockEmployee);

    component.ngOnInit();

    expect(component.employee).toEqual(mockEmployee);
    expect(component.notFound).toBeFalse();
  });

  it('ngOnInit should set notFound when employee is not found', () => {
    employeeServiceSpy.getEmployeeById.and.returnValue(null);

    component.ngOnInit();

    expect(component.employee).toBeNull();
    expect(component.notFound).toBeTrue();
  });

  it('ngOnInit should set notFound when id is NaN', () => {
    const route = TestBed.inject(ActivatedRoute);
    spyOn(route.snapshot.paramMap, 'get').and.returnValue('invalid');

    component.ngOnInit();

    expect(component.employee).toBeNull();
    expect(component.notFound).toBeTrue();
  });

  it('formatSalary should format number as BRL currency', () => {
    const formatted = component.formatSalary(5500);
    expect(formatted).toBe('R$ 5.500,00');
  });

  it('formatDate should format date string as pt-BR', () => {
    const formatted = component.formatDate('2022-01-15');
    expect(formatted).toBe(new Date('2022-01-15').toLocaleDateString('pt-BR'));
  });
});
