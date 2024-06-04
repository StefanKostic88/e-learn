import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAccountBaseComponent } from './my-account-base.component';

describe('MyAccountBaseComponent', () => {
  let component: MyAccountBaseComponent;
  let fixture: ComponentFixture<MyAccountBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyAccountBaseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyAccountBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
