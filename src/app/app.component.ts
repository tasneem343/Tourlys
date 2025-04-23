import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './Components/header/header.component';
import { HeroComponent } from './Components/hero/hero.component';
import { PopularDestinationsComponent } from './Components/popular-destinations/popular-destinations.component';
import { PackagesComponent } from './Components/packages/packages.component';
import { GalleryComponent } from './Components/gallery/gallery.component';

import { ContactComponent } from './Components/contact/contact.component';
import { FooterComponent } from './Components/footer/footer.component';
import { ToursearchComponent } from './Components/toursearch/toursearch.component';
import { AdminComponent } from './Layouts/admin/admin.component';
import { NgxSpinnerComponent } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSpinnerComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }
  title = 'TravelBookingPortal';
}
