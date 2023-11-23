import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string= "";
  email: string ="";
  password: string = "";

  onSubmit() {
    // Aquí puedes agregar una lógica para guardar el usuario en una base de datos, etc.
    alert('Usuario registrado con éxito!');
  }
}
