import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToursearchComponent } from './toursearch.component';

describe('ToursearchComponent', () => {
  let component: ToursearchComponent;
  let fixture: ComponentFixture<ToursearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToursearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToursearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
