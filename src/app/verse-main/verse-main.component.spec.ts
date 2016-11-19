/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VerseMainComponent } from './verse-main.component';

describe('VerseMainComponent', () => {
  let component: VerseMainComponent;
  let fixture: ComponentFixture<VerseMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerseMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerseMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
