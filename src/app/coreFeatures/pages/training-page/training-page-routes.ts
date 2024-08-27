import { Routes } from '@angular/router';
import { TrainingPageComponent } from './training-page.component';
import { AddTrainingPageComponent } from '../add-training-page/add-training-page.component';
import { MyTrainersResolverService } from '../../resolvers/my-trainers.resolver.service';

export default [
  {
    path: '',
    component: TrainingPageComponent,
  },
  {
    path: 'add-training',
    component: AddTrainingPageComponent,
    resolve: {
      myTrainers: MyTrainersResolverService,
    },
    data: { breadcrumb: 'Add training' },
  },
] as Routes;
