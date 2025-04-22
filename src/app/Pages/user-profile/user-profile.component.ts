import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HeaderComponent } from "../../Components/header/header.component";
import { FooterComponent } from "../../Components/footer/footer.component";
import { HeroComponent } from "../../Components/hero/hero.component";
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ProfileService } from '../../core/services/profile.service';
import { IProfile } from '../../core/Interface/Iprofile';
import { CommonModule, DatePipe } from '@angular/common';
import { NavBarComponent } from '../../Components/Shared/navbar/nav-bar.component';
import { environment } from '../../../environments/environment.development';
import { FormsModule } from '@angular/forms';
import { EditProfileComponent } from "../../Components/edit-profile/edit-profile.component";

@Component({
  selector: 'app-user-profile',
  imports: [RouterOutlet,FooterComponent, NavBarComponent, FormsModule, CommonModule, RouterLinkActive,RouterLink],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements OnInit{

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

    this.router.navigate(['/profile/userinfo']);
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

