import { Component, OnInit } from '@angular/core';
import { ButtonComponent, SpinerComponent } from '../../../shared';
import { PageWraperComponent } from '../../../shared/components/page-wraper/page-wraper.component';
import { HomePageSignedComponent } from './home-page-signed/home-page-signed.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { map, Observable } from 'rxjs';
import { HomePageUnsignedComponent } from './home-page-unsigned/home-page-unsigned.component';
import { AuthStoreService } from '../../services/auth/auth-store.service';
import { UserStoreService } from '../../services/user/user-store.service';
import { ActivatedRoute } from '@angular/router';
import { UiService } from '../../services/uiService/ui.service';

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
})
export class HomePageComponent implements OnInit {
  constructor(
    private authStoreService: AuthStoreService,
    private userStoreService: UserStoreService,
    private uiService: UiService,
    private route: ActivatedRoute
  ) {}
  public readonly currentUser$ = this.userStoreService.currentUser;
  public readonly isAuthorized$ = this.authStoreService.isAuthorized;
  public readonly isLoading$ = this.uiService.loadingSpiner;

  public pageTitle?: Observable<string>;

  ngOnInit(): void {
    this.pageTitle = this.currentUser$.pipe(
      map((currentUser) => {
        return currentUser
          ? `Hi ${currentUser.firstName}`
          : `Let's start learning`;
      })
    );
  }
}
