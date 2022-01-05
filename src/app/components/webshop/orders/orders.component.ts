import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Item } from '../../../models/item.model'
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  itemList: any[] = [];
  email: string = '';



  constructor(
    private orderService: OrderService,
    private readonly db: AngularFirestore,
    private formBuilder: FormBuilder,
    private user: UserService
  ) {

   }

  ngOnInit(): void {
    this.getAllOrder();
  }

  async getAllOrder() {
    // if(name == '') {
      (await this.orderService.getAllOrder()).subscribe((data) => {
        this.itemList = data;
      console.log(this.itemList);
      this.itemList = this.itemList.filter(res => {
        return res.email.toLocaleLowerCase().match(this.user.userName.toLocaleLowerCase());
      })
    });
  // } else {
    
  }






}
