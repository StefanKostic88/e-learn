import { AsyncPipe, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  IconDefinition,
  faCheck,
  faClose,
} from '@fortawesome/free-solid-svg-icons';
import { ToasterService } from '../../../coreFeatures/services/toaster/toaster.service';

@Component({
  selector: 'app-toaster',
  standalone: true,
  imports: [FontAwesomeModule, NgIf, AsyncPipe],
  templateUrl: './toaster.component.html',
  styleUrl: './toaster.component.scss',
})
export class ToasterComponent {
  @Input() toasterMessage: string = 'Traineing Added';
  @Input() public closeHandler?: () => void;

  protected toasterState$ = this.toasterService.toasterState;

  public readonly closIcon: IconDefinition = faClose;
  public readonly checkIcon: IconDefinition = faCheck;

  constructor(private toasterService: ToasterService) {}

  public close() {
    // this.authStoreService.switchToMyaccount();
    this.toasterService.resetToasterState();
  }
}
