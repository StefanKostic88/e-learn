import { Component } from '@angular/core';
import { PageWraperComponent } from '../../../shared';
import { FeatureBoxComponent } from './feature-box/feature-box.component';
import { FeatureBoxData, featureDataArr } from '../../constants/staticData';

const components = [PageWraperComponent, FeatureBoxComponent];

@Component({
  selector: 'app-features-page',
  standalone: true,
  imports: [components],
  templateUrl: './features-page.component.html',
  styleUrl: './features-page.component.scss',
})
export class FeaturesPageComponent {
  public readonly features: FeatureBoxData[] = featureDataArr;
}
