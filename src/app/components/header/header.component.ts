import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Input() isFuncionario:boolean = false;
  @Output() toggleFormEvent = new EventEmitter<string>();
  
  constructor(
    private cookie: CookieService,
    private router: Router

    ){
    
  }


  toggleForm(value:string) {
    this.toggleFormEvent.emit(value);
  }

  logOut(){
    this.cookie.delete('token');
    this.router.navigate(['/login']);
  }

  

}
