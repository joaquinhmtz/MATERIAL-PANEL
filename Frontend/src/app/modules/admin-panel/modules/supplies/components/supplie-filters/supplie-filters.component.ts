import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-supplie-filters',
  templateUrl: './supplie-filters.component.html',
  styleUrls: ['./supplie-filters.component.sass']
})
export class SupplieFiltersComponent implements OnInit {

  @Input('reloadList') reloadList! : Subject<any>;
  @Output() supplieFilters = new EventEmitter<any>();
  public SupplieFiltersForm: any;

  ngOnInit() : void {
    this.InitForm();
    this.reloadList.subscribe(e => {
      if (e === true) this.CleanFilters();
    });
  }

  SearchSupplies() {
    this.supplieFilters.emit(this.SupplieFiltersForm.value);
  }

  CleanFilters() {
    this.SupplieFiltersForm.controls['description'].setValue(undefined);
    this.SearchSupplies();
  }

  InitForm() {
    this.SupplieFiltersForm = new FormGroup({
      description : new FormControl(undefined)
    });
  }
}
