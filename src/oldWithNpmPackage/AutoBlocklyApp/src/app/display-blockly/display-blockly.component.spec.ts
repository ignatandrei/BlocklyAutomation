import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayBlocklyComponent } from './display-blockly.component';

describe('DisplayBlocklyComponent', () => {
  let component: DisplayBlocklyComponent;
  let fixture: ComponentFixture<DisplayBlocklyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayBlocklyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayBlocklyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
