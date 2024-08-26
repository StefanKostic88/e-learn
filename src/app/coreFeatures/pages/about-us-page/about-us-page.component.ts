import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CustomImgComponent, PageWraperComponent } from '../../../shared';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { teamData } from '../../constants/staticData';
import { NgFor } from '@angular/common';
import { UiService } from '../../services/uiService/ui.service';
import { environment } from '../../../enviroment';

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
export class AboutUsPageComponent implements OnInit {
  protected readonly aboutUsImg = environment.staticImages.aboutUs;

  protected readonly teamData = teamData;

  constructor(private uiService: UiService) {}

  ngOnInit(): void {
    const timer = setTimeout(() => {
      this.uiService.loadingSpiner = false;
      clearTimeout(timer);
    }, 0);
  }

  protected trackByIndex(index: number) {
    return index;
  }
}
