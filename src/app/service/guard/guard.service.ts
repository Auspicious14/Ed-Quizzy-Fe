import { Injectable, inject } from '@angular/core';

import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class GuardService {
  router: Router = inject(Router);
  authService: AuthService = inject(AuthService);

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    if (this.authService.isAuthenticated()) {
      return Promise.resolve(true);
    } else {
      this.router.navigate(['/auth/signin']);
      return Promise.resolve(false);
    }
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    return this.canActivate(next, state);
  }
}
