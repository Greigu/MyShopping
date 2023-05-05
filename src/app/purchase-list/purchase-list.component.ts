import { Component } from '@angular/core';
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

  constructor(private dataStorageService: DataStorageService) {
    this.purchases = this.dataStorageService.getPurchases();
    this.stores = this.dataStorageService.getStores();
    this.tags = this.dataStorageService.getTags();
  }
}
