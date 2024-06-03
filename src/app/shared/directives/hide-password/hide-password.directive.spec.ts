import { ElementRef, Renderer2 } from '@angular/core';
import { HidePasswordDirective } from './hide-password.directive';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

class MockElementRef extends ElementRef {
  constructor() {
    super(document.createElement('input'));
  }
}

describe('HidePasswordDirective', () => {
  let elementRef: ElementRef;
  let renderer2: Renderer2;
  beforeEach(() => {
    elementRef = new MockElementRef();
    renderer2 = {
      //eslint-disable-next-line
      setAttribute(el: HTMLElement, name: string, value: string): void {},
    } as Renderer2;
  });
  it('should create an instance', () => {
    const directive = new HidePasswordDirective(elementRef, renderer2);
    expect(directive).toBeTruthy();
  });

  it('Testing icons', () => {
    const directive = new HidePasswordDirective(elementRef, renderer2);
    directive.icon = faEyeSlash;
    directive.togglePass();
    directive.icon = faEye;
  });
});
