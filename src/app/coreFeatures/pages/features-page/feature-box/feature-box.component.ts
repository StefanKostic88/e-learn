import { Component, Input } from '@angular/core';
import { ButtonComponent, CustomImgComponent } from '../../../../shared';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'app-feature-box',
  standalone: true,
  imports: [CustomImgComponent, ButtonComponent, NgStyle, NgClass],
  templateUrl: './feature-box.component.html',
  styleUrl: './feature-box.component.scss',
})
export class FeatureBoxComponent {
  @Input() public isReversed?: boolean = false;
  public readonly img = '../../../../../assets/imgs/feature-img-1.jpg';
}
