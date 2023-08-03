import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FunctionsService } from '../services/functions.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    public auth: AuthService,
    public router: Router,
    public fun: FunctionsService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.auth.is_login) {
      this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
      return false;
    }

    const requiredRoles = route.data['roles'] as string[];
    if (requiredRoles && requiredRoles.length > 0) {
      const userRole = this.auth.getUserRole({ access_token: this.auth.getAccessToken() }); // Get user role from access token

      if (userRole === null || !requiredRoles.includes(userRole)) {
        alert('Sin permisos para acceder a esta página');
        this.router.navigateByUrl('/dashboard');
        return false;
      }
    }

    return true;
  }
  
}
