import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

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

  // clearErrorMessage() {
  //   this.errorMessage = '';
  //   this.error = { name: '', message: '' };
  // }

  loginWithGoogle() {
    this.authService.loginWithGmail().then(res => {
      this.Router.navigate(['/admin/tableserver'])
    }).catch(err => {
      console.log("Đăng nhập không thể thực thi!")
    })
  }


  loginByEmail() {
      // this.clearErrorMessage();
      // if (this.validateForm(this.email, this.password)) {
        this.authService.loginWithEmailPassword(this.loginForm.controls.email.value, this.loginForm.controls.password.value)
          .then(() => {
            this.Router.navigate(['/admin/tableclient']);
          })
          .catch((err) => {
            this.error = err;
            this.Router.navigate(['/login']);
          });
      // }
  }
  // validateForm(email: any, password: any) {
  //   if (email.lenght === 0) {
  //     this.errorMessage = 'Your email is not filled';
  //     return false;
  //   }
  //   if (password.lenght === 0) {
  //     this.errorMessage = 'Your password is not filled';
  //     return false;
  //   }
  //   if (password.lenght < 6) {
  //     this.errorMessage = 'Your password should be at least 6 char';
  //     return false;
  //   }
  //   this.errorMessage = '';
  //   return true;
  // }

  register(){
    this.Router.navigate(['/register'])
  }

}
