import { Component } from '@angular/core';
import { BoxComponent, ButtonComponent } from '../../../../shared';
import { NgFor } from '@angular/common';
import { boxItems, BoxItem } from '../../../constants/staticData';
import { ActivatedRoute, Router } from '@angular/router';

const components = [ButtonComponent, BoxComponent];
const modules = [NgFor];

@Component({
  selector: 'app-home-page-signed',
  standalone: true,
  imports: [components, modules],
  templateUrl: './home-page-signed.component.html',
  styleUrl: './home-page-signed.component.scss',
})
export class HomePageSignedComponent {
  protected readonly boxItems: BoxItem[] = boxItems.slice(0, 3);

  constructor(private router: Router, private route: ActivatedRoute) {}

  protected trackByIndex(index: number): number {
    return index;
  }

  protected goToWhatsNew(id: string) {
    this.router.navigate([`whats-new/${id}`]);
  }
  protected readMore() {
    this.router.navigate(['whats-new']);
  }
}
