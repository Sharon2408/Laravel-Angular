import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAreaLinemanComponent } from './view-area-lineman.component';

describe('ViewAreaLinemanComponent', () => {
  let component: ViewAreaLinemanComponent;
  let fixture: ComponentFixture<ViewAreaLinemanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewAreaLinemanComponent]
    });
    fixture = TestBed.createComponent(ViewAreaLinemanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
