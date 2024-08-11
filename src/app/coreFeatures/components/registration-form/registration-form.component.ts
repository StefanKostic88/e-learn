import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
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
import { RegistrationInputInterface, Role } from '../../models/shared.models';
import { FormService } from '../../services/form/form.service';

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
  private readonly checkRole: typeof Role = Role;
  private subscriptions: Subscription[] = [];

  protected readonly allSpecializations$ = of(specializations);
  protected readonly registrationError$ = this.uiService.errorMessage;
  protected roleSubject: BehaviorSubject<string> = new BehaviorSubject('');

  protected inputsArr: BehaviorSubject<RegistrationInputInterface[]> =
    new BehaviorSubject<RegistrationInputInterface[]>([]);

  protected registrationForm!: FormGroup;

  protected img?: string;

  constructor(
    private route: ActivatedRoute,
    private authStoreService: AuthStoreService,
    private uiService: UiService,
    private formService: FormService
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
    this.uiService.resetErrorMessage();
  }

  public onSubmit(): void {
    const role = this.roleSubject.getValue();
    const data: RegisterUser = { ...this.registrationForm.value, role };

    this.subscriptions.push(
      this.authStoreService.registerAndGetInfo(data).subscribe()
    );
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

  private generateRegistrationForm() {
    if (this.roleSubject.getValue() === this.checkRole.STUDENT) {
      this.img = '../../../assets/imgs/register-student.jpeg';
      return this.formService.generateStudentRegistrationFormFields();
    } else {
      this.img = '../../../assets/imgs/register-trainer.jpg';
      return this.formService.generateTrainerRegistrationFormFields();
    }
  }
}
