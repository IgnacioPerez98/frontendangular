import {Component, Pipe} from '@angular/core';
import {flatMap} from "rxjs";
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";
import {EmailValidator} from "@angular/forms";
import {Funcionarios} from "../../models/Funcionarios";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registrando : boolean = false;
  hoy = new Date();
  func = new Funcionarios("","","",this.hoy,"","","","",false)

  constructor(
    private auth:AuthService,
    private nav:Router
  ) {
    this.hoy.setDate(Date.now())
  }

  onSubmit() {
    // Aquí puedes agregar una lógica para guardar el usuario en una base de datos, etc.
    alert('Usuario registrado con éxito!');
  }
}
