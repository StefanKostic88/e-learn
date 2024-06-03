import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '../../../shared';
import { PageWraperComponent } from '../../../shared/components/page-wraper/page-wraper.component';
import { HomePageSignedComponent } from './home-page-signed/home-page-signed.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { Observable, of } from 'rxjs';
import { HomePageUnsignedComponent } from './home-page-unsigned/home-page-unsigned.component';

const components = [
  ButtonComponent,
  PageWraperComponent,
  HomePageSignedComponent,
  HomePageUnsignedComponent,
];

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [components, NgIf, AsyncPipe],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  constructor() {} // private userService: UserService // private authStoreService: AuthStoreService,
  // public readonly currentUser$ = this.userService.currentUser;
  public readonly currentUser$ = of({ firstName: 'Stefan' });
  // ' of({ firstName: 'Stefan' });'
  // public readonly isAuthorized$ = this.authStoreService.isAuthorized;
  public readonly isAuthorized$ = of(false);
  public pageTitle?: Observable<string>;

  ngOnInit(): void {
    // this.pageTitle = this.currentUser$.pipe(
    //   map((currentUser) => {
    //     return currentUser
    //       ? `Hi ${currentUser.firstName}`
    //       : `Let's start learning`;
    //   })
    // );
    this.pageTitle = of(`Let's start learning`);
  }
}
