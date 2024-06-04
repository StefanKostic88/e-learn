import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent, HeaderComponent, UiService } from './coreFeatures';
import { take } from 'rxjs';

const components = [FooterComponent, HeaderComponent];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [components, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'e-learn-app';

  constructor(private uiService: UiService) {}

  ngOnInit(): void {
    this.uiService
      .getCurrentMode()
      .pipe(take(1))
      .subscribe({
        complete: () => console.log('closed'),
      });
  }
}
