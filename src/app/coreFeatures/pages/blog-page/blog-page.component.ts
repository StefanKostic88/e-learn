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
import { ActivatedRoute, Router } from '@angular/router';

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
  protected blogsDataMock: BlogData[] = blogData;
  protected blogData?: BlogData[];

  private sliceStart = 0;
  private sliceEnd = 6;

  constructor(
    private uiService: UiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.blogData = blogData.slice(0, 6);
    const timer = setTimeout(() => {
      this.uiService.loadingSpiner = false;
      clearTimeout(timer);
    }, 0);
  }

  protected trackByIndex(index: number): number {
    return index;
  }

  protected goToBlog(id: string) {
    this.router.navigate([`${id}`], { relativeTo: this.route });
  }
  protected loadMoreBlogs() {
    this.sliceStart = this.sliceStart + 6;
    this.sliceEnd = this.sliceEnd + 6;
    const newBlogs = blogData.slice(this.sliceStart, this.sliceEnd);
    newBlogs.length > 0 && this.blogData?.push(...newBlogs);
  }
}
