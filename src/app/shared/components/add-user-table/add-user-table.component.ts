import { NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-add-user-table',
  standalone: true,
  imports: [TableModule, ReactiveFormsModule, NgIf, NgFor, TitleCasePipe],
  templateUrl: './add-user-table.component.html',
  styleUrl: './add-user-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddUserTableComponent {
  @Input() trainersForm!: FormGroup;
  @Input() tableHeader?: string[];

  get rows() {
    return this.trainersForm?.get('rows') as FormArray;
  }

  getFormGroup(index: number) {
    return this.rows.at(index) as FormGroup;
  }
}
