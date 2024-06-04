import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusMarkerComponent } from './status-marker.component';

describe('StatusMarkerComponent', () => {
  let component: StatusMarkerComponent;
  let fixture: ComponentFixture<StatusMarkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusMarkerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatusMarkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
