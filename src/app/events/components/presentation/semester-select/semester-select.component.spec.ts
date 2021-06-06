import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemesterSelectComponent } from './semester-select.component';

describe('SemesterSelectComponent', () => {
  let component: SemesterSelectComponent;
  let fixture: ComponentFixture<SemesterSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SemesterSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SemesterSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
