import { Component, OnInit } from '@angular/core';
import {
  ButtonSize,
  ButtonState,
} from '../../../../shared/models/button.model';
import { combineLatest, map, Observable, of, tap } from 'rxjs';
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

  // currentUser$: Observable<UserData | null> = this.userService.currentUser;
  snapshot?: { [props: string]: string };
  userActiveStatus$?: Observable<boolean>;
  // specialization$?: Observable<{
  //   labelName: string | undefined;
  //   value: string | undefined;
  // }>;
  public readonly allSpecializations$ = of(specializations);
  public userSpecialization?: string;

  constructor(
    private router: Router, // private userService: UserService, // private specializationService: SpecializationService, // private authStoreService: AuthStoreService
    private userStoreService: UserStoreService,
    private route: ActivatedRoute
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

    this.route.data
      .pipe(
        tap(({ user }) => {
          this.userSpecialization = user.specialization;
          this.inputsArr = user.userInputsFinal;
          const formControls: { [prop: string]: AbstractControl } = {};
          const inputValues = this.inputsArr?.map((el) => ({
            formControlName: el.formControlName,
            value: el.value,
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
      .subscribe(console.log);
    // this.userSpecialization$.subscribe(console.log);
    // this.specializationService.getAllSpecialization().subscribe();

    // this.inputsArr$ = this.userStoreService.getCurrentUserInputs();
    // this.userSpecialization$ = this.userStoreService.getUserSpecialization();

    // combineLatest([this.inputsArr$, this.userSpecialization$])
    //   .pipe(
    //     map(([inputData, specialization]) => {
    //       console.log(inputData);
    //       const formControls: { [prop: string]: AbstractControl } = {};
    //       const inputValues = inputData?.map((el) => ({
    //         formControlName: el.formControlName,
    //         value: el.value,
    //       }));

    //       inputValues?.forEach((el) => {
    //         formControls[el.formControlName] = new FormControl(el.value);
    //       });
    //       if (specialization) {
    //         console.log(specialization, 'asdasd');
    //         formControls['specialization'] = new FormControl(specialization);
    //       }
    //       this.userEditForm = new FormGroup(formControls);
    //       this.snapshot = this.userEditForm.value;
    //     })
    //   )
    //   .subscribe();

    // this.inputsArr
    //   .pipe(
    //     map((inputData) => {
    //       const formControls: { [prop: string]: AbstractControl } = {};
    // const inputValues = inputData?.map((el) => ({
    //   formControlName: el.formControlName,
    //   value: el.value,
    // }));

    //       inputValues?.forEach((el) => {
    //         formControls[el.formControlName] = new FormControl(el.value);
    //       });

    //       this.userEditForm = new FormGroup(formControls);
    //     }),
    //     tap((el) => console.log(el))
    //   )
    //   .subscribe(console.log);

    // this.userActiveStatus$ = this.userService.getUserActiveStatus();
    // this.specialization$ = this.userService.getSpecialization();
    // this.specialization$ = of('Angular');

    // combineLatest([
    //   this.userStoreService.getCurrentUserInputs(),
    //   this.specialization$,
    // ]).subscribe(([data]) => {
    //   const formControls: { [prop: string]: AbstractControl } = {};
    //   const inputValues = data?.map((el) => ({
    //     formControlName: el.formControlName,
    //     value: el.value,
    //   }));
    //   inputValues?.forEach((el) => {
    //     formControls[el.formControlName] = new FormControl(el.value);
    //   });
    //   if (specialization) {
    //     console.log(specialization);
    //     formControls['specialization'] = new FormControl(specialization.value);
    //   }
    //   this.userEditForm = new FormGroup(formControls);
    //   this.snapshot = this.userEditForm.value;
    //   this.userEditForm?.valueChanges.subscribe((data) => {
    //     let changed = false;
    //     for (const key in data) {
    //       if (this.snapshot && data[key] !== this.snapshot[key]) {
    //         changed = true;
    //         break;
    //       }
    //     }
    //     if (changed) {
    //       this.changesAreNotValid = false;
    //       console.log('Changes detected');
    //     } else {
    //       this.changesAreNotValid = true;
    //     }
    //   });
    // });
    // console.log(this.userEditForm);
  }

  public onSubmit() {
    const data = this.userEditForm.value;
    console.log(data);
    // this.authStoreService.editCurrentUser(data).subscribe(() => {
    //   this.changesAreNotValid = true;
    //   this.navigateBack();
    // });
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
