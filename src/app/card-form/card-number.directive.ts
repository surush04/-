import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCardNumber]',
  standalone: true // Make this directive standalone
})
export class CardNumberDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = this.el.nativeElement;
    const cleanValue = input.value.replace(/\D/g, '').slice(0, 16);
    const formattedValue = cleanValue.replace(/(.{4})/g, '$1 ').trim();
    input.value = formattedValue;
  }
}
