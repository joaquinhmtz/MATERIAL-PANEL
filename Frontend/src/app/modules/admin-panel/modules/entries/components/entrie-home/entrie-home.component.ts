import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';

import { SweetAlert2Service } from 'src/app/modules/shared/services/sweet-alert2.service';
import { HttpService } from 'src/app/modules/shared/services/http.service';

import { Entrie } from './../entrie.model';

@Component({
  selector: 'app-entrie-home',
  templateUrl: './entrie-home.component.html',
  styleUrls: ['./entrie-home.component.sass']
})
export class EntrieHomeComponent implements OnInit {
  
  public reloadList : Subject<any> = new Subject();
  public dataSource! : MatTableDataSource<Entrie>;

  @ViewChild(MatPaginator,{ static: true }) paginator!: MatPaginator;

  public tableData: any = {
    displayedColumns : ['index', 'folio', 'creation_date', 'quantity', 'actions'],
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
    this.GetEntrieList({});
  }

  GetEntrieList(filters: any) {
    this.Swal?.loading();

    this.http?.HTTP_POST('/api/v1/entries/list', filters)
      .subscribe(res => {
        let list = [];
        this.Swal?.close();
        for (let x = 0; x < res.list.length; x++)
          list.push(new Entrie(res.list[x]._id, res.list[x].folio, res.list[x].creation_date, res.list[x].totalQuantity, res.list[x].totalSupplies));
        this.dataSource = new MatTableDataSource<Entrie>(list);
        this.dataSource.paginator = this.paginator;
        this.tableData.dataSourceCount = res.count[0].total;
      }, (err: any) => this.Swal?.error('¡Ops, ocurrió un error!', 'Ocurrió un error al obtener el listado de entradas.'));
  }

  ReloadSupplieList() {
    this.reloadList.next(true);
  }

  CatchFilters(e: any) {
    this.GetEntrieList(e);
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
