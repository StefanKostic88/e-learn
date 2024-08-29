import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ButtonSize, ButtonState } from '../../models/button.model';
import { ButtonDirective } from '../../directives/button/button.directive';

const directives = [ButtonDirective];

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [directives],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  protected readonly btnState: typeof ButtonState = ButtonState;
  protected readonly btnComponentSize: typeof ButtonSize = ButtonSize;

  @Input() public btnSize: ButtonSize = this.btnComponentSize.NORMAL;
  @Input() public content?: string;
  @Input() public outlined?: boolean = true;
  @Input() public btnType = this.btnState.PRIMARY;
  @Input() public isInputBtn: boolean = false;
  @Input() public disabled: boolean = false;
}
