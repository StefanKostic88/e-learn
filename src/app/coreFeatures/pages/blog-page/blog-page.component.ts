import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  BoxComponent,
  ButtonComponent,
  PageWraperComponent,
  SpinerComponent,
} from '../../../shared';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { UiService } from '../../services/uiService/ui.service';

const components = [
  PageWraperComponent,
  BoxComponent,
  ButtonComponent,
  SpinerComponent,
];

@Component({
  selector: 'app-blog-page',
  standalone: true,
  imports: [components, NgFor, NgIf, AsyncPipe],
  templateUrl: './blog-page.component.html',
  styleUrl: './blog-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogPageComponent {
  public isLoading$ = this.uiService.loadingSpiner;

  public blogData = [
    {
      title: 'Blog',
      img: '../../../assets/imgs/box-image-1.jpg',
      readTime: 15,
      creationDate: new Date(),
      tag: 'Lorem, ipsum.',
    },
    {
      title: 'Blog',
      img: '../../../assets/imgs/box-image-1.jpg',
      readTime: 15,
      creationDate: new Date(),
      tag: 'Lorem, ipsum.',
    },
    {
      title: 'Blog',
      img: '../../../assets/imgs/box-image-1.jpg',
      readTime: 15,
      creationDate: new Date(),
      tag: 'Lorem, ipsum.',
    },
    {
      title: 'Blog',
      img: '../../../assets/imgs/box-image-1.jpg',
      readTime: 15,
      creationDate: new Date(),
      tag: 'Lorem, ipsum.',
    },
    {
      title: 'Blog',
      img: '../../../assets/imgs/box-image-1.jpg',
      readTime: 15,
      creationDate: new Date(),
      tag: 'Lorem, ipsum.',
    },
    {
      title: 'Blog',
      img: '../../../assets/imgs/box-image-1.jpg',
      readTime: 15,
      creationDate: new Date(),
      tag: 'Lorem, ipsum.',
    },
  ];

  constructor(private uiService: UiService) {}

  public trackByIndex(index: number): number {
    return index;
  }
}
