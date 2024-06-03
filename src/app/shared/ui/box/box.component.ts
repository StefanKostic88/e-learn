import { Component, Input } from '@angular/core';
import { CustomImgComponent } from '../custom-img/custom-img.component';
import { DatePipe } from '@angular/common';

const components = [CustomImgComponent];

@Component({
  selector: 'app-box',
  standalone: true,
  imports: [components, DatePipe],
  templateUrl: './box.component.html',
  styleUrl: './box.component.scss',
})
export class BoxComponent {
  @Input() title: string = 'Lorem ipsum dolor sit amet consectetur.';
  @Input() creationDate: Date = new Date();
  @Input() img: string = '../../../assets/imgs/box-image-1.jpg';
  @Input() readTime: number = 5;
  @Input() tag: string = 'Lorem, ipsum.';
}
