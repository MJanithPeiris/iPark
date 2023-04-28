import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './AuthService';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const expectedRole = route.data['expectedRole'];
    const currentUserRole = this.authService.getCurrentUserRole();

    if (currentUserRole) {
      if (currentUserRole === expectedRole) {
        return true;
      } else {
        this.router.navigate(['/unauthorized']);
        return false;
      }
    }

    this.router.navigate(['/login']);
    return false;
  }
}
