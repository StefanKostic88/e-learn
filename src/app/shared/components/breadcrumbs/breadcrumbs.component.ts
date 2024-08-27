import {
  AsyncPipe,
  NgClass,
  NgFor,
  NgIf,
  TitleCasePipe,
} from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, startWith, Subscription } from 'rxjs';

interface Breadcrumb {
  label: string;
  url: string;
}

const modules = [AsyncPipe, TitleCasePipe, NgIf, NgClass, NgFor];

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [modules],
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.scss',
})
export class BreadcrumbsComponent implements OnInit {
  protected breadcrumbs: Breadcrumb[] = [];

  private subscriptions: Subscription[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.router.events
        .pipe(
          filter((event) => event instanceof NavigationEnd),
          startWith(null)
        )
        .subscribe(() => {
          this.breadcrumbs = this.buildBreadcrumbs(this.route.root);
        })
    );
  }

  protected navigateTo(url: string): void {
    this.router.navigateByUrl(url);
  }

  protected handleKeyUp(e: KeyboardEvent, url: string): void {
    if (e.key === 'Enter') {
      this.router.navigateByUrl(url);
    }
  }

  private buildBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: Breadcrumb[] = []
  ): Breadcrumb[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url
        .map((segment) => segment.path)
        .join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const label = child.snapshot.data['breadcrumb'];

      if (label && !breadcrumbs.some((crumb) => crumb.label === label)) {
        breadcrumbs.push({ label, url });
      }

      return this.buildBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }
}
