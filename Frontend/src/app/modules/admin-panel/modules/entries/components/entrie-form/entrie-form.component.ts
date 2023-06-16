import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormControl, FormArray } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import {
  debounceTime,
  delay,
  tap,
  filter,
  map,
  takeUntil,
} from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

import { Supplie, SupplieEntrieClass } from 'src/app/modules/admin-panel/modules/supplies/components/supplie.model';
import { SweetAlert2Service } from 'src/app/modules/shared/services/sweet-alert2.service';
import { HttpService } from 'src/app/modules/shared/services/http.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-entrie-form',
  templateUrl: './entrie-form.component.html',
  styleUrls: ['./entrie-form.component.sass']
})
export class EntrieFormComponent implements OnInit {

  public dataSource! : MatTableDataSource<Supplie>;
  public EntrieForm: any;
  public supplieListTemp: any = [];
  protected supplieList: Supplie[] = [];
  public flags: any = {
    searching : false,
    submitted : false
  }

  /** list of banks filtered after simulating server side search */
  public filteredServerSideSupplies: ReplaySubject<Supplie[]> = new ReplaySubject<Supplie[]>(1);

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();
  
  public foods: any = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  constructor(
    public Swal?: SweetAlert2Service,
    private http?: HttpService,
    public router?: Router,
    public activatedRoute?: ActivatedRoute
  ) { }  

  async ngOnInit(): Promise<void> {
    this.InitForm();
    await this.GetSupplieList();

    this.EntrieForm.controls['searchName'].valueChanges
      .pipe(
        filter((search) => !!search),
        tap(() => (this.flags.searching = true)),
        takeUntil(this._onDestroy),
        debounceTime(200),
        map((search: any) => {
          if (!this.supplieList) return [];

          search = search.toLowerCase();
          return this.supplieList.filter(
            (bank) => bank.name.toLowerCase().indexOf(search) > -1
          );
        }),
        delay(500)
      )
      .subscribe(
        (filteredBanks: any) => {
          this.flags.searching = false;
          this.filteredServerSideSupplies.next(filteredBanks);
        },
        (error: any) => {
          this.flags.searching = false;
        }
      );
  }

  ValidateForm() {
    this.flags.submitted = true;

    if (!this.EntrieForm.valid) return;
    this.SendForm();
  }

  SendForm() {
    console.log('send form**');
    this.Swal?.loading();

    this.http?.HTTP_POST('/api/v1/entries/new', this.EntrieForm.value)
      .subscribe((res: any) => {
        this.Swal?.close();
        this.Swal?.success('Entrada guardada', '');
        this.router?.navigate(['admin/entries']);
      }, (err: any) => this.Swal?.error('¡Ops, ocurrió un error!', 'Ocurrió un error al guardar la entrada.'));
  }

  AddProduct() {
    if (this.returnValue('productName') && this.returnValue('quantity') && this.returnValue('expiredDate')) {
      this.EntrieForm.value['supplies'].push({ 
        _id : this.returnValue('productName')._id,  
        name : this.returnValue('productName').name,
        description : this.returnValue('productName').description,
        quantity : this.returnValue('quantity'),
        expiredDate : this.returnValue('expiredDate')
      });
      this.supplieListTemp.push(new SupplieEntrieClass(
        this.returnValue('productName')._id,  
        this.returnValue('productName').name,
        this.returnValue('productName').description,
        this.returnValue('quantity'),
        this.returnValue('expiredDate'))
      );
      this.dataSource = new MatTableDataSource<Supplie>(this.supplieListTemp);
      this.EntrieForm.controls['productName'].setValue(undefined);
      this.EntrieForm.controls['quantity'].setValue(undefined);
      this.EntrieForm.controls['expiredDate'].setValue(undefined);

      console.log('sup: ', this.supplieListTemp)
    }
  }

  GetSupplieList() {
    return new Promise((resolve, reject) => {
      this.http?.HTTP_POST('/api/v1/supplies/list', { })
      .subscribe(res => {

        for (let i = 0; i < res.list.length; i++)
          this.supplieList.push(res.list[i])

        resolve( true );
      });
    });
  }

  InitForm() {
    this.EntrieForm = new FormGroup({
      _id : new FormControl(undefined),
      productName : new FormControl(undefined),
      quantity : new FormControl(undefined),
      expiredDate : new FormControl(undefined),
      searchName : new FormControl(undefined),
      supplies : new FormArray([]),
    });
  }

  returnValue(field: string) {
    return this.EntrieForm.controls[field].value;
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

}