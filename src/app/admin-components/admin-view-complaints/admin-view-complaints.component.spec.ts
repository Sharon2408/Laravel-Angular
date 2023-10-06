import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewComplaintsComponent } from './admin-view-complaints.component';

describe('AdminViewComplaintsComponent', () => {
  let component: AdminViewComplaintsComponent;
  let fixture: ComponentFixture<AdminViewComplaintsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminViewComplaintsComponent]
    });
    fixture = TestBed.createComponent(AdminViewComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
