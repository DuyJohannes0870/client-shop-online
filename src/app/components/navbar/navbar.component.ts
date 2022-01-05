import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { AuthService } from 'src/app/services/auth.service';
import { Router} from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  displayName:string="";
  constructor(
    private user: UserService,
    private auth: AngularFireAuth,
    private authService: AuthService,
    private router:Router,
    ) { 
    this.user.getUserInfo()
      .then(user=> this.displayName = user.displayName!=null? user.displayName: user.email);
      console.log(this.displayName);		  
  }

  public userInfo:any
  ngOnInit(): void {
    this.auth.authState.subscribe((auth) => {
      if(auth) {
        this.userInfo = auth;
      }
    })
  }

  logout() {
    this.authService.logout().then(res => {
      this.router.navigate(['/login'])
    }).catch(err => {
      console.log("Đăng xuất không thể thực thi!")
    })
  }

}
