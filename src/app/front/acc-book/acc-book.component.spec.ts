import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccBookComponent } from './acc-book.component';

describe('AccBookComponent', () => {
  let component: AccBookComponent;
  let fixture: ComponentFixture<AccBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
