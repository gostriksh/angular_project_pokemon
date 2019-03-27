import {Component, OnInit} from '@angular/core';
import {PokemonService} from '../../core/services/pokemon.service';
import {IPokemon} from '../../core/interfaces/IPokemon';
import {first, map, switchAll, switchMap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-round',
    templateUrl: './round.component.html',
    styleUrls: ['./round.component.sass']
})
export class RoundComponent implements OnInit {
    public pokemonFront: IPokemon;
    public pokemonBack: IPokemon;

    constructor(private pokemonService: PokemonService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.paramMap.pipe(
            map(this.fetchPokemons.bind(this))
        )
            .subscribe();
    }

    private fetchPokemons(params): void {
        const pokemonFrontName = params.get('pokemonFront');
        const pokemonBackName = params.get('pokemonBack');

        this.pokemonService.show(pokemonFrontName)
            .pipe(
                first(p => this.pokemonFront = p)
            )
            .subscribe();

        this.pokemonService.show(pokemonBackName)
            .pipe(
                first(p => this.pokemonBack = p)
            )
            .subscribe();
    }

    private getAttackOrder(... pokemons: IPokemon[]): IPokemon[] {
        return pokemons.sort((a, b) => a.stats.speed > b.stats.speed ? -1 : 1);
    }

    private fight(): void {
        const pokemons = this.getAttackOrder(this.pokemonFront, this.pokemonBack)
        return;
    }
}
