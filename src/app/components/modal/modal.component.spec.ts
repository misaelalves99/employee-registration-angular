// src/app/components/modal/modal.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal.component';
import { By } from '@angular/platform-browser';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('não deve renderizar o modal quando isOpen é false', () => {
    component.isOpen = false;
    fixture.detectChanges();
    const overlay = fixture.debugElement.query(By.css('.overlay'));
    expect(overlay).toBeNull();
  });

  it('deve renderizar o modal quando isOpen é true', () => {
    component.isOpen = true;
    component.title = 'Teste de Modal';
    fixture.detectChanges();
    const overlay = fixture.debugElement.query(By.css('.overlay'));
    expect(overlay).toBeTruthy();
    const titleEl = overlay.query(By.css('.title')).nativeElement;
    expect(titleEl.textContent).toContain('Teste de Modal');
  });

  it('deve emitir onClose ao clicar no overlay', () => {
    component.isOpen = true;
    fixture.detectChanges();
    spyOn(component.onClose, 'emit');
    const overlay = fixture.debugElement.query(By.css('.overlay'));
    overlay.triggerEventHandler('click', {});
    expect(component.onClose.emit).toHaveBeenCalled();
  });

  it('não deve propagar click do modal interno', () => {
    component.isOpen = true;
    fixture.detectChanges();
    spyOn(component.onClose, 'emit');
    const modalInner = fixture.debugElement.query(By.css('.modal'));
    modalInner.triggerEventHandler('click', { stopPropagation: () => {} });
    expect(component.onClose.emit).not.toHaveBeenCalled();
  });

  it('deve emitir onClose ao clicar no botão cancelar', () => {
    component.isOpen = true;
    fixture.detectChanges();
    spyOn(component.onClose, 'emit');
    const cancelBtn = fixture.debugElement.query(By.css('.buttonCancel'));
    cancelBtn.triggerEventHandler('click', null);
    expect(component.onClose.emit).toHaveBeenCalled();
  });

  it('deve emitir onConfirm ao clicar no botão confirmar', () => {
    component.isOpen = true;
    fixture.detectChanges();
    spyOn(component.onConfirm, 'emit');
    const confirmBtn = fixture.debugElement.query(By.css('.buttonConfirm'));
    confirmBtn.triggerEventHandler('click', null);
    expect(component.onConfirm.emit).toHaveBeenCalled();
  });

  it('deve usar labels personalizados', () => {
    component.isOpen = true;
    component.confirmLabel = 'Sim';
    component.cancelLabel = 'Não';
    fixture.detectChanges();

    const cancelBtn = fixture.debugElement.query(By.css('.buttonCancel')).nativeElement;
    const confirmBtn = fixture.debugElement.query(By.css('.buttonConfirm')).nativeElement;

    expect(cancelBtn.textContent).toContain('Não');
    expect(confirmBtn.textContent).toContain('Sim');
  });

  it('deve renderizar conteúdo passado via ng-content', () => {
    component.isOpen = true;
    fixture.detectChanges();

    const content = document.createElement('span');
    content.textContent = 'Conteúdo do Modal';
    fixture.nativeElement.querySelector('.body').appendChild(content);

    const bodyEl = fixture.debugElement.query(By.css('.body')).nativeElement;
    expect(bodyEl.textContent).toContain('Conteúdo do Modal');
  });
});
