import { TestBed } from '@angular/core/testing';

import { MessagingCenterService } from './messaging-center.service';

describe('MessagingCenterService', () => {
  let service: MessagingCenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessagingCenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
