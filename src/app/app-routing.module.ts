import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './auth-components/signup/signup.component';
import { LoginComponent } from './auth-components/login/login.component';
import { ComplaintsComponent } from './user-components/user-complaints-register/complaints.component';
import { IndexComponent } from './index/index.component';
import { authGuardGuard } from 'src/Guards/user.guard';
import { AdminViewComplaintsComponent } from './admin-components/admin-view-complaints/admin-view-complaints.component';
import { RegisterLinemanComponent } from './admin-components/register-lineman/register-lineman.component';
import { ViewAreaLinemanComponent } from './admin-components/view-area-lineman/view-area-lineman.component';
import { LinemanViewTaskComponent } from './lineman-components/lineman-view-task/lineman-view-task.component';
import { UserRegisteredComplaintsComponent } from './user-components/user-registered-complaints/user-registered-complaints.component';

const routes: Routes = [
  {
    path: 'signup', component: SignupComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'complaint', component: ComplaintsComponent,canActivate:[authGuardGuard]
  },
  {
    path: '', component: IndexComponent
  },
  {
    path: 'admin-view-complaints', component: AdminViewComplaintsComponent
  },
  {
    path: 'register-lineman', component: RegisterLinemanComponent
  },
  {
    path: 'area-lineman/:lineman_id', component: ViewAreaLinemanComponent
  },
  {
    path: 'lineman-view-task', component: LinemanViewTaskComponent
  },
  {
    path:'user-complaints',component:UserRegisteredComplaintsComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
