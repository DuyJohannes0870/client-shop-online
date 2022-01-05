import { Component, OnInit } from '@angular/core';
import {SaleService} from '../../../services/sale.service'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Item } from '../../../models/item.model'
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-productsingle',
  templateUrl: './productsingle.component.html',
  styleUrls: ['./productsingle.component.scss']
})
export class ProductsingleComponent implements OnInit {
  itemList: any[] = [];
  item: any;
  public itemReceive: any;
  amount: any;
  public userInfo: any;
  displayName: string = "";

  constructor(
    private saleService: SaleService,
    private readonly db: AngularFirestore,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private user: UserService,
    private auth: AngularFireAuth,
    private authService: AuthService,
    private sale: SaleService
  ) { 
    this.user.getUserInfo()
      .then(user=> this.displayName = user.displayName!=null? user.displayName: user.email);
      console.log(this.displayName);
  }

  ngOnInit(): void {
    this.user.userRender()
    this.renderItemData();

    this.auth.authState.subscribe((auth) => {
      if (auth) {
        this.userInfo = auth;
        this.user.userName = auth.email
      }
    })
  }

  renderItemData() {
      this.item = this.saleService.holdData()
        console.log(this.item, 'done')
      ;
  }

  addToCart(amount: any) {
    let data = {
      idDoc: this.item.id1,
      type: this.item.type,
      image: this.item.image,
      name: this.item.name,
      price: this.item.price,
      amount: +amount
    }
    this.saleService.addToCart(data);
  }


}
