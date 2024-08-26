import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-switcher',
  standalone: true,
  imports: [],
  templateUrl: './switcher.component.html',
  styleUrl: './switcher.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwitcherComponent {
  @Input() public checked: boolean | null = false;
  @Input() public disabled: boolean = false;
}
