import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginainicialPage } from './paginainicial.page';

describe('PaginainicialPage', () => {
  let component: PaginainicialPage;
  let fixture: ComponentFixture<PaginainicialPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginainicialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
