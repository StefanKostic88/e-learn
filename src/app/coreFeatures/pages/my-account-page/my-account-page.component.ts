import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import { Observable, filter, map, mergeMap, startWith, switchMap } from 'rxjs';
import {
  BreadcrumbsComponent,
  ButtonComponent,
  MyAccountListComponent,
  PageWraperComponent,
  SpinerComponent,
} from '../../../shared';
import { AsyncPipe, NgIf } from '@angular/common';
import { UiService } from '../../services/uiService/ui.service';

const components = [
  PageWraperComponent,
  MyAccountListComponent,
  ButtonComponent,
  BreadcrumbsComponent,
  SpinerComponent,
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
  public currentPage?: string;
  public title$?: Observable<string | null>;
  public isLoading$ = this.uiService.loadingSpiner;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private uiService: UiService
  ) {}
  ngOnInit(): void {
    this.title$ = this.title$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      startWith(null),
      map(() => {
        return this.route;
      }),
      mergeMap((route) => route.children),
      switchMap((route) => route.url),
      map((urlSegments) => {
        const url = urlSegments.join('/');
        return this.generateTitle(url);
      })
    );
  }

  private generateTitle(url: string): null | string {
    if (!url) {
      return 'My Account';
    }

    switch (url) {
      case 'change-password':
        return null;
      case 'edit':
        return 'My Account';
      case 'add-trainer':
        return 'Add Trainer';
      default:
        // eslint-disable-next-line no-case-declarations
        const lastSegment = this.router.url.split('/').at(-1);
        switch (lastSegment) {
          case 'trainings':
            return 'Trainings';
          case 'add-training':
            return 'Add Passed Trainings';
          default:
            return null;
        }
    }
  }
}
