import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment.development';
import { ViewCityService } from '../../../core/services/AdminDashBoard/viewcity.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-city',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './add-city.component.html',
  styleUrl: './add-city.component.css'
})
export class AddCityComponent {
  CreateForm!: FormGroup;
   imagePreview: string | null = null;
   hasNewImage: boolean = false;
   root: string =`${ environment.baseUrl}`;

   constructor(
     private fb: FormBuilder,
     private router: Router,
     private cityService: ViewCityService
   ) {
     this.CreateForm = this.fb.group({
      name: ['',[ Validators.required, Validators.pattern('^[a-zA-Z ]{2,20}$')]],
      imageUrl: ['', [Validators.required, Validators.pattern(/\.(jpg|jpeg|png)$/i)]],
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

       formData.append('name', formValue.name);
       formData.append('imageUrl', this.selectedFile);

       this.cityService.AddNewCity(formData).subscribe({
         next: (response) => {
           console.log('City created:', response);
           this.router.navigate(['/Admin/viewcities']);
         },
         error: (err) => {
           console.error('Error creating city:', err);
         }
       });
     } else {
       this.CreateForm.markAllAsTouched();
       console.log('Form is invalid or image not selected.');
     }
   }

}
