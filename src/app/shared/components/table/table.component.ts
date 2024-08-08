import { DatePipe, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import {
  myStudent,
  MyTrainingTableData,
  TrainerRefined,
} from '../../../coreFeatures';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TableModule,
    NgIf,
    NgFor,
    DatePipe,
    TitleCasePipe,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class TableComponent implements OnInit {
  @Input() tableHeaders?: string[] | undefined | null;
  @Input() tableData?:
    | TrainerRefined[]
    | myStudent[]
    | null
    | MyTrainingTableData[];

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
