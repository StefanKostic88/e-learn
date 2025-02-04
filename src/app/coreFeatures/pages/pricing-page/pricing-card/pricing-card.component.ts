import { Component, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCheck, faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonComponent } from '../../../../shared';
import { ButtonSize } from '../../../../shared/models/button.model';
import { PricingCard } from '../../../constants/staticData';
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-pricing-card',
  standalone: true,
  imports: [FontAwesomeModule, ButtonComponent, NgFor, NgClass, NgIf],
  templateUrl: './pricing-card.component.html',
  styleUrl: './pricing-card.component.scss',
})
export class PricingCardComponent {
  @Input() public cardData?: PricingCard;

  protected readonly btnSize: typeof ButtonSize = ButtonSize;
  protected readonly checkIcon: IconDefinition = faCheck;
  protected readonly closeIcon: IconDefinition = faClose;
}
