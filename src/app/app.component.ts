import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { FooterComponent, HeaderComponent, UiService } from './coreFeatures';
import { Subscription, filter, take } from 'rxjs';
import { UserStoreService } from './coreFeatures/services/user/user-store.service';

const components = [FooterComponent, HeaderComponent];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [components, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  constructor(
    private uiService: UiService,
    private router: Router,
    private elementRef: ElementRef,
    private userStoreService: UserStoreService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe(() => window.scrollTo(0, 0))
    );

    this.uiService
      .getCurrentMode()
      .pipe(take(1))
      .subscribe({
        complete: () => console.log('closed'),
      });

    // this.userStoreService.logedInUser().subscribe();
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
