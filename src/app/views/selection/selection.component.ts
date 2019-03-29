import {Component, OnInit} from '@angular/core';
import {tap} from 'rxjs/operators';
import {forkJoin, Observable, throwError} from 'rxjs';
import {PokemonService} from '../../core/services/pokemon.service';
import {Router} from '@angular/router';
import {IPokemon} from '../../core/interfaces/IPokemon';
import {catchError} from 'rxjs/internal/operators';
import {IAttack} from '../../core/interfaces/IAttack';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AttackService} from '../../core/services/attack.service';

@Component({
    selector: 'app-attack-selection',
    templateUrl: './selection.component.html',
    styleUrls: ['./selection.component.sass']
})

export class SelectionComponent implements OnInit {

    constructor(private pokemonService: PokemonService,
                private attackService: AttackService,
                private router: Router) {
    }

    ERROR_MESSAGE_POKEMON_NOT_FOUND = 'This pokemon does not exist !';
    ERROR_MESSAGE_SHOULD_CHOOSE_ATTACKS = 'You must choose at least one attack';

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

    public removeAttack(pokemon: IPokemon, attack: IAttack) {
        pokemon.attacks = pokemon.attacks.filter(val => {
            console.log(val);
            return val !== attack;
        });
    }

    public getPokemons(value, form) {
        if (value.length <= 0) {
            return;
        }

        this.fetchPokemons(value.toLowerCase())
            .pipe(
                tap(p => {
                    return this.handlePokemonSearchSuccess(form, p);
                }),
                tap(() => this.getAllAttacks(form)),
                catchError((error) => {
                    return this.handlePokemonSearchError(form, error);
                })
            )
            .subscribe();
    }

    public getAllAttacks(form) {
        const pokemon = form === this.front ? this.pokemonFront : this.pokemonBack;
        this.fetchAttacks(pokemon)
            .pipe(
                tap(a => {
                    pokemon.allAttacks = a.filter(val => val.power !== null);
                }),
            )
            .subscribe();
    }

    public handlePokemonSearchSuccess(form, pokemon: IPokemon): boolean {
        if (form === this.front) {
            this.pokemonFront = pokemon;
            this.frontErrorMessage = '';
        } else {
            this.pokemonBack = pokemon;
            this.backErrorMessage = '';
        }
        return pokemon !== undefined;
    }

    public handlePokemonSearchError(form, error: any): Observable<never> {
        if (form === this.front) {
            this.pokemonFront = undefined;
            this.frontErrorMessage = this.ERROR_MESSAGE_POKEMON_NOT_FOUND;
        } else {
            this.pokemonBack = undefined;
            this.backErrorMessage = this.ERROR_MESSAGE_POKEMON_NOT_FOUND;
        }

        if (error.status === 404) {
            return throwError(this.ERROR_MESSAGE_POKEMON_NOT_FOUND);
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
            if (this.pokemonFront.attacks.length > 0) {
                this.frontValidated = true;
                this.frontErrorMessage = '';
            } else {
                this.frontValidated = false;
                this.frontErrorMessage = this.ERROR_MESSAGE_SHOULD_CHOOSE_ATTACKS;
            }
        } else {
            if (this.pokemonBack.attacks.length > 0) {
                this.backValidated = true;
                this.backErrorMessage = '';
            } else {
                this.backValidated = false;
                this.backErrorMessage = this.ERROR_MESSAGE_SHOULD_CHOOSE_ATTACKS;
            }
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
        const moves = pokemon.moves;
        const attackRequests = [];
        moves.forEach(move => attackRequests.push(this.attackService.getAttackDetail(move.url)));

        return forkJoin(attackRequests);

    }

}
