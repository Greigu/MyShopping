export interface IPurchase {
  id: number;
  date: Date;
  price: number;
  storeId: number;
  tagId: number;
}

export interface IStore {
  id: number;
  name: string;
}

export interface ITag {
  id: number;
  name: string;
}