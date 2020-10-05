/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EventGalleryUploadItemComponent } from './event-gallery-upload-item.component';

describe('EventGalleryUploadItemComponent', () => {
  let component: EventGalleryUploadItemComponent;
  let fixture: ComponentFixture<EventGalleryUploadItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventGalleryUploadItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventGalleryUploadItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
