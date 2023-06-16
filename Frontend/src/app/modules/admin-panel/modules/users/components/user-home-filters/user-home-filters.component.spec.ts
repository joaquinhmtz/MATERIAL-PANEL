import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHomeFiltersComponent } from './user-home-filters.component';

describe('UserHomeFiltersComponent', () => {
  let component: UserHomeFiltersComponent;
  let fixture: ComponentFixture<UserHomeFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserHomeFiltersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserHomeFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
