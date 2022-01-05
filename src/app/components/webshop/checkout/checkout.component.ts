import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from '../../../services/cart.service'
import { Cart } from '../../../models/item.model';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  carts: Cart[] = [];
  bills: Cart[] = [];
  subPrice: any;
  cal: any;
  itemList: any[] = [];
  checkoutForm!: FormGroup;


  constructor(
    private cart: CartService,
    private Router: Router,
    private formBuilder: FormBuilder,
    private router: Router

  ) { }

  ngOnInit(): void {

    //form
    this.checkoutForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
    });

    //get cart detail
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
        this.subPrice = 0;
        for (let i = 0; i < this.carts.length; i++) {
          this.subPrice = this.carts[i].price * this.carts[i].amount;
          this.cart.totalPrice += this.subPrice;
          this.cal = this.cart.totalPrice;
        }
      })
    });


  }
  


  getRandomString() {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < 15; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    console.log(result)
    return result;
  }
  
  //Create Bill
  createBill() {
    this.cart.getCart().subscribe((bill: any) => {
      this.bills = []
      bill.map((item: any) => {
        const mapItem = item.payload.doc._delegate._document.data.value.mapValue.fields
        let bill: any = {
          firstName: this.checkoutForm.controls.firstName.value,
          lastName: this.checkoutForm.controls.lastName.value,
          address: this.checkoutForm.controls.address.value,
          phone: this.checkoutForm.controls.phone.value,
          idDoc: mapItem.idDoc.stringValue,
          name: mapItem.name.stringValue,
          amount: parseInt(mapItem.amount.integerValue),
          price: parseInt(mapItem.price.integerValue),
          subPrice: this.subPrice,
          totalPriceBill: this.cart.totalPrice
        }
        this.bills.push(bill);        
      });
      // let userInfo = {}
      this.cart.createBill(this.bills);

    });
  }

  order() {
    this.router.navigate(['/orders']);
  }

  

}
