import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap, Observable, startWith, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  constructor(private router: Router) {}

  public toHomePage(): void {
    this.router.navigate(['/']);
  }
  public toMyAccount(): void {
    this.router.navigate(['/my-account']);
  }
  public toJoinUs(): void {
    this.router.navigate(['/join-us']);
  }
  public toTrainingsBack(route: ActivatedRoute) {
    this.router.navigate(['..'], { relativeTo: route });
  }

  public toTrainingsNext(route: ActivatedRoute) {
    this.router.navigate(['trainings'], { relativeTo: route });
  }

  public toAddTrainer(route: ActivatedRoute) {
    this.router.navigate(['add-training'], { relativeTo: route });
  }

  public toTrainerRegister(route: ActivatedRoute) {
    this.router.navigate(['trainer-register'], {
      relativeTo: route,
      state: {
        role: 'trainer',
      },
    });
  }
  public toStudentRegister(route: ActivatedRoute) {
    this.router.navigate(['student-register'], {
      relativeTo: route,
      state: {
        role: 'student',
      },
    });
  }

  public getCurrentRoute(route: ActivatedRoute): Observable<string | null> {
    return this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      startWith(null),
      map(() => {
        return route;
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
