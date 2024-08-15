import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  BoxComponent,
  ButtonComponent,
  PageWraperComponent,
} from '../../../shared';
import { NgFor } from '@angular/common';

const components = [PageWraperComponent, BoxComponent, ButtonComponent];

@Component({
  selector: 'app-blog-page',
  standalone: true,
  imports: [components, NgFor],
  templateUrl: './blog-page.component.html',
  styleUrl: './blog-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogPageComponent {
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

  public trackByIndex(index: number): number {
    return index;
  }
}
