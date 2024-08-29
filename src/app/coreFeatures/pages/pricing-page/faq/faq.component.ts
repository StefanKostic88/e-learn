import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  IconDefinition,
  faAngleDown,
  faAngleUp,
} from '@fortawesome/free-solid-svg-icons';
import { FaqDataInterface } from '../../../constants/staticData';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [FontAwesomeModule, NgIf],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqComponent {
  public icon: IconDefinition = faAngleDown;
  @Input() faqData?: FaqDataInterface;

  public faqIsOpened = false;

  public toggleFaq(): void {
    this.faqIsOpened = !this.faqIsOpened;
    this.icon = this.icon === faAngleDown ? faAngleUp : faAngleDown;
  }

  public resetState() {
    this.faqIsOpened = false;
    this.icon = faAngleDown;
  }
  public handleOnKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      this.toggleFaq();
    }
    if (e.key === 'Tab') {
      this.resetState();
    }
  }
}
