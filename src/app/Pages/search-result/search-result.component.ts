import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from '../../Components/header/header.component';
import { HeroComponent } from '../../Components/hero/hero.component';
import { ToursearchComponent } from '../../Components/toursearch/toursearch.component';
import { PackagesComponent } from '../../Components/packages/packages.component';
import { FooterComponent } from '../../Components/footer/footer.component';
import { NavBarComponent } from '../../Components/Shared/navbar/nav-bar.component';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
  imports: [

    ToursearchComponent,
    PackagesComponent,
    FooterComponent,
    NavBarComponent,
  ],
})
export class SearchResultComponent implements OnInit {
  results: any;
  formData: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const navigation = this.route.snapshot?.root?.firstChild?.data['state'];
    if (navigation) {
      this.formData = navigation.formData;
      this.results = navigation.results;
    }

    console.log('Results:', this.results);
  }
}
