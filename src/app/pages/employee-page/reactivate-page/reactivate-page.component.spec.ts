// src/app/pages/employee-page/reactivate-page/reactivate-page.component.spec.ts

import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactivateComponent } from './reactivate-page.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../../services/employee.service';
import { Employee } from '../../../types/employee.model';

describe('ReactivateComponent', () => {
  let component: ReactivateComponent;
  let fixture: ComponentFixture<ReactivateComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let employeeServiceSpy: jasmine.SpyObj<EmployeeService>;

  const mockEmployee: Employee = {
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
    isActive: false,
  };

  function createComponentWithRouteId(id: string) {
    return TestBed.overrideProvider(ActivatedRoute, {
      useValue: { snapshot: { paramMap: { get: () => id } } }
    }).createComponent(ReactivateComponent);
  }

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    employeeServiceSpy = jasmine.createSpyObj('EmployeeService', ['getEmployeeById', 'updateEmployee']);

    employeeServiceSpy.getEmployeeById.and.returnValue(mockEmployee);
    employeeServiceSpy.updateEmployee.and.returnValue(true);

    await TestBed.configureTestingModule({
      imports: [ReactivateComponent, CommonModule, RouterModule],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } },
        { provide: EmployeeService, useValue: employeeServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ReactivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit deve carregar employee', () => {
    expect(component.employee).toEqual(mockEmployee);
    expect(component.loading).toBeFalse();
    expect(component.error).toBeNull();
  });

  it('ngOnInit deve setar erro se ID inválido', () => {
    const fixture2 = createComponentWithRouteId('abc');
    const comp2 = fixture2.componentInstance;
    fixture2.detectChanges();

    comp2.ngOnInit();

    expect(comp2.employee).toBeNull();
    expect(comp2.error).toBe('ID inválido.');
    expect(comp2.loading).toBeFalse();
  });

  it('ngOnInit deve setar erro se employee não encontrado', () => {
    employeeServiceSpy.getEmployeeById.and.returnValue(null);
    const fixture2 = createComponentWithRouteId('1');
    const comp2 = fixture2.componentInstance;
    fixture2.detectChanges();

    comp2.ngOnInit();

    expect(comp2.employee).toBeNull();
    expect(comp2.error).toBe('Funcionário não encontrado.');
    expect(comp2.loading).toBeFalse();
  });

  it('handleReactivate atualiza employee e navega em sucesso', fakeAsync(() => {
    spyOn(window, 'alert');
    component.handleReactivate();
    expect(component.reactivating).toBeTrue();
    tick(1000);

    expect(employeeServiceSpy.updateEmployee).toHaveBeenCalledWith(mockEmployee.id, { isActive: true });
    expect(window.alert).toHaveBeenCalledWith('Funcionário reativado com sucesso!');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/funcionarios']);
  }));

  it('handleReactivate define erro se atualização falhar', fakeAsync(() => {
    employeeServiceSpy.updateEmployee.and.returnValue(false);
    component.handleReactivate();
    tick(1000);

    expect(component.error).toBe('Erro ao reativar funcionário.');
    expect(component.reactivating).toBeFalse();
  }));

  it('cancel navega para /funcionarios', () => {
    component.cancel();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/funcionarios']);
  });
});
