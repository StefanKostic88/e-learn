import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAccountAddTrainerComponent } from './my-account-add-trainer.component';

describe('MyAccountAddTrainerComponent', () => {
  let component: MyAccountAddTrainerComponent;
  let fixture: ComponentFixture<MyAccountAddTrainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyAccountAddTrainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyAccountAddTrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
