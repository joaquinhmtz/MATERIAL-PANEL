import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { SweetAlert2Service } from 'src/app/modules/shared/services/sweet-alert2.service';
import { HttpService } from 'src/app/modules/shared/services/http.service';

@Component({
  selector: 'app-supplie-form',
  templateUrl: './supplie-form.component.html',
  styleUrls: ['./supplie-form.component.sass']
})
export class SupplieFormComponent implements OnInit {

  public SupplieForm: any;

  public flags : any = {
    submitted : false,
    action : 'create'
  };
  public presentations: any = [
    {
      key: 'piece', 
      name: 'Pieza'
    }
  ];
  public title: any = 'Nuevo producto';
  public VALIDATIONS = {
    required: (control: FormControl) => {
      const value = control.value;
      if (!value) { return { invalidControl: 'Campo requerido' }}
      return null;
    }
  };

  constructor(
    public Swal?: SweetAlert2Service,
    private http?: HttpService,
    public router?: Router,
    public activatedRoute?: ActivatedRoute
  ) {}

  ngOnInit() : void {
    this.InitForm();
    this.activatedRoute?.queryParamMap.subscribe( (res:any) => {
      let params: any = res.params;
      if (params.supplie != null || params.supplie != undefined) {
        this.title = 'Editar producto';
        this.flags.action = 'update';
        this.GetSupplieById(params.supplie);
      }
    });
  }

  GetSupplieById(supplieId: any) {
    this.Swal?.loading();

    this.http?.HTTP_GET('/api/v1/supplies/get', { _id : supplieId })
      .subscribe((res: any) => {
        this.Swal?.close();
        this.SetValues(res.supplie);
      }, (err: any) => this.Swal?.error('¡Ops, ocurrió un error!', 'Ocurrió un error al obtener la información del producto.'));
  }

  SetValues(supplie: any) {
    this.SupplieForm.setValue({
      _id : supplie._id,
      name : supplie.name,
      description : supplie.description,
      unit_price : supplie.unit_price,
      public_price : supplie.public_price,
      presentation : supplie.presentation?.key,
      manufacturer : supplie.manufacturer,
      active : supplie.active
    });
  }

  ValidateForm() {
    this.flags.submitted = true;

    if (!this.SupplieForm.valid) return;
    this.SendForm();
  }

  SendForm() {
    this.Swal?.loading();

    let url = (this.flags.action === 'create' ? '/api/v1/supplies/new' : '/api/v1/supplies/update');
    this.SupplieForm.controls['presentation'].setValue(this.presentations[0]);

    this.http?.HTTP_POST(url, this.SupplieForm.value)
      .subscribe((res: any) => {
        this.Swal?.close();
        this.Swal?.success('Producto guardado', '', (res: any) => {
          this.router?.navigate(['admin/supplies']);
        });
      }, (err: any) => this.Swal?.error('¡Ops, ocurrió un error!', 'Ocurrió un error al guardar el producto.'));
  }

  getErrorMessage(controlName: any) {
    let msg = '';

    if (this.SupplieForm.controls[controlName].hasError('required')) msg = 'Campo obligatorio';
    return msg;
  }

  InitForm() {
    this.SupplieForm = new FormGroup({
      _id : new FormControl(undefined),
      name : new FormControl(undefined, [Validators.required]),
      description : new FormControl(undefined, [Validators.required]),
      unit_price : new FormControl(undefined, [Validators.required]),
      public_price : new FormControl(undefined, [Validators.required]),
      presentation : new FormControl(undefined, [Validators.required]),
      manufacturer : new FormControl(undefined, [Validators.required]),
      active : new FormControl(true)
    });
  }

  public hasError(control: any, error: any) {
    return (control.dirty || control.touched || this.flags.submitted) && (control.errors && control.errors[error]);
  }

}
