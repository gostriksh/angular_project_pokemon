import {Directive, ElementRef, Input, OnChanges} from '@angular/core';

@Directive({
  selector: '[appBackgroundPokemonColor]'
})
export class BackgroundPokemonColorDirective implements OnChanges {

  @Input('appBackgroundPokemonColor') color: string;
  constructor(private el: ElementRef) { }

  ngOnChanges() {
    this.el.nativeElement.style.backgroundColor = this.color;
  }

}
