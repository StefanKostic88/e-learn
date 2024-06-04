import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageSignedComponent } from './home-page-signed.component';

describe('HomePageSignedComponent', () => {
  let component: HomePageSignedComponent;
  let fixture: ComponentFixture<HomePageSignedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePageSignedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomePageSignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
