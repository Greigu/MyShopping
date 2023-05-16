import { Component } from '@angular/core';
import { DataStorageService } from '../services/data-storage.service';
import { IPurchase, IStore, ITag } from '../../shared/models/models';

@Component({
  selector: 'app-purchase-list',
  templateUrl: './purchase-list.component.html',
  styleUrls: ['./purchase-list.component.scss']
})
export class PurchaseListComponent {
  purchases: IPurchase[] = []; // creem arrays buits per guardar les dades de compra, tendes i categories
  stores: IStore[] = [];
  tags: ITag[] = [];
  filterStore: string = "";
  filterTag: string = "";
  isFilter = false;

  filteredPurchases: IPurchase[] = []; // array amb les compres filtrades

  constructor(private dataStorageService: DataStorageService) { // obtenim les dades del service 
    this.purchases = this.dataStorageService.getPurchases();
    this.stores = this.dataStorageService.getStores();
    this.tags = this.dataStorageService.getTags();
    this.filteredPurchases = this.purchases;

  }


  aplyFilter() { // filtrem les compres segons la tenda i la categoria
    this.filteredPurchases = [];

    for (let i = 0; i < this.purchases.length; i++) {
      if ((this.purchases[i].storeName === this.filterStore || this.filterStore === "") &&
        (this.purchases[i].tagName === this.filterTag || this.filterTag === "")) {
        this.filteredPurchases.push(this.purchases[i]);
      }
    }
    console.log(this.filteredPurchases);
  }

}
