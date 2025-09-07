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
    httpMock.verify();
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

  it('deve aplicar classes CSS e título corretos', () => {
    component.isActive = true;
    fixture.detectChanges();
    let button = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;
    expect(button.className).toContain('inactive');
    expect(button.getAttribute('title')).toBe('Inativar Funcionário');

    component.isActive = false;
    fixture.detectChanges();
    button = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;
    expect(button.className).toContain('active');
    expect(button.getAttribute('title')).toBe('Ativar Funcionário');
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

    req.flush({});
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

  it('não deve permitir múltiplos cliques durante o carregamento', () => {
    spyOn(component.onToggle, 'emit');

    component.employeeId = 4;
    component.isActive = true;
    component.loading = true; // simula loading já ativo
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button'));
    button.triggerEventHandler('click', null);

    httpMock.expectNone('/api/employee/inactivate/4');
    expect(component.onToggle.emit).not.toHaveBeenCalled();
  });
});
