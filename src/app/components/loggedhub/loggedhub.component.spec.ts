import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedhubComponent } from './loggedhub.component';

describe('LoggedhubComponent', () => {
  let component: LoggedhubComponent;
  let fixture: ComponentFixture<LoggedhubComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoggedhubComponent]
    });
    fixture = TestBed.createComponent(LoggedhubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
