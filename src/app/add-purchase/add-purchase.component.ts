// Importem
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
  // Creem les variables
  profileForm: FormGroup; //Formulari
  stores: IStore[] = []; //array de tendes buit
  tags: ITag[] = []; //array de categories buit

  filteredStoreOptions: Observable<string[]>; //Observables per detectar els canvis a l'input per actualitzar el autocompletar
  filteredTagOptions: Observable<string[]>;

  constructor(private dataStorageService: DataStorageService, private router: Router) { } // inicialitzem el service que actua de base de dades i el router

  ngOnInit() { // Funció que es crida 1 cop al inicialitzar
    this.stores = this.dataStorageService.getStores(); // obtenim les tendes guardades
    this.tags = this.dataStorageService.getTags(); // obtenim les categories guardades
    const storeControl = new FormControl('', [Validators.required]); // Creem els controls del formulari per a que nomès sigui vàlid cuan estiguin complerts
    const tagControl = new FormControl('', [Validators.required]);
    this.profileForm = new FormGroup({ // juntem els controls al grup
      price: new FormControl('', [Validators.required]),
      store: storeControl,
      tag: tagControl,
    });

    this.filteredStoreOptions = storeControl.valueChanges // Deixem que el observable miri amb la funcio filter_ si han canviat el input
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

  onSubmit() { // funció per guardar les dades del formulari
    console.log(this.profileForm.value);
    if (this.profileForm.valid) {
      const values = this.profileForm.value
      const storeId = this.dataStorageService.getNextStoreId(); // Assignem un id nou
      const tagId = this.dataStorageService.getNextTagId();
      const purchaseId = this.dataStorageService.getNextPurchaseId();
      const store = this.dataStorageService.saveStore({ id: storeId, name: values.store! }); //Guardem la tenda i la categoria
      const tag = this.dataStorageService.saveTag({ id: tagId, name: values.tag! });


      const purchase: IPurchase = {
        id: purchaseId,
        date: new Date(),
        price: +values.price!,
        storeName: store.name,
        tagName: tag.name
      };
      console.log(purchase);

      this.dataStorageService.savePurchase(purchase); // Guardem la compra
      this.router.navigateByUrl('/'); // tornem a la pàgina principal
    }
  }

  private _filter(value: string, options: string[]): string[] { // comparem un array de tenda o categoria amb el que etem escribint al imput i retornem un array amb els resultats filtrats
    const filterValue = value.toLowerCase();

    return options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
