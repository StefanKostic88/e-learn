import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CustomImgComponent, PageWraperComponent } from '../../../shared';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { teamData } from '../../constants/staticData';
import { NgFor } from '@angular/common';

const components = [
  PageWraperComponent,
  CustomImgComponent,
  ProfileCardComponent,
];

@Component({
  selector: 'app-about-us-page',
  standalone: true,
  imports: [components, NgFor],
  templateUrl: './about-us-page.component.html',
  styleUrl: './about-us-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutUsPageComponent {
  protected readonly aboutUsImg = '../../../../assets/imgs/about-us-img.jpg';

  protected readonly teamData = teamData;

  protected trackByIndex(index: number) {
    return index;
  }
}
