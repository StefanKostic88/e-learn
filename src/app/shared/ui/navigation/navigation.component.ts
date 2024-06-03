import { NgClass, NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgClass, NgFor],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  @Input() navigationTitle?: string;
  @Input() linksList?: { path: string; linkName: string; active?: boolean }[];
  @Input() isMainNav: boolean = false;
  @Input() accountBoxNav: boolean = false;

  trackByIndex(index: number) {
    return index;
  }
}
