import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ViewCityService } from '../../../core/services/AdminDashBoard/viewcity.service';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment.development';
import { IHotelAdmin } from '../../../core/Interface/AdminDashBoard/IHotelAdmin';
import { ViewRoomsService } from '../../../core/services/AdminDashBoard/viewRooms.service';
import { ViewHotelService } from '../../../core/services/AdminDashBoard/viewhotel.service';

@Component({
  selector: 'app-add-room',
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './add-room.component.html',
  styleUrl: './add-room.component.css'
})
export class AddRoomComponent {
 CreateForm!: FormGroup;
hotels!:IHotelAdmin[];
  imagePreview: string | null = null;
  hasNewImage: boolean = false;
  root: string =`${ environment.baseUrl}`;
  isAvailable: boolean = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private hotelService: ViewHotelService,
    private roomService: ViewRoomsService
  ) {
    this.CreateForm = this.fb.group({
      roomType: ['', Validators.required],
      HotelId: [, Validators.required],
      roomNumber: ['',[ Validators.required,Validators.pattern('^[1-9][0-9]*$')]],
      pricePerNight: ['',[ Validators.required,Validators.pattern('^[1-9][0-9]*$') ]],
      imageUrl: ['', [Validators.required,  Validators.pattern(/\.(jpg|jpeg|png)$/i)]],

    });
  }

  ngOnInit(): void {
this.getAllHotels();  }

  getAllHotels(): void {
    this.hotelService.GetAllHotels().subscribe({
      next: (response) => {
        this.hotels = response;
        console.log('hotels loaded:', this.hotels);
      },
      error: (err) => console.error('Error fetching hotels:', err)
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
      formData.append('roomType', formValue.roomType);
      formData.append('HotelId', formValue.HotelId);
      formData.append('roomNumber', formValue.roomNumber);
      formData.append('pricePerNight', formValue.pricePerNight);
      formData.append('isAvailable', new Boolean(this.isAvailable).toString());
      formData.append('imageUrl', this.selectedFile);
      console.log('Form data:', formData);

      this.roomService.AddNewRoom(formData).subscribe({
        next: (response) => {
          console.log('room created:', response);
          this.router.navigate(['/Admin/viewrooms']);
        },
        error: (err) => {
          console.error('Error creating room:', err);
        }
      });
    } else {
      this.CreateForm.markAllAsTouched();
      console.log('Form is invalid or image not selected.');
    }
  }

  }
