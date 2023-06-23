import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ReplaySubject, Subject } from 'rxjs';
import {
  debounceTime,
  delay,
  tap,
  filter,
  map,
  takeUntil,
} from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';

import { SweetAlert2Service } from 'src/app/modules/shared/services/sweet-alert2.service';
import { HttpService } from 'src/app/modules/shared/services/http.service';

import { SupplieOutput, SupplieOutputClass } from '../../../supplies/components/supplie.model';
@Component({
  selector: 'app-output-form',
  templateUrl: './output-form.component.html',
  styleUrls: ['./output-form.component.sass']
})
export class OutputFormComponent implements OnInit {

  public dataSource! : MatTableDataSource<SupplieOutput>;
  public OutputForm: any;
  public projects: any = [{
    _id : '648b92d4c48148b419bf0dde',
    name : 'APAPACHO METEPEC - LOCAL'
  }];
  public types: any = [
    { key: 'sale', name: 'Venta' },
    { key: 'inventory_adjustment', name: 'Ajuste de inventario' },
    { key: 'decrease', name: 'Merma' },
  ];
  public payments: any = [
    { key: 'cash', name: 'Efectivo' },
    { key: 'card', name: 'Tarjeta débito/crédito' },
    { key: 'transfer', name: 'Transferencia' },
  ];
  public supplieListTemp: any = [];
  public supplieList: SupplieOutput[] = [];
  public flags: any = {
    submitted : false,
    searching : false
  };

  public filteredServerSideSupplies: ReplaySubject<SupplieOutput[]> = new ReplaySubject<SupplieOutput[]>(1);
  protected _onDestroy = new Subject<void>();

  displayedColumns: string[] = ['index', 'name', 'description', 'quantity', 'actions'];

  constructor(
    public Swal?: SweetAlert2Service,
    private http?: HttpService,
    public router?: Router,
    public activatedRoute?: ActivatedRoute
  ) {}

  ngOnInit() : void {
    this.InitForm();
    this.GetSupplieList();

    this.OutputForm.controls['searchName'].valueChanges
      .pipe(
        filter((search) => !!search),
        tap(() => (this.flags.searching = true)),
        takeUntil(this._onDestroy),
        debounceTime(200),
        map((search: any) => {
          if (!this.supplieList) return [];

          search = search.toLowerCase();
          return this.supplieList.filter(
            (item) => item.fullname.toLowerCase().indexOf(search) > -1
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
    // this.activatedRoute?.queryParamMap.subscribe( (res:any) => {
    //   let params: any = res.params;
    //   if (params.supplie != null || params.supplie != undefined) {
    //     this.title = 'Editar producto';
    //     this.flags.action = 'update';
    //     this.GetSupplieById(params.supplie);
    //   }
    // });
  }

  ValidateForm() {
    console.log('aqui mero')
    this.flags.submitted = true;

    if (!this.OutputForm.valid) return;
    this.SendForm();
  }

  SendForm() {
    this.Swal?.loading();

    this.OutputForm.controls['project'].setValue(this.projects[0]);
    this.OutputForm.controls['payment'].setValue(this.payments.filter((item: any) => item.key === this.returnValue('payment'))[0]);
    this.OutputForm.controls['type'].setValue(this.types.filter((item: any) => item.key === this.returnValue('type'))[0]);

    this.http?.HTTP_POST('/api/v1/outputs/new', this.OutputForm.value)
      .subscribe((res: any) => {
        this.Swal?.close();
        this.Swal?.success('Salida guardada', '', (res: any) => {
          this.router?.navigate(['admin/outputs']);
        });
      }, (err: any) => this.Swal?.error('¡Ops, ocurrió un error!', 'Ocurrió un error al guardar la salida.'));
  }

  AddProduct() {
    //Considerar el restart un stock temporal, para no sobrepasar los insumos reales regresados por el servicio
    //Puestos en la lista de supplies
    if (this.returnValue('productName') && this.returnValue('quantity')) {
      let supplieStock = this.supplieList.filter(item => item._id === this.returnValue('productName')._id);
      if (supplieStock.length >= 1) {
        if (supplieStock[0].stock >= this.returnValue('quantity')) {
          this.OutputForm.value['supplies'].push({ 
            _id : this.returnValue('productName')._id,  
            name : this.returnValue('productName').name,
            description : this.returnValue('productName').description,
            stock : this.returnValue('productName').stock,
            quantity : this.returnValue('quantity'),
            expiredDate : this.returnValue('productName').expiredDate,
            lotId : this.returnValue('productName').lotId,
            lotName : this.returnValue('productName').lotName,
          });
          this.supplieListTemp.push(new SupplieOutputClass(
            this.returnValue('productName')._id,  
            this.returnValue('productName').name,
            this.returnValue('productName').fullname,
            this.returnValue('productName').description,
            this.returnValue('productName').stock,
            this.returnValue('quantity'),
            this.returnValue('productName').expiredDate,
            this.returnValue('productName').lotId,
            this.returnValue('productName').lotName,
          ));
          this.dataSource = new MatTableDataSource<SupplieOutput>(this.supplieListTemp);
          this.OutputForm.controls['productName'].setValue(undefined);
          this.OutputForm.controls['quantity'].setValue(undefined);
        } else {
          this.Swal?.warning(
            'Stock insuficiente', 
            this.returnValue('productName').fullname + ' actualmente solo se cuenta con ' + supplieStock[0].stock + ' piezas'
          );
        }
      }
    }
  }

  DeleteSupplie(index: number) {
    this.OutputForm.value['supplies'].splice(index, 1);
    this.supplieListTemp.splice(index, 1);
    this.dataSource = new MatTableDataSource<SupplieOutput>(this.supplieListTemp);
  }

  GetSupplieList() {
    this.Swal?.loading();

    this.http?.HTTP_POST('/api/v1/extras/list/supplies-stock', {})
      .subscribe((res: any) => {
        this.Swal?.close();
        this.supplieList = res.list;
      }, (err: any) => this.Swal?.error('¡Ops, ocurrió un error!', 'Ocurrió un error al obtener el catálogo de productos.'));
  }

  InitForm() {
    this.OutputForm = new FormGroup({
      _id : new FormControl(undefined, []),
      folio : new FormControl(undefined, []),
      productName : new FormControl(undefined),
      searchName : new FormControl(undefined, []),
      quantity : new FormControl(undefined),
      project : new FormControl(undefined, [Validators.required]),
      type : new FormControl(undefined, [Validators.required]),
      payment : new FormControl(undefined, [Validators.required]),
      supplies : new FormArray([])
    });
  }

  returnValue(field: string) {
    return this.OutputForm.controls[field].value;
  }

  getErrorMessage(controlName: any) {
    let msg = '';

    if (this.OutputForm.controls[controlName].hasError('required')) msg = 'Campo obligatorio';
    return msg;
  }

  public hasError(control: any, error: any) {
    return (control.dirty || control.touched || this.flags.submitted) && (control.errors && control.errors[error]);
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
