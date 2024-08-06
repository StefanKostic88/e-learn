import { Injectable } from '@angular/core';

import { TrainingService } from './training.service';
import { map, Observable } from 'rxjs';
import {
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
    return this.trainingService.createTraining(data);
  }
}
