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
  currentRoute?: Observable<string | null>;

  constructor(private router: Router, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.currentRoute = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      startWith(null),
      map(() => {
        return this.route;
      }),
      mergeMap((route) => route.children),
      switchMap((route) => route.url),
      map(() => {
        return this.transformCurrentUrl(this.router.url);
      })
    );
  }

  private transformCurrentUrl(url: string) {
    const currentPath = url.slice(1);
    const urlArray = currentPath.split('/');

    return urlArray.map((path) => path.split('-').join(' ')).join(' > ');
  }
}
