import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Authorisation, Registration, Login } from 'src/Models/registration';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RegistrationService implements OnInit{

  constructor(private http: HttpClient, private alert: MessageService, private router: Router) { }
  baseUrl = environment.baseUrl;
  user_name!:string;

  public islogged = new BehaviorSubject<boolean>(this.get())
  authStatus = this.islogged.asObservable();
  changeAuthStatus(value: boolean) {
    this.islogged.next(value);
  }

  ngOnInit(): void {
   
  }


  signUp(form: Registration) {

    return this.http.post<Registration[]>(`${this.baseUrl}/user-register`, form).subscribe(
      {
        next: () => {
          this.alert.add({
            key: 'tc',
            severity: 'success',
            summary: 'User Created Successfully',
          });
          setTimeout(()=>{
            this.router.navigate(['/'])
          },1300)
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
            }, 1300)
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
          this.set(res.authorisation);
          this.get();
          this.changeAuthStatus(true)
          this.alert.add({
            key: 'tc',
            severity: 'success',
            summary: 'Welcome'+' '+this.user_name,
          });
          setTimeout(()=>{
            this.router.navigate(['']);
          },1000)
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
          this.alert.add({
            key: 'tc',
            severity: 'success',
            summary: 'Welcome'+' '+this.user_name,
          });
          setTimeout(()=>{
            this.router.navigate(['/']);
          },1000)
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
        const decryptToken = token.split('.')[1];
        const decode = JSON.parse(atob(decryptToken));
        if (decode) {
          this.user_name = decode.name;
        }
        return true
    }
    return false;
  }

}
