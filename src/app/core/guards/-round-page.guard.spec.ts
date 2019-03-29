import { TestBed, async, inject } from '@angular/core/testing';

import { RoundPageGuard } from './-round-page.guard';

describe('RoundPageGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoundPageGuard]
    });
  });

  it('should ...', inject([RoundPageGuard], (guard: RoundPageGuard) => {
    expect(guard).toBeTruthy();
  }));
});
