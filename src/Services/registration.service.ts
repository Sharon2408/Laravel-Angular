import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Authorisation, Registration, Login } from 'src/Models/registration';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient, private alert: MessageService, private router: Router) { }
  baseUrl = environment.baseUrl;

  public islogged = new BehaviorSubject<boolean>(this.get())
  authStatus = this.islogged.asObservable();
  changeAuthStatus(value: boolean) {
    this.islogged.next(value);
  }



  signUp(form: Registration) {

    return this.http.post<Registration[]>(`${this.baseUrl}/user-register`, form).subscribe(
      {
        next: () => {
          this.router.navigate(['/'])
          this.alert.add({
            key: 'tc',
            severity: 'success',
            summary: 'User Created Successfully',
          });
        },
        error: (error) => {

          if (error.status === 422) {
            console.log(error)
            this.alert.add({
              key: 'tc',
              severity: 'error',
              summary: 'Email exists',
              detail: 'Looks like you have already registered',
            });

            setTimeout(() => {
              this.router.navigate(['login'])
            }, 1000)
          }
          else {
            console.log(error)
            this.alert.add({
              key: 'tc',
              severity: 'error',
              summary: 'Server error',
              detail: 'please try again later',
            });
          }
        }
      }
    );

  }

  login(form: Registration) {

   if(form.loginType === 'user'){
    return this.http.post<Login>(`${this.baseUrl}/user-login`, form).subscribe(
      {

        next: (res) => {
          this.router.navigate(['/']);
          this.set(res.authorisation);
          this.get();
          this.changeAuthStatus(true)

        },
        error: (error) => {
          if (error.status === 500) {
            this.alert.add({
              key: 'tc',
              severity: 'error',
              summary: 'Invalid Credentials',
              detail: 'email or password does not match',
            });
          }
          else {
            console.log(error)
            this.alert.add({
              key: 'tc',
              severity: 'error',
              summary: 'Server error',
              detail: 'please try again later',
            });
          }
        }
      }
    );
   }

   else if(form.loginType === 'lineman'){
    return this.http.post<Login>(`${this.baseUrl}/lineman-login`, form).subscribe(
      {

        next: (res) => {
          this.router.navigate(['/']);
          this.set(res.authorisation);
          this.get();
          this.changeAuthStatus(true)

        },
        error: (error) => {
          console.log(error)
          if (error.status === 500) {
            this.alert.add({
              key: 'tc',
              severity: 'error',
              summary: 'Invalid Credentials',
              detail: 'email or password does not match',
            });
          }
          else {
            console.log(error)
            this.alert.add({
              key: 'tc',
              severity: 'error',
              summary: 'Server error',
              detail: 'please try again later',
            });
          }
        }
      }
    );
   }
   return false;
  }
  set(token: Authorisation) {

    localStorage.setItem('token', token.token);
  }
  get() {
    const token = localStorage.getItem('token');
    if (token) {
        return true
    }
    return false;
  }

}
