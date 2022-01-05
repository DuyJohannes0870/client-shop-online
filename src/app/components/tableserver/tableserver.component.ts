import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Item } from '../../models/item.model'
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

// export interface Item { id: string; name: string; amount: Number; price: Number; image: string; status: Number}

@Component({
  selector: 'app-tableserver',
  templateUrl: './tableserver.component.html',
  styleUrls: ['./tableserver.component.scss']
})
export class TableserverComponent implements OnInit {
  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<any>;
  inputItem!: FormGroup;
  editItem!: FormGroup;
  itemList: any[] = [];
  countPage: number = 0;
  config: any;
  idDoc: string = '';
  modalContent: undefined;
  tempData: any;
  // id: any;
  id: string = "";
  itemFilter: Item[]=[];


  constructor(
    private itemService: ItemService,
    private readonly db: AngularFirestore,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) {
    this.itemsCollection = db.collection<Item>('items');
    this.items = this.itemsCollection.valueChanges({ idField: 'id1' });
    
    this.countPage=this.itemList.length;
    this.config = {
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: this.countPage
    }
  }

  pageChanged(event: any) {
    this.config.currentPage = event;
  }
  ngOnInit(): void {
    this.getAllItem(this.id);


    this.inputItem = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      amount: ['', Validators.required],
      price: ['', Validators.required],
    });

    this.editItem = new FormGroup({
      editId: new FormControl(''),
      editName: new FormControl(''),
      editAmount: new FormControl(''),
      editPrice: new FormControl(''),
    })
  }

  async getAllItem(name: string) {
    if(name == '') {
      (await this.itemService.getAllItem()).subscribe((data) => {
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

  // getId(item: any) {
  //   this.idDoc = item.id1;
  //   this.db.collection("items").doc(item.id1).get();
  //   console.log(this.idDoc)
  // }


  async createItem() {
    let valueInput = this.inputItem.value;
    this.itemService.addItem(valueInput as Item).subscribe((item) => {
      this.itemList.push(item);
    });
    this.inputItem.reset();
  }

  async deleteItem(item: any) {
    this.idDoc = item.id1;
    this.db.collection("items").doc(item.id1).get();
    this.itemService.deleteItem(this.idDoc).subscribe((del) => {
      return this.itemList.push(del);
    });
  }

  async updateItem() {
  // lấy dữ liệu hiện tại trong ô input
    let editData = {
      id: this.editItem.controls.editId.value, 
      name: this.editItem.controls.editName.value,
      amount: this.editItem.controls.editAmount.value, 
      price: this.editItem.controls.editPrice.value
    }
    await this.itemService.updateItem(this.tempData, editData)
      .subscribe((data) => {
        console.log(data);
      });
  }

  onFileSelected(event: any) {
    this.itemService.onFileSelected(event);
  }

  // getId(item: any) {
  //   this.idDoc = item.id1;
  //   this.db.collection("items").doc(item.id1).get();
  //   // console.log(this.idDoc);

  // }


  // hàm mở modal edit có truyền theo dữ liệu
  // tableRow: lấy dữ liệu hiện tại (tại sản phẩm được click)
  open(content: any, tableRow: any){
    this.modalContent = tableRow;
    // biến tạm để lưu lại dữ liệu của sản phẩm được click (để dùng cho hàm update)
    this.tempData = tableRow;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})

    // binding dữ liệu hiện tại vào modal, dựa trên formcontrol set dữ liệu default (hiển thị sẵn trong input)
    this.editItem.controls.editId.setValue(tableRow.type)
    this.editItem.controls.editName.setValue(tableRow.name)
    this.editItem.controls.editAmount.setValue(tableRow.amount)
    this.editItem.controls.editPrice.setValue(tableRow.price)

    console.log(tableRow)
  }

  alertGreen() {
    alert("Sản phẩm vẫn còn nhiều!")
  }

  alertYellow() {
    alert("Sản phẩm sắp hết!")
  }

  alertRed() {
    alert("Sản phẩm đã hết! Vui lòng đặt thêm")
  }
}
