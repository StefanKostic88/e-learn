import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
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
import { Observable, Subscription } from 'rxjs';
import { AuthStoreService } from '../../services/auth/auth-store.service';

import { ChangePassword } from '../../models/user.model';
import { UiService } from '../../services/uiService/ui.service';
import { RouterService } from '../../services/router/router.service';
import { ToasterService } from '../../services/toaster/toaster.service';
import { GenerateInputsPipe } from '../../../shared/pipes/generate-inputs.pipe';
import { FormService } from '../../services/form/form.service';
import { ModalService } from '../../services/modal/modal.service';

const modules = [ReactiveFormsModule, FontAwesomeModule, CommonModule];
const components = [
  PageWraperComponent,
  InputComponent,
  ButtonComponent,
  ToasterComponent,
  SpinerComponent,
];
const pipes = [GenerateInputsPipe];

@Component({
  selector: 'app-change-password-page',
  standalone: true,
  imports: [modules, components, pipes],
  templateUrl: './change-password-page.component.html',
  styleUrl: './change-password-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePasswordPageComponent implements OnInit, OnDestroy {
  protected readonly btnSize: typeof ButtonSize = ButtonSize;
  protected lock: IconDefinition = faLock;
  protected readonly errorMsg$: Observable<string | null> =
    this.uiService.errorMessage;

  protected changesAreNotValid = true;

  protected passwordChangeForm!: FormGroup;

  private subscriptions: Subscription[] = [];
  private snapshot: Record<string, string> = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  constructor(
    private authStoreService: AuthStoreService,
    private uiService: UiService,
    private routerService: RouterService,
    private toasterService: ToasterService,
    private formService: FormService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.toasterService.resetToasterState();

    const timer = setTimeout(() => {
      this.uiService.loadingSpiner = false;
      clearTimeout(timer);
    }, 0);

    this.passwordChangeForm =
      this.formService.generatePasswordChangeFomrFields();

    this.subscriptions.push(
      this.passwordChangeForm.valueChanges.subscribe(
        (val: Record<string, string>) => {
          this.uiService.resetErrorMessage();
          this.detectPasswordFormChanges(val);
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  protected onSubmit(): void {
    const data: ChangePassword = this.passwordChangeForm.value;

    this.subscriptions.push(
      this.authStoreService.changeUserPassword(data).subscribe({
        next: () => {
          this.changesAreNotValid = true;
        },
      })
    );
  }

  protected navigateToMyAccount(): void {
    this.uiService.resetErrorAndSucessState();
    this.routerService.toMyAccount();
  }

  protected trackByIndex(index: number): number {
    return index;
  }

  public canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (this.changesAreNotValid) {
      return true;
    } else {
      return this.modalService.confirmLeavePage('Leave Change Password Page', [
        {
          chunk:
            'Are you sure you want to leave this page? Any unsaved changes will be lost.',
        },
      ]);
    }
  }

  private detectPasswordFormChanges(val: Record<string, string>): void {
    let changed = false;
    for (const key in val) {
      if (this.snapshot[key] !== val[key]) {
        changed = true;
        break;
      }
    }

    this.changesAreNotValid = changed ? false : true;
  }
}
