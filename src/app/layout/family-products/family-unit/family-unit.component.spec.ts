import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyUnitComponent } from './family-unit.component';

describe('FamilyUnitComponent', () => {
  let component: FamilyUnitComponent;
  let fixture: ComponentFixture<FamilyUnitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyUnitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
