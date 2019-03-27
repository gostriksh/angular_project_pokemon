import {Directive, ElementRef, Input, OnChanges} from '@angular/core';

@Directive({
  selector: '[appAttackColor]'
})
export class AttackColorDirective implements OnChanges {

  @Input('appAttackColor') color: string;

  constructor(private el: ElementRef) { }

  ngOnChanges() {
    this.el.nativeElement.style.color = this.color;
  }
}
