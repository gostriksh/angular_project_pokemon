import {ILog} from '../interfaces/ILog';
import {IPokemon} from '../interfaces/IPokemon';
import {IAttack} from '../interfaces/IAttack';

export class Log implements ILog {
    pokemonAttacked: IPokemon;
    pokemonAttacker: IPokemon;
    attack: IAttack;
    damage: number;

    constructor(pokemonAttacker, pokemonAttacked, attack, damage) {
        this.damage = damage;
        this.pokemonAttacked = pokemonAttacked;
        this.pokemonAttacker = pokemonAttacker;
        this.attack = attack;
    }
}
