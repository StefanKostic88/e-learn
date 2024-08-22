import { ChangeDetectionStrategy, Component } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PricingPageComponent {
  protected readonly pricingData = pricingCardData;
  protected readonly faqData = faqData;
}
