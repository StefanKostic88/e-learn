import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  Renderer2,
} from '@angular/core';

import { ButtonState, ButtonSize } from '../../models/button.model';

@Directive({
  selector: '[appButton]',
  standalone: true,
})
export class ButtonDirective implements AfterViewInit {
  @Input() isOutlined?: boolean;
  @Input() btnType?: string;
  @Input() isInputBtn?: boolean;
  @Input() btnSize?: ButtonSize;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.generateBtnType();
    this.generateRoundedProps();
    this.generateBtnSize();
  }

  private generateBtnType(): void {
    if (this.isOutlined && this.btnType === ButtonState.PRIMARY) {
      this.renderer.addClass(this.elementRef.nativeElement, 'btn-primary');
    }
    if (this.isOutlined && this.btnType === ButtonState.SECONDARY) {
      this.renderer.addClass(this.elementRef.nativeElement, 'btn-secondary');
    }
    if (this.isOutlined && this.btnType === ButtonState.ERROR) {
      this.renderer.addClass(this.elementRef.nativeElement, 'btn-error');
    }
  }

  private generateRoundedProps(): void {
    const inputClass = this.isInputBtn ? 'rounded-r-md' : 'rounded-md';
    this.renderer.addClass(this.elementRef.nativeElement, inputClass);
  }

  private generateBtnSize(): void {
    if (this.btnSize === ButtonSize.NORMAL) {
      this.renderer.addClass(this.elementRef.nativeElement, 'btn-normal');
      this.renderer.addClass(this.elementRef.nativeElement, 'text-medium');
    }
    if (this.btnSize === ButtonSize.SMALL) {
      this.renderer.addClass(this.elementRef.nativeElement, 'btn-small');
      this.renderer.addClass(this.elementRef.nativeElement, 'text-small');
    }
    if (this.btnSize === ButtonSize.MEDIUM) {
      this.renderer.addClass(this.elementRef.nativeElement, 'btn-medium');
      this.renderer.addClass(
        this.elementRef.nativeElement,
        'text-small-to-medium'
      );
    }
    if (this.btnSize === ButtonSize.EXTRA_SMALL) {
      this.renderer.addClass(this.elementRef.nativeElement, 'btn-small');
      this.renderer.addClass(this.elementRef.nativeElement, 'text-extra-small');
    }
  }
}
