import {Component, OnInit} from '@angular/core';
import {PokemonService} from '../../core/services/pokemon.service';
import {IPokemon} from '../../core/interfaces/IPokemon';
import {filter, takeWhile} from 'rxjs/operators';
import {interval} from 'rxjs';
import analyze from 'rgbaster';
import {ILog} from '../../core/interfaces/ILog';
import {Log} from '../../core/models/Log';

@Component({
    selector: 'app-round',
    templateUrl: './round.component.html',
    styleUrls: ['./round.component.sass']
})
export class RoundComponent implements OnInit {

    constructor(private pokemonService: PokemonService) {
    }

    public pokemonFront: IPokemon;
    public pokemonFrontColor: string;
    public pokemonBack: IPokemon;
    public pokemonBackColor: string;
    public logs: ILog[] = [];
    public winner: IPokemon;
    public loser: IPokemon;
    public startDate: Date;
    public pause = false;

    private static getAttackOrder(...pokemons: IPokemon[]): IPokemon[] {
        return pokemons.sort((a, b) => a.stats.speed > b.stats.speed ? -1 : 1);
    }

    ngOnInit() {
        this.pokemonFront = this.pokemonService.pokemonFront;
        this.pokemonBack = this.pokemonService.pokemonBack;

        this.setColors()
            .then(() => this.fight())
            .catch(console.error);
    }

    public setPause() {
        this.pause = !this.pause;
    }

    public async setColors() {
        const resultFront = await analyze(this.pokemonFront.img);
        this.pokemonFrontColor = resultFront[0].color;
        const resultBack = await analyze(this.pokemonBack.img);
        this.pokemonBackColor = resultBack[0].color;
    }

    private fight(): void {
        let count = 0;
        const pokemons = RoundComponent.getAttackOrder(this.pokemonFront, this.pokemonBack);
        this.startDate = new Date();

        interval(1500)
            .pipe(
                filter(() => this.pause === false),
                takeWhile(() => pokemons[0].stats.currentHealth > 0 && pokemons[1].stats.currentHealth > 0)
            )
            .subscribe(() => {
                const firstIndex = count % 2;
                const secondIndex = (1 + count) % 2;
                const pokemonAttacker = pokemons[firstIndex];
                const pokemonAttacked = pokemons[secondIndex];

                pokemonAttacked.isAttacked = true;
                pokemonAttacker.isAttacking = true;

                this.attack(pokemonAttacker, pokemonAttacked);

                setTimeout(
                    () => {
                        pokemonAttacked.isAttacked = false;
                        pokemonAttacker.isAttacking = false;
                    },
                    1000
                );

                if (pokemonAttacked.stats.currentHealth <= 0) {
                    this.winner = pokemonAttacker;
                    this.loser = pokemonAttacked;
                } else {
                    count++;
                }
            });
    }

    private attack(attacker: IPokemon, attacked: IPokemon) {
        if (attacked.stats.currentHealth <= 0) {
            return;
        }

        const damage: number = attacker.stats.attack - attacked.stats.defense;
        const trueDamage: number = damage > 0 ? damage : 1;
        attacked.stats.currentHealth -= trueDamage;

        const value = `${attacker.name} attack ${attacked.name} and deal ${trueDamage}`;
        this.logs.push(new Log(value, attacker));

        if (attacked.stats.currentHealth < 0) {
            attacked.stats.currentHealth = 0;
        }
    }
}
