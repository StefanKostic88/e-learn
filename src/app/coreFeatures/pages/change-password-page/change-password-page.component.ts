import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  ButtonComponent,
  InputComponent,
  PageWraperComponent,
  SpinerComponent,
  ToasterComponent,
} from '../../../shared';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { ButtonSize } from '../../../shared/models/button.model';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { Observable, of } from 'rxjs';

const modules = [ReactiveFormsModule, FontAwesomeModule, CommonModule];
const components = [
  PageWraperComponent,
  InputComponent,
  ButtonComponent,
  ToasterComponent,
  SpinerComponent,
];

@Component({
  selector: 'app-change-password-page',
  standalone: true,
  imports: [modules, components],
  templateUrl: './change-password-page.component.html',
  styleUrl: './change-password-page.component.scss',
})
export class ChangePasswordPageComponent implements OnInit {
  public readonly btnSize: typeof ButtonSize = ButtonSize;
  public lock: IconDefinition = faLock;
  protected passwordChangeForm!: FormGroup;
  public disabled = true;

  public readonly errorMsg$: Observable<string | null> = of(null);

  public readonly spinner$: Observable<boolean> = of(false);

  public readonly sucessMessage$: Observable<boolean> = of(false);

  // public readonly errorMsg$: Observable<string | null> =
  //   this.authStoreService.errorMessage;

  // public readonly spinner$: Observable<boolean> =
  //   this.authStoreService.loadingSpiner;

  // public readonly sucessMessage$: Observable<boolean> =
  //   this.authStoreService.registrationSuccess;

  // constructor(private authStoreService: AuthStoreService) {}

  ngOnInit(): void {
    this.passwordChangeForm = new FormGroup({
      currentPassword: new FormControl(''),
      newPassword: new FormControl(''),
      confirmPassword: new FormControl(''),
    });

    this.generateInputs();
    this.passwordChangeForm.valueChanges.subscribe((val) => {
      const { currentPassword, newPassword, confirmPassword } = val;

      if (newPassword === confirmPassword && currentPassword) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    });
  }

  protected onSubmit() {
    // const data: ChangePassword = this.passwordChangeForm.value;
    // this.authStoreService.chnagUserPasswrod(data).subscribe({
    //   next: () => {
    //     this.passwordChangeForm.reset();
    //   },
    // });
    console.log(this.passwordChangeForm.value);
  }
  protected generateInputs() {
    return Object.entries(this.passwordChangeForm.controls).map((el) => {
      const name = (el[0] as string)
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/\b\w/g, (char) => char.toUpperCase());

      return {
        formControlName: el[0],
        labelName: name,
        inputType: 'password',
        placeholderText:
          name !== 'Confirm New Password'
            ? `Enter ${name}`
            : 'Confirm New Password',
      };
    });
  }

  public navigateToMyAccount() {
    // this.authStoreService.switchToMyaccount();
  }

  protected trackByIndex(index: number): number {
    return index;
  }
}
