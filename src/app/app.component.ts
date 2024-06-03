import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent, HeaderComponent } from './core';

const components = [FooterComponent, HeaderComponent];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [components, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'e-learn-app';
}
