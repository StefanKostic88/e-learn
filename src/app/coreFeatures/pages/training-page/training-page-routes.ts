import { Routes } from '@angular/router';
import { TrainingPageComponent } from './training-page.component';
import { AddTrainingPageComponent } from '../add-training-page/add-training-page.component';

export default [
  {
    path: '',
    component: TrainingPageComponent,
  },
  {
    path: 'add-training',
    component: AddTrainingPageComponent,
  },
] as Routes;
