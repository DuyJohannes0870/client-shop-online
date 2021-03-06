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
  // l???y d??? li???u hi???n t???i trong ?? input
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


  // h??m m??? modal edit c?? truy???n theo d??? li???u
  // tableRow: l???y d??? li???u hi???n t???i (t???i s???n ph???m ???????c click)
  open(content: any, tableRow: any){
    this.modalContent = tableRow;
    // bi???n t???m ????? l??u l???i d??? li???u c???a s???n ph???m ???????c click (????? d??ng cho h??m update)
    this.tempData = tableRow;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})

    // binding d??? li???u hi???n t???i v??o modal, d???a tr??n formcontrol set d??? li???u default (hi???n th??? s???n trong input)
    this.editItem.controls.editId.setValue(tableRow.type)
    this.editItem.controls.editName.setValue(tableRow.name)
    this.editItem.controls.editAmount.setValue(tableRow.amount)
    this.editItem.controls.editPrice.setValue(tableRow.price)

    console.log(tableRow)
  }

  alertGreen() {
    alert("S???n ph???m v???n c??n nhi???u!")
  }

  alertYellow() {
    alert("S???n ph???m s???p h???t!")
  }

  alertRed() {
    alert("S???n ph???m ???? h???t! Vui l??ng ?????t th??m")
  }
}
