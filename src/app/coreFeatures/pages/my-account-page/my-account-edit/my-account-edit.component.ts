import { Component, OnInit } from '@angular/core';
import {
  ButtonSize,
  ButtonState,
} from '../../../../shared/models/button.model';
import { Observable, of } from 'rxjs';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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

  protected inputsArr?: Observable<
    | {
        formControlName:
          | 'firstName'
          | 'lastName'
          | 'username'
          | 'email'
          | 'adress'
          | 'dateOfBirth';
        labelName: string;
        value: string | undefined;
      }[]
    | undefined
  >;

  // currentUser$: Observable<UserData | null> = this.userService.currentUser;
  snapshot?: { [props: string]: string };
  userActiveStatus$?: Observable<boolean>;
  specialization$?: Observable<{
    labelName: string | undefined;
    value: string | undefined;
  }>;
  public readonly allSpecializations$ = of(specializations);

  constructor(
    private router: Router // private userService: UserService, // private specializationService: SpecializationService, // private authStoreService: AuthStoreService
  ) {}

  ngOnInit(): void {
    // this.specializationService.getAllSpecialization().subscribe();
    // this.inputsArr = this.userService.getCurrentUserInputs();
    // this.userActiveStatus$ = this.userService.getUserActiveStatus();
    // this.specialization$ = this.userService.getSpecialization();
    // combineLatest([
    //   this.userService.getCurrentUserInputs(),
    //   this.specialization$,
    // ]).subscribe(([data, specialization]) => {
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

    this.userEditForm = new FormGroup({
      firstName: new FormControl('asd'),
      lastName: new FormControl('asd'),
      username: new FormControl('asd'),
      email: new FormControl('asd'),
      adress: new FormControl('asd'),
      dateOfBirth: new FormControl('asd'),
      specialization: new FormControl('React'),
    });
  }

  public onSubmit() {
    console.log('asdasd');
    // const data: EditInterface = this.userEditForm.value;
    // this.authStoreService.editCurrentUser(data).subscribe(() => {
    //   this.changesAreNotValid = true;
    //   this.navigateBack();
    // });
  }

  // canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
  //   if (this.changesAreNotValid) {
  //     return true;
  //   } else {
  //     return confirm(
  //       'Are you sure you want to leave this page? Any unsaved changes will be lost.'
  //     );
  //   }
  // }

  navigateBack() {
    this.router.navigate(['/my-account']);
  }
}
