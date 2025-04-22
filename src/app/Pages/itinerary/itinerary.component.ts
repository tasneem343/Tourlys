import { Component } from '@angular/core';
import { TripPlannerComponent } from '../../Components/trip/trip-planner/trip-planner/trip-planner.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "../../Components/footer/footer.component";
import { NavBarComponent } from "../../Components/Shared/navbar/nav-bar.component";

@Component({
  selector: 'app-itinerary',
  imports: [TripPlannerComponent, CommonModule, FooterComponent, NavBarComponent],
  templateUrl: './itinerary.component.html',
  styleUrl: './itinerary.component.css'
})
export class ItineraryComponent {

}
