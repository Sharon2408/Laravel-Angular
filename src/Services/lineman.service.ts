import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BehaviorSubject,} from 'rxjs';
import { Linemen, Task, Updatestatus, status, } from 'src/Models/linemen';
import { Registration } from 'src/Models/registration';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LinemanService {
  

  constructor(private http: HttpClient, private alert: MessageService, private router: Router) { }
  baseUrl = environment.baseUrl;
  complaint_id = new BehaviorSubject<number>(0);
  currentComplaintId = this.complaint_id.asObservable();

  linemaRegistration(form: Registration) {

    return this.http.post<Registration[]>(`${this.baseUrl}/lineman-register`, form).subscribe(
      {
        next: () => {
          this.router.navigate(['/'])
          this.alert.add({
            key: 'tc',
            severity: 'success',
            summary: 'lineman registered Successfully',
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

  find(lineman_id: string) {
    const id = lineman_id.substring(0, 9)
    return this.http.get<Linemen[]>(`${this.baseUrl}/lineman/` + id);
  }

  assignTasktoLineman(task: Task) {
    return this.http.post<Task>(`${this.baseUrl}/assign-task`, task).subscribe({
      next: (res) => {},
      error: (error) => {}
    });
  }

getStatus(){
  return this.http.get<status[]>(`${this.baseUrl}/get-status`)
}

updateStatus(status:Updatestatus){
  return this.http.patch(`${this.baseUrl}/update-status`,status).subscribe({
    next: () =>{},
    error: ()=>{}
  });
}

updateSolvedDate(status:Updatestatus){
return this.http.put(`${this.baseUrl}/solved-date`,status).subscribe({
  next: () =>{},
  error: ()=>{}
})
}

}
