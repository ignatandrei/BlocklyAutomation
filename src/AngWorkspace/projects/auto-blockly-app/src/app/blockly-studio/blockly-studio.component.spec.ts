import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlocklyStudioComponent } from './blockly-studio.component';

describe('BlocklyStudioComponent', () => {
  let component: BlocklyStudioComponent;
  let fixture: ComponentFixture<BlocklyStudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlocklyStudioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlocklyStudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
