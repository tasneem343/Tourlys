import { Component } from '@angular/core';
import { HeaderComponent } from '../../Components/header/header.component';
import { AllDestinationsComponent } from '../../Components/all-destinations/all-destinations.component';
import { FooterComponent } from '../../Components/footer/footer.component';
import { NavBarComponent } from '../../Components/Shared/navbar/nav-bar.component';

@Component({
  selector: 'app-all-destinations-page',
  imports: [
    AllDestinationsComponent,
    FooterComponent,
    NavBarComponent,
  ],
  templateUrl: './all-destinations-page.component.html',
  styleUrl: './all-destinations-page.component.css',
})
export class AllDestinationsPageComponent {}
