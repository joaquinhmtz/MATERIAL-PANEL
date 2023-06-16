import { Injectable } from '@angular/core';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlert2Service {

  constructor() { }

  success(title: String, text: String, callback?: any) {

    const options: any = {
      icon: 'success',
      title: title || 'Exito',
      confirmButtonText: 'Aceptar',
      onOpen: ()=> Swal.hideLoading()
    };

    if(title) options.title = title;
    if(text) options.text = text;

    if(callback){
      Swal.fire(options).then( result => callback() );
    } else {
      Swal.fire(options);
    }

  }

  warning(title: String, text: String, callback?: any) {

    const options: any = {
      icon : 'warning',
      title : title || 'Advertencia',
      confirmButtonText: 'Aceptar',
      onOpen: ()=> Swal.hideLoading()
    };

    if(title) options.title = title;
    if(text) options.text = text;

    if(callback){
      Swal.fire(options).then( result => callback() );
    } else {
      Swal.fire(options);
    }
  }

  error(title?: String, text?: String) {

    let options: any = {
      icon : 'error',
      title : title || 'Advertencia',
      text : text || 'Intente de nuevo más tarde',
      confirmButtonText: 'Aceptar',
      onOpen: ()=> Swal.hideLoading()
    };

    Swal.fire(options);
  }

  loading(title?: String, text?: String) {

    Swal.fire({
      title: title || 'Cargando...',
      text: 'Espere un momento por favor',
      allowOutsideClick : false,
      allowEscapeKey : false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

  }

  confirm(title: String, text: String, cancelButton: any, callback?: any) {
    let options: any = {
      icon: 'warning',
      title : title || 'Confirmación',
      text : text || '¿Está seguro de realizar esta acción?',
      allowOutsideClick : false,
      showCancelButton: cancelButton,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      allowEscapeKey : true,
      reverseButtons: true
    };

    if(title) options.title = title;
    if(text) options.text = text;

    Swal.fire(options).then( result => {
      if (result.value)
        callback(result);
      else
        callback({ value: false });
    });
  }

  fireQuestion(title: any, text: any){
    return Swal.fire({
      title: title || '¿Seguro?',
      text: text || 'Quieres hacer esta operación',
      icon: 'question',
      confirmButtonText: 'نعم',
      cancelButtonText: 'لا',
      showCancelButton: true,
      showCloseButton: true
    });
  }

  close() {
    Swal.close();
  }
}
