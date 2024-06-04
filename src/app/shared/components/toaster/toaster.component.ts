import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  IconDefinition,
  faCheck,
  faClose,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-toaster',
  standalone: true,
  imports: [FontAwesomeModule, NgIf],
  templateUrl: './toaster.component.html',
  styleUrl: './toaster.component.scss',
})
export class ToasterComponent {
  @Input() toasterMessage: string = 'Traineing Added';
  @Input() public closeHandler?: () => void;

  public readonly closIcon: IconDefinition = faClose;
  public readonly checkIcon: IconDefinition = faCheck;

  // constructor(private authStoreService: AuthStoreService) {}

  public close() {
    // this.authStoreService.switchToMyaccount();
  }
}
