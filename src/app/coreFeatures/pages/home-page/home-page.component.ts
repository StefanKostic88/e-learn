import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ButtonComponent, SpinerComponent } from '../../../shared';
import { PageWraperComponent } from '../../../shared/components/page-wraper/page-wraper.component';
import { HomePageSignedComponent } from './home-page-signed/home-page-signed.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { map, Observable } from 'rxjs';
import { HomePageUnsignedComponent } from './home-page-unsigned/home-page-unsigned.component';
import { AuthStoreService } from '../../services/auth/auth-store.service';
import { UserStoreService } from '../../services/user/user-store.service';

const components = [
  ButtonComponent,
  PageWraperComponent,
  HomePageSignedComponent,
  HomePageUnsignedComponent,
  SpinerComponent,
];

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [components, NgIf, AsyncPipe],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {
  constructor(
    private authStoreService: AuthStoreService,
    private userStoreService: UserStoreService
  ) {}

  protected readonly isAuthorized$ = this.authStoreService.isAuthorized;

  protected pageTitle?: Observable<string>;

  private readonly currentUser$ = this.userStoreService.currentUser;

  ngOnInit(): void {
    this.pageTitle = this.genrateHomePageTitle();
  }

  private genrateHomePageTitle(): Observable<string> {
    return this.currentUser$.pipe(
      map((currentUser) => {
        return currentUser
          ? `Hi ${currentUser.firstName}`
          : `Let's start learning`;
      })
    );
  }
}
