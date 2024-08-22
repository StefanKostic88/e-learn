import { Component, OnInit } from '@angular/core';
import {
  ButtonComponent,
  DatePickerComponent,
  InputComponent,
  TableComponent,
} from '../../../shared';
import { ButtonSize, ButtonState } from '../../../shared/models/button.model';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { UserStoreService } from '../../services/user/user-store.service';
import { TrainingStoreService } from '../../services/training/training-store.service';
import { MyTrainingTableData } from '../../models/user.model';
import { LoaderComponent } from '../../../shared/ui/loader/loader.component';
import { FormService } from '../../services/form/form.service';
import {
  trainingPageTableHeaders,
  trainingPageTeableHeadersTrainer,
} from '../../constants/dictionary';
import { RouterService } from '../../services/router/router.service';

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
  protected readonly btnSize: typeof ButtonSize = ButtonSize;
  protected readonly btnType: typeof ButtonState = ButtonState;
  protected readonly tableHeaders = trainingPageTableHeaders;
  protected readonly teableHeadersTrainer = trainingPageTeableHeadersTrainer;

  protected trainingForm!: FormGroup;

  protected readonly role$: Observable<string | undefined> =
    this.userStoreService.getCurrentUserRole();
  protected myTrainings$: Observable<MyTrainingTableData[]> =
    this.trainingStoreService.getMyTrainings();

  constructor(
    private route: ActivatedRoute,
    private userStoreService: UserStoreService,
    private trainingStoreService: TrainingStoreService,
    private formService: FormService,
    private routerService: RouterService
  ) {}

  ngOnInit(): void {
    this.trainingForm = this.formService.generateSearchFormFeailds();
  }

  protected navigateToAddTrainer() {
    this.routerService.toAddTrainer(this.route);
  }

  protected onSearch() {
    const data = this.trainingForm.value;
    const params = `name=${data.searchStudent}&specialization=${data.searchSpecialization}&createdBefore=${data.fromDate}&createdAfter=${data.toDate}`;

    this.myTrainings$ =
      this.trainingStoreService.getMyTrainingsWithParams(params);
  }
}
