import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountigTypeComponent } from './accountig-type.component';

describe('AccountigTypeComponent', () => {
  let component: AccountigTypeComponent;
  let fixture: ComponentFixture<AccountigTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountigTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountigTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
