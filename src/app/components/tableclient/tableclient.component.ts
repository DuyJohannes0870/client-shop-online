import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from "@angular/fire/storage";
import { map, finalize } from 'rxjs/operators';

import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface Item { id: string; name: string; amount: Number; price: Number; image: string; status: Number }


@Component({
  selector: 'app-tableclient',
  templateUrl: './tableclient.component.html',
  styleUrls: ['./tableclient.component.scss'],

})
export class TableclientComponent implements OnInit {
  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<any>;
   itemFilter: Item[]=[];
  // itemFilter!: [];
  itemList!: Item[];
  config: any;
  collection = { count: 60, data: [] };
  countPage: number = 0;
  isFoo: boolean = false;
  idDoc: string = '';
  itemAmount: Number = 0;
  editItemAmount: Number = 0;
  title = "cloudsSorage";
  selectedFile: File | null = null;
  fb: any;
  downloadURL!: Observable<any>;
  inputItem!: FormGroup;
  id: string = "";

  constructor(
    private readonly afs: AngularFirestore,
    private storage: AngularFireStorage,
    private formBuilder: FormBuilder,

  ) {
    this.itemsCollection = afs.collection<Item>('items');
    //this.items = this.itemsCollection.valueChanges();

    // .valueChanges() is simple. It just returns the 
    // JSON data without metadata. If you need the 
    // doc.id() in the value you must persist it your self
    // or use .snapshotChanges() instead. Only using for versions 7 and earlier

    this.items = this.itemsCollection.valueChanges({ idField: 'id1' }); //chỉ sử dụng cho Angular 8,9
    //id1: ten field đại diện cho documnent id, lưu ý không 
    //được đặt trùng với tên field khai báo trong dữ liệu


    this.items.subscribe(val => {
      this.itemList = val;
      this.countPage = this.itemList.length
    });
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
    this.filter(this.id);

    this.inputItem = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      amount: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  delete(item: any) {
    this.afs.collection("items").doc(item.id1).delete().then(() => {
      console.log("Document successfully deleted!");
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  getId(item: any) {
    this.idDoc = item.id1;
    this.afs.collection("items").doc(item.id1).get();
    console.log(this.idDoc);

  }

  editItem() {
    // let id = item.id1;
    let editId = (<HTMLInputElement>document.getElementById("editIdProduct")).value;
    let editName = (<HTMLInputElement>document.getElementById("editNameProduct")).value;
    this.editItemAmount = parseFloat((<HTMLInputElement>document.getElementById("editAmountProduct")).value);
    let editPrice = parseFloat((<HTMLInputElement>document.getElementById("editPriceProduct")).value);
    let editStatus: Number = 0;
    if (this.editItemAmount == 0) {
      editStatus = 1;
    } if (this.editItemAmount > 0 && this.editItemAmount <= 10) {
      editStatus = 2;
    } if (this.editItemAmount > 10) {
      editStatus = 3;
    }
    this.afs.collection("items").doc(this.idDoc).update({
      id: editId,
      name: editName,
      amount: this.editItemAmount,
      price: editPrice,
      status: editStatus,
      image: this.fb,
    })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
    console.log(this.idDoc)
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


  addItem() {
    let id = (<HTMLInputElement>document.getElementById("idProduct")).value;
    let name = (<HTMLInputElement>document.getElementById("nameProduct")).value;
    this.itemAmount = parseFloat((<HTMLInputElement>document.getElementById("amountProduct")).value);
    let price = parseFloat((<HTMLInputElement>document.getElementById("priceProduct")).value);
    let status: Number = 0;
    if (this.itemAmount == 0) {
      status = 1;
    } if (this.itemAmount > 0 && this.itemAmount <= 10) {
      status = 2;
    } if (this.itemAmount > 10) {
      status = 3;
    }
    this.afs.collection("items").doc().set({
      id: id,
      name: name,
      amount: this.itemAmount,
      price: price,
      status: status,
      image: this.fb,
    })
      .then(() => {
        alert("Thêm sản phẩm thành công");
        this.inputItem.reset();
      })
  }

  onFileSelected(event: any) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`RoomsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
            }
            console.log(this.fb);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url)
        }
      });
  }

  filter(id: string) {
    if(id == '') {
      this.itemsCollection.valueChanges({idField: 'id1'}).subscribe((data) => {
        this.itemFilter = data;
      })
      console.log(this.itemFilter)
    } else {
      this.itemFilter = this.itemFilter.filter(res => {
        return res.name.toLocaleLowerCase().match(id.toLocaleLowerCase());
      })
      console.log(this.itemFilter)
    }
  }

  search() {
    this.filter(this.id)
  }

}
