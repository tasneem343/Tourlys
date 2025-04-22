import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment.development';
import { ViewHotelService } from '../../../core/services/AdminDashBoard/viewhotel.service';
import { IHotelAdmin } from '../../../core/Interface/AdminDashBoard/IHotelAdmin';
import { CommonModule } from '@angular/common';
import { ICityAdmin } from '../../../core/Interface/AdminDashBoard/ICityAdmin';
import { ViewCityService } from '../../../core/services/AdminDashBoard/viewcity.service';

@Component({
  selector: 'app-add-hotel',
  imports: [CommonModule,FormsModule, ReactiveFormsModule],
  templateUrl: './add-hotel.component.html',
  styleUrl: './add-hotel.component.css'
})
export class AddHotelComponent {
  CreateForm!: FormGroup;
hotels!:IHotelAdmin;
  imagePreview: string | null = null;
  hasNewImage: boolean = false;
cities!:ICityAdmin[]
  root: string =`${ environment.baseUrl}`;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private hotelService: ViewHotelService,
    private cityService: ViewCityService
  ) {
    this.CreateForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]{2,30}$')]],

      cityId: [, Validators.required],
      imageUrl: ['', [Validators.required,Validators.pattern(/\.(jpg|jpeg|png)$/i)]],

    });
  }

  ngOnInit(): void {
    this.getAllCities();
  }

  getAllCities(): void {
    this.cityService.GetAllCities().subscribe({
      next: (response) => {
        this.cities = response;
        console.log('Cities loaded:', this.cities);
      },
      error: (err) => console.error('Error fetching cities:', err)
    });
  }

  selectedFile!: File;

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.selectedFile = file;
      this.CreateForm.get('imageUrl')?.setValue(file.name);

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    } else {
      this.selectedFile = null as any;
      this.imagePreview = null;
      this.CreateForm.get('imageUrl')?.setValue('');

    }
  }

  submit(): void {
    if (this.CreateForm.valid && this.selectedFile) {
      const formValue = this.CreateForm.value;
      const formData = new FormData();

      formData.append('Name', formValue.name);
      formData.append('CityId', formValue.cityId);
      formData.append('imageUrl', this.selectedFile);

      this.hotelService.AddNewHotel(formData).subscribe({
        next: (response) => {
          console.log('Hotel created:', response);
          this.router.navigate(['/Admin/viewhotels']);
        },
        error: (err) => {
          console.error('Error creating hotel:', err);
        }
      });
    } else {
      this.CreateForm.markAllAsTouched();
      console.log('Form is invalid or image not selected.');
    }
  }

  }




