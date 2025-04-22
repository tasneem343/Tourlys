import { Component, ViewEncapsulation } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';

import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  errorMessage: string | null = null;
  firstName!: FormControl;
  lastName!: FormControl;
  userName!: FormControl;
  date2: Date | undefined;
  phoneNumber!: FormControl;
  city!: FormControl;
  state!: FormControl;
  street!: FormControl;
  email!: FormControl;
  password!: FormControl;
  birthDate!: FormControl;
  image!: FormControl;
  registerForm!: FormGroup;

  constructor(
    private _authService: AuthService,
    private spinner: NgxSpinnerService,
    private _router: Router,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.initFormControls();
    this.initFormGroup();
  }
  initFormControls(): void {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.userName = new FormControl('', [Validators.required]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
      Validators.pattern(/^(?=.*[A-Za-z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/),
    ]);
    this.firstName = new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]{2,20}$'),
    ]);
    this.lastName = new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]{2,20}$'),
    ]);
    this.phoneNumber = new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{11}$/),
    ]);
    this.city = new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]{2,20}$'),
    ]);
    this.state = new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]{2,20}$'),
    ]);
    this.street = new FormControl('', [Validators.required]);
    this.birthDate = new FormControl('', [
      Validators.required,
      (control: AbstractControl): { [key: string]: boolean } | null => {
        const date = new Date(control.value);
        const today = new Date();
        if (date >= today) {
          return { invalidDate: true };
        }
        return null;
      },
    ]);
    this.image = new FormControl('', [Validators.required]);
  }

  initFormGroup(): void {
    this.registerForm = new FormGroup({
      email: this.email,
      password: this.password,
      firstName: this.firstName,
      userName: this.userName,
      lastName: this.lastName,
      phoneNumber: this.phoneNumber,
      city: this.city,
      state: this.state,
      street: this.street,
      birthDate: this.birthDate,
      image: this.image,
    });
  }
  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.image.setValue(input.files[0]);
    }
  }

  submit() {
    if (this.registerForm.valid) {
      const formData = new FormData();
      const formValue = this.registerForm.value;
      formData.append('email', formValue.email);
      formData.append('password', formValue.password);
      formData.append('userName', formValue.userName);
      formData.append('firstName', formValue.firstName);
      formData.append('lastName', formValue.lastName);
      formData.append('phoneNumber', formValue.phoneNumber);
      formData.append('state', formValue.state);
      formData.append('city', formValue.city);
      formData.append('street', formValue.street);
      formData.append(
        'dateOfBirth',
        new Date(formValue.birthDate).toISOString()
      );
      formData.append('createdAt', new Date().toISOString());
      if (formValue.image) {
        formData.append('image', formValue.image);
      }
      this.signUp(formData);
    } else {
      this.registerForm.markAllAsTouched();
      Object.keys(this.registerForm.controls).forEach((control) =>
        this.registerForm.controls[control].markAsDirty()
      );
    }
  }

  signUp(registerData: FormData) {
    this.spinner.show();

    this._authService.register(registerData).subscribe({
      next: (response) => {
        if (response.success) {
          this.spinner.hide();
          this.snackBar.open('Registration Successful!', 'Close', {
            duration: 3000, // Duration in milliseconds
            horizontalPosition: 'end', // Horizontal position
            verticalPosition: 'top', // Vertical position
            panelClass: ['snackbar-success'], // Custom class for styling
          });
          localStorage.setItem('token', response.token);
          localStorage.setItem('userId', response.id);
          this._router.navigate(['Home']);
        }
      },
      error: (error: any) => {
        this.spinner.hide();

        if (error.status === 400 && error.error?.errors) {
          const validationErrors = error.error.errors;
          const errorMessages: string[] = [];

          for (const key in validationErrors) {
            if (validationErrors.hasOwnProperty(key)) {
              errorMessages.push(...validationErrors[key]);
            }
          }

          this.snackBar.open(
            errorMessages.join('\n'),
            'Close',
            {
              duration: 5000, // Duration in milliseconds
              horizontalPosition: 'end',
              verticalPosition: 'top',
              panelClass: ['snackbar-error'], // Custom class for styling
            }
          );
        }
        else if (error.error?.errorMessage) {
          this.snackBar.open(error.error.errorMessage, 'Close', {
            duration: 5000, // Duration in milliseconds
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['snackbar-error'], // Custom class for styling
          });
        }
        else {
          this.snackBar.open(
            'An unexpected error occurred. Please try again.',
            'Close',
            {
              duration: 5000, // Duration in milliseconds
              horizontalPosition: 'end',
              verticalPosition: 'top',
              panelClass: ['snackbar-error'], // Custom class for styling
            }
          );
        }
      },
    });
  }
}
