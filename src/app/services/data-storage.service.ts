import { Injectable } from '@angular/core';
import { ITag, IStore, IPurchase } from '../../shared/models/models'; // importem els models 

@Injectable({ providedIn: 'root' })
export class DataStorageService {

  private tagStorageKey = 'tags';
  private storeStorageKey = 'stores';
  private purchaseStorageKey = 'purchases';

  constructor() { }

  saveTag(newTag: ITag) { // Guardem una nova categoria si no existeix
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

  getTags(): ITag[] { // obtenim les categories
    const tags = localStorage.getItem(this.tagStorageKey);
    return tags ? JSON.parse(tags) : [];
  }

  deleteTag(id: number) { // eliminem una categoria
    const tags = this.getTags().filter((tag) => tag.id !== id);
    localStorage.setItem(this.tagStorageKey, JSON.stringify(tags));
  }

  getNextTagId(): number { // obtenim el seguent id
    return this.getTags().length + 1;
  }

  // Aquests metodes son els mateixos que els anteriors però amb tendes

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

  // El mateix passa amb aquests metodes per compra però en aquest cas si que4 hi poden haber dues compres similars

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
