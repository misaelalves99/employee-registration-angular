// src/app/components/employee/employee-filter-form/employee-filter-form.component.spec.ts

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { EmployeeFilterFormComponent } from './employee-filter-form.component';
import { FormsModule } from '@angular/forms';
import { POSITIONS } from '../../../types/position.model';

describe('EmployeeFilterFormComponent', () => {
  let component: EmployeeFilterFormComponent;
  let fixture: ComponentFixture<EmployeeFilterFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, EmployeeFilterFormComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeFilterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve emitir filtersChange ao alterar departmentId', () => {
    spyOn(component.filtersChange, 'emit');

    const input = fixture.nativeElement.querySelector('#departmentId') as HTMLInputElement;
    input.value = '3';
    input.dispatchEvent(new Event('input'));

    expect(component.filtersChange.emit).toHaveBeenCalledWith(
      jasmine.objectContaining({ departmentId: '3' })
    );
  });

  it('deve emitir filtersChange ao alterar position', () => {
    spyOn(component.filtersChange, 'emit');

    const select = fixture.nativeElement.querySelector('#position') as HTMLSelectElement;
    select.value = POSITIONS[0];
    select.dispatchEvent(new Event('change'));

    expect(component.filtersChange.emit).toHaveBeenCalledWith(
      jasmine.objectContaining({ position: POSITIONS[0] })
    );
  });

  it('deve emitir filtersChange ao alterar isActive', () => {
    spyOn(component.filtersChange, 'emit');

    const select = fixture.nativeElement.querySelector('#isActive') as HTMLSelectElement;
    select.value = 'true';
    select.dispatchEvent(new Event('change'));

    expect(component.filtersChange.emit).toHaveBeenCalledWith(
      jasmine.objectContaining({ isActive: 'true' })
    );
  });

  it('deve emitir filtersChange ao alterar admissionDateFrom e admissionDateTo', () => {
    spyOn(component.filtersChange, 'emit');

    const inputFrom = fixture.nativeElement.querySelector('#admissionDateFrom') as HTMLInputElement;
    inputFrom.value = '2025-01-01';
    inputFrom.dispatchEvent(new Event('input'));

    const inputTo = fixture.nativeElement.querySelector('#admissionDateTo') as HTMLInputElement;
    inputTo.value = '2025-12-31';
    inputTo.dispatchEvent(new Event('input'));

    expect(component.filtersChange.emit).toHaveBeenCalledWith(
      jasmine.objectContaining({ admissionDateFrom: '2025-01-01' })
    );
    expect(component.filtersChange.emit).toHaveBeenCalledWith(
      jasmine.objectContaining({ admissionDateTo: '2025-12-31' })
    );
  });
});
