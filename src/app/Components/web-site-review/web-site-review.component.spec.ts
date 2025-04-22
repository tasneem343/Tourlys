import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebSiteReviewComponent } from './web-site-review.component';

describe('WebSiteReviewComponent', () => {
  let component: WebSiteReviewComponent;
  let fixture: ComponentFixture<WebSiteReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebSiteReviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebSiteReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
