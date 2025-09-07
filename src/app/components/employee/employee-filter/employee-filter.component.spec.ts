// src/app/components/employee/employee-filter/employee-filter.component.spec.ts

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { EmployeeFilterComponent } from './employee-filter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { POSITIONS } from '../../../types/position.model';

describe('EmployeeFilterComponent', () => {
  let component: EmployeeFilterComponent;
  let fixture: ComponentFixture<EmployeeFilterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, EmployeeFilterComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar o formulário com valores vazios', () => {
    const formValue = component.filterForm.value;
    expect(formValue.search).toBe('');
    expect(formValue.departmentId).toBe('');
    expect(formValue.position).toBe('');
    expect(formValue.isActive).toBe('');
    expect(formValue.admissionDateFrom).toBe('');
    expect(formValue.admissionDateTo).toBe('');
  });

  it('deve emitir filterChange com dados corretos ao submeter formulário preenchido', () => {
    spyOn(component.filterChange, 'emit');

    component.filterForm.setValue({
      search: 'João',
      departmentId: '2',
      position: POSITIONS[0],
      isActive: 'true',
      admissionDateFrom: '2025-01-01',
      admissionDateTo: '2025-12-31',
    });

    component.onSubmit();

    expect(component.filterChange.emit).toHaveBeenCalledWith({
      search: 'João',
      departmentId: 2,
      position: POSITIONS[0],
      isActive: true,
      admissionDateFrom: '2025-01-01',
      admissionDateTo: '2025-12-31',
    });
  });

  it('deve emitir filterChange com undefined para campos vazios', () => {
    spyOn(component.filterChange, 'emit');

    component.filterForm.setValue({
      search: '',
      departmentId: '',
      position: '',
      isActive: '',
      admissionDateFrom: '',
      admissionDateTo: '',
    });

    component.onSubmit();

    expect(component.filterChange.emit).toHaveBeenCalledWith({
      search: undefined,
      departmentId: undefined,
      position: undefined,
      isActive: undefined,
      admissionDateFrom: undefined,
      admissionDateTo: undefined,
    });
  });

  it('deve emitir filterChange com isActive false corretamente', () => {
    spyOn(component.filterChange, 'emit');

    component.filterForm.patchValue({ isActive: 'false' });
    component.onSubmit();

    expect(component.filterChange.emit).toHaveBeenCalledWith(
      jasmine.objectContaining({ isActive: false })
    );
  });

  it('deve permitir submissão parcial de filtros', () => {
    spyOn(component.filterChange, 'emit');

    component.filterForm.patchValue({
      search: 'Teste',
      departmentId: '',
      position: '',
      isActive: '',
      admissionDateFrom: '',
      admissionDateTo: '',
    });

    component.onSubmit();

    expect(component.filterChange.emit).toHaveBeenCalledWith({
      search: 'Teste',
      departmentId: undefined,
      position: undefined,
      isActive: undefined,
      admissionDateFrom: undefined,
      admissionDateTo: undefined,
    });
  });

  it('deve resetar o formulário e emitir filtros vazios', () => {
    spyOn(component.filterChange, 'emit');

    component.filterForm.setValue({
      search: 'Teste',
      departmentId: '1',
      position: POSITIONS[1],
      isActive: 'false',
      admissionDateFrom: '2025-01-01',
      admissionDateTo: '2025-12-31',
    });

    component.onReset();

    const formValue = component.filterForm.value;
    expect(formValue.search).toBeNull();
    expect(formValue.departmentId).toBeNull();
    expect(formValue.position).toBeNull();
    expect(formValue.isActive).toBeNull();
    expect(formValue.admissionDateFrom).toBeNull();
    expect(formValue.admissionDateTo).toBeNull();

    expect(component.filterChange.emit).toHaveBeenCalledWith({});
  });
});
