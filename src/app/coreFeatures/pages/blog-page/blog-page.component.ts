import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  BoxComponent,
  ButtonComponent,
  PageWraperComponent,
  SpinerComponent,
} from '../../../shared';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { UiService } from '../../services/uiService/ui.service';
import { BlogData, blogData } from '../../constants/staticData';

const components = [
  PageWraperComponent,
  BoxComponent,
  ButtonComponent,
  SpinerComponent,
];

const modules = [NgFor, NgIf, AsyncPipe];

@Component({
  selector: 'app-blog-page',
  standalone: true,
  imports: [components, modules],
  templateUrl: './blog-page.component.html',
  styleUrl: './blog-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogPageComponent implements OnInit {
  public blogData: BlogData[] = blogData;

  constructor(private uiService: UiService) {}

  ngOnInit(): void {
    const timer = setTimeout(() => {
      this.uiService.loadingSpiner = false;
      clearTimeout(timer);
    }, 0);
  }

  public trackByIndex(index: number): number {
    return index;
  }
}
