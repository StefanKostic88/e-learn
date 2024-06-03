import { Component, OnInit } from '@angular/core';
import { ButtonSize } from '../../../shared/models/button.model';
import { headerLinksList } from '../../constants/linksData';
import {
  IconDefinition,
  faEllipsis,
  faMoon,
} from '@fortawesome/free-solid-svg-icons';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import {
  ActivatedRoute,
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
import { Observable, filter, map, of } from 'rxjs';

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
})
export class HeaderComponent implements OnInit {
  public headerIcon: IconDefinition = faEllipsis;
  protected readonly buttonSize: typeof ButtonSize = ButtonSize;
  // public userHeaderData$?: Observable<UserHeaderData>;
  public userHeaderData$?: Observable<{
    accountData: {
      email: string;
      username: string;
      img: string;
    };
    isAuthorized: boolean;
  }>;
  public readonly linksList = headerLinksList;
  public readonly moonIcon: IconDefinition = faMoon;
  public readonly userIcon: IconDefinition = faCircleUser;

  public signInPage$?: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private router: Router // // private uiService: UiService, // private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userHeaderData$ = of({
      accountData: {
        email: 'testemail',
        username: 'sadasd',
        img: '../../../../assets/imgs/profile.jpg',
      },
      isAuthorized: false,
    });

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

  public navigateToJoinUsPage(): void {
    this.router.navigate(['/join-us']);
  }

  public navigateToSignInPage(): void {
    this.router.navigate(['/sign-in']);
  }

  public toggleAccountBox() {
    // this.uiService.toggleNavigationMenu();
  }
}
