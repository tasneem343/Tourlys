import { CommonModule } from '@angular/common';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IProfile } from '../../../core/Interface/Iprofile';
import { environment } from '../../../../environments/environment.development';
import { AuthService } from '../../../core/services/auth.service';
import { ProfileService } from '../../../core/services/profile.service';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink,CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {
  isNavActive = false;
  isSticky = false;
  IsLoggedIn=false;
  root:string="";
 profile:IProfile|undefined;

constructor(private router:Router,private _authServices:AuthService,private profileservice: ProfileService){
this.root=`${environment.baseUrl}`;

}
  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.IsLoggedIn=true;
this.GetProfileByUserId(userId);
    }
    else{
      this.IsLoggedIn=false;
    }
  }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.isSticky = window.pageYOffset >= 200;

  }
  logout() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this._authServices.logout(userId).subscribe({
        next: (response) => {
          console.log(response);
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          this.router.navigate(['/Login']);
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }

  toggleNav() {
    this.isNavActive = !this.isNavActive;

  }

  scrollTo(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  closeDropdown(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown')) {
      this.isDropdownOpen = false;
    }
  }

  GetProfileByUserId(userid: string) {
    this.profileservice.GetProfileByUserId(userid).subscribe({
      next: (response) => {
        this.profile = response;
        console.log('Profile loaded:', response);
      },
      error: (err) => {
        console.error('Error fetching profile:', err);
      },
    });
  }

}

