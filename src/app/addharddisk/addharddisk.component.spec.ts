import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddharddiskComponent } from './addharddisk.component';

describe('AddharddiskComponent', () => {
  let component: AddharddiskComponent;
  let fixture: ComponentFixture<AddharddiskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddharddiskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddharddiskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
