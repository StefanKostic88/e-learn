import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PageWraperComponent } from '../../../shared';
import { PricingCardComponent } from './pricing-card/pricing-card.component';
import { NgFor } from '@angular/common';
import { faqData, pricingCardData } from '../../constants/staticData';
import { FaqComponent } from './faq/faq.component';
import { UiService } from '../../services/uiService/ui.service';

const components = [FaqComponent, PageWraperComponent, PricingCardComponent];

@Component({
  selector: 'app-pricing-page',
  standalone: true,
  imports: [components, NgFor, NgFor],
  templateUrl: './pricing-page.component.html',
  styleUrl: './pricing-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PricingPageComponent implements OnInit {
  protected readonly pricingData = pricingCardData;
  protected readonly faqData = faqData;

  constructor(private uiService: UiService) {}

  ngOnInit(): void {
    const timer = setTimeout(() => {
      this.uiService.loadingSpiner = false;
      clearTimeout(timer);
    }, 0);
  }
}
