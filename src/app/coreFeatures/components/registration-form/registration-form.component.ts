import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription, map, of, tap } from 'rxjs';
import {
  ButtonComponent,
  CustomImgComponent,
  DropDownMenuComponent,
  InputComponent,
} from '../../../shared';
import { CommonModule } from '@angular/common';
import { specializations } from '../../constants/dictionary';
import { RegisterUser } from '../../models/user.model';
import { AuthStoreService } from '../../services/auth/auth-store.service';
import { UiService } from '../../services/uiService/ui.service';
interface RegistrationInputInterface {
  formControlName: string;
  labelName: string;
}

const components = [
  CustomImgComponent,
  ButtonComponent,
  InputComponent,
  DropDownMenuComponent,
];
const modules = [ReactiveFormsModule, CommonModule];

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [components, modules],
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.scss',
})
export class RegistrationFormComponent implements OnInit, OnDestroy {
  public readonly allSpecializations$ = of(specializations);
  // public readonly allSpecializations$ =
  //   this.specializationService.allSpecializations;

  public readonly registrationError$ = this.uiService.errorMessage;
  // public readonly registrationError$ = of(null);

  public subscriptions: Subscription[] = [];

  protected roleSubject: BehaviorSubject<string> = new BehaviorSubject('');

  protected inputsArr: BehaviorSubject<RegistrationInputInterface[]> =
    new BehaviorSubject<RegistrationInputInterface[]>([]);

  protected registrationForm!: FormGroup;

  public img?: string;

  constructor(
    private route: ActivatedRoute, // private specializationService: SpecializationService, // private authStoreService: AuthStoreService
    private authStoreService: AuthStoreService,
    private uiService: UiService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.route.data
        .pipe(
          map(({ role }) => role),
          tap((role) => this.roleSubject.next(role))
        )
        .subscribe()
    );

    this.registrationForm = this.generateRegistrationForm();
    this.generateInputs();
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  public onSubmit(): void {
    const role = this.roleSubject.getValue();
    const data: RegisterUser = { ...this.registrationForm.value, role };

    this.subscriptions.push(
      this.authStoreService.registerAndGetInfo(data).subscribe((data) => data)
    );

    console.log(data);
  }

  private generateRegistrationForm() {
    if (this.roleSubject.getValue() === 'student') {
      this.img = '../../../assets/imgs/register-student.jpeg';
      return this.generateStudentForm();
    } else {
      this.img = '../../../assets/imgs/register-trainer.jpg';
      return this.generateTrainerForm();
    }
  }

  private generateStudentForm() {
    return new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      dateOfBirth: new FormControl(''),
      address: new FormControl(''),
    });
  }

  private generateTrainerForm() {
    return new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      specialization: new FormControl('', [Validators.required]),
    });
  }

  private generateInputs(): void {
    const data: RegistrationInputInterface[] = Object.entries(
      this.registrationForm.controls
    ).map((el) => {
      let name = (el[0] as string)
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/\b\w/g, (char) => char.toUpperCase());

      if (!el[1].validator) {
        name = name + ' ' + '(optional)';
      }

      return {
        formControlName: el[0],
        labelName: name,
      };
    });

    const updatedData =
      this.roleSubject.getValue() === 'trainer' ? data.slice(0, -1) : data;

    this.inputsArr.next(updatedData);
  }
}
