import { Component, Input } from '@angular/core';
import { CustomImgComponent } from '../../../../shared';
import { TeamData } from '../../../constants/staticData';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [CustomImgComponent],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
})
export class ProfileCardComponent {
  @Input() memberData?: TeamData;
}
