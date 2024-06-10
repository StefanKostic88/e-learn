import { Component } from '@angular/core';
import { PageWraperComponent } from '../../../shared';
import { PricingCardComponent } from './pricing-card/pricing-card.component';
import { NgFor } from '@angular/common';
import { faqData, pricingCardData } from '../../constants/staticData';
import { FaqComponent } from './faq/faq.component';

const components = [FaqComponent, PageWraperComponent, PricingCardComponent];

@Component({
  selector: 'app-pricing-page',
  standalone: true,
  imports: [components, NgFor, NgFor],
  templateUrl: './pricing-page.component.html',
  styleUrl: './pricing-page.component.scss',
})
export class PricingPageComponent {
  public readonly pricingData = pricingCardData;
  public readonly faqData = faqData;
}
