import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ButtonSize,
  ButtonState,
} from '../../../../shared/models/button.model';
import {
  exhaustMap,
  map,
  Observable,
  of,
  Subscription,
  switchMap,
  tap,
} from 'rxjs';
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
import { ModaltestComponent } from '../../../../shared/components/modaltest/modaltest.component';
import { HttpClient } from '@angular/common/http';

const components = [
  CustomImgComponent,
  ButtonComponent,
  InputComponent,
  DropDownMenuComponent,
  SwitcherComponent,
  ModalBoxComponent,
  ModaltestComponent,
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

  protected img: string | ArrayBuffer | null =
    '../../../assets/imgs/no-user-img.jpg';
  protected readonly btnState: typeof ButtonState = ButtonState;
  protected readonly btnSize: typeof ButtonSize = ButtonSize;
  protected changesAreNotValid = true;
  protected readonly allSpecializations = specializations;

  protected userSpecialization?: string;
  protected role?: string;

  private subscriptions: Subscription[] = [];
  protected snapshot?: { [props: string]: string };

  protected inputsArr?: EditFormInput[];

  fileName: string | null = null;

  constructor(
    private routerService: RouterService,
    private route: ActivatedRoute,
    private authStoreService: AuthStoreService,
    private formService: FormService,
    private toasterService: ToasterService,
    private modalService: ModalService,
    private http: HttpClient
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
    console.log(this.userEditForm);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  protected onSubmit() {
    const data = this.userEditForm.value;
    console.log(this.userEditForm.value);
    const uploadedImageChange = this.userEditForm.get('profilePhoto');
    console.log();
    if (uploadedImageChange?.value) {
      console.log('Handle S3 upload and save');
    } else {
      console.log('Save without s3 upload');
    }
    // if (!this.changesAreNotValid) {
    //   this.subscriptions.push(
    //     this.authStoreService.editCurrentUser(data).subscribe({
    //       next: () => {
    //         this.changesAreNotValid = true;
    //       },
    //     })
    //   );
    // }
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
          console.log(el);
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

  // boolean | Observable<boolean> | Promise<boolean>
  canDeactivate() {
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

  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      // const fileType = encodeURIComponent(file.type);
      const fileType = file.type;
      console.log(file);
      this.fileName = file.name;

      const photoName = 'TEST_USER_PICK';

      const reader = new FileReader();

      reader.onload = () => {
        this.img = reader.result;
        console.log();
      };

      reader.readAsDataURL(file);

      // const dataasdasd = this.http
      //   .get<TESTRESPONSE>(
      //     `https://lryie611ua.execute-api.eu-north-1.amazonaws.com/dev/import-photo?fileType=${fileType}&photoName=${photoName}`
      //   )
      //   .pipe(
      //     map(({ key, data }) => ({ key, data })),
      //     exhaustMap(({ key, data }) => {
      //       console.log(key);
      //       return this.http.put(data, file);
      //     })
      //   );

      // dataasdasd.subscribe(console.log);
    }
  }
  removePhoto() {
    this.fileName = null;
    this.img = '../../../assets/imgs/no-user-img.jpg';
    const input = document.getElementById('file-upload') as HTMLInputElement;
    if (input) {
      input.value = '';
    }
  }
}

interface TESTRESPONSE {
  data: string;
  key: string;
}
