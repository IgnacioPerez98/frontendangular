import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarnetsaludComponent } from './carnetsalud.component';

describe('CarnetsaludComponent', () => {
  let component: CarnetsaludComponent;
  let fixture: ComponentFixture<CarnetsaludComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarnetsaludComponent]
    });
    fixture = TestBed.createComponent(CarnetsaludComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
