import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition, faCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-status-marker',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './status-marker.component.html',
  styleUrl: './status-marker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusMarkerComponent {
  public userActiveStatus = 'Active';
  protected icon: IconDefinition = faCheck;
}
