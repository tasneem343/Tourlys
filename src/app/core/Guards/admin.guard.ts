import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const auth = inject(AuthService);
  const role = auth.getRole();

  if (role !== 'Admin') {
    router.navigate(['Home']);
    return false;
  }
  return true;
};
