import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { animate, style, transition, trigger, query, stagger } from '@angular/animations';
import { Ireview } from '../../core/Interface/ireview';
import { ReviewService } from '../../core/services/review.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IcreateReview } from '../../core/Interface/icreate-review';
import { environment } from '../../../environments/environment.development';
import { ActivatedRoute } from '@angular/router';
// import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-hotel-reviews',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './hotel-reviews.component.html',
  styleUrls: ['./hotel-reviews.component.css'],
  animations: [
    trigger('cardAnimation', [
      transition(':enter', [
        query('.testimonial-card', [
          style({ opacity: 0, transform: 'translateY(50px)' }),
          stagger(100, [
            animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
          ]),
        ], { optional: true }),
      ]),
    ]),
    trigger('formAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
      ]),
    ]),
  ],
})
export class HotelReviewsComponent implements OnInit {
  hotelName!: string;
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  root: string = environment.baseUrl;
  reviews: Ireview[] = [];
  reviewForm!: FormGroup;
  hoverRating: number = 0;

  constructor(
    private reviewService: ReviewService,
// private _snackbar:MatSnackBar,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.hotelName = params['hotelName'];
      this.initForm();
      this.loadReviews();
    });
  }

  initForm() {
    this.reviewForm = this.fb.group({
      comment: ['', [Validators.required, Validators.minLength(3)]],
      rating: [0, [Validators.required, Validators.min(1), Validators.max(5)]],
    });
  }

  loadReviews() {
    this.reviewService.getByHotelName(this.hotelName).subscribe({
      next: (res) => (this.reviews = res),
      error: (err) => console.error('Error fetching reviews:', err),
    });
  }

  addReview() {
    // if (this.reviewForm.invalid) {
    //   this._snackbar.open('Please Enter a Valid Comment And Rating(1-5)', 'Close', {
    //     duration: 3000, // Duration in milliseconds
    //     horizontalPosition: 'end', // Horizontal position
    //     verticalPosition: 'top', // Vertical position
    //   });      return;
    // }

    const reviewData: IcreateReview = {
      comment: this.reviewForm.value.comment,
      rating: this.reviewForm.value.rating,
      hotelName: this.hotelName,
      userId: localStorage.getItem('userId') ?? '',
    };

    this.reviewService.addReview(reviewData).subscribe({
      next: () => {
        this.reviewForm.reset({ comment: '', rating: 0 });
        this.loadReviews();
      },
      error: (err) => {
        console.error('Error adding review:', err);
        alert('Failed to add review. Please try again.');
      },
    });
  }

  scrollLeft() {
    const cardWidth = this.scrollContainer.nativeElement.querySelector('.testimonial-card')?.offsetWidth || 300;
    this.scrollContainer.nativeElement.scrollBy({ left: -cardWidth, behavior: 'smooth' });
  }

  scrollRight() {
    const cardWidth = this.scrollContainer.nativeElement.querySelector('.testimonial-card')?.offsetWidth || 300;
    this.scrollContainer.nativeElement.scrollBy({ left: cardWidth, behavior: 'smooth' });
  }

  getStars(rating: number): string[] {
    const stars = [];
    for (let i = 0; i < rating; i++) stars.push('★');
    for (let i = rating; i < 5; i++) stars.push('☆');
    return stars;
  }

  onStarHover(rating: number) {
    this.hoverRating = rating;
  }

  onStarLeave() {
    this.hoverRating = 0;
  }
}
