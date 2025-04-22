import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../../footer/footer.component";
import { NavBarComponent } from "../../Shared/navbar/nav-bar.component";
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ProfileService } from '../../../core/services/profile.service';
import { environment } from '../../../../environments/environment.development';
import { IProfile } from '../../../core/Interface/Iprofile';

@Component({
  selector: 'app-admin-profile',
  imports: [RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './admin-profile.component.html',
  styleUrl: './admin-profile.component.css'
})
export class AdminProfileComponent implements OnInit{

  root:string=""

constructor(private router:Router,private profileservice:ProfileService) {
this.root=`${environment.baseUrl}`;
}

  ngOnInit(): void {
    const userId =localStorage.getItem('userId')
    if (userId) {
      this.GetProfileByUserId(userId);
    } else {
      console.error('User ID not found in local storage.');
    }

    this.router.navigate(['/Admin/adminprofile/admininfo']);
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




  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
      };
      reader.readAsDataURL(file);
    }
  }


}



