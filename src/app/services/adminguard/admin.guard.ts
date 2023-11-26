import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {CookieService} from "ngx-cookie-service";
import {AuthService} from "../auth/auth.service";
import {ValidateService} from "../validate/validate.service";

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const cookie = inject(CookieService);
  const auth= inject(AuthService);
  const v = inject(ValidateService);

  const token = cookie.get('token');
  if(v.isNullorEmpty(token)){
    router.navigate(['/login'])
    return false;
  }
  let rol:any = auth.decodeToken(token);
  if(rol.rol !== 'admin'){
    window.alert("Acceso restringido")
    router.navigate(['/hub'])
    return false;
  }
  return true;
};
