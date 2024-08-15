import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  ButtonComponent,
  DatePickerComponent,
  DropDownMenuComponent,
  InputComponent,
} from '../../../shared';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, NgIf } from '@angular/common';
import { map, Observable, Subscription, tap } from 'rxjs';
import { specializations, trainingType } from '../../constants/dictionary';
import { TrainingStoreService } from '../../services/training/training-store.service';
import {
  TrainerOption,
  TrainingCreationAttribute,
} from '../../models/user.model';
import { UserStoreService } from '../../services/user/user-store.service';

import { RouterService } from '../../services/router/router.service';
import { ActivatedRoute } from '@angular/router';
import { TrainingForm } from '../../models/user.model';
import { FormService } from '../../services/form/form.service';

const components = [
  InputComponent,
  DropDownMenuComponent,
  DatePickerComponent,
  ButtonComponent,
];

@Component({
  selector: 'app-add-training-page',
  standalone: true,
  imports: [components, ReactiveFormsModule, AsyncPipe, NgIf],
  templateUrl: './add-training-page.component.html',
  styleUrl: './add-training-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddTrainingPageComponent implements OnInit, OnDestroy {
  protected allSpecializations: string[] = specializations;
  protected allTrainingTypes: string[] = trainingType;
  protected datePickerLabel: string = 'Training Start Date';
  protected trainingForm!: FormGroup;
  protected allTrainers$?: Observable<TrainerOption[]>;

  private subsciptions: Subscription[] = [];
  private currentUserFullName?: string;
  private currentUserId?: string;

  constructor(
    private trainingStoreService: TrainingStoreService,
    private userStoreService: UserStoreService,
    private routerService: RouterService,
    private route: ActivatedRoute,
    private formService: FormService
  ) {}

  ngOnInit(): void {
    this.subsciptions.push(this.getCurrentUserIdAndFullName().subscribe());

    this.allTrainers$ = this.getAllTrainersAndSetOptionField();

    this.trainingForm = this.formService.generateCreateTrainingField(
      this.allTrainingTypes[0]
    );
  }

  onSubmit() {
    const data = this.trainingForm.value;
    const finalData = this.generateSubmitData(data);

    this.subsciptions.push(
      this.trainingStoreService
        .createTraining(finalData, this.route)
        .subscribe({
          error: (err) => {
            this.datePickerLabel = err;
          },
        })
    );
  }
  ngOnDestroy(): void {
    this.subsciptions.forEach((sub) => sub.unsubscribe());
  }

  protected backToTrainings() {
    this.routerService.toTrainings(this.route);
  }

  private generateSubmitData(data: TrainingForm): TrainingCreationAttribute {
    const startDate = new Date(data.startDate);
    const duration = Number(data.duration);
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + duration);

    return {
      trainer_id: data.trainer.trainerId,
      student_id: this.currentUserId as string,
      specialization: data.trainer.specialization,
      trainingName: data.trainingName,
      trainingType: data.trainingType,
      startDate: data.startDate,
      endDate: endDate,
      duration: data.duration + ' d',
      trainerName: data.trainer.trainerName,
      studentName: this.currentUserFullName as string,
      description: data.description,
    };
  }

  private getCurrentUserIdAndFullName() {
    return this.userStoreService.currentUser.pipe(
      map((user) => ({
        fullName: `${user?.firstName} ${user?.lastName}`,
        currentUserId: user?.id,
      })),
      tap(({ fullName, currentUserId }) => {
        this.currentUserFullName = fullName;
        this.currentUserId = currentUserId;
      })
    );
  }

  private getAllTrainersAndSetOptionField() {
    return this.route.data.pipe(
      map((data) => data['myTrainers']),
      tap((data) =>
        this.formService.generateTrainerSelectOptionData(
          this.trainingForm,
          data[0]
        )
      )
    );
  }
}
