import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrieHomeFiltersComponent } from './entrie-home-filters.component';

describe('EntrieHomeFiltersComponent', () => {
  let component: EntrieHomeFiltersComponent;
  let fixture: ComponentFixture<EntrieHomeFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntrieHomeFiltersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntrieHomeFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
