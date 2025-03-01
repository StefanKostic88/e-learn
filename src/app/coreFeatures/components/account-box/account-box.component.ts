import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
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
import { Observable } from 'rxjs';
import { HeaderLinkList } from '../../models/shared.models';

const components = [CustomImgComponent, NavigationComponent, ButtonComponent];
const modules = [NgClass, NgIf, AsyncPipe, FontAwesomeModule];

@Component({
  selector: 'app-account-box',
  standalone: true,
  imports: [components, modules],
  templateUrl: './account-box.component.html',
  styleUrl: './account-box.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountBoxComponent {
  @Input() public accountBoxData?: HeaderDetails;
  @Input() public isAuthorized: boolean | null = false;

  public readonly isNavigationIsOpened$: Observable<boolean> =
    this.uiService.isNavigationIsOpened;

  public readonly linksList: HeaderLinkList[] = headerLinksList;
  public readonly exitIcon: IconDefinition = faArrowRightToBracket;
  public readonly closeIcon: IconDefinition = faClose;
  public readonly btnSize: typeof ButtonSize = ButtonSize;

  constructor(
    private uiService: UiService,
    private authStoreService: AuthStoreService,
    private userStoreService: UserStoreService
  ) {}
  public closeSidebar(): void {
    this.uiService.closeNavigation();
  }

  public logoutUser() {
    this.authStoreService.logOut();
    this.userStoreService.removeCurrentUser();
  }
}
