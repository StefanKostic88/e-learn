import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './core';

const components = [FooterComponent];

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
