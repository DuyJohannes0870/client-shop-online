import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState: any = null;

  constructor(
    private auth: AngularFireAuth,
    private router:Router,
    ) { }

  async loginWithGmail() {
    const provider = new firebase.default.auth.GoogleAuthProvider();
    await this.auth.signInWithPopup(provider).then(res => {
      this.router.navigate(['dashboardclient'])
    });
  }

  async logout() {
    try {
      await this.auth.signOut().then(res => {
        this.router.navigate(['login']);
        setTimeout(() => {
          window.location.reload();
        }, 10);
      })
    } catch (err) {
      console.log(err)
    }
  }


  async registerWithEmailPassword(email: string, password: string) {
    try {
      const user = await this.auth
        .createUserWithEmailAndPassword(email, password);
      this.authState = user;
    } catch (err) {
      console.log(err);
    }
  }

  resetPassword(email: string) {
    return this.auth.sendPasswordResetEmail(email)
      .then(() => console.log('sent Password Reset Email!'))
      .catch((error) => {
        console.log(error)
        throw error
      })
  }

  async loginWithEmailPassword(email: any, password: any) {
    try {
      const user = await this.auth.signInWithEmailAndPassword(email, password);
      // this.authState = user;
    } catch (err) {
      console.log(err);
    }
  }

  

}
