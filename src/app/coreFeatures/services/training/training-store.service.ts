import { Injectable } from '@angular/core';

import { TrainingService } from './training.service';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import {
  MyTrainingTableData,
  TrainerOption,
  TrainingCreationAttribute,
} from '../../models/user.model';
import { ToasterService } from '../toaster/toaster.service';
import { RouterService } from '../router/router.service';
import { ActivatedRoute } from '@angular/router';
import { UiService } from '../uiService/ui.service';

@Injectable({
  providedIn: 'root',
})
export class TrainingStoreService {
  constructor(
    private trainingService: TrainingService,
    private toasterService: ToasterService,
    private routerService: RouterService,
    private uiService: UiService
  ) {}

  public getAllTrainers(): Observable<TrainerOption[]> {
    return this.trainingService.getAllTrainers().pipe(
      map((trainers) =>
        trainers.map((trainer) => ({
          trainerId: trainer.id,
          trainerName: trainer.firstName,
          specialization: trainer.specialization,
        }))
      )
    );
  }

  public createTraining(
    data: TrainingCreationAttribute,
    route: ActivatedRoute
  ) {
    this.uiService.loadingSpiner = true;
    return this.trainingService.createTraining(data).pipe(
      tap(() => {
        this.toasterService.toasterState = {
          message: 'Training created',
          isOpened: true,
        };

        this.routerService.toTrainings(route);
        this.uiService.loadingSpiner = false;
      }),
      catchError((err) => {
        this.toasterService.resetToasterState();
        this.uiService.loadingSpiner = false;
        return throwError(err);
      })
    );
  }

  public getMyTrainings(): Observable<MyTrainingTableData[]> {
    return this.trainingService.getMyTrainings().pipe(
      map((trainings) =>
        trainings.map((training) => ({
          startDate: training.startDate,
          trainingName: training.trainingName,
          trainingType: training.trainingType,
          trainer: training.trainerName,
          duration: training.duration,
          student: training.studentName,
        }))
      )
    );
  }
  public getMyTrainingsWithParams(
    params: string
  ): Observable<MyTrainingTableData[]> {
    return this.trainingService.getMyTrainingsWithParams(params).pipe(
      tap((el) => console.log(el)),
      map((trainings) =>
        trainings.map((training) => ({
          startDate: training.startDate,
          trainingName: training.trainingName,
          trainingType: training.trainingType,
          trainer: training.trainerName,
          duration: training.duration,
          student: training.studentName,
        }))
      )
    );
  }
}
