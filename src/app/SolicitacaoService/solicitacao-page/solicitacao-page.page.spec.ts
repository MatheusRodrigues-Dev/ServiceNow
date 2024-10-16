import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitacaoPagePage } from './solicitacao-page.page';

describe('SolicitacaoPagePage', () => {
  let component: SolicitacaoPagePage;
  let fixture: ComponentFixture<SolicitacaoPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitacaoPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
