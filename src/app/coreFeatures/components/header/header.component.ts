import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ButtonSize } from '../../../shared/models/button.model';
import { headerLinksList } from '../../constants/linksData';
import {
  IconDefinition,
  faEllipsis,
  faMoon,
} from '@fortawesome/free-solid-svg-icons';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import {
  ButtonComponent,
  CustomImgComponent,
  LogoComponent,
  NavigationComponent,
  SwitcherComponent,
} from '../../../shared';
import { AccountBoxComponent } from '../account-box/account-box.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { Observable, filter, map } from 'rxjs';
import { UiService } from '../../services/uiService/ui.service';

import { UserStoreService } from '../../services/user/user-store.service';
import { HeaderData } from '../../models/user.model';

const components = [
  NavigationComponent,
  AccountBoxComponent,
  LogoComponent,
  SwitcherComponent,
  ButtonComponent,
  CustomImgComponent,
];

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    components,
    FontAwesomeModule,
    CommonModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  public headerIcon: IconDefinition = faEllipsis;
  protected readonly buttonSize: typeof ButtonSize = ButtonSize;

  @ViewChild('header') headerEl?: ElementRef;
  @ViewChild(AccountBoxComponent) accountBoxComponent?: AccountBoxComponent;

  public userHeaderData$?: Observable<HeaderData>;
  public readonly linksList = headerLinksList;
  public readonly moonIcon: IconDefinition = faMoon;
  public readonly userIcon: IconDefinition = faCircleUser;

  public signInPage$?: Observable<boolean>;
  public darkMode$ = this.uiService.darkMode;

  constructor(
    private router: Router,
    private uiService: UiService,
    private userStoreService: UserStoreService
  ) {}

  ngOnInit(): void {
    this.userHeaderData$ = this.userStoreService.getUserHeaderData();

    this.signInPage$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((data) => (data as NavigationEnd).urlAfterRedirects),

      map(
        (url) =>
          url === '/join-us' ||
          url === '/sign-in' ||
          url === '/join-us/trainer-register' ||
          url === '/join-us/student-register'
      )
    );
  }

  protected navigateToJoinUsPage(): void {
    this.router.navigate(['/join-us']);
  }

  protected navigateToSignInPage(): void {
    this.router.navigate(['/sign-in']);
  }

  protected toggleAccountBox() {
    this.uiService.toggleNavigationMenu();
  }
  protected closeSideBar(): void {
    this.uiService.closeNavigation();
  }

  protected handleToggleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      this.toggleAccountBox();
    }
  }

  protected toggleDarkMode() {
    this.uiService.darkModeToggler();
    this.uiService.applyDarkMode();
  }

  @HostListener('document:click', ['$event.target']) onClick(
    targetElement: HTMLElement
  ) {
    const clickedInside = this.headerEl?.nativeElement?.contains(targetElement);
    if (!clickedInside) {
      this.accountBoxComponent?.closeSidebar();
    }
  }
}
