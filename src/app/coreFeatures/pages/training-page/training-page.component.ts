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
import { Observable } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { UserStoreService } from '../../services/user/user-store.service';

const components = [
  DatePickerComponent,
  ButtonComponent,
  InputComponent,
  TableComponent,
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
  datePickerValueOne = new Date();
  datePickerValueTwo = new Date();

  trainingForm!: FormGroup;

  role$?: Observable<string | undefined>;
  // public currentUser$ = this.userService.currentUser;
  // myTrainings$?: Observable<MyTrainingOutpup[]>;
  myTrainings$?: Observable<[]>;

  tableHeaders = ['DATE', 'TRAINING NAME', 'TYPE', 'TRAINER NAME', 'DURATION'];

  constructor(
    // private userService: UserService,
    private router: Router,
    private route: ActivatedRoute, // private trainingService: TrainingService,
    private userStoreService: UserStoreService
  ) {}

  ngOnInit(): void {
    this.trainingForm = new FormGroup({
      searchStudent: new FormControl(''),
      searchSpecialization: new FormControl(''),
    });
    // this.currentUser$.subscribe(console.log);
    // this.myTrainings$ = this.trainingService.getMyTrainings();

    // const data = this.trainingService.getMyTrainingsForTrainer();
    this.role$ = this.userStoreService.getCurrentUserRole();
  }

  public navigateToAddTrainer() {
    // this.router.navigate(['add-training'], { relativeTo: this.route.parent });
    this.router.navigate(['add-training'], { relativeTo: this.route });
  }
}
