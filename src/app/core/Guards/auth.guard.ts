import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const auth = inject(AuthService);

  if (!auth.isAuthorized()) {
    localStorage.setItem('returnUrl', state.url); 
    router.navigate(['Login']);
    return false;
  }
  return true;
};
