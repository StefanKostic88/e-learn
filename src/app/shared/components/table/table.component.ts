import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { TrainerRefined } from '../../../coreFeatures';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [ReactiveFormsModule, TableModule, NgIf, NgFor, DatePipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit {
  @Input() tableHeaders?: string[] | undefined;
  @Input() tableData?: TrainerRefined[];

  // @Input() tableData?:
  // | TrainerRefined[]
  // | StudentRefined[]
  // | MyTrainingOutput[]
  // | MyTrainingStudentOutput[];
  @Input() role: string = 'student';
  @Input() tableType: string = 'userList';
  tableLength?: number = 7;
  addPaginator = false;
  ngOnInit(): void {
    this.tableLength = this.tableType === 'studentTrainingList' ? 4 : 7;
    console.log(this.tableLength);

    this.addPaginator = Number(this.tableData?.length) > this.tableLength;
  }
}
