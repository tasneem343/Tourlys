import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IRoomAdmin } from '../../../core/Interface/AdminDashBoard/IRoomAdmin';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewRoomsService } from '../../../core/services/AdminDashBoard/viewRooms.service';
import { environment } from '../../../../environments/environment.development';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-room',
  imports: [ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './edit-room.component.html',
  styleUrl: './edit-room.component.css'
})
export class EditRoomComponent {
  UpdateForm!: FormGroup;
  imagePreview: string | null = null;
  room: IRoomAdmin;
  root: string = '';
  hasNewImage: boolean = false;
  selectedFile: File | null = null;
  imageError: string | null = null;
  constructor(private router: Router,private route:ActivatedRoute, private _roomservice: ViewRoomsService) {
    const nav = this.router.getCurrentNavigation();
    this.room = nav?.extras.state?.['room'];
    console.log(this.room);
    this.root = `${environment.baseUrl}`;
  }

  get roomtype() { return this.UpdateForm.get('roomtype'); }
  get pricePerNight() { return this.UpdateForm.get('pricePerNight'); }
  get imageUrl() { return this.UpdateForm.get('imageUrl'); }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const roomData = params['room'];
      if (roomData) {
        try {
          this.room = JSON.parse(decodeURIComponent(roomData));
        } catch (error) {
          console.error('Error parsing hotel data:', error);
        }
      }
    });
    this.UpdateForm = new FormGroup({
      pricePerNight: new FormControl('', [Validators.required,Validators.pattern('^[1-9][0-9]*$')]),
      roomType: new FormControl('', Validators.required),
      imageUrl: new FormControl(this.room.imageUrl || null),

    });
    this.UpdateForm.patchValue({
      roomtype: this.room.roomType,
      pricePerNight:this.room.pricePerNight,
    });
    this.imagePreview = this.room.imageUrl ? `${this.root}${this.room.imageUrl}` : null;
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
        this.imageUrl?.setValue(this.room.imageUrl || null);
        this.imagePreview = this.room.imageUrl ? `${this.root}${this.room.imageUrl}` : null;
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
      this.imageUrl?.setValue(this.room.imageUrl || null);
      this.imagePreview = this.room.imageUrl ? `${this.root}${this.room.imageUrl}` : null;
    }
  }

  submit() {
    if (this.UpdateForm.valid && !this.imageError) {
      const formData = new FormData();
      const formValue = this.UpdateForm.value;

      console.log('Form value:', formValue);

      formData.append('roomType', formValue.roomType);
      formData.append('pricePerNight', formValue.pricePerNight);
      formData.append('roomId', this.room.roomId.toString());


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

      this._roomservice.UpdateRoom(formData).subscribe({
        next: (res) => {
          console.log('Room Updated:', res);
          this.hasNewImage = false;
          this.router.navigate(['/Admin/viewrooms']);
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



