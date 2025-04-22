import { Component, OnInit } from '@angular/core';
import { Ireview } from '../../core/Interface/ireview';
import { Router } from '@angular/router';
import { ProfileService } from '../../core/services/profile.service';
import { ReviewService } from '../../core/services/review.service';
import { CommonModule, DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-user-review',
  imports: [DatePipe,CommonModule,NgClass],
  templateUrl: './user-review.component.html',
  styleUrl: './user-review.component.css'
})
export class UserReviewComponent implements OnInit {
  Reviews:Ireview[]=[]
  constructor(private router: Router,private reviewService: ReviewService) { }


  ngOnInit(): void {

    const userId=localStorage.getItem('userId');
    if (userId) {
      this.GetUserReviews(userId);
    } else {
      console.error('User ID not found in local storage.');
    }
  }
  GetUserReviews(userId: string) {
    this.reviewService.GetReviewsByUserId(userId).subscribe((response)=>{
      this.Reviews = response;
      console.log(this.Reviews);
    },(error)=>{
      console.log(error);
    })
  }
  DeleteReview(reviewId:number){
    console.log(reviewId);

    this.reviewService.DeleteReview(reviewId).subscribe( (response)=>{
      console.log(response);
      const userId=localStorage.getItem('userId');
      if (userId) {
        this.GetUserReviews(userId);
      } else {
        console.error('User ID not found in local storage.');
      }
    },(error)=>{
      console.log(error);
    })
  }

}


