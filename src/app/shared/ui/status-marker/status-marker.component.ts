import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition, faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-status-marker',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './status-marker.component.html',
  styleUrl: './status-marker.component.scss',
})
export class StatusMarkerComponent {
  userActiveStatus = 'Active';
  public icon: IconDefinition = faCheck;
}
