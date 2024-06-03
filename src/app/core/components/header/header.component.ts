import { Component, OnInit } from '@angular/core';
import { ButtonSize } from '../../../shared/models/button.model';
import { headerLinksList } from '../../constants/linksData';
import {
  IconDefinition,
  faEllipsis,
  faMoon,
} from '@fortawesome/free-solid-svg-icons';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import { Router, RouterLink } from '@angular/router';
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
import { Observable, of } from 'rxjs';

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
  imports: [components, FontAwesomeModule, CommonModule, RouterLink],
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

  activeRoute = '';

  constructor(
    private router: Router // // private uiService: UiService, // private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userHeaderData$ = of({
      accountData: {
        email: 'testemail',
        username: 'sadasd',
        img: 'asdasd',
      },
      isAuthorized: true,
    });
    console.log('Navigation');
  }

  public navigateToJoinUsPage(): void {
    this.router.navigate(['/join-us']);
  }

  public navigateToSignInPage(): void {
    this.router.navigate(['/sign-in']);
  }

  public navigateToMyAccountPage(): void {
    this.router.navigate(['/my-account']);
  }

  public toggleAccountBox() {
    // this.uiService.toggleNavigationMenu();
  }
  public handleKeydown(event: KeyboardEvent, callback: () => void): void {
    // Check for Enter or Space key
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault(); // Prevent default action for space key to avoid page scroll
      callback();
    }
  }
}
