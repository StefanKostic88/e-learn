import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../shared';

@Component({
  selector: 'app-home-page-unsigned',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './home-page-unsigned.component.html',
  styleUrl: './home-page-unsigned.component.scss',
})
export class HomePageUnsignedComponent {}
