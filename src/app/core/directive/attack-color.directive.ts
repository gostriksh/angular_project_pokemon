import {Directive, ElementRef, Input, OnChanges} from '@angular/core';

@Directive({
  selector: '[appPokemonColor]'
})
export class AttackColorDirective implements OnChanges {

  @Input('appPokemonColor') color: string;

  constructor(private el: ElementRef) { }

  ngOnChanges() {
    this.el.nativeElement.style.color = this.color;
  }
}
