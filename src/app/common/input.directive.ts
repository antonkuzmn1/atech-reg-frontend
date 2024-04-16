import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appInput]',
  standalone: true
})
export class InputDirective {

  constructor(private elementRef: ElementRef) { }

  @HostListener('keypress', ['$event'])
  onKeypress(event: KeyboardEvent) {
    const charCode = String.fromCharCode(event.keyCode);
    const value = this.elementRef.nativeElement.value;
    switch (this.elementRef.nativeElement.attributes.type.value) {
      case "text": if (!/[a-zA-Z0-9]/.test(charCode) || value.length >= 15) event.preventDefault(); break;
      case "password": if (!/[a-zA-Z0-9_!%]/.test(charCode) || value.length >= 15) event.preventDefault(); break;
    }
  }

}
