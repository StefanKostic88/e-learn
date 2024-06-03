import { Component, Input } from '@angular/core';
import { ButtonComponent } from '../../ui/button/button.component';
import { CustomImgComponent } from '../../ui/custom-img/custom-img.component';

const components = [ButtonComponent, CustomImgComponent];

@Component({
  selector: 'app-join-us-box',
  standalone: true,
  imports: [components],
  templateUrl: './join-us-box.component.html',
  styleUrl: './join-us-box.component.scss',
})
export class JoinUsBoxComponent {
  @Input() title?: string;
  @Input() content?: string;
  @Input() img?: string;
  @Input() btnContent: string = 'Join Us';
  @Input() btnHandler?: () => void;

  public onClickHandler() {
    this.btnHandler && this.btnHandler();
  }
}
