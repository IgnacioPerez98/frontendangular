import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import * as jwtdecode from 'jwt-decode';


export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const cookie = inject(CookieService);

  const token = cookie.get('token');
  if(token){
    return true;
  }
  window.alert("No tienes permisos para acceder a esta página");
  router.navigate(['/login']);
  return false;
};
