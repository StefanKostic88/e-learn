import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-select-language',
  standalone: true,
  imports: [FontAwesomeModule, ReactiveFormsModule],
  templateUrl: './select-language.component.html',
  styleUrl: './select-language.component.scss',
})
export class SelectLanguageComponent implements OnInit, OnDestroy {
  protected readonly faChevronDown = faChevronDown;
  private subscriptions: Subscription[] = [];
  selectLanguageForm!: FormGroup;

  ngOnInit(): void {
    this.selectLanguageForm = new FormGroup({
      language: new FormControl('english'),
    });

    const languageSub = this.selectLanguageForm
      .get('language')
      ?.valueChanges.subscribe((language) => {
        console.log(language);
      });

    languageSub && this.subscriptions.push(languageSub);
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
