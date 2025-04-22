import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../../core/services/profile.service';
import { IProfile } from '../../core/Interface/Iprofile';
import { NavBarComponent } from "../Shared/navbar/nav-bar.component";
import { FooterComponent } from "../footer/footer.component";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment.development';
// import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-profile',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {
  UpdateForm!: FormGroup;
  imagePreview: string | null = null;
  profile: IProfile | undefined;
  root: string = '';
  hasNewImage: boolean = false;

  constructor(private router: Router, private profileservice: ProfileService,
    // private _snackbar:MatSnackBar
  ) {
    this.root = `${environment.baseUrl}`;
  }

  get firstName() { return this.UpdateForm.get('firstName'); }
  get lastName() { return this.UpdateForm.get('lastName'); }
  get userName() { return this.UpdateForm.get('userName'); }
  get phoneNumber() { return this.UpdateForm.get('phoneNumber'); }
  get city() { return this.UpdateForm.get('city'); }
  get state() { return this.UpdateForm.get('state'); }
  get street() { return this.UpdateForm.get('street'); }
  get email() { return this.UpdateForm.get('email'); }
  get image() { return this.UpdateForm.get('image'); }

  ngOnInit(): void {
    this.UpdateForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      userName: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^0\d{10}$/)]),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      image: new FormControl(null)
    });

    const userId =localStorage.getItem('userId')

    if (userId) this.GetProfileByUserId(userId);
  }

  GetProfileByUserId(userid: string) {
    this.profileservice.GetProfileByUserId(userid).subscribe({
      next: (response) => {
        this.profile = response;
        this.UpdateForm.patchValue({
          firstName: response.firstName,
          lastName: response.lastName,
          userName: response.userName,
          phoneNumber: response.phoneNumber,
          city: response.city,
          state: response.state,
          street: response.street,
          email: response.email
        });
        this.imagePreview = response.imageUrl ? `${this.root}${response.imageUrl}` : null;
      },
      error: (err) => console.error('Error fetching profile:', err)
    });
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      console.log('Selected file:', file);
      this.image?.setValue(file);
      this.hasNewImage = true;
      console.log('Image control value:', this.image?.value);

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    } else {
      console.log('No file selected');
      this.hasNewImage = false;
    }
  }

  submit() {
    if (this.UpdateForm.valid) {
      const formData = new FormData();
      const formValue = this.UpdateForm.value;
      const userId =localStorage.getItem('userId')??"";

      formData.append('FirstName', formValue.firstName);
      formData.append('LastName', formValue.lastName);
      formData.append('UserName', formValue.userName);
      formData.append('PhoneNumber', formValue.phoneNumber);
      formData.append('City', formValue.city);
      formData.append('State', formValue.state);
      formData.append('Street', formValue.street);
      formData.append('Email', formValue.email);

      if (this.hasNewImage && formValue.image instanceof File) {
        formData.append('Image', formValue.image);
      }

      console.log('FormData being sent:');
      for (let pair of (formData as any).entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      this.profileservice.UpdateProfile(userId, formData).subscribe({
        next: (res) => {
          console.log("Profile Updated:", res);
          this.hasNewImage = false;
this.backtoProfile();
          // this._snackbar.open('Profile Updated Successfully', 'Close', {
          //   duration: 3000, // Duration in milliseconds
          //   horizontalPosition: 'end', // Horizontal position
          //   verticalPosition: 'top', // Vertical position
          // });
        },
        error: (err) => {
console.log(err)
          // this._snackbar.open(
          //   err.error?.message || 'User Name Is Already Taken',
          //   'Close',
          //   {
          //     duration: 3000, // Duration in milliseconds
          //     horizontalPosition: 'end', // Horizontal position
          //     verticalPosition: 'top', // Vertical position
          //   }
          // );
          console.error("Update Error Details:", {
            status: err.status,
            statusText: err.statusText,
            error: err.error,
            message: err.message,
            url: err.url
          });
        }
      });
    } else {
      this.UpdateForm.markAllAsTouched();
      Object.values(this.UpdateForm.controls).forEach(ctrl => ctrl.markAsDirty());
    }
  }

  backtoProfile() {
setTimeout(()=>{
  window.location.replace('/profile')
}
,1000)
  }
}
