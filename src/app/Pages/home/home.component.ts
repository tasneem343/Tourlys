import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../Components/header/header.component';
import { HeroComponent } from '../../Components/hero/hero.component';
import { ToursearchComponent } from '../../Components/toursearch/toursearch.component';
import { PopularDestinationsComponent } from '../../Components/popular-destinations/popular-destinations.component';
import { PackagesComponent } from '../../Components/packages/packages.component';
import { GalleryComponent } from '../../Components/gallery/gallery.component';
import { ContactComponent } from '../../Components/contact/contact.component';
import { FooterComponent } from '../../Components/footer/footer.component';
import { WebSiteReviewComponent } from '../../Components/web-site-review/web-site-review.component';
import { ProfileService } from '../../core/services/profile.service';
import { IProfile } from '../../core/Interface/Iprofile';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-home',
  imports: [
    HeaderComponent,
    HeroComponent,
    ToursearchComponent,
    PopularDestinationsComponent,
    GalleryComponent,
    ContactComponent,
    FooterComponent,
    WebSiteReviewComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent   {


}
