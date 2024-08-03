import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

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
  @Input() public options?: string[];

  public menuIsOpened = false;
  public readonly icon = faChevronDown;
  public formControlName?: string;
  public value!: string;
  public chnaged!: (value: string) => void;
  public touched!: () => void;
  public isDisabled!: boolean;

  public selectedOption?: string;

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
  public handleSelectKeydown(e: KeyboardEvent, option: string): void {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.selectOption(option);
    }
  }

  public toggleMenu(): void {
    this.menuIsOpened = !this.menuIsOpened;
  }
  public selectOption(option: string): void {
    this.selectedOption = option;
    this.chnaged(option);
    this.touched();
    this.title = option;
    this.toggleMenu();
  }

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
}
