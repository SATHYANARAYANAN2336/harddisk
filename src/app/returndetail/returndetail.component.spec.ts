import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturndetailComponent } from './returndetail.component';

describe('ReturndetailComponent', () => {
  let component: ReturndetailComponent;
  let fixture: ComponentFixture<ReturndetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturndetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturndetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
