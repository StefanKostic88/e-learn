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
import { ModalService } from '../../../services/modal/modal.service';

import { UserStoreService } from '../../../services/user/user-store.service';
import { environment } from '../../../../enviroment';
import { EditInterface } from '../../../models/user.model';
import { v4 } from 'uuid';

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

  private noUserImage: string = environment.staticImages.noUserImage;

  protected img?: string | ArrayBuffer | null | undefined;

  protected readonly btnState: typeof ButtonState = ButtonState;
  protected readonly btnSize: typeof ButtonSize = ButtonSize;
  protected changesAreNotValid = true;
  protected readonly allSpecializations = specializations;

  protected userSpecialization?: string;
  protected role?: string;

  private subscriptions: Subscription[] = [];
  protected snapshot?: { [props: string]: string };
  protected fileName: string | null = null;

  protected inputsArr?: EditFormInput[];
  protected file?: File;

  constructor(
    private routerService: RouterService,
    private route: ActivatedRoute,
    private authStoreService: AuthStoreService,
    private formService: FormService,
    private toasterService: ToasterService,
    private modalService: ModalService,
    private userStoreService: UserStoreService
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
    if (this.changesAreNotValid) {
      return;
    }

    const updateData = this.generateEditData();
    const uploadedImageChange = this.userEditForm.get('profilePhoto');

    if (uploadedImageChange?.value) {
      const fileType = this.file?.type;

      if (fileType && this.file) {
        const photoName = `profile-image-${v4()}`;
        const dataasdasd = this.userStoreService.uploadUserPhotoAndEditUser(
          fileType,
          photoName,
          this.file,
          updateData
        );

        this.subscriptions.push(
          dataasdasd.subscribe({
            next: () => {
              this.changesAreNotValid = true;
            },
          })
        );
      }
    } else {
      this.subscriptions.push(
        this.authStoreService.editCurrentUser(updateData).subscribe({
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

  protected onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.file = file;
      this.fileName = file.name;

      const reader = new FileReader();

      reader.onload = () => {
        this.img = reader.result;
      };

      reader.readAsDataURL(file);
    }
  }
  protected removePhoto(): void {
    this.fileName = null;
    this.img = this.noUserImage;
    const input = document.getElementById('file-upload') as HTMLInputElement;
    if (input) {
      input.value = '';
    }
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
        this.img = user.image ? user.image : this.noUserImage;

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

        formControls['profilePhoto'] = new FormControl('');

        this.userEditForm = new FormGroup(formControls);
        this.snapshot = this.userEditForm.value;
        console.log(this.snapshot);
      })
    );
  }

  canDeactivate(): true | Observable<boolean> {
    if (this.changesAreNotValid) {
      return true;
    } else {
      return this.modalService.confirmLeavePage('Leave Edit Profile', [
        {
          chunk:
            'Are you sure you want to leave this page? Any unsaved changes will be lost.',
        },
      ]);
    }
  }

  private generateEditData(): EditInterface {
    const data = this.userEditForm.value;
    const updateData: EditInterface = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      address: data.address,
      username: data.username,
      dateOfBirth: data.dateOfBirth,
      specialization: data.specialization,
    };

    return updateData;
  }
}
