import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvaliacaoServicoPage } from './avaliacao-servico.page';

describe('AvaliacaoServicoPage', () => {
  let component: AvaliacaoServicoPage;
  let fixture: ComponentFixture<AvaliacaoServicoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AvaliacaoServicoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
