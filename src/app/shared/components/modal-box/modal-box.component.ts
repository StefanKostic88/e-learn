import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition, faClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modal-box',
  standalone: true,
  imports: [NgFor, NgIf, FontAwesomeModule],
  templateUrl: './modal-box.component.html',
  styleUrl: './modal-box.component.scss',
})
export class ModalBoxComponent {
  @Input() messageChunks?: {
    chunk: string;
  }[];
  public readonly icon: IconDefinition = faClose;
  protected isOpened = false;

  public toggleModal(): void {
    this.isOpened = !this.isOpened;
  }
}
