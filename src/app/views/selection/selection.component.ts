import {Component, OnInit} from '@angular/core';
import {first, tap} from 'rxjs/operators';
import {forkJoin, Observable, throwError} from 'rxjs';
import {PokemonService} from '../../core/services/pokemon.service';
import {Router} from '@angular/router';
import {IPokemon} from '../../core/interfaces/IPokemon';
import {catchError, finalize} from 'rxjs/internal/operators';
import {IAttack} from '../../core/interfaces/IAttack';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-attack-selection',
    templateUrl: './selection.component.html',
    styleUrls: ['./selection.component.sass']
})

export class SelectionComponent implements OnInit {

    constructor(private pokemonService: PokemonService,
                private router: Router) {
    }

    ERROR_MESSAGE = 'This pokemon does not exist !';

    public front: FormGroup;
    public back: FormGroup;
    public pokemonFront: IPokemon;
    public pokemonBack: IPokemon;
    public frontValidated: boolean;
    public backValidated: boolean;
    public frontErrorMessage: string;
    public backErrorMessage: string;


    ngOnInit() {
        this.front = new FormGroup({
            frontInput: new FormControl('', [Validators.required])
        });
        this.back = new FormGroup({
            backInput: new FormControl('', [Validators.required])
        });
    }

    public onFrontSubmit() {
        this.getPokemons(this.front.value.frontInput, this.front);
    }

    public onBackSubmit() {
        this.getPokemons(this.back.value.backInput, this.back);
    }

    public getPokemons(value, form) {
        this.fetchPokemons(value.toLowerCase())
            .pipe(
                catchError((error) => {
                    return this.handlePokemonSearchError(form, error);
                }),
            )
            .pipe(
                first(p => {
                    return this.handlePokemonSearchSuccess(form, p);
                }),
                finalize(() => this.getAllAttacks(form))
            )
            .subscribe();
    }

    public getAllAttacks(form: FromGroup) {
        const pokemon = form === this.front ? this.pokemonFront : this.pokemonBack;
        this.fetchAttacks(pokemon)
            .pipe(
                tap(a => {
                    pokemon.allAttacks = a.filter(val => val.power !== null);
                }),
            )
            .subscribe();
    }

    public handlePokemonSearchSuccess(form: FromGroup, pokemon: IPokemon): boolean {
        if (form === this.front) {
            this.pokemonFront = pokemon;
            this.frontErrorMessage = '';
        } else {
            this.pokemonBack = pokemon;
            this.backErrorMessage = '';
        }
        return pokemon !== undefined;
    }

    public handlePokemonSearchError(form: FromGroup, error: any): Observable<never> {
        if (form === this.front) {
            this.pokemonFront = undefined;
            this.frontErrorMessage = this.ERROR_MESSAGE;
        } else {
            this.pokemonBack = undefined;
            this.backErrorMessage = this.ERROR_MESSAGE;
        }

        if (error.status === 404) {
            return throwError(this.ERROR_MESSAGE);
        } else {
            return throwError(error);
        }
    }

    public onSelect(attack: IAttack, pokemon: IPokemon) {
        const attacks = pokemon === this.pokemonFront ? this.pokemonFront.attacks : this.pokemonBack.attacks;

        const isAttackAlreadySelected = attacks.find(value => value.name === attack.name);
        const numberOfAttackSelected = attacks.length;

        if (isAttackAlreadySelected === undefined && numberOfAttackSelected < 4) {
            attacks.push(attack);
        }
    }

    public onValidate(pokemon: IPokemon) {
        if (pokemon === this.pokemonFront) {
            this.frontValidated = true;
        } else {
            this.backValidated = true;
        }
    }

    public launchFight(choice: string) {
        if (this.backValidated && this.frontValidated) {
            this.pokemonService.pokemonFront = this.pokemonFront;
            this.pokemonService.pokemonBack = this.pokemonBack;
            this.router.navigate(['round', choice])
                .catch(error => console.log(error));
        }
    }

    private fetchPokemons(pokemonName: string): Observable<any> {
        return this.pokemonService.show(pokemonName);
    }

    private fetchAttacks(pokemon: IPokemon): Observable<any> {
        const attacks = pokemon.moves;
        const attackRequests = [];

        for (const attack of attacks) {
            attackRequests.push(this.pokemonService.getAttackDetail(attack.move.url));
        }

        return forkJoin(attackRequests);

    }

}
