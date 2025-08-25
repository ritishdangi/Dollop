import { TestBed } from '@angular/core/testing';

import { TicketNotificationService } from './ticket-notification.service';

describe('TicketNotificationService', () => {
  let service: TicketNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
