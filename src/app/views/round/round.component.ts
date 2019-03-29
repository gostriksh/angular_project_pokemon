import {ChangeDetectorRef, Component, OnChanges, OnInit} from '@angular/core';
import {PokemonService} from '../../core/services/pokemon.service';
import {IPokemon} from '../../core/interfaces/IPokemon';
import {filter, takeWhile} from 'rxjs/operators';
import {interval} from 'rxjs';
import analyze from 'rgbaster';
import {ILog} from '../../core/interfaces/ILog';
import {Log} from '../../core/models/Log';
import {IAttack} from '../../core/interfaces/IAttack';

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
        this.pokemonFront.setColor(resultFront[0].color);
        const resultBack = await analyze(this.pokemonBack.img);
        this.pokemonBack.setColor(resultBack[0].color);
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
                const attack = pokemonAttacker.attacks[Math.floor(Math.random() * pokemonAttacker.attacks.length)];

                this.processAttack(pokemonAttacker, pokemonAttacked, attack);

                if (pokemonAttacked.stats.currentHealth <= 0) {
                    this.winner = pokemonAttacker;
                    this.loser = pokemonAttacked;
                } else {
                    count++;
                }
            });
    }

    private processAttack(attacker: IPokemon, attacked: IPokemon, attack: IAttack) {
        if (attacked.stats.currentHealth <= 0) {
            return;
        }

        attacked.isAttacked = true;
        attacker.isAttacking = true;

        const damage: number = Math.floor(
            Math.floor(
                Math.floor(2 / 5 + 2) * attacker.stats.attack * attack.power / attacked.stats.defense
            ) / 50
        ) + 2;
        const trueDamage: number = damage > 0 ? damage : 1;
        attacked.damageArray = attacked.damageArray.concat(trueDamage);
        attacked.stats.currentHealth -= trueDamage;

        this.logs.push(new Log(attacker, attacked, attack, trueDamage));

        setTimeout(
            () => {
                attacked.isAttacked = false;
                attacker.isAttacking = false;
            },
            1000
        );

        if (attacked.stats.currentHealth < 0) {
            attacked.stats.currentHealth = 0;
        }
    }
}
