import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-supplie-filters',
  templateUrl: './supplie-filters.component.html',
  styleUrls: ['./supplie-filters.component.sass']
})
export class SupplieFiltersComponent implements OnInit {

  @ViewChild('description', { static : false }) descriptionElement! : ElementRef;
  @Input('reloadList') reloadList! : Subject<any>;
  @Output() supplieFilters = new EventEmitter<any>();
  public SupplieFiltersForm: any;

  ngOnInit() : void {
    this.InitForm();
    this.reloadList.subscribe(e => {
      if (e === true) this.CleanFilters();
    });
    this.FocusFirstField();
  }

  SearchSupplies() {
    this.supplieFilters.emit(this.SupplieFiltersForm.value);
  }

  CleanFilters() {
    this.SupplieFiltersForm.controls['description'].setValue(undefined);
    this.SearchSupplies();
    this.FocusFirstField();
  }

  FocusFirstField() {
    setTimeout(() => {
      this.descriptionElement.nativeElement.focus();
    }, 300);
  }

  InitForm() {
    this.SupplieFiltersForm = new FormGroup({
      description : new FormControl(undefined)
    });
  }
}
