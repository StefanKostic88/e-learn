import { Component } from '@angular/core';
import { NewsLetterComponent } from './news-letter/news-letter.component';
import { SelectLanguageComponent } from './select-language/select-language.component';
import { IconsContainerComponent } from './icons-container/icons-container.component';
import { NavigationComponent } from '../../../shared';
import { NgFor } from '@angular/common';
import { LogoComponent } from '../../../shared';
import { footerLinksData } from '../../constants/linksData';

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
  linksData = footerLinksData;

  public trackByIndex(index: number): number {
    return index;
  }
}
