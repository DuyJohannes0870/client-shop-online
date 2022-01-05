import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-loginshop',
  templateUrl: './loginshop.component.html',
  styleUrls: ['./loginshop.component.scss']
})
export class LoginshopComponent implements OnInit {
  email = '';
  password = '';
  errorMessage = ''; // validation error handle
  error: { name: string; message: string } = { name: '', message: '' }; // for firbase error handle
  loginForm!: FormGroup;
  constructor(
    private authService: AuthService,
    private Router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  loginWithGoogle() {
    this.authService.loginWithGmail().then(res => {
      this.Router.navigate(['/'])
    }).catch(err => {
      console.log("Đăng nhập không thể thực thi!")
    })
  }

  loginByEmail() {

    this.authService.loginWithEmailPassword(this.loginForm.controls.email.value, this.loginForm.controls.password.value)
      .then(() => {
        this.Router.navigate(['/']);
      })
      .catch((err) => {
        this.error = err;
        this.Router.navigate(['/']);
      });
  }
  register(){
    this.Router.navigate(['/signup'])
  }
}
