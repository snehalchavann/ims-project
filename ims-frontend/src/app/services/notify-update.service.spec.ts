import { TestBed } from '@angular/core/testing';

import { NotifyUpdateService } from './notify-update.service';

describe('NotifyUpdateService', () => {
  let service: NotifyUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotifyUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
