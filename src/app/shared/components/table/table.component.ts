import { DatePipe, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit {
  @Input() public tableHeaders?: string[] | undefined | null;
  @Input() public tableData?:
    | TrainerRefined[]
    | myStudent[]
    | null
    | MyTrainingTableData[];

  @Input() public role: string = 'student';
  @Input() public tableType: string = 'userList';

  protected tableLength?: number = 7;
  protected addPaginator = false;

  ngOnInit(): void {
    this.tableLength = this.tableType === 'studentTrainingList' ? 4 : 7;

    this.addPaginator = Number(this.tableData?.length) > this.tableLength;
  }
}
