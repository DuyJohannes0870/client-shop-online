import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { SaleService } from 'src/app/services/sale.service';
import { Cart } from 'src/app/models/item.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  displayName: string = "";
  constructor(
    private user: UserService,
    private auth: AngularFireAuth,
    private authService: AuthService,
    private router: Router,
    private sale: SaleService
  ) {
    this.user.getUserInfo()
      .then(user=> this.displayName = user.displayName!=null? user.displayName: user.email);
      // console.log(this.displayName);
  }

  public userInfo: any;
  public carts: Cart[] = [];
  public total: number = 0

  ngOnInit(): void {
    this.auth.authState.subscribe((auth) => {
      if (auth) {
        this.userInfo = auth;
        this.user.userName = auth.email
      }
    })

    this.sale.getCart().subscribe((cart: any) => {
      this.carts = []
      this.total = 0
      cart.map((item: any) => {
        const mapItem = item.payload.doc._delegate._document.data.value.mapValue.fields
        let _item: Cart = {
          idDoc: mapItem.idDoc.stringValue,
          name: mapItem.name.stringValue,
          image: mapItem.image.stringValue,
          amount: parseInt(mapItem.amount.integerValue),
          price: parseInt(mapItem.price.integerValue),
          type: mapItem.type.stringValue,
          id: mapItem.id.stringValue
        }
        this.carts.push(_item)
      })
      for (let i = 0; i < this.carts.length; i++) {
        this.total += this.carts[i].price * this.carts[i].amount
      }
    })
  }
  delete(id: string) {
    this.sale.delete(id)
  }

  logout() {
    this.authService.logout().then(res => {
      this.router.navigate(['/loginshop'])
    }).catch(err => {
      console.log("Đăng xuất không thể thực thi!")
    })
  }


}
