import { TestBed } from '@angular/core/testing';

import { SuperpowerStoreService } from './superpower-store.service';

describe('SuperpowerStoreService', () => {
  let service: SuperpowerStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuperpowerStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
