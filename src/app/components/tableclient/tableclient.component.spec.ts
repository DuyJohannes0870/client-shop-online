import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableclientComponent } from './tableclient.component';

describe('TableclientComponent', () => {
  let component: TableclientComponent;
  let fixture: ComponentFixture<TableclientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableclientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
