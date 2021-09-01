import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HarddisklistComponent } from './harddisklist.component';

describe('HarddisklistComponent', () => {
  let component: HarddisklistComponent;
  let fixture: ComponentFixture<HarddisklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HarddisklistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HarddisklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
