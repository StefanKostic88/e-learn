import { Component, OnInit } from '@angular/core';
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
import { ActivatedRoute, Router } from '@angular/router';
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
import { UserStoreService } from '../../../services/user/user-store.service';
import { AuthStoreService } from '../../../services/auth/auth-store.service';
import { UiService } from '../../../services/uiService/ui.service';

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
export class MyAccountEditComponent implements OnInit {
  public userEditForm!: FormGroup;
  public img: string = '../../../assets/imgs/no-user-img.jpg';
  public readonly btnState: typeof ButtonState = ButtonState;
  public readonly btnSize: typeof ButtonSize = ButtonSize;
  public changesAreNotValid = true;

  public subscriptions?: Subscription[];

  protected inputsArr?: {
    formControlName:
      | 'firstName'
      | 'lastName'
      | 'username'
      | 'email'
      | 'dateOfBirth'
      | 'address';
    labelName: string;
    value: string | undefined;
  }[];

  snapshot?: { [props: string]: string };
  userActiveStatus$?: Observable<boolean>;

  public readonly allSpecializations = specializations;
  public userSpecialization?: string;
  public role?: string;

  constructor(
    private router: Router,
    private userStoreService: UserStoreService,
    private route: ActivatedRoute,
    private authStoreService: AuthStoreService,
    private uiService: UiService
  ) {}

  ngOnInit(): void {
    this.userEditForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      username: new FormControl(''),
      email: new FormControl(''),
      address: new FormControl(''),
      dateOfBirth: new FormControl(''),
      specialization: new FormControl(''),
    });

    const data = this.route.data
      .pipe(
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
            console.log(this.userSpecialization, 'asdasd');
            formControls['specialization'] = new FormControl(
              this.userSpecialization
            );
          }

          this.userEditForm = new FormGroup(formControls);
          this.snapshot = this.userEditForm.value;
        })
      )
      .subscribe();

    this.subscriptions?.push(data);

    const changeSub = this.userEditForm.valueChanges.subscribe({
      next: (data) => {
        let changed = false;
        for (const key in data) {
          if (this.snapshot && data[key] !== this.snapshot[key]) {
            changed = true;
            break;
          }
        }
        if (changed) {
          this.changesAreNotValid = false;
          console.log('Changes detected');
        } else {
          console.log('Changes NOT detected');
          this.changesAreNotValid = true;
        }
      },
    });

    this.subscriptions?.push(changeSub);
  }

  public onSubmit() {
    const data = this.userEditForm.value;
    if (!this.changesAreNotValid) {
      this.authStoreService.editCurrentUser(data).subscribe({
        next: () => {
          this.changesAreNotValid = true;
        },
      });
    }
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

  navigateBack() {
    this.router.navigate(['/my-account']);
  }
}
