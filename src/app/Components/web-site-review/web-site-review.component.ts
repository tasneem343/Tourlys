import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-web-site-review',
  standalone: true,
  templateUrl: './web-site-review.component.html',
  styleUrls: ['./web-site-review.component.css']
})
export class WebSiteReviewComponent implements AfterViewInit {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  direction = 1;
  intervalId: any;

  ngAfterViewInit() {
    const container = this.scrollContainer?.nativeElement;

    if (!container) {
      console.error('Scroll container not found');
      return;
    }

    const card = container.querySelector('.testimonial-card');
    if (!card) {
      console.error('Testimonial card not found');
      return;
    }

    const cardWidth = card.offsetWidth + 20;
    const maxScroll = container.scrollWidth - container.clientWidth;

    this.intervalId = setInterval(() => {
      if (container.scrollLeft >= maxScroll) {
        this.direction = -1;
      } else if (container.scrollLeft <= 0) {
        this.direction = 1;
      }

      container.scrollBy({
        left: cardWidth * this.direction,
        behavior: 'smooth'
      });
    }, 3000);
  }

  scrollLeft() {
    const container = this.scrollContainer.nativeElement;
    const cardWidth = container.querySelector('.testimonial-card')?.offsetWidth || 300;
    container.scrollBy({ left: -cardWidth, behavior: 'smooth' });
  }

  scrollRight() {
    const container = this.scrollContainer.nativeElement;
    const cardWidth = container.querySelector('.testimonial-card')?.offsetWidth || 300;
    container.scrollBy({ left: cardWidth, behavior: 'smooth' });
  }
}
