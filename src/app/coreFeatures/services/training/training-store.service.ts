import { Injectable } from '@angular/core';

import { TrainingService } from './training.service';
import { catchError, map, Observable, throwError } from 'rxjs';
import {
  MyTrainingTableData,
  TrainerOption,
  TrainingCreationAttribute,
} from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class TrainingStoreService {
  constructor(private trainingService: TrainingService) {}

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

  public createTraining(data: TrainingCreationAttribute) {
    return this.trainingService.createTraining(data).pipe(
      catchError((err) => {
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
}
