import {Component, EventEmitter, Output} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {ValidateService} from "../../services/validate/validate.service";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  estavalidando :boolean = true;

  constructor(
    private auth:AuthService,
    private val:ValidateService,
    private cookie:CookieService,
    private nav:Router
  ) {
  }
  onSubmit() {
    if(this.val.isNullorEmpty(this.username) || this.val.isNullorEmpty(this.password)){
      alert("EL nombre de usurio y contraseña son requeridos")
    }else {
      this.estavalidando = true;
      this.auth.obtenerToken(this.username,this.password).subscribe(
        (ok)=>{
          const {token} = ok;
          this.cookie.set('token',token);
          this.estavalidando= false
          console.log(this.auth.decodeToken(token));
          this.nav.navigate(['/hub'])
        },
        (error)=>{
          console.error("Error de login: ",error);
          alert("Usuario o contraseña incorrectos.")
          this.estavalidando= false
          this.nav.navigate(['/login'])
        }
      )
    }
  }
  registrarse(){
    this.nav.navigate(['/register'])
  }
}
