import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CustomImgComponent } from '../custom-img/custom-img.component';
import { DatePipe } from '@angular/common';

const components = [CustomImgComponent];

@Component({
  selector: 'app-box',
  standalone: true,
  imports: [components, DatePipe],
  templateUrl: './box.component.html',
  styleUrl: './box.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoxComponent {
  @Input() public title?: string;
  @Input() public creationDate?: Date;
  @Input() public img?: string;
  @Input() public readTime?: number;
  @Input() public tag?: string;
}
