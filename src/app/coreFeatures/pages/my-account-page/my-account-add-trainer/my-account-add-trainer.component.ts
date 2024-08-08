import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Observable, Subscription, combineLatest, from, map, of } from 'rxjs';
import { ButtonComponent, SpinerComponent } from '../../../../shared';
import { TableComponent, AddUserTableComponent } from '../../../../shared';
import { AsyncPipe, NgIf } from '@angular/common';
import { UserStoreService } from '../../../services/user/user-store.service';

import { LoaderComponent } from '../../../../shared/ui/loader/loader.component';
import { RouterService } from '../../../services/router/router.service';

export interface TrainerRefined {
  name: string;
  userId: string;
  specialization?: string;
}

const components = [
  ButtonComponent,
  TableComponent,
  LoaderComponent,
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
  public myTrainers$?: Observable<TrainerRefined[] | undefined>;
  // public myTrainers$: Observable<TrainerRefined[]> =
  //   this.userStoreService.getMyTrainers();
  // public myTrainers$?: Observable<TrainerRefined[] | undefined> = of([
  //   {
  //     name: 'SDasd',
  //     user_id: 'asdasd',
  //     specialization: 'React',
  //   },
  //   {
  //     name: 'SDasd',
  //     user_id: 'asdasd',
  //     specialization: 'React',
  //   },
  // ]);

  subscriptions: Subscription[] = [];

  // isLoading$ = this.trainerService.isLoading$;
  isLoading$ = of(false);
  tableL$: Observable<boolean> = of(true);

  constructor(
    private userStoreService: UserStoreService,
    private routerService: RouterService
  ) {}

  ngOnInit(): void {
    this.addTrainerForm = new FormGroup({
      rows: new FormArray([]),
    });

    // combineLatest([this.userStoreService.getAllTrainers(), this.myTrainers$])
    combineLatest([
      this.userStoreService.getAllTrainers(),
      this.userStoreService.getMyTrainers(),
    ])
      .pipe(
        map(([allTrainers, myTrainers]) => {
          this.myTrainers$ = of(myTrainers);
          const myTrainerIds = new Set(
            myTrainers?.map((trainer) => trainer.userId)
          );
          return allTrainers
            .filter((trainer) => !myTrainerIds.has(trainer.id))
            .map((trainer) => ({
              name: `${trainer.firstName} ${trainer.lastName}`,
              specialization: trainer.specialization,
              userId: trainer.id,
            }));
        })
      )
      .subscribe({
        next: (trainers) => {
          trainers.forEach((trainer) => {
            this.rows.push(this.createRowFormGroup(trainer));
          });
        },

        complete: () => {
          this.tableL$ = of(false);
        },
      });

    // this.userStoreService.getMyTrainers().subscribe(console.log);

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

  createRowFormGroup(data: TrainerRefined) {
    return new FormGroup({
      selected: new FormControl(false),
      name: new FormControl(data.name),
      id: new FormControl(data.userId),
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

    selectedRows.length > 0 &&
      this.userStoreService.addMyUsers(selectedRows).subscribe({
        next: () => {
          this.routerService.toMyAccount();
        },
      });
  }
}
