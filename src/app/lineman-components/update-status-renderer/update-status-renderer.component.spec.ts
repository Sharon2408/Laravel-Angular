import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStatusRendererComponent } from './update-status-renderer.component';

describe('UpdateStatusRendererComponent', () => {
  let component: UpdateStatusRendererComponent;
  let fixture: ComponentFixture<UpdateStatusRendererComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateStatusRendererComponent]
    });
    fixture = TestBed.createComponent(UpdateStatusRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
