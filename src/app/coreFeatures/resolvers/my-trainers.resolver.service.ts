import { Resolve } from '@angular/router';
import { TrainerOption } from '../models/user.model';
import { Injectable } from '@angular/core';
import { UserStoreService } from '../services/user/user-store.service';
import { finalize, map, Observable } from 'rxjs';

import { UiService } from '../services/uiService/ui.service';

@Injectable({
  providedIn: 'root',
})
export class MyTrainersResolverService
  implements Resolve<Observable<TrainerOption[]>>
{
  constructor(
    private userStoreService: UserStoreService,
    private uiService: UiService
  ) {}

  resolve(): Observable<TrainerOption[]> {
    this.uiService.loadingSpiner = true;
    return this.userStoreService.getMyTrainers().pipe(
      map((data) =>
        data.map((el) => ({
          trainerId: el.userId,
          trainerName: el.name,
          specialization: el?.specialization,
        }))
      ),
      finalize(() => (this.uiService.loadingSpiner = false))
    );
  }
}
