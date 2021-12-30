import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindSavedBlocksComponent } from './find-saved-blocks.component';

describe('FindSavedBlocksComponent', () => {
  let component: FindSavedBlocksComponent;
  let fixture: ComponentFixture<FindSavedBlocksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindSavedBlocksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindSavedBlocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
