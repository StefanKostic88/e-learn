import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitcherComponent } from './switcher.component';

describe('SwitcherComponent', () => {
  let component: SwitcherComponent;
  let fixture: ComponentFixture<SwitcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwitcherComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable the input when disabled is true', () => {
    component.disabled = true;
    fixture.detectChanges();
    const inputElement: HTMLInputElement = fixture.nativeElement.querySelector(
      'input[type="checkbox"]'
    );
    expect(inputElement.disabled).toBeTrue();
  });
  it('should enable the input when disabled is false', () => {
    component.disabled = false;
    fixture.detectChanges();
    const inputElement: HTMLInputElement = fixture.nativeElement.querySelector(
      'input[type="checkbox"]'
    );
    expect(inputElement.disabled).toBeFalse();
  });
  it('should check the input when checked is true', () => {
    component.checked = true;
    fixture.detectChanges();
    const inputElement: HTMLInputElement = fixture.nativeElement.querySelector(
      'input[type="checkbox"]'
    );
    expect(inputElement.checked).toBeTrue();
  });
  it('should uncheck the input when checked is false', () => {
    component.checked = false;
    fixture.detectChanges();
    const inputElement: HTMLInputElement = fixture.nativeElement.querySelector(
      'input[type="checkbox"]'
    );
    expect(inputElement.checked).toBeFalse();
  });
});
