import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { SweetAlert2Service } from 'src/app/modules/shared/services/sweet-alert2.service';
import { HttpService } from 'src/app/modules/shared/services/http.service';
 
@Component({
  selector: 'app-supplie-home',
  templateUrl: './supplie-home.component.html',
  styleUrls: ['./supplie-home.component.sass']
})
export class SupplieHomeComponent implements OnInit {

  public dataSource! : MatTableDataSource<Supplie>;

  @ViewChild(MatPaginator,{ static: true }) paginator!: MatPaginator;

  public tableData: any = {
    displayedColumns : ['_id', 'name', 'description', 'unit_price', 'public_price'],
    dataSourceCount : 0
  };
  public flags: any = {
    showFilters : false
  };

  constructor(
    public Swal?: SweetAlert2Service,
    private http?: HttpService,
  ) {}

  ngOnInit(): void {
    this.GetSupplieList();
  }

  GetSupplieList() {
    this.Swal?.loading();

    this.http?.HTTP_POST('/api/v1/supplies/list', {})
      .subscribe(res => {
        let list = [];
        this.Swal?.close();
        for (let x = 0; x < res.list.length; x++)
          list.push(new Supplie(res.list[x]._id, res.list[x].name, res.list[x].description, res.list[x].unit_price, res.list[x].public_price));
        this.dataSource = new MatTableDataSource<Supplie>(list);
        this.dataSource.paginator = this.paginator;
        this.tableData.dataSourceCount = res.count[0].total;
      }, (err: any) => this.Swal?.error('¡Ops, ocurrió un error!', 'Ocurrió un error al obtener el listado de productos.'));
  }

  ShowFilters() {
    this.flags.showFilters = !this.flags.showFilters;
    if (this.flags.showFilters) {
      /*setTimeout(() => {
        this.field.nativeElement.focus();
      }, 300);*/
    }
  }

}

export class Supplie {
  constructor(public _id: string, public name: string, public description: string, public unit_price: number, public public_price: number) {
  }
}
