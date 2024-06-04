import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';
import {
  BreadcrumbsComponent,
  ButtonComponent,
  MyAccountListComponent,
  PageWraperComponent,
} from '../../../shared';
import { AsyncPipe } from '@angular/common';

const components = [
  PageWraperComponent,
  MyAccountListComponent,
  ButtonComponent,
  BreadcrumbsComponent,
];

const pipes = [AsyncPipe];
const modules = [RouterModule];

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
  constructor(private router: Router, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.title$ = of('Test Title');
    //   this.title$ = this.router.events.pipe(
    //     filter((event) => event instanceof NavigationEnd),
    //     startWith(null),
    //     map(() => {
    //       return this.route;
    //     }),
    //     mergeMap((route) => route.children),
    //     switchMap((route) => route.url),
    //     map((urlSegments) => {
    //       const url = urlSegments.join('/');
    //       console.log(this.router.url.split('/').at(-1) === 'add-training');
    //       if (!url) {
    //         return 'My Account';
    //       } else if (url && url === 'change-password') {
    //         return null;
    //       } else if (url && url === 'edit') {
    //         return 'My Account';
    //       } else if (url && this.router.url.split('/').at(-1) === 'trainings') {
    //         return 'Trainings';
    //       } else if (
    //         url &&
    //         this.router.url.split('/').at(-1) === 'add-training'
    //       ) {
    //         return 'Add Passed Trainings';
    //       } else if (url && url === 'add-trainer') {
    //         return 'Add Trainer';
    //       } else {
    //         return null;
    //       }
    //     })
    //   );
  }
}
