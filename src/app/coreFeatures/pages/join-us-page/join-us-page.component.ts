import { Component } from '@angular/core';
import {
  ButtonComponent,
  PageWraperComponent,
  JoinUsBoxComponent,
} from '../../../shared';
import { JoinUsBox } from '../../models/shared.models';
import { ActivatedRoute, Router } from '@angular/router';
import { NgFor } from '@angular/common';

const components = [ButtonComponent, PageWraperComponent, JoinUsBoxComponent];

@Component({
  selector: 'app-join-us-page',
  standalone: true,
  imports: [components, NgFor],
  templateUrl: './join-us-page.component.html',
  styleUrl: './join-us-page.component.scss',
})
export class JoinUsPageComponent {
  joinUsElements: JoinUsBox[] = [
    {
      title: 'Register as a Trainer',
      content:
        'Complete your trainer registration on our platform and join our community today.',
      img: '../../../assets/imgs/trainers.png',
      navigateTo: () =>
        this.router.navigate(['trainer-register'], {
          relativeTo: this.route,
          state: {
            role: 'student',
          },
        }),
    },
    {
      title: 'Register as a Student',
      content:
        'Complete your student registration on our platform and join our community today.',
      img: '../../../assets/imgs/students.jpeg',
      navigateTo: () =>
        this.router.navigate(['student-register'], {
          relativeTo: this.route,
          state: {
            role: 'trainer',
          },
        }),
    },
  ];

  constructor(private router: Router, private route: ActivatedRoute) {}
}
