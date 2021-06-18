import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../auth/token/token.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  rol:string;
  constructor(private tokenService: TokenService,
    private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    const expectedRol = route.data.expectedRol;
    const roles = this.tokenService.getAuthorities();
    this.rol = 'user';
    roles.forEach(rol => {
      if (rol === 'ADMIN') {
        this.rol = 'admin';
      }
    });
    if (!this.tokenService.getToken() || expectedRol.indexOf(this.rol) === -1) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
