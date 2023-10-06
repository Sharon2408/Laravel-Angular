import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/Services/registration.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements DoCheck {
  loggedIn!: boolean;
  userName!: string | null;
  role!: number;

  constructor(private register: RegistrationService, private router: Router) {
    this.register.authStatus.subscribe(value => this.loggedIn = value);

  }

  ngDoCheck(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decryptToken = token.split('.')[1];
      const decode = JSON.parse(atob(decryptToken));
      if (decode) {
        this.userName = decode.name;
        this.role = decode.role_id;
      }
    }

  }


  logout() {
    this.register.changeAuthStatus(false);
    this.userName = '';
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
