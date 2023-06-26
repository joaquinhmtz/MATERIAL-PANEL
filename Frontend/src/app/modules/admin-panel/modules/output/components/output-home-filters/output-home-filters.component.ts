import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-output-home-filters',
  templateUrl: './output-home-filters.component.html',
  styleUrls: ['./output-home-filters.component.sass']
})
export class OutputHomeFiltersComponent {

  @ViewChild('folio', { static : false }) folioElement! : ElementRef;
  @Input('reloadList') reloadList! : Subject<any>;
  @Output() outputFilters = new EventEmitter<any>();
  public OutputFiltersForm: any;

  ngOnInit() : void {
    this.InitForm();
    this.reloadList.subscribe(e => {
      if (e === true) this.CleanFilters();
    });
    this.FocusFirstField();
  }

  SearchOutputs() {
    this.outputFilters.emit(this.OutputFiltersForm.value);
  }

  CleanFilters() {
    this.OutputFiltersForm.controls['folio'].setValue(undefined);
    this.SearchOutputs();
    this.FocusFirstField();
  }

  FocusFirstField() {
    setTimeout(() => {
      this.folioElement.nativeElement.focus();
    }, 300);
  }

  InitForm() {
    this.OutputFiltersForm = new FormGroup({
      folio : new FormControl(undefined)
    });
  }
}
