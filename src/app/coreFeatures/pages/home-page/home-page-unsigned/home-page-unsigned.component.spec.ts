import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageUnsignedComponent } from './home-page-unsigned.component';

describe('HomePageUnsignedComponent', () => {
  let component: HomePageUnsignedComponent;
  let fixture: ComponentFixture<HomePageUnsignedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePageUnsignedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomePageUnsignedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
