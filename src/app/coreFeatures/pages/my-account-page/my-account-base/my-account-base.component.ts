import { Component } from '@angular/core';
import {
  ButtonComponent,
  MyAccountListComponent,
  PageWraperComponent,
} from '../../../../shared';
import { ActivatedRoute } from '@angular/router';
import { RouterService } from '../../../services/router/router.service';

const components = [
  PageWraperComponent,
  ButtonComponent,
  MyAccountListComponent,
];

@Component({
  selector: 'app-my-account-base',
  standalone: true,
  imports: [components],
  templateUrl: './my-account-base.component.html',
  styleUrl: './my-account-base.component.scss',
})
export class MyAccountBaseComponent {
  constructor(
    private route: ActivatedRoute,
    private routerService: RouterService
  ) {}

  public navigateToTrainings(): void {
    this.routerService.toTrainingsNext(this.route);
  }
}
