import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableserverComponent } from './tableserver.component';

describe('TableserverComponent', () => {
  let component: TableserverComponent;
  let fixture: ComponentFixture<TableserverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableserverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableserverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
