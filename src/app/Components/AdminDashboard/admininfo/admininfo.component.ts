import { Component } from '@angular/core';
import { ProfileService } from '../../../core/services/profile.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { environment } from '../../../../environments/environment.development';
import { IProfile } from '../../../core/Interface/Iprofile';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admininfo',
  imports: [DatePipe],
  templateUrl: './admininfo.component.html',
  styleUrl: './admininfo.component.css'
})
export class AdmininfoComponent {
  root:string="";
  constructor(private profileservice:ProfileService) {
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
        this.profile = response;
        console.log('Profile loaded:', response);
      },
      error: (err) => {
        console.error('Error fetching profile:', err);
      }
    });
}
}


