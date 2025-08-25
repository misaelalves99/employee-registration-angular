// src/app/pages/employee-page/create-page/create-page.component.spec.ts

import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CreatePageComponent } from './create-page.component';
import * as deptMock from '../../../mock/departments.mock';
import * as posMock from '../../../mock/positions.mock';
import * as empMock from '../../../mock/employees.mock';
import { Router } from '@angular/router';

describe('CreatePageComponent', () => {
  let component: CreatePageComponent;
  let fixture: ComponentFixture<CreatePageComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePageComponent, FormsModule],
      providers: [
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreatePageComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit deve carregar departamentos e posições', fakeAsync(() => {
    spyOn(deptMock, 'getMockDepartments').and.returnValue(Promise.resolve([{ id: 1, name: 'TI' }]));
    spyOn(posMock, 'getMockPositions').and.returnValue(Promise.resolve(['Desenvolvedor']));

    component.ngOnInit();
    tick();

    expect(component.departments).toEqual([{ id: 1, name: 'TI' }]);
    expect(component.positions).toEqual(['Desenvolvedor']);
    expect(component.loading).toBeFalse();
  }));

  it('handleSubmit alerta se campos obrigatórios estiverem vazios', async () => {
    spyOn(window, 'alert');
    component.formData = { name: '', cpf: '', salary: '', departmentId: '', position: '' as any, isActive: true };

    await component.handleSubmit();

    expect(window.alert).toHaveBeenCalledWith('Por favor, preencha todos os campos obrigatórios.');
  });

  it('handleSubmit cria funcionário e navega quando campos preenchidos', async () => {
    spyOn(window, 'alert');
    spyOn(empMock, 'createMockEmployee').and.returnValue(Promise.resolve());

    const mockDept = { id: 1, name: 'TI' };
    component.departments = [mockDept];
    component.formData = { name: 'João', cpf: '123', salary: '1000', departmentId: '1', position: 'Desenvolvedor', isActive: true };

    await component.handleSubmit();

    expect(empMock.createMockEmployee).toHaveBeenCalledWith(jasmine.objectContaining({
      name: 'João',
      cpf: '123',
      salary: 1000,
      departmentId: 1,
      department: mockDept,
      position: 'Desenvolvedor'
    }));
    expect(window.alert).toHaveBeenCalledWith('Funcionário criado com sucesso!');
    expect(router.navigate).toHaveBeenCalledWith(['/funcionarios']);
  });
});
