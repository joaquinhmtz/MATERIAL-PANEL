import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-entrie-home-filters',
  templateUrl: './entrie-home-filters.component.html',
  styleUrls: ['./entrie-home-filters.component.sass']
})
export class EntrieHomeFiltersComponent {

  @ViewChild('folio', { static : false }) folioElement! : ElementRef;
  @Input('reloadList') reloadList! : Subject<any>;
  @Output() entrieFilters = new EventEmitter<any>();
  public EntrieFiltersForm: any;

  ngOnInit() : void {
    this.InitForm();
    this.reloadList.subscribe(e => {
      if (e === true) this.CleanFilters();
    });
    this.FocusFirstField();
  }

  SearchEntries() {
    this.entrieFilters.emit(this.EntrieFiltersForm.value);
  }

  CleanFilters() {
    this.EntrieFiltersForm.controls['folio'].setValue(undefined);
    this.SearchEntries();
    this.FocusFirstField();
  }

  FocusFirstField() {
    setTimeout(() => {
      this.folioElement.nativeElement.focus();
    }, 300);
  }

  InitForm() {
    this.EntrieFiltersForm = new FormGroup({
      folio : new FormControl(undefined)
    });
  }

}
