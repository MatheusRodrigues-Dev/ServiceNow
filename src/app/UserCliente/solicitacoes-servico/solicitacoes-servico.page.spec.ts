import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitacoesServicoPage } from './solicitacoes-servico.page';

describe('SolicitacoesServicoPage', () => {
  let component: SolicitacoesServicoPage;
  let fixture: ComponentFixture<SolicitacoesServicoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitacoesServicoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
