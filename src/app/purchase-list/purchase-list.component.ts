import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../services/data-storage.service';
import { IPurchase, IStore, ITag } from '../../shared/models/models';

@Component({
  selector: 'app-purchase-list',
  templateUrl: './purchase-list.component.html',
  styleUrls: ['./purchase-list.component.scss']
})
export class PurchaseListComponent {
  purchases: IPurchase[] = [];
  stores: IStore[] = [];
  tags: ITag[] = [];
  filterStore: string = "";
  filterTag: string = "";
  isFilter = false;

  filteredPurchases: IPurchase[] = [];

  constructor(private dataStorageService: DataStorageService) {
    this.purchases = this.dataStorageService.getPurchases();
    this.stores = this.dataStorageService.getStores();
    this.tags = this.dataStorageService.getTags();
    this.filteredPurchases = this.purchases;
    
  }


  aplyFilter(){
    this.filteredPurchases = [];
    
    for(let i = 0; i < this.purchases.length; i++){
      if((this.purchases[i].storeName === this.filterStore || this.filterStore === "") &&
         (this.purchases[i].tagName === this.filterTag || this.filterTag === "")){
        this.filteredPurchases.push(this.purchases[i]);
      }
    }
    console.log(this.filteredPurchases);
  }

}
