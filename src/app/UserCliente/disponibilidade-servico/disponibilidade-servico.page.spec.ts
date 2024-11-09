import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DisponibilidadeServicoPage } from './disponibilidade-servico.page';

describe('DisponibilidadeServicoPage', () => {
  let component: DisponibilidadeServicoPage;
  let fixture: ComponentFixture<DisponibilidadeServicoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DisponibilidadeServicoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
