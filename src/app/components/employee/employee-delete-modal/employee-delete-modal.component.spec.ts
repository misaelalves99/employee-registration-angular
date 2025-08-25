// src/app/components/employee/employee-delete-modal/employee-delete-modal.component.spec.ts
import { ComponentFixture, TestBed, waitForAsync, fakeAsync, tick } from '@angular/core/testing';
import { EmployeeDeleteModalComponent } from './employee-delete-modal.component';
import type { Employee } from '../../../types/employee.model';
import { Position } from '../../../types/position.model';

describe('EmployeeDeleteModalComponent', () => {
  let component: EmployeeDeleteModalComponent;
  let fixture: ComponentFixture<EmployeeDeleteModalComponent>;

  const mockEmployee: Employee = {
    id: 1,
    name: 'João Silva',
    cpf: '123.456.789-00',
    email: 'joao@example.com',
    position: 'Desenvolvedor' as Position, // tipagem correta
    department: { id: 1, name: 'TI' }, // id como number
    departmentId: 1,
    salary: 5000,
    admissionDate: '2022-01-15',
    isActive: true,
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [EmployeeDeleteModalComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDeleteModalComponent);
    component = fixture.componentInstance;
    component.employee = mockEmployee;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve emitir close ao clicar fora do modal', () => {
    spyOn(component.close, 'emit');
    const backdrop = fixture.nativeElement.querySelector('.backdrop');
    if (backdrop) {
      backdrop.click();
    }
    expect(component.close.emit).toHaveBeenCalled();
  });

  it('deve exibir informações do funcionário', () => {
    const content = fixture.nativeElement.textContent;
    expect(content).toContain(mockEmployee.name);
    expect(content).toContain(mockEmployee.cpf);
    expect(content).toContain(mockEmployee.email);
    expect(content).toContain(mockEmployee.position);
    expect(content).toContain(mockEmployee.department?.name ?? '');
  });

  it('deve chamar handleDelete e emitir deleted e close', fakeAsync(() => {
    spyOn(component.deleted, 'emit');
    spyOn(component.close, 'emit');

    spyOn<any>(component, 'deleteEmployeeMock').and.returnValue(Promise.resolve(true));

    component.handleDelete();
    expect(component.loading).toBeTrue();

    tick(); // Avança o tempo da Promise

    expect(component.loading).toBeFalse();
    expect(component.deleted.emit).toHaveBeenCalled();
    expect(component.close.emit).toHaveBeenCalled();
  }));

  it('não deve fazer nada se employee for null', async () => {
    component.employee = null;
    spyOn(component.deleted, 'emit');
    spyOn(component.close, 'emit');

    await component.handleDelete();

    expect(component.deleted.emit).not.toHaveBeenCalled();
    expect(component.close.emit).not.toHaveBeenCalled();
  });
});
