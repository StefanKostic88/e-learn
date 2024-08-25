import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-img',
  standalone: true,
  imports: [],
  templateUrl: './custom-img.component.html',
  styleUrl: './custom-img.component.scss',
})
export class CustomImgComponent {
  // @Input() public img?: string;
  @Input() public img?: string | ArrayBuffer | null;
}
