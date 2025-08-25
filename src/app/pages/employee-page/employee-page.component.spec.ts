// src/app/pages/employee-page/employee-page.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeePageComponent } from './employee-page.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EmployeeFilterComponent } from '../../components/employee/employee-filter/employee-filter.component';
import { EmployeeDeleteModalComponent } from '../../components/employee/employee-delete-modal/employee-delete-modal.component';
import { mockEmployees } from '../../mock/employees.mock';
import { By } from '@angular/platform-browser';

describe('EmployeePageComponent', () => {
  let component: EmployeePageComponent;
  let fixture: ComponentFixture<EmployeePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        EmployeePageComponent,
        CommonModule,
        FormsModule,
        RouterModule,
        EmployeeFilterComponent,
        EmployeeDeleteModalComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit should populate employees', () => {
    component.ngOnInit();
    expect(component.employees.length).toBeGreaterThan(0);
  });

  it('onQueryChange should filter employees by query', () => {
    const inputEvent = { target: { value: 'joao' } } as unknown as Event;
    component.onQueryChange(inputEvent);
    expect(component.employees.every(emp => emp.name.toLowerCase().includes('joao') || emp.email.toLowerCase().includes('joao'))).toBeTrue();
  });

  it('onFilterChange should apply filters', () => {
    component.onFilterChange({ isActive: true });
    expect(component.employees.every(emp => emp.isActive)).toBeTrue();
  });

  it('openDeleteModal should set selectedEmployeeToDelete', () => {
    const emp = mockEmployees[0];
    component.openDeleteModal(emp);
    expect(component.selectedEmployeeToDelete).toEqual(emp);
  });

  it('closeDeleteModal should reset selectedEmployeeToDelete', () => {
    component.selectedEmployeeToDelete = mockEmployees[0];
    component.closeDeleteModal();
    expect(component.selectedEmployeeToDelete).toBeNull();
  });

  it('confirmDelete should remove employee from mockEmployees', () => {
    spyOn(window, 'alert');
    const emp = mockEmployees[0];
    component.openDeleteModal(emp);
    const initialLength = mockEmployees.length;
    component.confirmDelete();
    expect(mockEmployees.length).toBe(initialLength - 1);
    expect(component.selectedEmployeeToDelete).toBeNull();
    expect(window.alert).toHaveBeenCalledWith('Funcionário deletado com sucesso!');
  });

  it('toggleActiveStatus should change status and alert', () => {
    spyOn(window, 'alert');
    const emp = mockEmployees[0];
    const initialStatus = emp.isActive;
    component.toggleActiveStatus(emp);
    expect(emp.isActive).toBe(!initialStatus);
    expect(window.alert).toHaveBeenCalledWith(`Status do funcionário ${emp.name} alterado para ${emp.isActive ? 'Ativo' : 'Inativo'}.`);
  });

  it('should render table rows for employees', () => {
    fixture.detectChanges();
    const rows = fixture.debugElement.queryAll(By.css('table tbody tr'));
    expect(rows.length).toBe(component.employees.length);
  });

  it('should show "Nenhum funcionário encontrado" when no employees', () => {
    component.employees = [];
    fixture.detectChanges();
    const msg = fixture.debugElement.query(By.css('.noResults')).nativeElement;
    expect(msg.textContent).toContain('Nenhum funcionário encontrado.');
  });
});
