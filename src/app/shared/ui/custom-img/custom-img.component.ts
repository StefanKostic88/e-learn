import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LoaderComponent } from '../loader/loader.component';

const components = [LoaderComponent];
const modules = [NgIf];

@Component({
  selector: 'app-custom-img',
  standalone: true,
  imports: [modules, components],
  templateUrl: './custom-img.component.html',
  styleUrl: './custom-img.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomImgComponent {
  @Input() public img?: string | ArrayBuffer | null;
}
