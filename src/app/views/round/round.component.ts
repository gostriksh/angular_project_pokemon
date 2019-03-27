import {Component, OnInit} from '@angular/core';
import {PokemonService} from '../../core/services/pokemon.service';
import {IPokemon} from '../../core/interfaces/IPokemon';
import {concat, filter, first, map, switchAll, switchMap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, OperatorFunction} from 'rxjs';

@Component({
    selector: 'app-round',
    templateUrl: './round.component.html',
    styleUrls: ['./round.component.sass']
})
export class RoundComponent implements OnInit {
    public pokemonFront: IPokemon;
    public pokemonBack: IPokemon;
    public logs: string[] = [];
    public winner: IPokemon;
    public loser: IPokemon;

    constructor(private pokemonService: PokemonService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.paramMap.pipe(
            switchMap(this.fetchPokemons.bind(this)),
            filter(() => !!(this.pokemonFront && this.pokemonBack)),
            first(this.fight.bind(this))
        )
            .subscribe();
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

    private getAttackOrder(... pokemons: IPokemon[]): IPokemon[] {
        return pokemons.sort((a, b) => a.stats.speed > b.stats.speed ? -1 : 1);
    }

    private fight(): void {
        let count = 0;
        const pokemons = this.getAttackOrder(this.pokemonFront, this.pokemonBack);

        const interval = setInterval(() => {
            if (pokemons[0].stats.health <= 0 || pokemons[1].stats.health <= 0) {
                clearInterval(interval);
            }

            const firstIndex = count % 2;
            const secondIndex = (1 + count) % 2;

            this.attack(pokemons[firstIndex], pokemons[secondIndex]);

            if (pokemons[secondIndex].stats.health <= 0) {
                this.winner = pokemons[firstIndex];
                this.loser = pokemons[secondIndex];
            } else {
                count++;
            }
        }, 1000);
        return;
    }

    private attack(attacker: IPokemon, attacked: IPokemon) {
        if (attacked.stats.health <= 0) {
            return;
        }

        const damage: number = attacker.stats.attack - attacked.stats.defense;
        const trueDamage: number = damage > 0 ? damage : 1;
        attacked.stats.health -= trueDamage;

        this.logs.push(`${attacker.name} attack ${attacked.name} and deal ${trueDamage}`);

        if (attacked.stats.health < 0) {
            attacked.stats.health = 0;
        }
    }
}
