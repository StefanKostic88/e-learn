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
  readonly btnState: typeof ButtonState = ButtonState;
  readonly btnComponentSize: typeof ButtonSize = ButtonSize;

  @Input() content?: string;
  @Input() outlined?: boolean = true;
  @Input() btnType = this.btnState.PRIMARY;
  @Input() isInputBtn: boolean = false;
  @Input() btnClickHandler?: typeof Function;
  @Input() btnSize: ButtonSize = this.btnComponentSize.NORMAL;
  @Input() disabled: boolean = false;
}
