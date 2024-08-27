import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition, faClose } from '@fortawesome/free-solid-svg-icons';
import { ModalService } from '../../../coreFeatures/services/modal/modal.service';
import { ButtonSize, ButtonState } from '../../models/button.model';
import { Observable, Subscription } from 'rxjs';
import { ModalMessage } from '../../../coreFeatures/models/shared.models';
import { ButtonComponent } from '../../ui/button/button.component';

@Component({
  selector: 'app-modal-box',
  standalone: true,
  imports: [NgFor, NgIf, FontAwesomeModule, AsyncPipe, ButtonComponent],
  templateUrl: './modal-box.component.html',
  styleUrl: './modal-box.component.scss',
})
export class ModalBoxComponent {
  subsciptions: Subscription[] = [];
  protected readonly modalIsOpened$ = this.modalService.modalIsOpened;

  protected readonly messageChunks: Observable<ModalMessage[]> =
    this.modalService.message;

  protected readonly title = this.modalService.modalTitle;

  protected readonly btnType: typeof ButtonState = ButtonState;
  protected readonly btnSize: typeof ButtonSize = ButtonSize;

  protected readonly icon: IconDefinition = faClose;

  constructor(private modalService: ModalService) {}

  confirm(result: boolean) {
    this.modalService.respond(result);
  }
}
