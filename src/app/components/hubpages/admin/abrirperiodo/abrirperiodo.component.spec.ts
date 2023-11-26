import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbrirperiodoComponent } from './abrirperiodo.component';

describe('AbrirperiodoComponent', () => {
  let component: AbrirperiodoComponent;
  let fixture: ComponentFixture<AbrirperiodoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AbrirperiodoComponent]
    });
    fixture = TestBed.createComponent(AbrirperiodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
