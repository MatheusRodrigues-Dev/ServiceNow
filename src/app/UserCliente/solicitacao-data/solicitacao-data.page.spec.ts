import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitacaoDataPage } from './solicitacao-data.page';

describe('SolicitacaoDataPage', () => {
  let component: SolicitacaoDataPage;
  let fixture: ComponentFixture<SolicitacaoDataPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitacaoDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
