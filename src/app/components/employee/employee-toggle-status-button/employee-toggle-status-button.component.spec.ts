// src/app/components/employee/employee-toggle-status-button/employee-toggle-status-button.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmployeeToggleStatusButtonComponent } from './employee-toggle-status-button.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

describe('EmployeeToggleStatusButtonComponent', () => {
  let component: EmployeeToggleStatusButtonComponent;
  let fixture: ComponentFixture<EmployeeToggleStatusButtonComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, EmployeeToggleStatusButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeToggleStatusButtonComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que não existem requisições pendentes
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve renderizar botão com texto correto quando ativo', () => {
    component.isActive = true;
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;
    expect(button.textContent).toContain('Inativo');
    expect(button.disabled).toBeFalse();
  });

  it('deve renderizar botão com texto correto quando inativo', () => {
    component.isActive = false;
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;
    expect(button.textContent).toContain('Ativo');
  });

  it('deve desabilitar botão durante o carregamento', () => {
    component.loading = true;
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;
    expect(button.disabled).toBeTrue();
    expect(button.textContent).toContain('Carregando...');
  });

  it('deve fazer POST para inativar funcionário e emitir onToggle', () => {
    spyOn(component.onToggle, 'emit');

    component.employeeId = 1;
    component.isActive = true;
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', null);

    const req = httpMock.expectOne('/api/employee/inactivate/1');
    expect(req.request.method).toBe('POST');

    req.flush({}); // simula resposta bem-sucedida
    expect(component.onToggle.emit).toHaveBeenCalledWith(false);
    expect(component.loading).toBeFalse();
  });

  it('deve fazer POST para reativar funcionário e emitir onToggle', () => {
    spyOn(component.onToggle, 'emit');

    component.employeeId = 2;
    component.isActive = false;
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', null);

    const req = httpMock.expectOne('/api/employee/reactivate/2');
    expect(req.request.method).toBe('POST');

    req.flush({});
    expect(component.onToggle.emit).toHaveBeenCalledWith(true);
    expect(component.loading).toBeFalse();
  });

  it('deve exibir alerta em caso de erro', () => {
    spyOn(window, 'alert');
    component.employeeId = 3;
    component.isActive = true;
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', null);

    const req = httpMock.expectOne('/api/employee/inactivate/3');
    req.flush('Erro', { status: 500, statusText: 'Server Error' });

    expect(window.alert).toHaveBeenCalledWith('Erro ao atualizar status.');
    expect(component.loading).toBeFalse();
  });
});
