import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  public toTrainings(route: ActivatedRoute) {
    this.router.navigate(['..'], { relativeTo: route });
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
}
