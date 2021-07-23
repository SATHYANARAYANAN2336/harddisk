import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrydetailComponent } from './entrydetail.component';

describe('EntrydetailComponent', () => {
  let component: EntrydetailComponent;
  let fixture: ComponentFixture<EntrydetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntrydetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrydetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
