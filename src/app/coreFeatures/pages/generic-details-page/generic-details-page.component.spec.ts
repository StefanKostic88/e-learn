import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericDetailsPageComponent } from './generic-details-page.component';

describe('GenericDetailsPageComponent', () => {
  let component: GenericDetailsPageComponent;
  let fixture: ComponentFixture<GenericDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenericDetailsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenericDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
