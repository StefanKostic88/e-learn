import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
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
import { Observable, of, Subscription } from 'rxjs';
import { AuthStoreService } from '../../services/auth/auth-store.service';
import { ActivatedRoute } from '@angular/router';
import { ChangePassword } from '../../models/user.model';
import { UiService } from '../../services/uiService/ui.service';
import { RouterService } from '../../services/router/router.service';

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
export class ChangePasswordPageComponent implements OnInit, OnDestroy {
  private subscriptions?: Subscription[];
  public readonly btnSize: typeof ButtonSize = ButtonSize;
  public lock: IconDefinition = faLock;
  protected passwordChangeForm!: FormGroup;
  public disabled = true;

  public readonly errorMsg$: Observable<string | null> =
    this.uiService.errorMessage;

  public readonly spinner$: Observable<boolean> = this.uiService.loadingSpiner;

  public readonly sucessMessage$: Observable<boolean> =
    this.uiService.actionSuccess;

  public changesAreNotValid = true;

  snapshot: Record<string, string> = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  constructor(
    private authStoreService: AuthStoreService,
    private uiService: UiService,
    private routerService: RouterService
  ) {}

  ngOnInit(): void {
    const timer = setTimeout(() => {
      this.uiService.loadingSpiner = false;
      clearTimeout(timer);
    }, 300);

    this.passwordChangeForm = new FormGroup({
      currentPassword: new FormControl(''),
      newPassword: new FormControl(''),
      confirmPassword: new FormControl(''),
    });

    this.generateInputs();
    this.passwordChangeForm.valueChanges.subscribe((val) => {
      let changed = false;
      for (const key in val) {
        if (this.snapshot[key] !== val[key]) {
          changed = true;
          break;
        }
      }

      if (changed) {
        this.changesAreNotValid = false;
        console.log('Changes detected');
      } else {
        this.changesAreNotValid = true;
      }

      const { currentPassword, newPassword, confirmPassword } = val;

      if (newPassword === confirmPassword && currentPassword) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions?.forEach((sub) => sub.unsubscribe());
  }

  protected onSubmit() {
    const data: ChangePassword = this.passwordChangeForm.value;

    const sub = this.authStoreService.changeUserPassword(data).subscribe({
      next: (data) => {
        console.log(data);
        this.passwordChangeForm.reset();
      },
    });

    this.subscriptions?.push(sub);
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
    this.routerService.toMyAccount();
  }

  protected trackByIndex(index: number): number {
    return index;
  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (this.changesAreNotValid) {
      console.log('asdsd');
      return true;
    } else {
      return confirm(
        'Are you sure you want to leave this page? Any unsaved changes will be lost.'
      );
    }
  }
}
