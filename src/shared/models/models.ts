export interface IPurchase {
  id: number;
  date: Date;
  price: number;
  storeName: string;
  tagName: string;
}

export interface IStore {
  id: number;
  name: string;
}

export interface ITag {
  id: number;
  name: string;
}