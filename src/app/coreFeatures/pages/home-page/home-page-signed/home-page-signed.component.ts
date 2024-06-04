import { Component } from '@angular/core';
import { BoxItem } from '../../../constants/linksData';
import { BoxComponent, ButtonComponent } from '../../../../shared';
import { NgFor } from '@angular/common';

const components = [ButtonComponent, BoxComponent];

@Component({
  selector: 'app-home-page-signed',
  standalone: true,
  imports: [components, NgFor],
  templateUrl: './home-page-signed.component.html',
  styleUrl: './home-page-signed.component.scss',
})
export class HomePageSignedComponent {
  public boxItems: BoxItem[] = [
    {
      title: 'Revolutionizing Education: How AI is Transforming E-Learning',
      creationDate: new Date(),
      img: '../../../assets/imgs/box-image-1.jpg',
      readTime: 5,
      tag: 'Elearning Transformation',
    },
    {
      title:
        'Mastering New Frontiers: The Rise of Virtual Reality in Online Education',
      creationDate: new Date(),
      img: '../../../assets/imgs/box-image-2.jpg',
      readTime: 10,
      tag: 'Artificial Intelligence',
    },
    {
      title:
        'Unlocking Potential: Personalized Learning in the Digital Classroom',
      creationDate: new Date(),
      img: '../../../assets/imgs/box-image-3.jpg',
      readTime: 15,
      tag: 'Digital Learning',
    },
  ];
}
