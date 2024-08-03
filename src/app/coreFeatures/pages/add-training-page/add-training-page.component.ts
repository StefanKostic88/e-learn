import { Component, OnInit } from '@angular/core';
import {
  ButtonComponent,
  DatePickerComponent,
  DropDownMenuComponent,
  InputComponent,
} from '../../../shared';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, NgIf } from '@angular/common';
import { Observable, of } from 'rxjs';
import { specializations, trainingType } from '../../constants/dictionary';
import { TrainingStoreService } from '../../services/training/training-store.service';
import { TrainerOption } from '../../models/user.model';

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

  public allTrainingTypes: string[] = trainingType;

  constructor(private trainingStoreService: TrainingStoreService) {} // private userService: UserService // private trainingService: TrainingService, // private trainerService: TrainerService, // private specializationService: SpecializationService,

  ngOnInit(): void {
    // this.allTrainers$ = this.trainingStoreService.getAllTrainers();
    this.trainingStoreService.getAllTrainers().subscribe({
      next: (data) => {
        this.allTrainers$ = of(data);
        this.trainingForm = new FormGroup({
          trainingName: new FormControl(''),
          startDate: new FormControl(new Date()),
          duration: new FormControl(''),
          trainingType: new FormControl(this.allTrainingTypes[0]),
          trainer: new FormControl({
            specialization: data[0].specialization,
            trainerId: data[0].trainerId,
            trainerName: data[0].trainerName,
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
    interface TrainingCreationAttribute {
      trainer_id: string;
      specialization: string;
      trainingName: string;
    }

    const data = this.trainingForm.value;

    const finalData: TrainingCreationAttribute = {
      trainer_id: data.trainer.trainerId,
      specialization: data.trainer.specialization,
      trainingName: data.trainingName,
    };

    console.log(data);
    console.log(finalData);

    // this.trainingService.createTraining(dataForCreation).subscribe(console.log);
  }
}
