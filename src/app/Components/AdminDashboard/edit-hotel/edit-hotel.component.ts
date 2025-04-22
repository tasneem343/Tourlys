import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IHotelAdmin } from '../../../core/Interface/AdminDashBoard/IHotelAdmin';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environments/environment.development';
import { ViewHotelService } from '../../../core/services/AdminDashBoard/viewhotel.service';
import { CommonModule } from '@angular/common';
import { ICityAdmin } from '../../../core/Interface/AdminDashBoard/ICityAdmin';

@Component({
  selector: 'app-edit-hotel',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './edit-hotel.component.html',
  styleUrl: './edit-hotel.component.css'
})
export class EditHotelComponent {
  UpdateForm!: FormGroup;
  imagePreview: string | null = null;
  hotel!: IHotelAdmin;
  root: string = '';
  hasNewImage: boolean = false;
  selectedFile: File | null = null;
  imageError: string | null = null;
  constructor(private router: Router,private route:ActivatedRoute, private _hotelservice: ViewHotelService) {

    this.root = `${environment.baseUrl}`;
  }

  get name() { return this.UpdateForm.get('name'); }
  get imageUrl() { return this.UpdateForm.get('imageUrl'); }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const hotelData = params['hotel'];
      if (hotelData) {
        try {
          this.hotel = JSON.parse(decodeURIComponent(hotelData));
        } catch (error) {
          console.error('Error parsing hotel data:', error);
        }
      }
    });
    this.UpdateForm = new FormGroup({
      name: new FormControl('',[ Validators.required, Validators.pattern('^[a-zA-Z ]{2,30}$')]),

      imageUrl: new FormControl(this.hotel.imageUrl || null),

    });
    this.UpdateForm.patchValue({
      name: this.hotel.name,
    });
    this.imagePreview = this.hotel.imageUrl ? `${this.root}${this.hotel.imageUrl}` : null;
  }




  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.imageError = null;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      console.log('Selected file:', file);

      const allowedExtensions = /\.(jpg|jpeg|png)$/i;
      const fileName = file.name;
      if (!allowedExtensions.test(fileName)) {
        this.imageError = 'Image must be in .jpg, .jpeg, or .png format';
        this.hasNewImage = false;
        this.selectedFile = null;
        this.imageUrl?.setValue(this.hotel.imageUrl || null);
        this.imagePreview = this.hotel.imageUrl ? `${this.root}${this.hotel.imageUrl}` : null;
        return;
      }

      this.selectedFile = file;
      this.hasNewImage = true;
      this.imageUrl?.setValue(fileName);
      console.log('Image control value:', this.imageUrl?.value);

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
        console.log('Image preview:', this.imagePreview);
      };
      reader.readAsDataURL(file);
    } else {
      console.log('No file selected');
      this.hasNewImage = false;
      this.selectedFile = null;
      this.imageUrl?.setValue(this.hotel.imageUrl || null);
      this.imagePreview = this.hotel.imageUrl ? `${this.root}${this.hotel.imageUrl}` : null;
    }
  }

  submit() {
    if (this.UpdateForm.valid && !this.imageError) {
      const formData = new FormData();
      const formValue = this.UpdateForm.value;

      console.log('Form value:', formValue);

      formData.append('name', formValue.name);
      formData.append('hotelId', this.hotel.hotelId.toString());

      if (this.hasNewImage && this.selectedFile) {
        formData.append('imageUrl', this.selectedFile);
        console.log('New image appended to FormData');
      }
      else {
        console.log('No image provided');
      }

      console.log('FormData entries:');
      for (let pair of (formData as any).entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      this._hotelservice.UpdateHotel(formData).subscribe({
        next: (res) => {
          console.log('Hotel Updated:', res);
          this.hasNewImage = false;
          this.router.navigate(['/Admin/viewhotels']);
        },
        error: (err) => {
          console.error('Update Error Details:', {
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
      if (!this.imageUrl?.value && !this.hasNewImage) {
        this.imageError = 'Image is required';
      }
    }
  }
}

