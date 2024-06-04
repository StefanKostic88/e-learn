import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-switcher',
  standalone: true,
  imports: [],
  templateUrl: './switcher.component.html',
  styleUrl: './switcher.component.scss',
})
export class SwitcherComponent {
  @Input() checked: boolean | null = false;
  @Input() disabled: boolean = false;
}
