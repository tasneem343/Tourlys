import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContuctUsComponent} from './contact-us.component';

describe('ContactUsComponent', () => {
  let component: ContuctUsComponent;
  let fixture: ComponentFixture<ContuctUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContuctUsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContuctUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
