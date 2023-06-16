import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplieHomeComponent } from './supplie-home.component';

describe('SupplieHomeComponent', () => {
  let component: SupplieHomeComponent;
  let fixture: ComponentFixture<SupplieHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplieHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplieHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
