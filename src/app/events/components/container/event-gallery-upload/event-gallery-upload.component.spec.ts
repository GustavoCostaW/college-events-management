import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventGalleryUploadComponent } from './event-gallery-upload.component';

describe('EventGalleryUploadComponent', () => {
  let component: EventGalleryUploadComponent;
  let fixture: ComponentFixture<EventGalleryUploadComponent>;

  beforeEach(async(() => {
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
