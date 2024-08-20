import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../shared';
import { RouterService } from '../../../services/router/router.service';

@Component({
  selector: 'app-home-page-unsigned',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './home-page-unsigned.component.html',
  styleUrl: './home-page-unsigned.component.scss',
})
export class HomePageUnsignedComponent {
  constructor(private routerService: RouterService) {}

  public navigateToJoinUs(): void {
    this.routerService.toJoinUs();
  }
}
