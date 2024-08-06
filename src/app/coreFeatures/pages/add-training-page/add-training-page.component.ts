import { Component, OnInit } from '@angular/core';
import {
  ButtonComponent,
  DatePickerComponent,
  DropDownMenuComponent,
  InputComponent,
} from '../../../shared';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, NgIf } from '@angular/common';
import { map, Observable, of } from 'rxjs';
import { specializations, trainingType } from '../../constants/dictionary';
import { TrainingStoreService } from '../../services/training/training-store.service';
import {
  TrainerOption,
  TrainingCreationAttribute,
} from '../../models/user.model';
import { UserStoreService } from '../../services/user/user-store.service';

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
})
export class AddTrainingPageComponent implements OnInit {
  trainingForm!: FormGroup;

  public allSpecializations = specializations;
  public allTrainers$?: Observable<TrainerOption[]>;
  public currentUserFullName?: string;
  public currentUserId?: string;

  public allTrainingTypes: string[] = trainingType;

  constructor(
    private trainingStoreService: TrainingStoreService,
    private userStoreService: UserStoreService
  ) {} // private userService: UserService // private trainingService: TrainingService, // private trainerService: TrainerService, // private specializationService: SpecializationService,

  ngOnInit(): void {
    this.userStoreService.currentUser
      .pipe(
        map((user) => ({
          fullName: `${user?.firstName} ${user?.lastName}`,
          currentUserId: user?.id,
        }))
      )
      .subscribe(({ fullName, currentUserId }) => {
        this.currentUserFullName = fullName;
        this.currentUserId = currentUserId;
      });

    // this.allTrainers$ = this.trainingStoreService.getAllTrainers();
    this.userStoreService.getMyTrainers().subscribe({
      next: (data) => {
        console.log(data);
        this.allTrainers$ = of(
          data.map((el) => ({
            trainerId: el.userId,
            trainerName: el.name,
            specialization: el?.specialization,
          }))
        );

        // this.allTrainers$ = of(data);
        this.trainingForm = new FormGroup({
          trainingName: new FormControl(''),
          startDate: new FormControl(new Date()),
          duration: new FormControl(''),
          trainingType: new FormControl(this.allTrainingTypes[0]),
          trainer: new FormControl({
            specialization: data[0].specialization,
            trainerId: data[0].userId,
            trainerName: data[0].name,
          }),
          logedInUser: new FormControl(''),
          description: new FormControl(''),
        });
      },
    });

    this.trainingForm = new FormGroup({
      trainingName: new FormControl(''),
      startDate: new FormControl(new Date()),
      duration: new FormControl(''),
      trainingType: new FormControl(''),
      trainer: new FormControl({
        specialization: '',
        trainerId: '',
        trainerName: '',
      }),
      logedInUser: new FormControl(''),
      description: new FormControl(''),
    });
  }

  onSubmit() {
    // interface TrainingCreationAttribute {
    //   trainer_id: string;
    //   student_id: string;
    //   specialization: string;
    //   trainingName: string;
    //   trainingType: string;
    //   startDate: Date;
    //   duration: string;
    //   trainerName: string;
    //   studentName: string;
    //   description?: string;
    // }

    const data = this.trainingForm.value;

    const finalData: TrainingCreationAttribute = {
      trainer_id: data.trainer.trainerId,
      student_id: this.currentUserId as string,
      specialization: data.trainer.specialization,
      trainingName: data.trainingName,
      trainingType: data.trainingType,
      startDate: data.startDate,
      duration: data.duration,
      trainerName: data.trainer.trainerName,
      studentName: this.currentUserFullName as string,
      description: data.description,
    };

    this.trainingStoreService.createTraining(finalData).subscribe(console.log);
  }
}
