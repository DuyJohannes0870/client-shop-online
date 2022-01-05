import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Cart, Item } from '../models/item.model';
import { map, finalize } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  totalPrice: any;
  billID: string = '';

  constructor(
    public fireStore: AngularFirestore,
    private httpClient: HttpClient,
    private fireStorage: AngularFireStorage,
    private user: UserService
  ) {

  }

  //Add to Carts
  addToCart(data: any) {
    const id = Date.now().toString()
    const _cart: Cart = {
      ...data,
      id: id
    }
    return this.fireStore.collection(`carts/${this.user.userName}/cart`).doc(id).set(_cart)
  }

  delete(id:string){
    return this.fireStore.collection(`carts/${this.user.userName}/cart`).doc(id).delete()
  }

  getCart() {
    console.log(this.user.userName)
    return this.fireStore.collection(`carts/${this.user.userName}/cart`).snapshotChanges();
  }

  updateCart(itemId: string, cart: Cart){
    return this.fireStore.collection(`carts/${this.user.userName}/cart`).doc(itemId).update(cart);
  }


  //CreateBill
  createBill(bills: any) {
    this.billID = '';
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < 15; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    const _bill: Cart = {
      ...bills,
    }

    this.billID = result;
    let order = {
      email: this.user.userName,
      ID: this.billID,
      totalPrice: this.totalPrice,
      status: 3
    }
    this.fireStore.collection(`bills/${this.user.userName}/bill`).doc(result).set(_bill)
    this.fireStore.collection("orders").doc(result).set(order)

  }
  
  

}
