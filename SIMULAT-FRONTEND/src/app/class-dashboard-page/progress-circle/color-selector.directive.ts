import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[appColorSelector]',
  standalone: true
})
export class ColorSelectorDirective {


  constructor() { }

}
