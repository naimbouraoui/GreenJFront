import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReclamationFrontComponent } from './reclamationFront.component';

describe('ReclamationFrontComponent', () => {
  let component: ReclamationFrontComponent;
  let fixture: ComponentFixture<ReclamationFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReclamationFrontComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReclamationFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
