// src/app/components/employee/toggle-status-button/toggle-status-button.component.spec.ts

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ToggleStatusButtonComponent } from './toggle-status-button.component';
import { By } from '@angular/platform-browser';

describe('ToggleStatusButtonComponent', () => {
  let component: ToggleStatusButtonComponent;
  let fixture: ComponentFixture<ToggleStatusButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleStatusButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ToggleStatusButtonComponent);
    component = fixture.componentInstance;
  });

  it('deve criar o componente e inicializar status', () => {
    component.initialStatus = true;
    component.ngOnInit();
    expect(component).toBeTruthy();
    expect(component.isActive).toBeTrue();
  });

  it('deve alternar status com sucesso e emitir evento', waitForAsync(async () => {
    component.employeeId = 1;
    component.initialStatus = false;
    component.ngOnInit();

    const fakeResponse = { isActive: true };
    spyOn(window, 'fetch').and.returnValue(
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(fakeResponse),
      } as any)
    );

    spyOn(component.onStatusChange, 'emit');

    await component.toggleStatus();

    expect(component.loading).toBeFalse();
    expect(component.isActive).toBeTrue();
    expect(component.onStatusChange.emit).toHaveBeenCalledWith(true);
  }));

  it('deve exibir alert se fetch falhar', waitForAsync(async () => {
    component.employeeId = 1;
    component.ngOnInit();

    spyOn(window, 'fetch').and.returnValue(Promise.reject('erro'));
    spyOn(window, 'alert');

    await component.toggleStatus();

    expect(component.loading).toBeFalse();
    expect(window.alert).toHaveBeenCalledWith('Erro ao alterar status');
  }));

  it('deve exibir alert se fetch retornar status não ok', waitForAsync(async () => {
    component.employeeId = 1;
    component.ngOnInit();

    spyOn(window, 'fetch').and.returnValue(
      Promise.resolve({ ok: false } as any)
    );
    spyOn(window, 'alert');

    await component.toggleStatus();

    expect(component.loading).toBeFalse();
    expect(window.alert).toHaveBeenCalledWith('Erro ao alterar status');
  }));

  it('deve atualizar botão de loading no template', waitForAsync(() => {
    component.loading = true;
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;
    expect(button.disabled).toBeTrue();
    expect(button.textContent).toContain('Carregando...');
  }));

  it('deve renderizar texto correto do botão quando ativo e inativo', () => {
    component.initialStatus = true;
    component.ngOnInit();
    fixture.detectChanges();

    let button = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;
    expect(button.textContent).toContain('Ativo');
    expect(button.title).toBe('Inativar');

    component.isActive = false;
    fixture.detectChanges();

    button = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;
    expect(button.textContent).toContain('Inativo');
    expect(button.title).toBe('Ativar');
  });
});
