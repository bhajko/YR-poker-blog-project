/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RestfulComponent } from './restful.component';

describe('RestfulComponent', () => {
  let component: RestfulComponent;
  let fixture: ComponentFixture<RestfulComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestfulComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestfulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
