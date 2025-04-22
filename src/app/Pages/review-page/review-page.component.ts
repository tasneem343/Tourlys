import { Component } from '@angular/core';
import { NavBarComponent } from '../../Components/Shared/navbar/nav-bar.component';
import { FooterComponent } from '../../Components/footer/footer.component';
import { HotelReviewsComponent } from '../../Components/hotel-reviews/hotel-reviews.component';

@Component({
  selector: 'app-review-page',
  imports: [    FooterComponent,NavBarComponent,HotelReviewsComponent ],
  templateUrl: './review-page.component.html',
  styleUrl: './review-page.component.css'
})
export class ReviewPageComponent {


}
