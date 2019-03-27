import { Component, OnInit } from '@angular/core';
import {concat, filter, first, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {PokemonService} from '../../core/services/pokemon.service';
import {ActivatedRoute} from '@angular/router';
import {IPokemon} from '../../core/interfaces/IPokemon';

@Component({
  selector: 'app-attack-selection',
  templateUrl: './attackSelection.component.html',
  styleUrls: ['./attackSelection.component.sass']
})
export class AttackSelectionComponent implements OnInit {

    public pokemonFront: IPokemon;
    public pokemonBack: IPokemon;

    constructor(private pokemonService: PokemonService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.paramMap.pipe(
            switchMap(this.fetchPokemons.bind(this)),
            filter(() => !!(this.pokemonFront && this.pokemonBack)),
        )
            .subscribe();
    }

    private fetchPokemons(params): Observable<any> {
        const pokemonFrontName = params.get('pokemonFront');
        const pokemonBackName = params.get('pokemonBack');

        const front$ = this.pokemonService.show(pokemonFrontName)
            .pipe(
                first(p => {
                  this.pokemonFront = p;
                  console.log(this.pokemonFront);
                })
            );

        const back$ = this.pokemonService.show(pokemonBackName)
            .pipe(
                first(p => {
                  this.pokemonBack = p;
                  console.log(this.pokemonBack);
                })
            );

        return front$.pipe(concat(back$));
    }

}
