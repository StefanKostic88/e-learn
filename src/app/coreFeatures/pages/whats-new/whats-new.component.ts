import { Component, OnInit } from '@angular/core';
import { UiService } from '../../services/uiService/ui.service';
import {
  BoxComponent,
  ButtonComponent,
  PageWraperComponent,
} from '../../../shared';
import { NgFor, NgIf } from '@angular/common';
import { boxItems, BoxItem } from '../../constants/staticData';
import { ActivatedRoute, Router } from '@angular/router';

const components = [ButtonComponent, PageWraperComponent, BoxComponent];
const modules = [NgFor, NgIf];

@Component({
  selector: 'app-whats-new',
  standalone: true,
  imports: [components, modules],
  templateUrl: './whats-new.component.html',
  styleUrl: './whats-new.component.scss',
})
export class WhatsNewComponent implements OnInit {
  protected whatsNewMockData: BoxItem[] = boxItems;
  protected whatsNewData?: BoxItem[];
  private sliceStart = 0;
  private sliceEnd = 3;

  constructor(
    private uiService: UiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.whatsNewData = this.whatsNewMockData.slice(0, 3);

    const timer = setTimeout(() => {
      this.uiService.loadingSpiner = false;
      clearTimeout(timer);
    }, 0);
  }

  protected goToBlog() {}

  protected trackByIndex(index: number) {
    return index;
  }

  protected loadMoreWhatsNew() {
    this.sliceStart = this.sliceStart + 3;
    this.sliceEnd = this.sliceEnd + 3;
    const newBlogs = boxItems.slice(this.sliceStart, this.sliceEnd);
    newBlogs.length > 0 && this.whatsNewData?.push(...newBlogs);
  }

  protected goToWhatsNew(id: string) {
    this.router.navigate([`${id}`], { relativeTo: this.route });
  }
}
