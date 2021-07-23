import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HarddiskdetailComponent } from './harddiskdetail.component';

describe('HarddiskdetailComponent', () => {
  let component: HarddiskdetailComponent;
  let fixture: ComponentFixture<HarddiskdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HarddiskdetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HarddiskdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
