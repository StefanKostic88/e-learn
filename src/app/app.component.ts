import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { FooterComponent, HeaderComponent, UiService } from './coreFeatures';
import { Subscription, filter, take, tap } from 'rxjs';
import { UserStoreService } from './coreFeatures/services/user/user-store.service';
import { NgIf } from '@angular/common';

const components = [FooterComponent, HeaderComponent];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [components, RouterOutlet, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  appLoading = true;

  constructor(
    private uiService: UiService,
    private router: Router,
    private elementRef: ElementRef,
    private userStoreService: UserStoreService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.router.events
        .pipe(
          filter((event) => event instanceof NavigationEnd),
          tap(() => {
            console.log('Reaload');
          })
        )
        .subscribe(() => window.scrollTo(0, 0))
    );

    this.uiService
      .getCurrentMode()
      .pipe(take(1))
      .subscribe({
        complete: () => console.log('closed'),
      });

    // this.userStoreService.logedInUser().subscribe();

    this.renderer.listen('window', 'load', () => {
      console.log('LOADING DONE');
      this.appLoading = false;
      const test = document.querySelector('.app-spiner');
      test?.classList.add('hide');
    });
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
