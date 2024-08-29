import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Observable, Subscription, combineLatest, map, of } from 'rxjs';
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
  protected addTrainerTableHeader = [' ', ' Name', 'Specialization'];
  protected myTrainersTableHeader = [' Name', 'Specialization'];
  protected tableL$: Observable<boolean> = of(true);

  protected addTrainerForm: FormGroup = new FormGroup({
    rows: new FormArray([]),
  });
  protected myTrainers$?: Observable<TrainerRefined[] | undefined>;

  private subscriptions: Subscription[] = [];

  constructor(
    private userStoreService: UserStoreService,
    private routerService: RouterService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.generateTrainersData().subscribe({
        next: (trainers) => {
          trainers.forEach((trainer) => {
            this.rows.push(this.createRowFormGroup(trainer));
          });

          this.addTrainerForm = new FormGroup({
            rows: this.rows,
          });
        },

        complete: () => {
          this.tableL$ = of(false);
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions?.forEach((sub) => sub.unsubscribe());
  }

  protected addTrainer(): void {
    const selectedRows = this.rows.controls
      .filter((row) => row.value.selected)
      .map((row) => row.value.id);

    selectedRows.length > 0 &&
      this.subscriptions.push(
        this.userStoreService.addMyUsers(selectedRows).subscribe({
          next: () => {
            this.routerService.toMyAccount();
          },
        })
      );
  }

  private generateTrainersData() {
    return combineLatest([
      this.userStoreService.getAllTrainers(),
      this.userStoreService.getMyTrainers(),
    ]).pipe(
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
    );
  }

  private createRowFormGroup(data: TrainerRefined) {
    return new FormGroup({
      selected: new FormControl(false),
      name: new FormControl(data.name),
      id: new FormControl(data.userId),
      specialization: new FormControl(data.specialization),
    });
  }

  private get rows() {
    return this.addTrainerForm?.get('rows') as FormArray;
  }
}
