import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AddPurchaseComponent } from './add-purchase/add-purchase.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { DataStorageService } from './services/data-storage.service';
import { PurchaseListComponent } from './purchase-list/purchase-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
// importem tot el necessari per fer funcional l'app

@NgModule({
  declarations: [ // Components
    AppComponent,
    AddPurchaseComponent,
    HomeComponent,
    PurchaseListComponent,

  ],
  imports: [ //modules
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    FormsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatInputModule
  ],
  providers: [ // services
    { provide: 'LOCAL_STORAGE', useValue: window.localStorage },
    DataStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
