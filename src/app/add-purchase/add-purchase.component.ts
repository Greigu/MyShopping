import { Component, OnInit } from '@angular/core';
import { IPurchase, IStore, ITag } from '../../shared/models/models';
import { DataStorageService } from '../services/data-storage.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-purchase',
  templateUrl: './add-purchase.component.html',
  styleUrls: ['./add-purchase.component.scss']
})
export class AddPurchaseComponent implements OnInit {
  profileForm = new FormGroup({
    price: new FormControl('', [Validators.required]),
    store: new FormControl('', [Validators.required]),
    tag: new FormControl('', [Validators.required]),
  });
  stores: IStore[] = [];
  tags: ITag[] = [];

  constructor(private dataStorageService: DataStorageService,) { }

  ngOnInit() {
    this.stores = this.dataStorageService.getStores();
    this.tags = this.dataStorageService.getTags();
  }

  onSubmit() {
    console.log(this.profileForm.value);
    if (this.profileForm.valid) {
      const values = this.profileForm.value
      const storeId = this.dataStorageService.getNextStoreId();
      const tagId = this.dataStorageService.getNextTagId();
      const purchaseId = this.dataStorageService.getNextPurchaseId();
      const store = this.dataStorageService.saveStore({ id: storeId, name: values.store! });
      const tag = this.dataStorageService.saveTag({ id: tagId, name: values.tag! });


      const purchase: IPurchase = {
        id: purchaseId,
        date: new Date(),
        price: +values.price!,
        storeId: store.id,
        tagId: tag.id
      };
      console.log(purchase);

      this.dataStorageService.savePurchase(purchase);
    }
  }

  public noWhitespaceValidator(control: FormControl) {
    return (control.value || '').trim().length ? null : { 'whitespace': true };
  }

}
