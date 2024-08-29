import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CustomImgComponent } from '../../../../shared';
import { TeamData } from '../../../constants/staticData';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [CustomImgComponent, NgIf],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileCardComponent {
  @Input() public memberData?: TeamData;
}
