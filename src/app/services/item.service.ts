import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Item } from '../models/item.model';
import { map, finalize } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ItemService {
  public items!: Observable<any>;
  itemStatus: Number = 0;
  title = "cloudsSorage";
  selectedFile: File | null = null;
  fb: any;
  downloadURL!: Observable<any>;
  constructor(
    public fireStore: AngularFirestore,
    private httpClient: HttpClient,
    private fireStorage: AngularFireStorage
  ) {
    this.items = fireStore.collection<any>('items').valueChanges({ idField: 'id1' });
  }

  async getAllItem() {
    return this.items;
  }

  async getItemById(id: any) {
    let result = await this.httpClient
      .get<Item>(environment.endpoint + 'item/id?id=' + id)
      .toPromise()
      .then((data) => {
        return data;
      });
    return result;
  }

  addItem(item: Item): Observable<any> {
    if(item.amount == 0) {
      this.itemStatus = 1;
    } if (item.amount > 0 && item.amount <= 10) {
      this.itemStatus = 2;
    } if (item.amount > 10) {
      this.itemStatus = 3;
    } 
    return this.httpClient.post(environment.endpoint + 'createItem', {
      id: item.id,
      name: item.name,
      amount: item.amount,
      price: item.price,
      status: this.itemStatus,
      image: this.fb
    });
  }

  deleteItem(id: any): Observable<any> {
    return this.httpClient.delete<Item>(environment.endpoint + 'deleteItem?id=' + id);
  }

  updateItem(item: any, editData: any): Observable<any> {
    if (editData.amount == 0) {
      this.itemStatus = 1;
    } if (editData.amount > 0 && editData.amount <= 10) {
      this.itemStatus = 2;
    } if (editData.amount > 10) {
      this.itemStatus = 3;
    }
    let data = {idDoc: item.id1, id: item.id, name: item.name, image: this.fb, amount: item.amount, price: item.price, status: this.itemStatus, editData: editData};
    return this.httpClient.put(environment.endpoint + 'updateItem', data);
  }
  

  onFileSelected(event: any) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `RoomsImages/${n}`;
    const fileRef = this.fireStorage.ref(filePath);
    const task = this.fireStorage.upload(`RoomsImages/${n}`, file);
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
}
