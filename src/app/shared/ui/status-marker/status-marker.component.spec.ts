import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusMarkerComponent } from './status-marker.component';
import {
  FaIconComponent,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { IconDefinition, faCheck } from '@fortawesome/free-solid-svg-icons';

describe('StatusMarkerComponent', () => {
  let component: StatusMarkerComponent;
  let fixture: ComponentFixture<StatusMarkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusMarkerComponent, FontAwesomeModule],
    }).compileComponents();

    fixture = TestBed.createComponent(StatusMarkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should render the content of userActiveStatus', () => {
    const userActiveStatus = 'Active status test content';
    component.userActiveStatus = userActiveStatus;
    fixture.detectChanges();
    const content: HTMLSpanElement =
      fixture.nativeElement.querySelector('.status-marker');
    expect(content.textContent).toContain(userActiveStatus);
  });

  it('Should render Fa check icon', () => {
    const expectedIcon: IconDefinition = faCheck;
    component.icon = expectedIcon;
    fixture.detectChanges();

    const faIconComponent = fixture.debugElement.query(
      (el) => el.componentInstance instanceof FaIconComponent
    );
    expect(faIconComponent).toBeTruthy();
    expect(faIconComponent.componentInstance.icon).toEqual(expectedIcon);
  });
});
