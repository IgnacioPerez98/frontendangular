import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObtenerpendientesComponent } from './obtenerpendientes.component';

describe('ObtenerpendientesComponent', () => {
  let component: ObtenerpendientesComponent;
  let fixture: ComponentFixture<ObtenerpendientesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ObtenerpendientesComponent]
    });
    fixture = TestBed.createComponent(ObtenerpendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
