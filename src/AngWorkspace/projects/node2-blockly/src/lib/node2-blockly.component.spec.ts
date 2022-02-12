import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Node2BlocklyComponent } from './node2-blockly.component';

describe('Node2BlocklyComponent', () => {
  let component: Node2BlocklyComponent;
  let fixture: ComponentFixture<Node2BlocklyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Node2BlocklyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Node2BlocklyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
