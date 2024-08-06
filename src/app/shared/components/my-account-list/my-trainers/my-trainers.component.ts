import { Component } from '@angular/core';
import { ButtonComponent } from '../../../ui/button/button.component';
import { ButtonSize } from '../../../models/button.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TableComponent } from '../../table/table.component';
import { TrainerRefined } from '../../../../coreFeatures';
import { from, Observable, of } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { UserStoreService } from '../../../../coreFeatures/services/user/user-store.service';
import { LoaderComponent } from '../../../ui/loader/loader.component';

const components = [TableComponent, ButtonComponent, LoaderComponent];

@Component({
  selector: 'app-my-trainers',
  standalone: true,
  imports: [components, AsyncPipe, NgIf],
  templateUrl: './my-trainers.component.html',
  styleUrl: './my-trainers.component.scss',
})
export class MyTrainersComponent {
  public readonly btnSize: typeof ButtonSize = ButtonSize;

  public tableHeader = ['NAME', 'SPECIALIZATION'];

  // myTrainers$?: Observable<TrainerRefined[] | undefined>;
  myTrainers$?: Observable<TrainerRefined[]> =
    this.userStoreService.getMyTrainers();

  constructor(
    private router: Router,
    private route: ActivatedRoute, // private trainerService: TrainerService,
    private userStoreService: UserStoreService
  ) {}

  ngOnInit(): void {
    // this.myTrainers$ = of([
    //   { name: 'STEF', userId: 'STEF', specialization: 'STEF' },
    //   { name: 'STEF', userId: 'STEF', specialization: 'STEF' },
    //   { name: 'STEF', userId: 'STEF', specialization: 'STEF' },
    // ]);
    // this.myTrainers$ = this.trainerService.getMyTrainers();
    console.log('INIT');
  }

  public navigateToAddTrainer() {
    this.router.navigate(['add-trainer'], { relativeTo: this.route });
  }
}
