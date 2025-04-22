import { CommonModule, NgClass } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ProfileService } from '../../core/services/profile.service';
import { environment } from '../../../environments/environment.development';
import { IProfile } from '../../core/Interface/Iprofile';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin',
  imports: [RouterOutlet,CommonModule,NgClass,RouterLink],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent  implements OnInit {
  menuStates: { [key: string]: boolean } = {
    permissions: false,
    rooms: false,
    hotels: false,
    cities: false
  };
  root:string="";
  constructor(private router:Router,private profileservice:ProfileService,private _authServices:AuthService) {
    this.root=`${environment.baseUrl}`;
  }

    ngOnInit(): void {
      const userId =localStorage.getItem('userId')
      if (userId) {
        this.GetProfileByUserId(userId);
      } else {
        console.error('User ID not found in local storage.');
      }
    }
  profile:IProfile|undefined;

    GetProfileByUserId(userid: string) {
      this.profileservice.GetProfileByUserId(userid).subscribe({
        next: (response) => {
          this.profile = response; // Assuming the API returns an array, take the first element
          console.log('Profile loaded:', response);
        },
        error: (err) => {
          console.error('Error fetching profile:', err);
        }
      });}
  // Toggle the state of a specific menu
  toggleMenu(menu: string) {
    this.menuStates[menu] = !this.menuStates[menu];
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
}
