import { Component, Input } from '@angular/core';
import {
  ButtonComponent,
  CustomImgComponent,
  NavigationComponent,
} from '../../../shared';
import {
  IconDefinition,
  faArrowRightToBracket,
  faClose,
} from '@fortawesome/free-solid-svg-icons';
import { headerLinksList } from '../../constants/linksData';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ButtonSize } from '../../../shared/models/button.model';
import { UiService } from '../../services/uiService/ui.service';
import { HeaderDetails } from '../../models/user.model';
import { AuthStoreService } from '../../services/auth/auth-store.service';
import { UserStoreService } from '../../services/user/user-store.service';

const components = [CustomImgComponent, NavigationComponent, ButtonComponent];

@Component({
  selector: 'app-account-box',
  standalone: true,
  imports: [components, NgClass, NgIf, AsyncPipe, FontAwesomeModule],
  templateUrl: './account-box.component.html',
  styleUrl: './account-box.component.scss',
})
export class AccountBoxComponent {
  @Input() accountBoxData?: HeaderDetails;
  @Input() isAuthorized: boolean | null = false;

  public readonly isNavigationIsOpened$ = this.uiService.isNavigationIsOpened;

  public readonly linksList = headerLinksList;
  public readonly exitIcon: IconDefinition = faArrowRightToBracket;
  public readonly closeIcon: IconDefinition = faClose;
  public readonly btnSize: typeof ButtonSize = ButtonSize;

  // testImg = '../../../../assets/imgs/profile.jpg';

  constructor(
    private uiService: UiService,
    private authStoreService: AuthStoreService,
    private userStoreService: UserStoreService
  ) {}
  public closeSidebar(): void {
    this.uiService.closeNavigation();
    console.log('asdasd');
  }

  public logoutUser() {
    console.log('asdasd');
    this.authStoreService.logOut();
    this.userStoreService.removeCurrentUser();
  }
}
