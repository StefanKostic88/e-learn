import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UiService } from '../../../coreFeatures';
import { NavigationComponent } from './navigation.component';
import { NavigationLink } from '../../../coreFeatures/models/shared.models';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { HomePageComponent } from '../../../coreFeatures/pages/home-page/home-page.component';
import { AboutUsPageComponent } from '../../../coreFeatures/pages/about-us-page/about-us-page.component';
import { NgZone } from '@angular/core';

const routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'about', component: AboutUsPageComponent },
];

const navLinks: NavigationLink[] = [
  {
    path: 'home',
    linkName: 'home',
  },
  {
    path: 'about',
    linkName: 'about',
    active: true,
  },
];

describe('NavigationComponent', () => {
  let uiServiceSpy: jasmine.SpyObj<UiService>;

  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let ngZone: NgZone;

  beforeEach(async () => {
    uiServiceSpy = jasmine.createSpyObj('UiService', ['closeNavigation']);

    await TestBed.configureTestingModule({
      imports: [NavigationComponent, RouterTestingModule.withRoutes(routes)],
      providers: [
        { provide: UiService, useValue: uiServiceSpy },
        { provide: Window, useValue: window },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    ngZone = TestBed.inject(NgZone);

    component.linksList = navLinks;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('Should display title if the navigationTitle is provided', () => {
    const navigationTitle = 'Test Title';
    component.navigationTitle = navigationTitle;
    fixture.detectChanges();
    const titleEl: HTMLHeadingElement = fixture.nativeElement.querySelector(
      '.app-navigation__header'
    );
    expect(titleEl.textContent).toContain(navigationTitle);
  });
  it('Should not display title if the navigationTitle is not provided', () => {
    const navigationTitle = undefined;
    component.navigationTitle = navigationTitle;
    fixture.detectChanges();
    const titleEl: HTMLHeadingElement = fixture.nativeElement.querySelector(
      '.app-navigation__header'
    );
    expect(titleEl).toBeNull();
  });

  it('Should render the links list', () => {
    const listItems = fixture.debugElement.queryAll(By.css('li'));
    expect(listItems.length).toBe(2);
    fixture.detectChanges();

    listItems.forEach((item, index) => {
      const link = item.query(By.css('a'));
      const routerLink = link.attributes['ng-reflect-router-link'];
      expect(link.nativeElement.textContent).toBe(
        component.linksList?.[index].linkName
      );

      expect(routerLink).toBeDefined();
      expect(routerLink).toBe(component.linksList?.[index].path as string);
      if (navLinks[index].active) {
        expect(link.attributes['routerLinkActive']).toBe('active');
      }
    });
  });

  it('Should call closeNavigation() and this.uiService.closeNavigation() on link click', () => {
    spyOn(component, 'closeNavigation').and.callThrough();
    const listItems = fixture.debugElement.queryAll(By.css('li'));
    const firstLink = listItems[0].query(By.css('a'));
    if (firstLink) {
      ngZone.run(() => {
        const event = new MouseEvent('click', { button: 0 });
        firstLink?.triggerEventHandler('click', event);
        expect(component.closeNavigation).toHaveBeenCalled();
        expect(uiServiceSpy.closeNavigation).toHaveBeenCalled();
      });
    }
  });
});
