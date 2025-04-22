import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDestinationsPageComponent } from './all-destinations-page.component';

describe('AllDestinationsPageComponent', () => {
  let component: AllDestinationsPageComponent;
  let fixture: ComponentFixture<AllDestinationsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllDestinationsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllDestinationsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
