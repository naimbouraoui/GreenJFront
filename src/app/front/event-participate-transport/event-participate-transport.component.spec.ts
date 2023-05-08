import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventParticipateTransportComponent } from './event-participate-transport.component';

describe('EventParticipateTransportComponent', () => {
  let component: EventParticipateTransportComponent;
  let fixture: ComponentFixture<EventParticipateTransportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventParticipateTransportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventParticipateTransportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
