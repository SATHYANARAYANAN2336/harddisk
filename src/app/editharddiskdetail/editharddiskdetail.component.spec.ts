import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditharddiskdetailComponent } from './editharddiskdetail.component';

describe('EditharddiskdetailComponent', () => {
  let component: EditharddiskdetailComponent;
  let fixture: ComponentFixture<EditharddiskdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditharddiskdetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditharddiskdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
