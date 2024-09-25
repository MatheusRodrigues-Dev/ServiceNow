import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CodigoemailPage } from './codigoemail.page';

describe('CodigoemailPage', () => {
  let component: CodigoemailPage;
  let fixture: ComponentFixture<CodigoemailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CodigoemailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
