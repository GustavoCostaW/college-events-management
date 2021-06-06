import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EventGalleryUploadComponent } from './event-gallery-upload.component';

describe('EventGalleryUploadComponent', () => {
  let component: EventGalleryUploadComponent;
  let fixture: ComponentFixture<EventGalleryUploadComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EventGalleryUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventGalleryUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
