import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HarddiskinuseComponent } from './harddiskinuse.component';

describe('HarddiskinuseComponent', () => {
  let component: HarddiskinuseComponent;
  let fixture: ComponentFixture<HarddiskinuseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HarddiskinuseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HarddiskinuseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
