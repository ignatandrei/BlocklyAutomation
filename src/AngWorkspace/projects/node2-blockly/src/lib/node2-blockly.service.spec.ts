import { TestBed } from '@angular/core/testing';

import { Node2BlocklyService } from './node2-blockly.service';

describe('Node2BlocklyService', () => {
  let service: Node2BlocklyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Node2BlocklyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
