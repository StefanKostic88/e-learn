import { Component, Input } from '@angular/core';
import { ButtonComponent, CustomImgComponent } from '../../../../shared';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-feature-box',
  standalone: true,
  imports: [CustomImgComponent, ButtonComponent, NgStyle],
  templateUrl: './feature-box.component.html',
  styleUrl: './feature-box.component.scss',
})
export class FeatureBoxComponent {
  @Input() isReversed?: boolean = false;
  public readonly img = '../../../../../assets/imgs/feature-img-1.jpg';
}
