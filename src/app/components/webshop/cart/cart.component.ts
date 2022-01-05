import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart.service'
import { Cart } from '../../../models/item.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {


  constructor(
    private cart: CartService,
    private Router: Router,


  ) { }
  carts: Cart[] = [];
  total: any;
  cal: any;


  ngOnInit(): void {
    this.cart.getCart().subscribe((cart: any) => {
      this.carts = []
      cart.map((item: any) => {
        const mapItem = item.payload.doc._delegate._document.data.value.mapValue.fields
        let _item: Cart = {
          idDoc: mapItem.idDoc.stringValue,
          name: mapItem.name.stringValue,
          image: mapItem.image.stringValue,
          amount: parseInt(mapItem.amount.integerValue),
          price: parseInt(mapItem.price.integerValue),
          type: mapItem.type.stringValue,
          id: mapItem.id.stringValue,
        }
        this.carts.push(_item);
        
        this.cart.totalPrice = 0;
        this.total = 0;
        for (let i = 0; i < this.carts.length; i++) {
          this.total = this.carts[i].price * this.carts[i].amount;
          this.cart.totalPrice += this.total;
          this.cal = this.cart.totalPrice;
          console.log(this.cart.totalPrice);
        }
      })
    });

    // this.getAllItem();
  }


  delete(id: string) {
    this.cart.delete(id);
  }

  changeQuantity(cart: Cart) {
    this.cart.updateCart(cart.id, cart)
    // .then(res => console.log(res))
  }

  cartTotal() {
    this.cart.totalPrice = 0;
    this.total = 0;
    for (let i = 0; i < this.carts.length; i++) {
      this.total = this.carts[i].price * this.carts[i].amount;
      this.cart.totalPrice += this.total;
      this.cal = this.cart.totalPrice;
      console.log(this.cart.totalPrice)
    }

  }

  checkout() {
      this.Router.navigate(['/checkout'])
  }

}
