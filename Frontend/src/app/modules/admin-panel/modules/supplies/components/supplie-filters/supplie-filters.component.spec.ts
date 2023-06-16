import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplieFiltersComponent } from './supplie-filters.component';

describe('SupplieFiltersComponent', () => {
  let component: SupplieFiltersComponent;
  let fixture: ComponentFixture<SupplieFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplieFiltersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplieFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
