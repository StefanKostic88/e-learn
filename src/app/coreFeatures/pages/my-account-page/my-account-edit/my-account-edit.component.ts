import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ButtonSize,
  ButtonState,
} from '../../../../shared/models/button.model';
import { Observable, Subscription, tap } from 'rxjs';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Data } from '@angular/router';
import {
  ButtonComponent,
  CustomImgComponent,
  DropDownMenuComponent,
  InputComponent,
  ModalBoxComponent,
  SwitcherComponent,
} from '../../../../shared';
import { CommonModule } from '@angular/common';
import { specializations } from '../../../constants/dictionary';

import { AuthStoreService } from '../../../services/auth/auth-store.service';

import { RouterService } from '../../../services/router/router.service';
import { FormService } from '../../../services/form/form.service';
import { EditFormInput } from '../../../models/shared.models';
import { ToasterService } from '../../../services/toaster/toaster.service';

const components = [
  CustomImgComponent,
  ButtonComponent,
  InputComponent,
  DropDownMenuComponent,
  SwitcherComponent,
  ModalBoxComponent,
];

const modules = [ReactiveFormsModule, CommonModule];

@Component({
  selector: 'app-my-account-edit',
  standalone: true,
  imports: [modules, components],
  templateUrl: './my-account-edit.component.html',
  styleUrl: './my-account-edit.component.scss',
})
export class MyAccountEditComponent implements OnInit, OnDestroy {
  public userEditForm!: FormGroup;

  protected img: string = '../../../assets/imgs/no-user-img.jpg';
  protected readonly btnState: typeof ButtonState = ButtonState;
  protected readonly btnSize: typeof ButtonSize = ButtonSize;
  protected changesAreNotValid = true;
  protected readonly allSpecializations = specializations;

  protected userSpecialization?: string;
  protected role?: string;

  private subscriptions: Subscription[] = [];
  protected snapshot?: { [props: string]: string };

  protected inputsArr?: EditFormInput[];

  constructor(
    private routerService: RouterService,
    private route: ActivatedRoute,
    private authStoreService: AuthStoreService,
    private formService: FormService,
    private toasterService: ToasterService
  ) {}

  ngOnInit(): void {
    this.toasterService.resetToasterState();
    this.userEditForm = this.formService.generateEditFormFields();

    this.subscriptions.push(
      this.generateEditUserInputsWithValues().subscribe()
    );

    this.subscriptions.push(
      this.userEditForm.valueChanges.subscribe({
        next: (val) => {
          this.detectEditFormChanges(val);
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  protected onSubmit() {
    const data = this.userEditForm.value;
    if (!this.changesAreNotValid) {
      this.subscriptions.push(
        this.authStoreService.editCurrentUser(data).subscribe({
          next: () => {
            this.changesAreNotValid = true;
          },
        })
      );
    }
  }

  protected navigateBack(): void {
    this.routerService.toMyAccount();
  }

  private detectEditFormChanges(val: Record<string, string>): void {
    let changed = false;
    for (const key in val) {
      if (this.snapshot?.[key] !== val[key]) {
        changed = true;
        break;
      }
    }

    this.changesAreNotValid = changed ? false : true;
  }

  private generateEditUserInputsWithValues(): Observable<Data> {
    return this.route.data.pipe(
      tap(({ user }) => {
        this.userSpecialization = user.specialization;
        this.inputsArr = user.userInputsFinal;
        this.role = user.role;
        const formControls: { [prop: string]: AbstractControl } = {};
        const inputValues = this.inputsArr?.map((el) => ({
          formControlName: el.formControlName,
          value: el.value ? el.value : '',
        }));

        inputValues?.forEach((el) => {
          formControls[el.formControlName] = new FormControl(el.value);
        });
        if (this.userSpecialization) {
          formControls['specialization'] = new FormControl(
            this.userSpecialization
          );
        }

        this.userEditForm = new FormGroup(formControls);
        this.snapshot = this.userEditForm.value;
      })
    );
  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (this.changesAreNotValid) {
      return true;
    } else {
      return confirm(
        'Are you sure you want to leave this page? Any unsaved changes will be lost.'
      );
    }
  }
}
