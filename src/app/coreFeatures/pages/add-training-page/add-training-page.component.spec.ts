import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTrainingPageComponent } from './add-training-page.component';

describe('AddTrainingPageComponent', () => {
  let component: AddTrainingPageComponent;
  let fixture: ComponentFixture<AddTrainingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTrainingPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddTrainingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
