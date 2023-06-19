import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';

import { SweetAlert2Service } from 'src/app/modules/shared/services/sweet-alert2.service';
import { HttpService } from 'src/app/modules/shared/services/http.service';
import { SupplieListClass } from './../supplie.model';
 
@Component({
  selector: 'app-supplie-home',
  templateUrl: './supplie-home.component.html',
  styleUrls: ['./supplie-home.component.sass']
})
export class SupplieHomeComponent implements OnInit {

  public reloadList : Subject<any> = new Subject();
  public dataSource! : MatTableDataSource<SupplieListClass>;

  @ViewChild(MatPaginator,{ static: true }) paginator!: MatPaginator;

  public tableData: any = {
    displayedColumns : ['index', 'name', 'description', 'presentation', 'public_price', 'actions'],
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
    this.GetSupplieList({});
  }

  GetSupplieList(filters: any) {
    this.Swal?.loading();

    this.http?.HTTP_POST('/api/v1/supplies/list', filters)
      .subscribe(res => {
        let list = [];
        let index = 1;
        this.Swal?.close();
        for (let x = 0; x < res.list.length; x++) {
          list.push(new SupplieListClass(index, res.list[x]._id, res.list[x].name, res.list[x].description, res.list[x].presentation, res.list[x].public_price));
          index++;
        }
        this.dataSource = new MatTableDataSource<SupplieListClass>(list);
        this.dataSource.paginator = this.paginator;
        this.tableData.dataSourceCount = res.count[0].total;
      }, (err: any) => this.Swal?.error('¡Ops, ocurrió un error!', 'Ocurrió un error al obtener el listado de productos.'));
  }

  ReloadSupplieList() {
    this.reloadList.next(true);
  }

  CatchFilters(e: any) {
    this.GetSupplieList(e);
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
