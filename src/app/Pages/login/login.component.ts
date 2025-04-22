import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
import { ILogin } from '../../core/Interface/ilogin';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email!: FormControl;
  password!: FormControl;
  loginForm!: FormGroup;

  constructor(
    private _authService: AuthService,
    private spinner: NgxSpinnerService,
    private _router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.initFormControls();
    this.initFormGroup();
    this.route.queryParams.subscribe((params) => {
      const token = params['token'];
      const userId = params['userId'];

      if (token && userId) {
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        const returnUrl = localStorage.getItem('returnUrl');
        this._router.navigateByUrl(returnUrl || '/Home');
        localStorage.removeItem('returnUrl');
      }
    });
  }
  initFormControls(): void {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
      Validators.pattern(/^(?=.*[A-Za-z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/),
    ]);
  }

  initFormGroup(): void {
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password,
    });
  }

  submit() {
    if (this.loginForm.valid) {
      this.siginIn(this.loginForm.value);
    } else {
      this.loginForm.markAllAsTouched();
      Object.keys(this.loginForm.controls).forEach((control) =>
        this.loginForm.controls[control].markAsDirty()
      );
    }
  }

  siginIn(data: ILogin): void {
    this._authService.login(data).subscribe({
      next: (response) => {
        if (response.success) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('userId', response.id);

          const role = this._authService.getRole();
          const returnUrl = localStorage.getItem('returnUrl');
          if (role === 'Admin') {
            this.snackBar.open('Welcome Back Admin !', 'Close', {
              duration: 3000, // Duration in milliseconds
              horizontalPosition: 'end', // Horizontal position
              verticalPosition: 'top', // Vertical position
              panelClass: ['snackbar-success'], // Custom class for styling
            });
            this._router.navigate(['Admin']);
          } else {
            this.snackBar.open('Welcome Back !', 'Close', {
              duration: 3000, // Duration in milliseconds
              horizontalPosition: 'end', // Horizontal position
              verticalPosition: 'top', // Vertical position
              panelClass: ['snackbar-success'],
            });
            this._router.navigateByUrl(returnUrl || '/Home');
          }
          localStorage.removeItem('returnUrl');
        }
      },
      error: (err) => {
        this.spinner.hide();
        this.snackBar.open(
          err.error?.message || 'An error occurred. Please try again.',
          'Close',
          {
            duration: 3000, // Duration in milliseconds
            horizontalPosition: 'end', // Horizontal position
            verticalPosition: 'top', // Vertical position
          }
        );
      },
    });
  }
  loginWithProvider(provider: 'Google' | 'GitHub'): void {
    this._authService.externalLogin(provider);
  }
}
