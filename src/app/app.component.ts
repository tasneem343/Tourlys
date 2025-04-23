import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private router: Router, private spinner: NgxSpinnerService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.spinner.show();
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          this.spinner.hide();
        }, 100);
      }
    });
  }
  title = 'TravelBookingPortal';
}