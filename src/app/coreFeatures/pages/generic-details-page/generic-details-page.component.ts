import { Component, OnInit } from '@angular/core';
import { UiService } from '../../services/uiService/ui.service';
import {
  ButtonComponent,
  CustomImgComponent,
  PageWraperComponent,
} from '../../../shared';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogData, blogData } from '../../constants/staticData';
import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { ButtonSize } from '../../../shared/models/button.model';
import { map, Observable } from 'rxjs';

const components = [PageWraperComponent, ButtonComponent, CustomImgComponent];
const pipes = [DatePipe, AsyncPipe];
const modules = [NgIf];

@Component({
  selector: 'app-generic-details-page',
  standalone: true,
  imports: [components, pipes, modules],
  templateUrl: './generic-details-page.component.html',
  styleUrl: './generic-details-page.component.scss',
})
export class GenericDetailsPageComponent implements OnInit {
  protected readonly btnSize: typeof ButtonSize = ButtonSize;
  protected blogData$?: Observable<BlogData | undefined>;

  constructor(
    private uiService: UiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const timer = setTimeout(() => {
      this.uiService.loadingSpiner = false;
      clearTimeout(timer);
    }, 0);

    this.blogData$ = this.route.paramMap.pipe(
      map((data) => {
        const blogId = data.get('id');
        const blog = blogData.find((blog) => blog.id === blogId);
        return blog;
      })
    );

    // this.route.paramMap.subscribe((data) => {
    //   const blogId = data.get('id');
    //   const blog = blogData.find((blog) => blog.id === blogId);

    //   this.blogData = blog;
    // });
  }

  protected goBack() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }
}
