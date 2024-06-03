import { Component } from '@angular/core';
import { NewsLetterComponent } from './news-letter/news-letter.component';
import { SelectLanguageComponent } from './select-language/select-language.component';
import { IconsContainerComponent } from './icons-container/icons-container.component';
import { NavigationComponent } from '../../../shared';
import { NgFor } from '@angular/common';
import { LogoComponent } from '../../../shared';

const components = [
  NewsLetterComponent,
  SelectLanguageComponent,
  IconsContainerComponent,
  NavigationComponent,
  LogoComponent,
];

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [components, NgFor],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  linksData = [
    {
      NavigationTitle: 'Products',
      navigationList: [
        {
          path: '/features',
          linkName: 'Features',
        },
        {
          path: '/pricing',
          linkName: 'Pricing',
        },
      ],
    },
    {
      NavigationTitle: 'Resources',
      navigationList: [
        {
          path: '/blog',
          linkName: 'Blog',
        },
        {
          path: '/user-guide',
          linkName: 'Users Guide',
        },
        {
          path: '/webinars',
          linkName: 'Webinars',
        },
      ],
    },
    {
      NavigationTitle: 'Company',
      navigationList: [
        {
          path: '/about-us',
          linkName: 'About us',
        },
        {
          path: '/contact-us',
          linkName: 'Contact us',
        },
      ],
    },
  ];

  public trackByIndex(index: number): number {
    return index;
  }
}
