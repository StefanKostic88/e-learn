import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PageWraperComponent } from '../../../shared';
import { FeatureBoxComponent } from './feature-box/feature-box.component';
import { FeatureBoxData, featureDataArr } from '../../constants/staticData';
import { UiService } from '../../services/uiService/ui.service';

const components = [PageWraperComponent, FeatureBoxComponent];

@Component({
  selector: 'app-features-page',
  standalone: true,
  imports: [components],
  templateUrl: './features-page.component.html',
  styleUrl: './features-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturesPageComponent implements OnInit {
  public readonly features: FeatureBoxData[] = featureDataArr;

  constructor(private uiService: UiService) {}

  ngOnInit(): void {
    const timer = setTimeout(() => {
      this.uiService.loadingSpiner = false;
      clearTimeout(timer);
    }, 0);
  }
}
