import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
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
  //   this.notification = '';
  //   this.error = { name: '', message: '' };
  // }

  register() {
    // this.clearErrorMessage();
    // if (this.validateForm(this.email, this.password)) {
      this.auth.registerWithEmailPassword(this.email, this.password)
        .then(() => {
          alert('Your account has been created!');
          this.router.navigate(['/admin/tableclient']);
        })
        .catch((err) => {
          this.error = err;
          alert('Your account has not been created!')
        });
    // }
  }

  // validateForm(email: any, password: any) {
  //   if (email.lenght === 0) {
  //     this.notification = 'Your email is not filled';
  //     return false;
  //   }
  //   if (password.lenght === 0) {
  //     this.notification = 'Your password is not filled';
  //     return false;
  //   }
  //   if (password.lenght < 6) {
  //     this.notification = 'Your password should be at least 6 char';
  //     return false;
  //   }
  //   this.notification = '';
  //   return true;
  // }

}
