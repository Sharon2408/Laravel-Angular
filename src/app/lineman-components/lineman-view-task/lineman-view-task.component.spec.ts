import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinemanViewTaskComponent } from './lineman-view-task.component';

describe('LinemanViewTaskComponent', () => {
  let component: LinemanViewTaskComponent;
  let fixture: ComponentFixture<LinemanViewTaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LinemanViewTaskComponent]
    });
    fixture = TestBed.createComponent(LinemanViewTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
