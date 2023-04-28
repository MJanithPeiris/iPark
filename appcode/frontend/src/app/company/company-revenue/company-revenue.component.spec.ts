import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyRevenueComponent } from './company-revenue.component';

describe('CompanyRevenueComponent', () => {
  let component: CompanyRevenueComponent;
  let fixture: ComponentFixture<CompanyRevenueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyRevenueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyRevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
