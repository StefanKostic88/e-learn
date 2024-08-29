import { NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UiService } from '../../../coreFeatures/services/uiService/ui.service';
import { NavigationLink } from '../../../coreFeatures/models/shared.models';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgClass, NgFor, NgIf],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
  @Input() public navigationTitle?: string;
  @Input() public linksList?: NavigationLink[];
  @Input() public isMainNav: boolean = false;
  @Input() public accountBoxNav: boolean = false;

  constructor(private uiService: UiService) {}

  protected trackByIndex(index: number) {
    return index;
  }
  public closeNavigation(): void {
    this.uiService.closeNavigation();
  }
}
