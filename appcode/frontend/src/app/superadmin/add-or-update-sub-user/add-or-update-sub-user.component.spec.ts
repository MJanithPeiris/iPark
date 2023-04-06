import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrUpdateSubUserComponent } from './add-or-update-sub-user.component';

describe('AddOrUpdateSubUserComponent', () => {
  let component: AddOrUpdateSubUserComponent;
  let fixture: ComponentFixture<AddOrUpdateSubUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOrUpdateSubUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOrUpdateSubUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
