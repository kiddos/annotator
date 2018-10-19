import { TestBed, inject } from '@angular/core/testing';

import { BoundingboxService } from './boundingbox.service';

describe('BoundingboxService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BoundingboxService]
    });
  });

  it('should be created', inject([BoundingboxService], (service: BoundingboxService) => {
    expect(service).toBeTruthy();
  }));
});
