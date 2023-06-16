import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputHomeFiltersComponent } from './output-home-filters.component';

describe('OutputHomeFiltersComponent', () => {
  let component: OutputHomeFiltersComponent;
  let fixture: ComponentFixture<OutputHomeFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutputHomeFiltersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutputHomeFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
