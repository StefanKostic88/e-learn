import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserTableComponent } from './add-user-table.component';

describe('AddUserTableComponent', () => {
  let component: AddUserTableComponent;
  let fixture: ComponentFixture<AddUserTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUserTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddUserTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
