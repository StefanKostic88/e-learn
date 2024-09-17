import { Routes } from '@angular/router';
import { BlogPageComponent } from './blog-page.component';
import { GenericDetailsPageComponent } from '../generic-details-page/generic-details-page.component';

export default [
  {
    path: '',
    component: BlogPageComponent,
  },
  {
    path: ':id',
    component: GenericDetailsPageComponent,
  },
] as Routes;
