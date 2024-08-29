import { Component } from '@angular/core';
import { BoxComponent, ButtonComponent } from '../../../../shared';
import { NgFor } from '@angular/common';
import { boxItems, BoxItem } from '../../../constants/staticData';

const components = [ButtonComponent, BoxComponent];
const modules = [NgFor];

@Component({
  selector: 'app-home-page-signed',
  standalone: true,
  imports: [components, modules],
  templateUrl: './home-page-signed.component.html',
  styleUrl: './home-page-signed.component.scss',
})
export class HomePageSignedComponent {
  protected readonly boxItems: BoxItem[] = boxItems;

  protected trackByIndex(index: number): number {
    return index;
  }
}
