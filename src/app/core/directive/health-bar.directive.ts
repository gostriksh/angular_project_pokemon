import {Directive, ElementRef, Input, OnChanges, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[appHealthBar]'
})
export class HealthBarDirective implements OnChanges {

  @Input('currentHealth') currentHealth: number;
  @Input('totalHealth') totalHealth: number;

  constructor(private el: ElementRef) { }

  ngOnChanges(): void {
    const healthBarWidth = 120;
    const result = Math.round(this.currentHealth / this.totalHealth * healthBarWidth);
    this.el.nativeElement.style.width = `${result}px`;

    if (result <= healthBarWidth / 3) {
      this.el.nativeElement.style.backgroundColor = 'red';
    }
  }

}
