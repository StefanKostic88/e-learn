import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  IconDefinition,
  faFacebook,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-icons-container',
  standalone: true,
  imports: [FontAwesomeModule, NgFor],
  templateUrl: './icons-container.component.html',
  styleUrl: './icons-container.component.scss',
})
export class IconsContainerComponent {
  iconData: IconDefinition[] = [faTwitter, faFacebook, faYoutube];
}
