import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable, filter, map, mergeMap, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [AsyncPipe, TitleCasePipe],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.scss',
})
export class BreadcrumbsComponent implements OnInit {
  currentRoute: string = 'My Account';
  addedRoute?: Observable<string | null>;

  constructor(private router: Router, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.addedRoute = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      startWith(null),
      map(() => {
        return this.route;
      }),
      mergeMap((route) => route.children),
      switchMap((route) => route.url),
      map((urlSegments) => {
        this.route.queryParams.subscribe(console.log);
        const addTraining = this.router.url.split('/').at(-1);

        const url = urlSegments.join('/');

        let finalUrl = url && ' > ' + url.split('-').join(' ');
        finalUrl =
          addTraining === 'add-training'
            ? finalUrl + ` > ${addTraining}`
            : finalUrl;
        return finalUrl;
      })
    );
  }
}
