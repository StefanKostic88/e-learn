import { Component, OnInit } from '@angular/core';
import {
  ButtonComponent,
  DatePickerComponent,
  InputComponent,
  TableComponent,
} from '../../../shared';
import { ButtonSize, ButtonState } from '../../../shared/models/button.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { UserStoreService } from '../../services/user/user-store.service';
import { TrainingStoreService } from '../../services/training/training-store.service';
import { MyTrainingTableData } from '../../models/user.model';
import { LoaderComponent } from '../../../shared/ui/loader/loader.component';

const components = [
  DatePickerComponent,
  ButtonComponent,
  InputComponent,
  TableComponent,
  LoaderComponent,
];

@Component({
  selector: 'app-training-page',
  standalone: true,
  imports: [components, ReactiveFormsModule, RouterModule, AsyncPipe, NgIf],
  templateUrl: './training-page.component.html',
  styleUrl: './training-page.component.scss',
})
export class TrainingPageComponent implements OnInit {
  public readonly btnSize: typeof ButtonSize = ButtonSize;
  public readonly btnType: typeof ButtonState = ButtonState;

  trainingForm!: FormGroup;

  role$: Observable<string | undefined> =
    this.userStoreService.getCurrentUserRole();
  // public currentUser$ = this.userService.currentUser;
  // myTrainings$?: Observable<MyTrainingOutpup[]>;
  myTrainings$: Observable<MyTrainingTableData[]> = this.trainingStoreService
    .getMyTrainings()
    .pipe(tap((el) => console.log(el)));

  tableHeaders = ['DATE', 'TRAINING NAME', 'TYPE', 'TRAINER NAME', 'DURATION'];
  teableHeadersTrainer = [
    'DATE',
    'TRAINING NAME',
    'TYPE',
    'STUDENT NAME',
    'DURATION',
  ];

  constructor(
    // private userService: UserService,
    private router: Router,
    private route: ActivatedRoute, // private trainingService: TrainingService,
    private userStoreService: UserStoreService,
    private trainingStoreService: TrainingStoreService
  ) {}

  ngOnInit(): void {
    const currentDate = new Date();
    const nextTenDays = new Date();
    nextTenDays.setDate(currentDate.getDate() + 10);

    this.trainingForm = new FormGroup({
      searchStudent: new FormControl(''),
      fromDate: new FormControl(currentDate),
      toDate: new FormControl(nextTenDays),
      searchSpecialization: new FormControl(''),
    });
    // this.currentUser$.subscribe(console.log);
    // this.myTrainings$ = this.trainingService.getMyTrainings();

    // const data = this.trainingService.getMyTrainingsForTrainer();
    this.role$.subscribe(console.log);

    console.log();
  }

  public navigateToAddTrainer() {
    // this.router.navigate(['add-training'], { relativeTo: this.route.parent });
    this.router.navigate(['add-training'], { relativeTo: this.route });
  }

  public onSearch() {
    console.log(this.trainingForm.value);
    const data = this.trainingForm.value;

    const params = `name=${data.searchStudent}&specialization=${data.searchSpecialization}&createdBefore=${data.fromDate}&createdAfter=${data.toDate}`;
    // const params = `name=${data.searchStudent}&specialization=${
    //   data.searchSpecialization
    // }&createdBefore=${data.fromDate.toISOString()}&createdAfter=${data.toDate.toISOString()}`;

    console.log(params);

    this.myTrainings$ = this.trainingStoreService
      .getMyTrainingsWithParams(params)
      .pipe(tap((el) => console.log(el)));
  }
}
