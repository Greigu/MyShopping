import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPurchaseComponent } from './add-purchase/add-purchase.component';
import { HomeComponent } from './home/home.component';
import { PurchaseListComponent } from './purchase-list/purchase-list.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add-purchase', component: AddPurchaseComponent},
  { path: 'purchase-list', component: PurchaseListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
