import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankMovementsComponent } from './bank-movements.component';

describe('BankMovementsComponent', () => {
  let component: BankMovementsComponent;
  let fixture: ComponentFixture<BankMovementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankMovementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankMovementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
