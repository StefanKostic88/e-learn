import { Component, OnInit } from '@angular/core';
import { UiService } from '../../services/uiService/ui.service';
import {
  ButtonComponent,
  CustomImgComponent,
  PageWraperComponent,
} from '../../../shared';
import { ActivatedRoute, Router } from '@angular/router';
import {
  BlogData,
  blogData,
  BoxItem,
  boxItems,
} from '../../constants/staticData';
import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { ButtonSize } from '../../../shared/models/button.model';
import { map, Observable, switchMap } from 'rxjs';

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
  protected blogData$?: Observable<BlogData | BoxItem | undefined>;
  public typeOfItem?: 'blog' | 'whats-new';
  protected title: string = 'Blog Details';

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

    this.blogData$ = this.route.data.pipe(
      map(({ typeOfItem }) => typeOfItem),
      switchMap((typeOfItem) => {
        this.typeOfItem = typeOfItem;
        return this.route.paramMap.pipe(
          map((data) => {
            const dataId = data.get('id');

            if (typeOfItem === 'blog') {
              const blog = blogData.find((blog) => blog.id === dataId);
              return blog;
            }
            if (typeOfItem === 'whats-new') {
              const whatsNewArrticle = boxItems.find(
                (whatsNew) => whatsNew.id === dataId
              );
              this.title = 'Whats New Details';
              return whatsNewArrticle;
            }

            return undefined;
          })
        );
      })
    );
  }

  protected goBack() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }
}
