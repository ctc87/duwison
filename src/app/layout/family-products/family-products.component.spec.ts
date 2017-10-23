import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyProductsComponent } from './family-products.component';

describe('FamilyProductsComponent', () => {
  let component: FamilyProductsComponent;
  let fixture: ComponentFixture<FamilyProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
