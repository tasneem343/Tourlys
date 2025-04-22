import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const nonAdminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const auth = inject(AuthService);

  try {
    const role = auth.isAdmin();
    if (role && role.toLowerCase() === 'admin') {
      const currentUrl = state.url;
      if (currentUrl.includes('/Admin')) {
        return true;
      }
      router.navigate(['/Admin']);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in nonAdminGuard:', error);
    router.navigate(['/login']);
    return false;
  }
};