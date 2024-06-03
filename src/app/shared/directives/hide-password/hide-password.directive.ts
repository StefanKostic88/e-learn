import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';
import {
  IconDefinition,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';

@Directive({
  selector: '[appHidePassword]',
  exportAs: 'appHidePassword',
  standalone: true,
})
export class HidePasswordDirective implements OnInit {
  private inputType?: string;
  public icon: IconDefinition = faEyeSlash;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.inputType = this.elementRef.nativeElement.type;
  }
  togglePass() {
    this.inputType = this.inputType === 'password' ? 'text' : 'password';

    this.icon = this.inputType === 'password' ? faEyeSlash : faEye;
    this.renderer.setAttribute(
      this.elementRef.nativeElement,
      'type',
      this.inputType
    );
  }
}
