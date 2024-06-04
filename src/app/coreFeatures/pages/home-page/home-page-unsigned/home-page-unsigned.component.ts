import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../shared';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page-unsigned',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './home-page-unsigned.component.html',
  styleUrl: './home-page-unsigned.component.scss',
})
export class HomePageUnsignedComponent {
  constructor(private router: Router) {}

  public navigateToJoinUs(): void {
    this.router.navigate(['/join-us']);
  }
}
