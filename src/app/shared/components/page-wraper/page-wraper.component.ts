import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-wraper',
  standalone: true,
  imports: [NgIf],
  templateUrl: './page-wraper.component.html',
  styleUrl: './page-wraper.component.scss',
})
export class PageWraperComponent {
  @Input() public pageTitle?: string | null;

  constructor() {}
}
