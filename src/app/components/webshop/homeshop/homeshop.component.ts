import { Component, OnInit } from '@angular/core';
import {SaleService} from '../../../services/sale.service'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Item } from '../../../models/item.model'
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-homeshop',
  templateUrl: './homeshop.component.html',
  styleUrls: ['./homeshop.component.scss']
})
export class HomeshopComponent implements OnInit {
  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<any>;
  itemList: any[] = [];
  countPage: number = 0;
  config: any;
  id: string = "";
  modalContent: undefined;
  tempData: any;
  content: any;
  item: any;
  public itemReceive: any;
  amount: any;



  constructor(
    private saleService: SaleService,
    private readonly db: AngularFirestore,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
  ) {
    this.itemsCollection = db.collection<Item>('items');
    this.items = this.itemsCollection.valueChanges({ idField: 'id1' });

    this.countPage=this.itemList.length;
    this.config = {
      itemsPerPage: 12,
      currentPage: 1,
      totalItems: this.countPage
    }
   }

   pageChanged(event: any) {
    this.config.currentPage = event;
  }

  ngOnInit(): void {
    this.getAllItem(this.id);
    

  }

  async getAllItem(name: string) {
    if(name == '') {
      (await this.saleService.getAllItem()).subscribe((data) => {
        this.itemList = data;
      console.log(this.itemList);
    });
  } else {
    this.itemList = this.itemList.filter(res => {
      return res.name.toLocaleLowerCase().match(name.toLocaleLowerCase());
    })
  }
}

  search() {
    this.getAllItem(this.id)
  }

  getData(content: any, tableRow: any){
    this.modalContent = tableRow;
    // biến tạm để lưu lại dữ liệu của sản phẩm được click (để dùng cho hàm update)
    this.tempData = tableRow;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})


    // console.log(tableRow)
  }

  sendDataItem() {
      this.saleService.receiveItemData(this.tempData);
    }

  //Slider settings
  slideConfig = { "slidesToShow": 1, "slidesToScroll": 1 };

  
}
