import { Injectable } from '@angular/core';
import { ITag, IStore, IPurchase } from '../../shared/models/models';

@Injectable({ providedIn: 'root' })
export class DataStorageService {

  private tagStorageKey = 'tags';
  private storeStorageKey = 'stores';
  private purchaseStorageKey = 'purchases';

  constructor() { }

  // Tag methods

  saveTag(newTag: ITag) {
    const tags = this.getTags();
    const index = tags.findIndex(tag => tag.name === newTag.name);
    if (index === -1) {
      tags.push(newTag);
      localStorage.setItem(this.tagStorageKey, JSON.stringify(tags));
      return newTag;
    } else {
      return tags[index];
    }
  }

  getTags(): ITag[] {
    const tags = localStorage.getItem(this.tagStorageKey);
    return tags ? JSON.parse(tags) : [];
  }

  deleteTag(id: number) {
    const tags = this.getTags().filter((tag) => tag.id !== id);
    localStorage.setItem(this.tagStorageKey, JSON.stringify(tags));
  }

  getNextTagId(): number {
    return this.getTags().length + 1;
  }

  // Store methods

  saveStore(newStore: IStore): IStore {
    const stores = this.getStores();
    const index = stores.findIndex(store => store.name === newStore.name);
    if (index === -1) {
      stores.push(newStore);
      localStorage.setItem(this.storeStorageKey, JSON.stringify(stores));
      return newStore;
    } else {
      return stores[index];
    }

  }

  getStores(): IStore[] {
    const stores = localStorage.getItem(this.storeStorageKey);
    return stores ? JSON.parse(stores) : [];
  }

  deleteStores(id: number) {
    const stores = this.getStores().filter((store) => store.id !== id);
    localStorage.setItem(this.storeStorageKey, JSON.stringify(stores));
  }

  getNextStoreId(): number {
    return this.getStores().length + 1;
  }

  // Purchase methods

  savePurchase(purchase: IPurchase) {
    const purchases = this.getPurchases();
    purchases.push(purchase);
    localStorage.setItem(this.purchaseStorageKey, JSON.stringify(purchases));
  }

  getPurchases(): IPurchase[] {
    const purchases = localStorage.getItem(this.purchaseStorageKey);
    return purchases ? JSON.parse(purchases) : [];
  }

  deletePurchases(id: number) {
    const purchase = this.getStores().filter((purchase) => purchase.id !== id);
    localStorage.setItem(this.purchaseStorageKey, JSON.stringify(purchase));
  }

  getNextPurchaseId(): number {
    return this.getPurchases().length + 1;
  }
}
