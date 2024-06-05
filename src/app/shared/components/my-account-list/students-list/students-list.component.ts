import { Component, OnInit } from '@angular/core';
import { TableComponent } from '../../table/table.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-students-list',
  standalone: true,
  imports: [TableComponent, AsyncPipe, NgIf],
  templateUrl: './students-list.component.html',
  styleUrl: './students-list.component.scss',
})
export class StudentsListComponent implements OnInit {
  tableHeading = ['NAME', 'STATUS'];
  tableData$?: Observable<
    | {
        name: string;
        isActive: boolean;
        user_id: string;
      }[]
    | undefined
  >;

  // constructor(private trainerService: TrainerService) {}

  ngOnInit(): void {
    console.log('asdasd');
    // this.tableData$ = this.trainerService.getMyStudents();
    this.tableData$ = of([
      { name: 'Stefa', isActive: true, user_id: 'asdasd' },
    ]);
  }
}
