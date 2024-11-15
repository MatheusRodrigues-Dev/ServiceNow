import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CadastrarServicoPage } from './cadastrar-servico.page';

describe('CadastrarServicoPage', () => {
  let component: CadastrarServicoPage;
  let fixture: ComponentFixture<CadastrarServicoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarServicoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
