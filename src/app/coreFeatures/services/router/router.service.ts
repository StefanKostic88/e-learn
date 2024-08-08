import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UiService } from '../uiService/ui.service';
import { finalize, from, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  constructor(private router: Router, private uiService: UiService) {}

  public toHomePage(): void {
    this.router.navigate(['/']);
  }
  public toMyAccount(): void {
    this.router.navigate(['/my-account']);
  }
}

//
