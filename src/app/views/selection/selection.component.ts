import {Component, OnInit} from '@angular/core';
import {first, tap} from 'rxjs/operators';
import {forkJoin, Observable, throwError} from 'rxjs';
import {PokemonService} from '../../core/services/pokemon.service';
import {Router} from '@angular/router';
import {IPokemon} from '../../core/interfaces/IPokemon';
import {catchError, finalize} from 'rxjs/internal/operators';
import {IAttack} from '../../core/interfaces/IAttack';

@Component({
    selector: 'app-attack-selection',
    templateUrl: './selection.component.html',
    styleUrls: ['./selection.component.sass']
})
export class SelectionComponent {

    constructor(private pokemonService: PokemonService,
                private router: Router) {
    }

    ERROR_MESSAGE = 'This pokemon does not exist !';

    public pokemonFront: IPokemon;
    public pokemonBack: IPokemon;
    public frontValidated: boolean;
    public backValidated: boolean;
    public frontErrorMessage: string;
    public backErrorMessage: string;

    public choosePokemon(event) {
        const id = event.target.id;
        this.fetchPokemons(event.target.value.toLowerCase())
            .pipe(
                catchError((error) => {
                    return this.handlePokemonSearchError(id, error);
                }),
            )
            .pipe(
                first(p => {
                    return this.handlePokemonSearchSuccess(id, p);
                }),
                finalize(() => this.getAllAttacks(id))
            )
            .subscribe();
    }

    public getAllAttacks(id: string) {
        const pokemon = id === 'front-input' ? this.pokemonFront : this.pokemonBack;
        this.fetchAttacks(pokemon)
            .pipe(
                tap(a => {
                    pokemon.allAttacks = a.filter(val => val.power !== null);
                }),
            )
            .subscribe();
    }

    public handlePokemonSearchSuccess(id: string, pokemon: IPokemon): boolean {
        if (id === 'front-input') {
            this.pokemonFront = pokemon;
            this.frontErrorMessage = '';
        } else {
            this.pokemonBack = pokemon;
            this.backErrorMessage = '';
        }
        return pokemon !== undefined;
    }

    public handlePokemonSearchError(id: string, error: any): Observable<never> {
        if (id === 'front-input') {
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
