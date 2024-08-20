import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  ButtonComponent,
  PageWraperComponent,
  JoinUsBoxComponent,
} from '../../../shared';
import { JoinUsBox } from '../../models/shared.models';
import { ActivatedRoute } from '@angular/router';
import { NgFor } from '@angular/common';
import { RouterService } from '../../services/router/router.service';

const components = [ButtonComponent, PageWraperComponent, JoinUsBoxComponent];

@Component({
  selector: 'app-join-us-page',
  standalone: true,
  imports: [components, NgFor],
  templateUrl: './join-us-page.component.html',
  styleUrl: './join-us-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JoinUsPageComponent {
  protected readonly joinUsElements?: JoinUsBox[];

  constructor(
    private route: ActivatedRoute,
    private routerService: RouterService
  ) {
    this.joinUsElements = this.generateJoinUsData();
  }

  protected trackByIndex(index: number): number {
    return index;
  }

  private generateJoinUsData(): JoinUsBox[] {
    return [
      {
        title: 'Register as a Trainer',
        content:
          'Complete your trainer registration on our platform and join our community today.',
        img: '../../../assets/imgs/trainers.png',
        navigateTo: () => this.routerService.toTrainerRegister(this.route),
      },
      {
        title: 'Register as a Student',
        content:
          'Complete your student registration on our platform and join our community today.',
        img: '../../../assets/imgs/students.jpeg',
        navigateTo: () => this.routerService.toStudentRegister(this.route),
      },
    ];
  }
}
