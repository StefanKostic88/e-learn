import { ButtonDirective } from './button.directive';
import { TestBed } from '@angular/core/testing';
import { ElementRef, Renderer2 } from '@angular/core';
import { ButtonState } from '../../models/button.model';

describe('ButtonDirective', () => {
  let directive: ButtonDirective;
  let elementRefMock: ElementRef;
  let renderer2Mock: Renderer2;
  const btnState: typeof ButtonState = ButtonState;

  beforeEach(() => {
    elementRefMock = {} as ElementRef;
    renderer2Mock = {
      addClass: jasmine.createSpy('addClass'),
    } as unknown as Renderer2;

    TestBed.configureTestingModule({
      declarations: [ButtonDirective],
      providers: [
        { provide: ElementRef, useValue: elementRefMock },
        { provide: Renderer2, useValue: renderer2Mock },
      ],
    });

    directive = new ButtonDirective(elementRefMock, renderer2Mock);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should add btn-primary class if isOutlined and btnType is primary', () => {
    directive.isOutlined = true;
    directive.btnType = btnState.PRIMARY;
    directive.ngAfterViewInit();

    expect(renderer2Mock.addClass).toHaveBeenCalledWith(
      elementRefMock.nativeElement,
      'btn-primary'
    );
  });

  it('should add btn-secondary class if isOutlined and btnType is secondary', () => {
    directive.isOutlined = true;
    directive.btnType = btnState.SECONDARY;
    directive.ngAfterViewInit();

    expect(renderer2Mock.addClass).toHaveBeenCalledWith(
      elementRefMock.nativeElement,
      'btn-secondary'
    );
  });

  it('should add btn-error class if isOutlined and btnType is error', () => {
    directive.isOutlined = true;
    directive.btnType = btnState.ERROR;
    directive.ngAfterViewInit();

    expect(renderer2Mock.addClass).toHaveBeenCalledWith(
      elementRefMock.nativeElement,
      'btn-error'
    );
  });

  it('should add class rounded-r-md if isInputBtn is true', () => {
    directive.isInputBtn = true;
    directive.ngAfterViewInit();

    expect(renderer2Mock.addClass).toHaveBeenCalledWith(
      elementRefMock.nativeElement,
      'rounded-r-md'
    );
  });
});
