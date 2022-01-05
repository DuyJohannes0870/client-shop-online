import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  email = '';
  password = '';
  message = '';
  notification = ''; // validation error handle
  error: { name: string; message: string } = { name: '', message: '' };
  registerForm!: FormGroup;

  constructor(
    private auth: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,

  ) { }

  ngOnInit(): void { 
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // clearErrorMessage() {
  //   this.errorMessage = '';
  //   this.error = { name: '', message: '' };
  // }

  register() {
    this.auth.registerWithEmailPassword(this.email, this.password)
      .then(() => {
        alert('Your account has been created!');
        this.router.navigate(['/']);
      })
      .catch((err) => {
        this.error = err;
        alert('Your account has not been created!')
      });
  }

  // validateForm(email: any, password: any) {
  //   if (email.lenght === 0) {
  //     this.errorMessage = 'please enter email id';
  //     return false;
  //   }

  //   if (password.lenght === 0) {
  //     this.errorMessage = 'please enter password';
  //     return false;
  //   }

  //   if (password.lenght < 6) {
  //     this.errorMessage = 'password should be at least 6 char';
  //     return false;
  //   }

  //   this.errorMessage = '';
  //   return true;
  // }
}
