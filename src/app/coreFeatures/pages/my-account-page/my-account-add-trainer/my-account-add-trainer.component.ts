import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Observable, Subscription, of } from 'rxjs';
import { ButtonComponent, SpinerComponent } from '../../../../shared';
import { TableComponent, AddUserTableComponent } from '../../../../shared';
import { AsyncPipe, NgIf } from '@angular/common';

export interface TrainerRefined {
  name: string;
  user_id: string;
  specialization: string;
}

const components = [
  ButtonComponent,
  TableComponent,

  AddUserTableComponent,
  TableComponent,
  SpinerComponent,
];

@Component({
  selector: 'app-my-account-add-trainer',
  standalone: true,
  imports: [components, AsyncPipe, ReactiveFormsModule, NgIf],
  templateUrl: './my-account-add-trainer.component.html',
  styleUrl: './my-account-add-trainer.component.scss',
})
export class MyAccountAddTrainerComponent implements OnInit, OnDestroy {
  public addTrainerTableHeader = [' ', ' Name', 'Specialization'];
  public myTrainersTableHeader = [' Name', 'Specialization'];
  public addTrainerForm?: FormGroup;

  // public myTrainers$?: Observable<TrainerRefined[] | undefined>;
  public myTrainers$?: Observable<TrainerRefined[] | undefined> = of([
    {
      name: 'SDasd',
      user_id: 'asdasd',
      specialization: 'React',
    },
    {
      name: 'SDasd',
      user_id: 'asdasd',
      specialization: 'React',
    },
  ]);

  subscriptions: Subscription[] = [];

  // isLoading$ = this.trainerService.isLoading$;
  isLoading$ = of(false);

  // constructor(private trainerService: TrainerService) {}

  ngOnInit(): void {
    this.addTrainerForm = new FormGroup({
      rows: new FormArray([]),
    });

    // this.myTrainers$ = this.trainerService.getMyTrainers();
    // this.subscriptions.push(
    //   this.trainerService.getFilteredTrainers().subscribe((trainers) => {
    //     trainers?.forEach((trainer) =>
    //       this.rows.push(this.createRowFormGroup(trainer))
    //     );
    //   })
    // );
  }

  ngOnDestroy(): void {
    this.subscriptions?.forEach((sub) => sub.unsubscribe());
  }

  createRowFormGroup(data: {
    name: string;
    user_id: string;
    specialization: string;
  }) {
    return new FormGroup({
      selected: new FormControl(false),
      name: new FormControl(data.name),
      id: new FormControl(data.user_id),
      specialization: new FormControl(data.specialization),
    });
  }

  get rows() {
    return this.addTrainerForm?.get('rows') as FormArray;
  }

  addTrainer() {
    const selectedRows = this.rows.controls
      .filter((row) => row.value.selected)
      .map((row) => row.value.id);

    // selectedRows.length > 0 &&
    //   this.trainerService
    //     .addTrainerInStudentModel({ trainers: selectedRows })
    //     .subscribe((trainers) => {
    //       this.addTrainerForm = new FormGroup({
    //         rows: new FormArray([]),
    //       });
    //       trainers?.forEach((trainer) =>
    //         this.rows.push(this.createRowFormGroup(trainer))
    //       );
    //     });
  }
}
