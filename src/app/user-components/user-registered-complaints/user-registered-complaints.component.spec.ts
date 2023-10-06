import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRegisteredComplaintsComponent } from './user-registered-complaints.component';

describe('UserRegisteredComplaintsComponent', () => {
  let component: UserRegisteredComplaintsComponent;
  let fixture: ComponentFixture<UserRegisteredComplaintsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserRegisteredComplaintsComponent]
    });
    fixture = TestBed.createComponent(UserRegisteredComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
