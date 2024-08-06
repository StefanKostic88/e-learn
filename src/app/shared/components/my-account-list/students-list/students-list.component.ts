import { Component, Input, OnInit } from '@angular/core';
import { TableComponent } from '../../table/table.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { myStudent, UiService } from '../../../../coreFeatures';
import { UserStoreService } from '../../../../coreFeatures/services/user/user-store.service';
import { LoaderComponent } from '../../../ui/loader/loader.component';

@Component({
  selector: 'app-students-list',
  standalone: true,
  imports: [TableComponent, AsyncPipe, NgIf, LoaderComponent],
  templateUrl: './students-list.component.html',
  styleUrl: './students-list.component.scss',
})
export class StudentsListComponent implements OnInit {
  tableHeading = ['NAME', 'STATUS'];
  tableData$?: Observable<myStudent[] | undefined>;
  // tableIsLoading$ = this.uiService.tableLoading;

  constructor(
    private userStoreService: UserStoreService,
    private uiService: UiService
  ) {}

  ngOnInit(): void {
    this.tableData$ = this.userStoreService.getMyUsers();
  }
}
