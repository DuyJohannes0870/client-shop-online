import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginshopComponent } from './loginshop.component';

describe('LoginshopComponent', () => {
  let component: LoginshopComponent;
  let fixture: ComponentFixture<LoginshopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginshopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
