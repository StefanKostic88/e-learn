import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';

import { UiService } from '../services/uiService/ui.service';

@Injectable({
  providedIn: 'root',
})
export class LoadPageResolverService implements Resolve<boolean> {
  constructor(private uiService: UiService) {}

  resolve() {
    this.uiService.loadingSpiner = true;
    return this.uiService.loadingSpiner;
  }
}
