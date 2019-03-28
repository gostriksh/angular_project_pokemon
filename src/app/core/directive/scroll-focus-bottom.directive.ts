import {AfterViewChecked, Directive, DoCheck, ElementRef, OnChanges} from '@angular/core';

@Directive({
  selector: '[appScrollFocusBottom]'
})
export class ScrollFocusBottomDirective implements AfterViewChecked {

  constructor(private el: ElementRef) { }

  ngAfterViewChecked() {
      this.el.nativeElement.scrollTop = this.el.nativeElement.scrollHeight;
  }
}
