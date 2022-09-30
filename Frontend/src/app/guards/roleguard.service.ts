import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { __values } from 'tslib';
import { LocalstorageService } from '../localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class Roleguard implements CanActivate {
  constructor(private localStorage: LocalstorageService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this._isAuthorized(route);
  }
  private _isAuthorized(route: ActivatedRouteSnapshot): boolean {
    const token = this.localStorage.getToken();
    const expectedRoles = route.data?.['expectedRoles'];
    let roles;
    const tokenDecode = JSON.parse(atob(token.split('.')[1]));

    const check = () => {
      if (tokenDecode.isAdmin) {
        roles = 'admin';
        return roles === expectedRoles ? true : false;
      } else {
        roles = 'user';
        return roles === expectedRoles ? true : false;
      }
    };
    return check();
  }
}
