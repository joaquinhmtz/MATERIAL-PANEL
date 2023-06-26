import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';

import { SweetAlert2Service } from 'src/app/modules/shared/services/sweet-alert2.service';
import { HttpService } from 'src/app/modules/shared/services/http.service';

import { Output } from './../output.model';

@Component({
  selector: 'app-output-home',
  templateUrl: './output-home.component.html',
  styleUrls: ['./output-home.component.sass']
})
export class OutputHomeComponent implements OnInit {

  public reloadList : Subject<any> = new Subject();
  public dataSource! : MatTableDataSource<Output>;

  @ViewChild(MatPaginator,{ static: true }) paginator!: MatPaginator;

  public tableData: any = {
    displayedColumns : ['index', 'folio', 'payment', 'creation_date', 'quantity', 'actions'],
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
    this.GetOutputList({});
  }

  GetOutputList(filters: any) {
    this.Swal?.loading();

    this.http?.HTTP_POST('/api/v1/outputs/list', filters)
      .subscribe(res => {
        let list = [];
        this.Swal?.close();
        for (let x = 0; x < res.list.length; x++)
          list.push(new Output(res.list[x]._id, res.list[x].folio, res.list[x].creation_date, res.list[x].payment, res.list[x].totalQuantity, res.list[x].totalSupplies));
        this.dataSource = new MatTableDataSource<Output>(list);
        this.dataSource.paginator = this.paginator;
        this.tableData.dataSourceCount = res.count[0].total;
      }, (err: any) => this.Swal?.error('¡Ops, ocurrió un error!', 'Ocurrió un error al obtener el listado de salidas.'));
  }

  ReloadSupplieList() {
    this.reloadList.next(true);
  }

  CatchFilters(e: any) {
    this.GetOutputList(e);
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
