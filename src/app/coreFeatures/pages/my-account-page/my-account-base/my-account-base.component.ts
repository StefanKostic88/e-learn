import { Component } from '@angular/core';
import {
  ButtonComponent,
  MyAccountListComponent,
  PageWraperComponent,
} from '../../../../shared';
import { ActivatedRoute, Router } from '@angular/router';

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
  constructor(private router: Router, private route: ActivatedRoute) {}

  public navigateToTrainings(): void {
    this.router.navigate(['trainings'], { relativeTo: this.route });
  }
}
