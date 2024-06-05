import { Component } from '@angular/core';
import {
  ButtonComponent,
  DatePickerComponent,
  DropDownMenuComponent,
  InputComponent,
} from '../../../shared';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, NgIf } from '@angular/common';
import { Observable, map, of } from 'rxjs';

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
export class AddTrainingPageComponent {
  trainingForm!: FormGroup;
  // public allSpecializations$ = this.specializationService.allSpecializations;
  public allSpecializations$ = of(['React, Angular']);
  public allTrainers$ = of(['Stefan', 'Ivica']);
  // public allTrainers$?: Observable<
  //   {
  //     name: string;
  //     specialization: string;
  //     user_id: string;
  //   }[]
  // >;
  // public allTrainingTypes$?: Observable<TrainingType[]>;
  public allTrainingTypes$?: Observable<string[]> = of(['Webinar', 'Course']);

  constructor() {} // private userService: UserService // private trainingService: TrainingService, // private trainerService: TrainerService, // private specializationService: SpecializationService,

  ngOnInit(): void {
    // this.specializationService.getAllSpecialization().subscribe();

    // this.allSpecializations$.subscribe(console.log);
    // this.allTrainingTypes$ = this.trainingService.getAllTrainingTypes();
    // this.allTrainingTypes$.subscribe(console.log);

    // this.allTrainers$ = this.trainerService.getAllTrainers().pipe(
    //   map((trainers) =>
    //     trainers.map((trainer) => ({
    //       name: `${trainer.firstName} ${trainer.lastName}`,
    //       specialization: trainer.trainer.specialization._id,
    //       user_id: trainer.id,
    //     }))
    //   ),
    //   tap((el) => console.log(el))
    // );

    of({ role: 'Trainer2', id: 'asdadasd' })
      .pipe(
        map((user) => ({
          role: user?.role,
          id: user?.id,
        }))
      )
      .subscribe((data) => {
        this.trainingForm = new FormGroup({
          trainingName: new FormControl(''),
          startDate: new FormControl(new Date()),
          duration: new FormControl(''),
          trainingType: new FormControl(''),
          trainer: new FormControl({
            userId: '',
            sprcializationId: '',
          }),
          userId: new FormControl(data.id),
          description: new FormControl(''),
        });
      });

    // this.userService.currentUser
    //   .pipe(
    //     map((user) => ({
    //       role: user?.role,
    //       id: user?.id,
    //     }))
    //   )
    //   .subscribe((data) => {
    //     this.trainingForm = new FormGroup({
    //       trainingName: new FormControl(''),
    //       startDate: new FormControl(new Date()),
    //       duration: new FormControl(''),
    //       trainingType: new FormControl(''),
    //       trainer: new FormControl({
    //         userId: '',
    //         sprcializationId: '',
    //       }),
    //       userId: new FormControl(data.id),
    //     });
    //   });
  }

  onSubmit() {
    console.log(this.trainingForm.valid);

    const data = this.trainingForm.value;

    const dataForCreation = {
      trainer_id: data.trainer.userId,
      student_id: data.userId,
      trainingType: data.trainingType,
      trainingName: data.trainingName,
      startDate: data.startDate,
      duration: data.duration,
      specialization: data.trainer.sprcializationId,
    };
    // const dataForCreation: TrainingCreationAttributes = {
    //   trainer_id: data.trainer.userId,
    //   student_id: data.userId,
    //   trainingType: data.trainingType,
    //   trainingName: data.trainingName,
    //   startDate: data.startDate,
    //   duration: data.duration,
    //   specialization: data.trainer.sprcializationId,
    // };
    console.log(data);
    console.log(dataForCreation);

    // this.trainingService.createTraining(dataForCreation).subscribe(console.log);
  }
}
