import {IPokemon} from './IPokemon';
import {IAttack} from './IAttack';

export interface ILog {
    damage: number;
    pokemonAttacker: IPokemon;
    pokemonAttacked: IPokemon;
    attack: IAttack;
}