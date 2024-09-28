import { Routes } from '@angular/router';

import { GenericDetailsPageComponent } from '../generic-details-page/generic-details-page.component';
import { WhatsNewComponent } from './whats-new.component';

export default [
  {
    path: '',
    component: WhatsNewComponent,
  },
  {
    path: ':id',
    component: GenericDetailsPageComponent,
    data: {
      typeOfItem: 'whats-new',
    },
  },
] as Routes;
