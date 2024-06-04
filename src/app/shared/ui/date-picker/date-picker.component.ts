import {
  ChangeDetectorRef,
  Component,
  Input,
  ViewEncapsulation,
  forwardRef,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports: [BsDatepickerModule],
  templateUrl: './date-picker.component.html',
  styleUrl: './date-picker.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true,
    },
  ],
})
export class DatePickerComponent {
  @Input() label: string = 'From';
  @Input() initialValue?: Date = new Date(Date.now());
  constructor(private cdr: ChangeDetectorRef) {}

  private onChange: (value: Date) => void = () => {};
  private onTouched: () => void = () => {};

  private innerValue?: Date = this.initialValue;

  onValueChange(value: Date) {
    this.innerValue = value;
    this.onChange(value);
    this.onTouched();
  }

  writeValue(value: Date): void {
    this.innerValue = value;
    this.cdr.detectChanges();
  }

  registerOnChange(fn: (value: Date) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Handle disabled state here if needed
  }
}
