import {Component, OnInit} from '@angular/core';
import {PokemonService} from '../../core/services/pokemon.service';
import {IPokemon} from '../../core/interfaces/IPokemon';
import {concat, filter, first, map, switchAll, switchMap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, OperatorFunction} from 'rxjs';
import analyze from 'rgbaster';
import {ILog} from '../../core/interfaces/ILog';
import {Log} from "../../core/models/Log";

@Component({
    selector: 'app-round',
    templateUrl: './round.component.html',
    styleUrls: ['./round.component.sass']
})
export class RoundComponent implements OnInit {
    public pokemonFront: IPokemon;
    public pokemonFrontColor: string;
    public pokemonBack: IPokemon;
    public pokemonBackColor: string;
    public logs: ILog[] = [];
    public winner: IPokemon;
    public loser: IPokemon;
    public pause: boolean;

    constructor(private pokemonService: PokemonService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.paramMap.pipe(
            switchMap(this.fetchPokemons.bind(this)),
            filter(() => !!(this.pokemonFront && this.pokemonBack)),
            first(this.setColors.bind(this)),
            first(this.fight.bind(this))
        )
            .subscribe();
    }

    public setPause() {
        this.pause = !this.pause;
    }

    public async setColors() {
        const resultFront = await analyze(this.pokemonFront.imgFront);
        this.pokemonFrontColor = resultFront[0].color;
        const resultBack = await analyze(this.pokemonBack.imgFront);
        this.pokemonBackColor = resultBack[0].color;
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
            if (this.pause) {
                return;
            }

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

        const value = `${attacker.name} attack ${attacked.name} and deal ${trueDamage}`;
        this.logs.push(new Log(value, attacker));

        if (attacked.stats.health < 0) {
            attacked.stats.health = 0;
        }
    }
}