import {Directive, ElementRef, Input, OnChanges} from '@angular/core';

@Directive({
    selector: '[appDisplayDamage]'
})
export class DisplayDamageDirective implements OnChanges {

    @Input('appDisplayDamage') damageArray: number[];

    constructor(private el: ElementRef) {

    }

    ngOnChanges(): void {
        const lastDamage = this.damageArray[this.damageArray.length - 1];
        this.el.nativeElement.innerHTML = lastDamage ? `-${lastDamage}` : '';
        this.el.nativeElement.className += 'damage-pokemon';
        setTimeout(() => this.el.nativeElement.className = '', 1000);
    }
}
