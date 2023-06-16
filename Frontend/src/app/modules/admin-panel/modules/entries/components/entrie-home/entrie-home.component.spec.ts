import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrieHomeComponent } from './entrie-home.component';

describe('EntrieHomeComponent', () => {
  let component: EntrieHomeComponent;
  let fixture: ComponentFixture<EntrieHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntrieHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntrieHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
