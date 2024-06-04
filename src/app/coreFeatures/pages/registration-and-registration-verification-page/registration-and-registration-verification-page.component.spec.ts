import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationAndRegistrationVerificationPageComponent } from './registration-and-registration-verification-page.component';

describe('RegistrationAndRegistrationVerificationPageComponent', () => {
  let component: RegistrationAndRegistrationVerificationPageComponent;
  let fixture: ComponentFixture<RegistrationAndRegistrationVerificationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationAndRegistrationVerificationPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrationAndRegistrationVerificationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
