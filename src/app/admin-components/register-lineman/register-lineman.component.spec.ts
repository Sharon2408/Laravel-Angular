import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterLinemanComponent } from './register-lineman.component';

describe('RegisterLinemanComponent', () => {
  let component: RegisterLinemanComponent;
  let fixture: ComponentFixture<RegisterLinemanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterLinemanComponent]
    });
    fixture = TestBed.createComponent(RegisterLinemanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
