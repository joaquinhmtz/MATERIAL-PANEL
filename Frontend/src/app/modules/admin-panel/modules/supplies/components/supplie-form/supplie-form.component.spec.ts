import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplieFormComponent } from './supplie-form.component';

describe('SupplieFormComponent', () => {
  let component: SupplieFormComponent;
  let fixture: ComponentFixture<SupplieFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplieFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplieFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
