import { Component, OnInit } from '@angular/core';
import { IPurchase, IStore, ITag } from '../../shared/models/models';
import { DataStorageService } from '../services/data-storage.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-purchase',
  templateUrl: './add-purchase.component.html',
  styleUrls: ['./add-purchase.component.scss']
})
export class AddPurchaseComponent implements OnInit {
  profileForm: FormGroup;
  stores: IStore[] = [];
  tags: ITag[] = [];

  options: string[] = ['One', 'Two', 'Three'];
  filteredStoreOptions: Observable<string[]>;
  filteredTagOptions: Observable<string[]>;
  myControl = new FormControl();

  constructor(private dataStorageService: DataStorageService, private router: Router) { }

  ngOnInit() {
    this.stores = this.dataStorageService.getStores();
    this.tags = this.dataStorageService.getTags();
    const storeControl = new FormControl('', [Validators.required]);
    const tagControl = new FormControl('', [Validators.required]);
    this.profileForm = new FormGroup({
      price: new FormControl('', [Validators.required]),
      store: storeControl,
      tag: tagControl,
    });

    this.filteredStoreOptions = storeControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value!, this.dataStorageService.getStores().map(store => store.name)))
      );

    this.filteredTagOptions = tagControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value!, this.dataStorageService.getTags().map(tag => tag.name)))
      );
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
        storeName: store.name,
        tagName: tag.name
      };
      console.log(purchase);

      this.dataStorageService.savePurchase(purchase);
      this.router.navigateByUrl('/');
    }
  }

  private _filter(value: string, options: string[]): string[] {
    const filterValue = value.toLowerCase();

    return options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
