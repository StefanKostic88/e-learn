import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalService } from '../../../coreFeatures/services/modal/modal.service';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ButtonComponent } from '../../ui/button/button.component';
import { faClose, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ButtonSize, ButtonState } from '../../models/button.model';
import { Observable, Subscription } from 'rxjs';
import { ModalMessage } from '../../../coreFeatures/models/shared.models';

@Component({
  selector: 'app-modaltest',
  standalone: true,
  imports: [NgIf, AsyncPipe, ButtonComponent, NgFor],
  templateUrl: './modaltest.component.html',
  styleUrl: './modaltest.component.scss',
})
export class ModaltestComponent implements OnInit, OnDestroy {
  testa: Subscription[] = [];
  public readonly messageChunks: Observable<ModalMessage[]> =
    this.modalService.message;

  public readonly title = this.modalService.modalTitle;

  public readonly btnType: typeof ButtonState = ButtonState;
  public readonly btnSize: typeof ButtonSize = ButtonSize;

  public readonly icon: IconDefinition = faClose;
  protected isOpened = false;

  public toggleModal(): void {
    this.isOpened = !this.isOpened;
  }

  modalIsOpened = this.modalService.modalIsOpened;

  constructor(private modalService: ModalService) {}

  confirm(result: boolean) {
    this.modalService.respond(result);
  }

  ngOnInit(): void {
    this.testa.push(this.messageChunks.subscribe(console.log));
    console.log('asdasd');
    this.title.subscribe(console.log);
  }

  ngOnDestroy(): void {
    this.testa.forEach((el) => el.unsubscribe());
  }
}
