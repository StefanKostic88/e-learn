import { Component } from '@angular/core';
import { PageWraperComponent } from '../../../shared';
import { PricingCardComponent } from './pricing-card/pricing-card.component';
import { NgFor } from '@angular/common';
import { pricingCardData } from '../../constants/staticData';

@Component({
  selector: 'app-pricing-page',
  standalone: true,
  imports: [PageWraperComponent, PricingCardComponent, NgFor],
  templateUrl: './pricing-page.component.html',
  styleUrl: './pricing-page.component.scss',
})
export class PricingPageComponent {
  public readonly pricingData = pricingCardData;
}
