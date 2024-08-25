import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import {
  BreadcrumbsComponent,
  ButtonComponent,
  MyAccountListComponent,
  PageWraperComponent,
  SpinerComponent,
  ToasterComponent,
} from '../../../shared';
import { AsyncPipe, NgIf } from '@angular/common';

import { RouterService } from '../../services/router/router.service';
import { ModaltestComponent } from '../../../shared/components/modaltest/modaltest.component';

const components = [
  PageWraperComponent,
  MyAccountListComponent,
  ButtonComponent,
  BreadcrumbsComponent,
  SpinerComponent,
  ToasterComponent,
  ModaltestComponent,
];

const pipes = [AsyncPipe];
const modules = [RouterModule, NgIf];

@Component({
  selector: 'app-my-account-page',
  standalone: true,
  imports: [components, pipes, modules],
  templateUrl: './my-account-page.component.html',
  styleUrl: './my-account-page.component.scss',
})
export class MyAccountPageComponent implements OnInit {
  protected title$?: Observable<string | null>;

  constructor(
    private route: ActivatedRoute,
    private routerService: RouterService
  ) {}
  ngOnInit(): void {
    this.title$ = this.routerService.getCurrentRoute(this.route);
  }
}
