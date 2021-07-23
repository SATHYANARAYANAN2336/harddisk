import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewharddiskdetailComponent } from './viewharddiskdetail.component';

describe('ViewharddiskdetailComponent', () => {
  let component: ViewharddiskdetailComponent;
  let fixture: ComponentFixture<ViewharddiskdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewharddiskdetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewharddiskdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
