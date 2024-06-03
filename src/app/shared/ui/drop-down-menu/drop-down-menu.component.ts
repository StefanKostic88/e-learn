import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

interface TrainingType {
  trainingTypeName: string;
  _id: string;
}
interface Specialization {
  specializationName: string;
  _id: string;
}

@Component({
  selector: 'app-drop-down-menu',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule, FormsModule],
  templateUrl: './drop-down-menu.component.html',
  styleUrl: './drop-down-menu.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropDownMenuComponent),
      multi: true,
    },
  ],
})
export class DropDownMenuComponent implements ControlValueAccessor, OnInit {
  @Input() required: boolean = false;
  @Input() type: string = 'specialization';
  @Input() label?: string;
  @Input() initialValue?: string;
  public menuIsOpened = false;
  public readonly icon = faChevronDown;
  @Input() public name: string = 'specialization';
  @Input() public options?:
    | Specialization[]
    | { name: string; specialization: string; user_id: string }[]
    | TrainingType[]
    | null;
  public formControlName?: string;

  public value!: string;
  public chnaged!: (
    value: string | { userId: string; sprcializationId: string }
  ) => void;
  public touched!: () => void;
  public isDisabled!: boolean;
  public selectedOption?:
    | Specialization
    | { name: string; specialization: string; user_id: string }
    | TrainingType;

  protected title?: string;

  specOptions() {
    return this.options as Specialization[];
  }
  trainerOptions() {
    return this.options as {
      name: string;
      specialization: string;
      user_id: string;
    }[];
  }

  trainingTypeOption() {
    return this.options as TrainingType[];
  }

  public toggleMenu() {
    this.menuIsOpened = !this.menuIsOpened;
  }
  public selectOption(
    option:
      | Specialization
      | { name: string; specialization: string; user_id: string }
      | TrainingType
  ) {
    if (this.type === 'specialization') {
      this.selectedOption = option as Specialization;
      this.toggleMenu();
      this.chnaged(this.selectedOption._id);
      this.touched();
      this.title = this.selectedOption.specializationName;
    }
    if (this.type === 'trainer') {
      this.selectedOption = option as {
        name: string;
        specialization: string;
        user_id: string;
      };

      this.toggleMenu();
      this.chnaged({
        userId: this.selectedOption.user_id,
        sprcializationId: this.selectedOption.specialization,
      });
      this.touched();
      this.title = this.selectedOption.name;
    }
    if (this.type === 'training-type') {
      this.selectedOption = option as TrainingType;
      // this.selectedOption = option;

      this.toggleMenu();
      // this.chnaged(this.selectedOption._id);
      this.chnaged(this.selectedOption._id);
      this.touched();
      this.title = this.selectedOption.trainingTypeName;
    }
  }

  ngOnInit(): void {
    this.title = this.initialValue ? this.initialValue : 'Please Select';
    console.log(this.title);
  }

  // | Specialization
  // | {
  //     name: string;
  //     specialization: string;
  //     user_id: string;
  //   }
  // | undefined

  writeValue(value: any): void {
    if (value !== undefined) {
      this.selectedOption = value;
    }
  }
  registerOnChange(
    fn: (
      value:
        | string
        | {
            userId: string;
            sprcializationId: string;
          }
    ) => void
  ): void {
    this.chnaged = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.touched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
