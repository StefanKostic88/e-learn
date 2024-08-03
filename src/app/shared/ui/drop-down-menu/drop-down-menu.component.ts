import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { TrainerOption } from '../../../coreFeatures';

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
  @Input() initialValue?: string | null;
  @Input() public name: string = 'specialization';
  @Input() public options?: string[] | TrainerOption[];

  public menuIsOpened = false;
  public readonly icon = faChevronDown;
  public formControlName?: string;
  public value!: string;

  public chnaged!: (value: string | TrainerOption) => void;
  public touched!: () => void;
  public isDisabled!: boolean;

  // public selectedOption?: string;
  public selectedOption?: string | TrainerOption;

  protected title?: string;

  ngOnInit(): void {
    console.log(this.initialValue, 'SPASDASD');
    this.title = this.initialValue ? this.initialValue : 'Please Select';
  }

  public handleTogleKeydown(e: KeyboardEvent): void {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.toggleMenu();
    }
  }
  public handleSelectKeydown(
    e: KeyboardEvent,
    option: string | TrainerOption
  ): void {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.selectOption(option);
    }
  }

  public toggleMenu(): void {
    this.menuIsOpened = !this.menuIsOpened;
  }
  public selectOption(option: string | TrainerOption): void {
    if (this.type === 'specialization') {
      const optionAsString = option as string;
      console.log(optionAsString);
      this.selectedOption = option;
      this.chnaged(optionAsString);
      this.touched();
      this.title = optionAsString;
      this.toggleMenu();
    }
    if (this.type === 'trainer') {
      const optionAsTrainerData = option as TrainerOption;
      console.log(option);
      this.selectedOption = option;
      this.chnaged(optionAsTrainerData);
      this.touched();
      this.title = optionAsTrainerData.trainerName;
      this.toggleMenu();
    }
  }
  // public selectOption(option: string): void {
  //   console.log(option);
  //   this.selectedOption = option;
  //   this.chnaged(option);
  //   this.touched();
  //   this.title = option;
  //   this.toggleMenu();
  // }

  public writeValue(value: string): void {
    if (value !== undefined) {
      this.selectedOption = value;
    }
  }
  public registerOnChange(fn: () => void): void {
    this.chnaged = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.touched = fn;
  }
  public setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  public optionsAsStringArray() {
    return this.options as string[];
  }

  public opTionsAsTrainerOptions() {
    return this.options as TrainerOption[];
  }
}
