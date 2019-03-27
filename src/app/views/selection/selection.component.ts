import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
    selector: 'app-selection',
    templateUrl: './selection.component.html',
    styleUrls: ['./selection.component.sass']
})
export class SelectionComponent implements OnInit {
    public form: FormGroup;

    constructor(private router: Router) {}

    ngOnInit() {
        this.form = new FormGroup({
            pokemonFront: new FormControl('', [Validators.required]),
            pokemonBack: new FormControl('', [Validators.required])
        });
    }

    public onSubmit() {
        const pokemonFront = this.form.value.pokemonFront;
        const pokemonBack = this.form.value.pokemonBack;

        this.router.navigate(['round', 'pokemonFront', pokemonFront, 'pokemonBack', pokemonBack]);
    }
}
