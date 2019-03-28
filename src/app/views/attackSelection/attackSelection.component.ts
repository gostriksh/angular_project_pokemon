import {Component, OnInit} from '@angular/core';
import {concat, filter, first, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {PokemonService} from '../../core/services/pokemon.service';
import {ActivatedRoute} from '@angular/router';
import {IPokemon} from '../../core/interfaces/IPokemon';
import {IRedirection} from '../../core/interfaces/common/IRedirection';

@Component({
    selector: 'app-attack-selection',
    templateUrl: './attackSelection.component.html',
    styleUrls: ['./attackSelection.component.sass']
})
export class AttackSelectionComponent implements OnInit {

    constructor(private pokemonService: PokemonService,
                private route: ActivatedRoute) {
    }

    public pokemonFront: IPokemon;
    public pokemonBack: IPokemon;
    public pokemonFrontAttacks: Array<IRedirection>;
    public pokemonBackAttacks: Array<IRedirection>;

    public onSelect(attack: string) {
        console.log(`You clicked on ${attack}`);
    }

    ngOnInit() {
        this.route.paramMap.pipe(
            switchMap(this.fetchPokemons.bind(this)),
            filter(() => !!(this.pokemonFront && this.pokemonBack)),
            first(p => {
                this.pokemonFrontAttacks = this.pokemonFront.moves;
                this.pokemonBackAttacks = this.pokemonBack.moves;
                console.log(this.pokemonFrontAttacks);
                console.log(this.pokemonBackAttacks);
                return true;
            })
        ).subscribe();
    }

    private fetchPokemons(params): Observable<any> {
        const pokemonFrontName = params.get('pokemonFront');
        const pokemonBackName = params.get('pokemonBack');

        const front$ = this.pokemonService.show(pokemonFrontName)
            .pipe(
                first(p => this.pokemonFront = p)
            );

        const back$ = this.pokemonService.show(pokemonBackName)
            .pipe(
                first(p => this.pokemonBack = p)
            );

        return front$.pipe(concat(back$));

    }

}
