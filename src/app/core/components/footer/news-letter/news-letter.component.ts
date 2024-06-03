import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { ButtonSize } from '../../../../shared/models/button.model';
import { ButtonComponent, InputComponent } from '../../../../shared';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const components = [ButtonComponent, InputComponent];
const modules = [ReactiveFormsModule, FontAwesomeModule];

@Component({
  selector: 'app-news-letter',
  standalone: true,
  imports: [components, modules],
  templateUrl: './news-letter.component.html',
  styleUrl: './news-letter.component.scss',
})
export class NewsLetterComponent {
  public faEnvelope = faEnvelope;
  readonly buttonSize: typeof ButtonSize = ButtonSize;
  newsletterForm: FormGroup = new FormGroup({
    newsLetterEmail: new FormControl('', [Validators.email]),
  });

  protected onSubmit() {
    console.log(this.newsletterForm);
  }
}
