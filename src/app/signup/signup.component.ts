import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { matchValidator } from 'src/shared/confirmPassword';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(

  ) { }

  signupForm!: FormGroup;
  name!: FormControl;
  email!: FormControl;
  password!: FormControl;
  confirm_password!: FormControl;
  hide = true;
  c_hide = true;
  matcher = new MyErrorStateMatcher();


  ngOnInit(): void {
    this.name = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(16),
    ]);

    this.email = new FormControl('', [Validators.required, Validators.email]);

    this.password = new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}$'
      ),
    ]);

    this.confirm_password = new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}$'
      ),
    ]);

    this.signupForm = new FormGroup({
      firstname: this.name,
      email: this.email,
      password: this.password,
      confirm_password: this.confirm_password,
    });
  }

  onSubmit() {

  }
}



